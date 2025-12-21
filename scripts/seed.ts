import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

type ID = number

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function fetchWithRetry(url: string, tries = 3) {
  let lastErr: any = null

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

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
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
  // Reviews (6) ✅
  // -----------------------
  console.log('\n💬 Creating reviews...')

  const reviews = [
    {
      name: 'Sofia R.',
      role: 'Stylist',
      quote: 'The lamp looks like a magazine piece. Love it.',
      rating: 5,
      order: 1,
      bg:
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&auto=format&fit=crop',
      avatar:
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop',
    },
    {
      name: 'Karim A.',
      role: 'Developer',
      quote: 'Simple, clean experience. The chair is insanely comfy.',
      rating: 5,
      order: 2,
      bg:
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&auto=format&fit=crop',
      avatar:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop',
    },
    {
      name: 'Layla M.',
      role: 'Product Manager',
      quote: 'Packaging and details were on point. Feels expensive.',
      rating: 5,
      order: 3,
      bg:
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&auto=format&fit=crop',
      avatar:
        'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=400&auto=format&fit=crop',
    },
    {
      name: 'Jean P.',
      role: 'Architect',
      quote: 'Minimal, premium vibe. My living room upgraded instantly.',
      rating: 5,
      order: 4,
      bg:
        'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1200&auto=format&fit=crop',
      avatar:
        'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&auto=format&fit=crop',
    },
    {
      name: 'Mina K.',
      role: 'Marketing',
      quote: 'Looks even better in real life. Delivery was fast.',
      rating: 4,
      order: 5,
      bg:
        'https://images.unsplash.com/photo-1549497538-303791108f95?w=1200&auto=format&fit=crop',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop',
    },
    {
      name: 'Omar T.',
      role: 'Consultant',
      quote: 'Great quality for the price. Clean UI and smooth checkout.',
      rating: 5,
      order: 6,
      bg:
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop',
      avatar:
        'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=400&auto=format&fit=crop',
    },
  ] as const

  for (const r of reviews) {
    const slug = slugify(r.name)

    const bgMedia = await upsertMedia(
      payload,
      `${r.name} - Review Background`,
      r.bg,
      `review-bg-${slug}.jpg`,
    )

    const avatarMedia = await upsertMedia(
      payload,
      `${r.name} - Review Avatar`,
      r.avatar,
      `review-avatar-${slug}.jpg`,
    )

    if (!bgMedia?.id || !avatarMedia?.id) {
      console.warn(`⚠️ Skip review "${r.name}" because media upload failed`)
      continue
    }

    await upsertBySlug(payload, 'reviews', slug, {
      name: r.name,
      slug,
      role: r.role,
      quote: r.quote,
      rating: r.rating,
      featured: true,
      published: true,
      order: r.order,
      background: Number(bgMedia.id),
      avatar: Number(avatarMedia.id),
    })

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
