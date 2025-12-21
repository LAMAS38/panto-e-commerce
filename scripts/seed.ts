import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

type ID = number

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function fetchWithRetry(url: string, tries = 3) {
  let lastErr: unknown = null

  for (let i = 0; i < tries; i++) {
    try {
      if (i > 0) await sleep(500 * i)

      const res = await fetch(url, {
        redirect: 'follow',
        headers: {
          'user-agent': 'Mozilla/5.0 SeedScript/1.0',
        },
      })

      if (!res.ok) {
        lastErr = new Error(`Failed to fetch: ${res.status}`)
        continue
      }

      const arrayBuffer = await res.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const contentType = res.headers.get('content-type') || 'image/jpeg'

      return { buffer, mimetype: contentType }
    } catch (e) {
      lastErr = e
    }
  }

  throw lastErr
}

async function fetchImageAsFile(url: string, filename: string) {
  const { buffer, mimetype } = await fetchWithRetry(url, 3)
  return {
    data: buffer,
    mimetype,
    name: filename,
    size: buffer.length,
  }
}

async function upsertBySlug(payload: any, collection: string, slug: string, data: any) {
  const existing = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 1,
  })

  if (existing?.docs?.length) {
    return payload.update({
      collection,
      id: existing.docs[0].id,
      data,
    })
  }

  return payload.create({
    collection,
    data,
  })
}

async function upsertMedia(payload: any, alt: string, imageURL: string, filename: string) {
  const existing = await payload.find({
    collection: 'media',
    where: { alt: { equals: alt } },
    limit: 1,
  })

  try {
    const file = await fetchImageAsFile(imageURL, filename)

    if (existing?.docs?.length) {
      return await payload.update({
        collection: 'media',
        id: existing.docs[0].id,
        data: { alt },
        file,
      })
    }

    return await payload.create({
      collection: 'media',
      data: { alt },
      file,
    })
  } catch (e: any) {
    console.warn(`⚠️ Image fetch failed for "${alt}": ${e?.message}`)
    return null
  }
}

async function main() {
  console.log('🌱 Starting seed...')
  const payload = await getPayload({ config })

  // -----------------------
  // Categories
  // -----------------------
  console.log('📂 Creating categories...')
  const categories = [
    { title: 'Chair', slug: 'chair' },
    { title: 'Sofa', slug: 'sofa' },
    { title: 'Lamp', slug: 'lamp' },
    { title: 'Bed', slug: 'bed' },
  ] as const

  const categoryIds: Record<string, ID> = {}

  for (const c of categories) {
    const saved = await upsertBySlug(payload, 'categories', c.slug, c)
    categoryIds[c.slug] = Number(saved.id)
    console.log(`  ✓ ${c.title}`)
  }

  // -----------------------
  // Products
  // -----------------------
  console.log('\n🛋️ Creating products...')

  const products = [
    {
      title: 'Sakarias Armchair',
      slug: 'sakarias-armchair',
      price: 392,
      compareAtPrice: 450,
      categorySlug: 'chair',
      featured: true,
      description:
        'A premium armchair inspired by the Panto style. Designed for comfort and simplicity with clean lines, durable materials, and a modern look.',
      imageURL:
        'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&auto=format&fit=crop',
    },
    {
      title: 'Baltsar Chair',
      slug: 'baltsar-chair',
      price: 299,
      compareAtPrice: 350,
      categorySlug: 'chair',
      featured: true,
      description:
        'Scandinavian-inspired dining chair with elegant design. Perfect for modern homes seeking minimalist aesthetics.',
      imageURL:
        'https://images.unsplash.com/photo-1598300056393-4aac492f4344?w=800&auto=format&fit=crop',
    },
    {
      title: 'Lumin Desk Lamp',
      slug: 'lumin-desk-lamp',
      price: 89,
      compareAtPrice: 119,
      categorySlug: 'lamp',
      featured: false,
      description:
        'Modern desk lamp with adjustable arm. Provides focused lighting for work or reading with style.',
      imageURL:
        'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop',
    },
    {
      title: 'Cloudy Sofa',
      slug: 'cloudy-sofa',
      price: 899,
      compareAtPrice: 1099,
      categorySlug: 'sofa',
      featured: true,
      description:
        'Spacious 3-seater sofa with cloud-like comfort. Premium upholstery and contemporary design for your living room.',
      imageURL:
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop',
    },
    {
      title: 'Nordic Floor Lamp',
      slug: 'nordic-floor-lamp',
      price: 159,
      compareAtPrice: 199,
      categorySlug: 'lamp',
      featured: false,
      description:
        'Elegant floor lamp with wooden tripod base. Adds warmth and ambient lighting to any room.',
      imageURL:
        'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&auto=format&fit=crop',
    },
    {
      title: 'Minimalist Bed Frame',
      slug: 'minimalist-bed-frame',
      price: 649,
      compareAtPrice: 799,
      categorySlug: 'bed',
      featured: true,
      description:
        'Queen-size bed frame with clean lines and solid wood construction. Timeless design that fits any bedroom.',
      imageURL:
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&auto=format&fit=crop',
    },
  ] as const

  for (const p of products) {
    const alt = `${p.title} - Product Image`
    const filename = `${p.slug}.jpg`

    const mediaDoc = await upsertMedia(payload, alt, p.imageURL, filename)

    const productData: any = {
      title: p.title,
      slug: p.slug,
      status: 'published',
      featured: p.featured,
      category: categoryIds[p.categorySlug],
      price: p.price,
      compareAtPrice: p.compareAtPrice,
      description: p.description,
    }

    if (mediaDoc?.id) {
      productData.images = [{ image: Number(mediaDoc.id) }]
    }

    await upsertBySlug(payload, 'products', p.slug, productData)
    console.log(`  ✓ ${p.title}`)
  }

  // -----------------------
  // Reviews (NEW)
  // -----------------------
  console.log('\n⭐ Creating reviews...')

  const reviews = [
    {
      name: 'Bang Upin',
      slug: 'bang-upin',
      role: 'Interior Designer',
      quote: 'The sofa quality is insane. My living room looks like a showroom.',
      rating: 5,
      order: 1,
      photoURL:
        'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=800&auto=format&fit=crop',
    },
    {
      name: 'Ibu Susi',
      slug: 'ibu-susi',
      role: 'Home Owner',
      quote: 'Fast delivery, premium finish. I’m genuinely impressed.',
      rating: 5,
      order: 2,
      photoURL:
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop',
    },
    {
      name: 'Mpok Ina',
      slug: 'mpok-ina',
      role: 'Architect',
      quote: 'Minimalist design, solid materials. Exactly my style.',
      rating: 5,
      order: 3,
      photoURL:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop',
    },
    {
      name: 'Layla M.',
      slug: 'layla-m',
      role: 'Product Manager',
      quote: 'Packaging and details were on point. Feels expensive.',
      rating: 5,
      order: 4,
      photoURL:
        'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?w=800&auto=format&fit=crop',
    },
    {
      name: 'Karim A.',
      slug: 'karim-a',
      role: 'Developer',
      quote: 'Simple, clean experience. The chair is insanely comfy.',
      rating: 4,
      order: 5,
      photoURL:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop',
    },
    {
      name: 'Sofia R.',
      slug: 'sofia-r',
      role: 'Stylist',
      quote: 'The lamp looks like a magazine piece. Love it.',
      rating: 5,
      order: 6,
      photoURL:
        'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=800&auto=format&fit=crop',
    },
  ] as const

  for (const r of reviews) {
    const alt = `${r.name} - Review Photo`
    const filename = `review-${r.slug}.jpg`

    const mediaDoc = await upsertMedia(payload, alt, r.photoURL, filename)

    if (!mediaDoc?.id) {
      console.warn(`⚠️ Skipping review "${r.slug}" (photo upload failed)`)
      continue
    }

    const reviewData = {
      name: r.name,
      slug: r.slug,
      role: r.role,
      quote: r.quote,
      rating: r.rating,
      order: r.order,
      featured: true,
      published: true,
      photo: Number(mediaDoc.id),
    }

    await upsertBySlug(payload, 'reviews', r.slug, reviewData)
    console.log(`  ✓ ${r.name}`)
  }

  console.log('\n✅ Seed completed successfully!')
  console.log('\n📊 Summary:')
  console.log(`  - Categories: ${categories.length}`)
  console.log(`  - Products: ${products.length}`)
  console.log(`  - Reviews: ${reviews.length}`)
  console.log('\n🎉 Your database is ready!')
}

main().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
