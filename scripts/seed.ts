/* scripts/seed.ts */
import path from 'path'
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

type SeedMedia = {
  alt: string
  url: string
  uniqueId: string
}

type SeedCategory = {
  title: string
  slug: string
}

type SeedProduct = {
  title: string
  slug: string
  description: string
  price: number
  compareAtPrice?: number
  categorySlug: string
  featured: boolean
  status: 'published' | 'draft'
  rating: number
  imageIds: string[]
}

type SeedReview = {
  name: string
  role: string
  slug: string
  quote: string
  rating: number
  featured: boolean
  published: boolean
  order: number
  backgroundId: string
  avatarId: string
}

async function fetchImageAsFile(url: string) {
  const MAX_RETRIES = 3

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const res = await fetch(url, {
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (seed-script; PayloadCMS)',
        Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
        Referer: 'https://localhost',
      },
    })

    if (res.ok) {
      const contentType = res.headers.get('content-type') || 'image/jpeg'
      const arrayBuffer = await res.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const filename = `seed-${Date.now()}-${Math.random().toString(16).slice(2)}.jpg`
      return { buffer, filename, contentType }
    }

    const status = res.status
    const text = await res.text().catch(() => '')
    console.error(`❌ Fetch failed (attempt ${attempt}/${MAX_RETRIES}) ${status} for ${url}`)
    if (text) console.error(`↳ Response: ${text.slice(0, 200)}`)

    await new Promise((r) => setTimeout(r, 400 * attempt))
  }

  throw new Error(`Image fetch failed after retries: ${url}`)
}

async function findBySlug<TDoc>(
  payload: any,
  collection: string,
  slug: string,
): Promise<TDoc | null> {
  const existing = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 1,
  })

  return existing?.docs?.[0] ?? null
}

async function upsertMedia(payload: any, m: SeedMedia) {
  const existing = await payload.find({
    collection: 'media',
    where: { alt: { equals: m.alt } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    return existing.docs[0]
  }

  const { buffer, filename, contentType } = await fetchImageAsFile(m.url)

  const created = await payload.create({
    collection: 'media',
    data: {
      alt: m.alt,
    },
    file: {
      data: buffer,
      mimetype: contentType,
      name: filename,
      size: buffer.length,
    },
  })

  console.log(`✅ Image créée : ${m.alt}`)
  return created
}

async function upsertCategory(payload: any, c: SeedCategory) {
  const existing = await findBySlug(payload, 'categories', c.slug)
  if (existing) {
    console.log(`ℹ️  Catégorie existe : ${c.title}`)
    return existing
  }

  const created = await payload.create({
    collection: 'categories',
    data: {
      title: c.title,
      slug: c.slug,
    },
  })

  console.log(`✅ Catégorie créée : ${c.title}`)
  return created
}

async function upsertProduct(
  payload: any,
  p: SeedProduct,
  categoryId: string | number,
) {
  const existing = await findBySlug(payload, 'products', p.slug)
  if (existing) {
    console.log(`ℹ️  Produit existe : ${p.title}`)
    return existing
  }

  const created = await payload.create({
    collection: 'products',
    data: {
      title: p.title,
      slug: p.slug,
      description: p.description,
      price: p.price,
      compareAtPrice: p.compareAtPrice,
      category: categoryId,
      featured: p.featured,
      status: p.status,
      rating: p.rating,
      images: p.imageIds.map((id) => ({
        image: id,
      })),
    },
  })

  console.log(`✅ Produit créé : ${p.title}`)
  return created
}

async function upsertReview(payload: any, r: SeedReview) {
  const existing = await findBySlug(payload, 'reviews', r.slug)
  if (existing) {
    console.log(`ℹ️  Review existe : ${r.name}`)
    return existing
  }

  const created = await payload.create({
    collection: 'reviews',
    data: {
      name: r.name,
      role: r.role,
      slug: r.slug,
      quote: r.quote,
      rating: r.rating,
      featured: r.featured,
      published: r.published,
      order: r.order,
      background: r.backgroundId,
      avatar: r.avatarId,
    },
  })

  console.log(`✅ Review créée : ${r.name}`)
  return created
}

async function main() {
  console.log('🌱 Début du seed...\n')

  const payload = await getPayload({ config })

  // -----------------------
  // 1) Media (toutes les images)
  // -----------------------
  console.log('📸 Téléchargement des images...\n')

  const mediaData: SeedMedia[] = [
    // Products
    { uniqueId: 'p-bed-1', alt: 'Minimalist bed frame', url: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=1600&auto=format&fit=crop' },
    { uniqueId: 'p-sofa-1', alt: 'Cloudy sofa', url: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1600&auto=format&fit=crop' },
    { uniqueId: 'p-chair-1', alt: 'Baltsar chair', url: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=1600&auto=format&fit=crop' },
    { uniqueId: 'p-chair-2', alt: 'Sakarias armchair', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&auto=format&fit=crop' },
    { uniqueId: 'p-lamp-1', alt: 'Nordic floor lamp', url: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1600&auto=format&fit=crop' },
    { uniqueId: 'p-table-1', alt: 'Wood coffee table', url: 'https://images.unsplash.com/photo-1554295405-abb8fd54f153?w=1600&auto=format&fit=crop' },
    { uniqueId: 'p-chair-3', alt: 'Soft chair', url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1600&auto=format&fit=crop' },
    { uniqueId: 'p-chair-4', alt: 'Modern chair', url: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=1600&auto=format&fit=crop' },
    { uniqueId: 'p-bed-2', alt: 'Cozy bedroom', url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600&auto=format&fit=crop' },
    { uniqueId: 'p-sofa-2', alt: 'Green sofa', url: 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=1600&auto=format&fit=crop' },
    { uniqueId: 'p-lamp-2', alt: 'Minimal lamp', url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80' },
    { uniqueId: 'p-table-2', alt: 'Dining table', url: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=1600&auto=format&fit=crop' },
    { uniqueId: 'p-chair-5', alt: 'Chair in studio', url: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1600&auto=format&fit=crop' },
    { uniqueId: 'p-sofa-3', alt: 'Sofa in living room', url: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1600&auto=format&fit=crop' },
    { uniqueId: 'p-bed-3', alt: 'Bed with pillows', url: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=1600&auto=format&fit=crop' },
    { uniqueId: 'p-lamp-3', alt: 'Desk lamp', url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1600&auto=format&fit=crop' },

    // Reviews backgrounds
    { uniqueId: 'r-bg-1', alt: 'Sofia background', url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1600&auto=format&fit=crop' },
    { uniqueId: 'r-bg-2', alt: 'Karim background', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&auto=format&fit=crop' },
    { uniqueId: 'r-bg-3', alt: 'Layla background', url: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1600&auto=format&fit=crop' },
    { uniqueId: 'r-bg-4', alt: 'Mpok Ina background', url: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=1600&auto=format&fit=crop' },
    { uniqueId: 'r-bg-5', alt: 'Aya background', url: 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=1600&auto=format&fit=crop' },
    { uniqueId: 'r-bg-6', alt: 'Yass background', url: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1600&auto=format&fit=crop' },

    // Reviews avatars
    { uniqueId: 'r-avatar-1', alt: 'Sofia portrait', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop' },
    { uniqueId: 'r-avatar-2', alt: 'Karim portrait', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop' },
    { uniqueId: 'r-avatar-3', alt: 'Layla portrait', url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop' },
    { uniqueId: 'r-avatar-4', alt: 'Mpok Ina portrait', url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop' },
    { uniqueId: 'r-avatar-5', alt: 'Aya portrait', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop' },
    { uniqueId: 'r-avatar-6', alt: 'Yass portrait', url: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=800&auto=format&fit=crop' },

    // Home page images
    { uniqueId: 'home-hero', alt: 'Home Hero Background', url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1600&auto=format&fit=crop' },
    { uniqueId: 'home-exp', alt: 'Home Experience Image', url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&auto=format&fit=crop' },
    { uniqueId: 'tile-1', alt: 'Home Materials Tile 1', url: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=1200&auto=format&fit=crop' },
    { uniqueId: 'tile-2', alt: 'Home Materials Tile 2', url: 'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?w=1200&auto=format&fit=crop' },
    { uniqueId: 'tile-3', alt: 'Home Materials Tile 3', url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&auto=format&fit=crop' },
    { uniqueId: 'tile-4', alt: 'Home Materials Tile 4', url: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=1200&auto=format&fit=crop' },
  ]

  const mediaById: Record<string, any> = {}
  for (const m of mediaData) {
    const created = await upsertMedia(payload, m)
    mediaById[m.uniqueId] = created
  }

  console.log('\n')

  // -----------------------
  // 2) Categories
  // -----------------------
  console.log('📁 Création des catégories...\n')

  const categories: SeedCategory[] = [
    { title: 'Chair', slug: 'chairs' },
    { title: 'Beds', slug: 'beds' },
    { title: 'Sofa', slug: 'sofas' },
    { title: 'Lamp', slug: 'lamps' },
  ]

  const categoryBySlug: Record<string, any> = {}
  for (const c of categories) {
    const created = await upsertCategory(payload, c)
    categoryBySlug[c.slug] = created
  }

  console.log('\n')

  // -----------------------
  // 3) Products
  // -----------------------
  console.log('🛋️  Création des produits...\n')

  const products: Omit<SeedProduct, 'imageIds'>[] = [
    {
      title: 'Minimalist Bed Frame',
      slug: 'minimalist-bed-frame',
      description: 'Queen-size bed frame with clean lines and solid wood construction.',
      price: 649,
      categorySlug: 'beds',
      featured: true,
      status: 'published',
      rating: 5,
    },
    {
      title: 'Cloudy Sofa',
      slug: 'cloudy-sofa',
      description: 'Soft, deep seat sofa with premium fabric and modern silhouette.',
      price: 899,
      categorySlug: 'sofas',
      featured: true,
      status: 'published',
      rating: 5,
    },
    {
      title: 'Baltsar Chair',
      slug: 'baltsar-chair',
      description: 'Minimal chair with sturdy legs and comfortable cushioning.',
      price: 299,
      categorySlug: 'chairs',
      featured: true,
      status: 'published',
      rating: 5,
    },
    {
      title: 'Sakarias Armchair',
      slug: 'sakarias-armchair',
      description: 'Armchair with elegant form and supportive backrest.',
      price: 392,
      compareAtPrice: 450,
      categorySlug: 'chairs',
      featured: true,
      status: 'published',
      rating: 4.8,
    },
    {
      title: 'Nordic Floor Lamp',
      slug: 'nordic-floor-lamp',
      description: 'Elegant floor lamp with warm light and simple lines.',
      price: 159,
      categorySlug: 'lamps',
      featured: true,
      status: 'published',
      rating: 4.9,
    },
    {
      title: 'Scandi Coffee Table',
      slug: 'scandi-coffee-table',
      description: 'Light wood coffee table with minimalist design.',
      price: 279,
      categorySlug: 'chairs',
      featured: false,
      status: 'published',
      rating: 4.7,
    },
    {
      title: 'Soft Lounge Chair',
      slug: 'soft-lounge-chair',
      description: 'Perfect lounge chair for reading corners.',
      price: 319,
      categorySlug: 'chairs',
      featured: true,
      status: 'published',
      rating: 5,
    },
    {
      title: 'Modern Side Chair',
      slug: 'modern-side-chair',
      description: 'Side chair with elegant curve and modern style.',
      price: 259,
      categorySlug: 'chairs',
      featured: true,
      status: 'published',
      rating: 4.6,
    },
    {
      title: 'Cozy Bed Set',
      slug: 'cozy-bed-set',
      description: 'Bedroom-ready look with cozy vibe.',
      price: 749,
      categorySlug: 'beds',
      featured: true,
      status: 'published',
      rating: 4.9,
    },
    {
      title: 'Green Velvet Sofa',
      slug: 'green-velvet-sofa',
      description: 'Velvet sofa that looks expensive (because it is).',
      price: 1199,
      compareAtPrice: 1399,
      categorySlug: 'sofas',
      featured: true,
      status: 'published',
      rating: 5,
    },
    {
      title: 'Minimal Desk Lamp',
      slug: 'minimal-desk-lamp',
      description: 'Clean desk lamp for office setups.',
      price: 89,
      categorySlug: 'lamps',
      featured: true,
      status: 'published',
      rating: 4.8,
    },
    {
      title: 'Dining Table Set',
      slug: 'dining-table-set',
      description: 'Simple dining setup for modern interiors.',
      price: 499,
      categorySlug: 'chairs',
      featured: false,
      status: 'published',
      rating: 4.5,
    },
    {
      title: 'Studio Chair',
      slug: 'studio-chair',
      description: 'Chair for creative studios and minimal homes.',
      price: 229,
      categorySlug: 'chairs',
      featured: true,
      status: 'published',
      rating: 4.7,
    },
    {
      title: 'Living Room Sofa',
      slug: 'living-room-sofa',
      description: 'Comfortable sofa for everyday chill.',
      price: 999,
      categorySlug: 'sofas',
      featured: true,
      status: 'published',
      rating: 4.8,
    },
    {
      title: 'Pillows Bed Frame',
      slug: 'pillows-bed-frame',
      description: 'Minimal bed with cozy pillows setup.',
      price: 699,
      categorySlug: 'beds',
      featured: false,
      status: 'published',
      rating: 4.6,
    },
    {
      title: 'Clean Desk Light',
      slug: 'clean-desk-light',
      description: 'Simple lamp with soft diffusion.',
      price: 79,
      categorySlug: 'lamps',
      featured: false,
      status: 'published',
      rating: 4.5,
    },
  ]

  const productImageIds = [
    'p-bed-1', 'p-sofa-1', 'p-chair-1', 'p-chair-2', 'p-lamp-1', 'p-table-1',
    'p-chair-3', 'p-chair-4', 'p-bed-2', 'p-sofa-2', 'p-lamp-2', 'p-table-2',
    'p-chair-5', 'p-sofa-3', 'p-bed-3', 'p-lamp-3'
  ]

  for (let i = 0; i < products.length; i++) {
    const p = products[i]
    const category = categoryBySlug[p.categorySlug]
    const imageId = mediaById[productImageIds[i]]?.id

    await upsertProduct(payload, {
      ...p,
      imageIds: imageId ? [imageId] : [],
    }, category.id)
  }

  console.log('\n')

  // -----------------------
  // 4) Reviews
  // -----------------------
  console.log('⭐ Création des reviews...\n')

  const reviews: Omit<SeedReview, 'backgroundId' | 'avatarId'>[] = [
    {
      name: 'Sofia R.',
      role: 'Stylist',
      slug: 'sofia-r',
      quote: 'The lamp looks like a magazine piece. Love it.',
      rating: 5,
      featured: true,
      published: true,
      order: 1,
    },
    {
      name: 'Karim A.',
      role: 'Developer',
      slug: 'karim-a',
      quote: 'Simple, clean experience. The chair is insanely comfy.',
      rating: 5,
      featured: true,
      published: true,
      order: 2,
    },
    {
      name: 'Layla M.',
      role: 'Product Manager',
      slug: 'layla-m',
      quote: 'Packaging and details were on point. Feels expensive.',
      rating: 5,
      featured: true,
      published: true,
      order: 3,
    },
    {
      name: 'Mpok Ina',
      role: 'Architect',
      slug: 'mpok-ina',
      quote: 'Minimal, elegant, and fits perfectly in my space.',
      rating: 4,
      featured: true,
      published: true,
      order: 4,
    },
    {
      name: 'Aya B.',
      role: 'Designer',
      slug: 'aya-b',
      quote: 'Great materials and quick delivery. Would buy again.',
      rating: 5,
      featured: true,
      published: true,
      order: 5,
    },
    {
      name: 'Yass T.',
      role: 'Engineer',
      slug: 'yass-t',
      quote: 'Clean UI, fast checkout. The store feels premium.',
      rating: 5,
      featured: true,
      published: true,
      order: 6,
    },
  ]

  for (let i = 0; i < reviews.length; i++) {
    const r = reviews[i]
    const bgId = mediaById[`r-bg-${i + 1}`]?.id
    const avatarId = mediaById[`r-avatar-${i + 1}`]?.id

    if (bgId && avatarId) {
      await upsertReview(payload, {
        ...r,
        backgroundId: bgId,
        avatarId: avatarId,
      })
    }
  }

  console.log('\n')

  // -----------------------
  // 5) Home Global
  // -----------------------
  console.log('🏠 Mise à jour du global Home...\n')

  const heroBg = mediaById['home-hero']
  const expImg = mediaById['home-exp']
  const tile1 = mediaById['tile-1']
  const tile2 = mediaById['tile-2']
  const tile3 = mediaById['tile-3']
  const tile4 = mediaById['tile-4']

  if (heroBg?.id && expImg?.id && tile1?.id && tile2?.id && tile3?.id && tile4?.id) {
    await payload.updateGlobal({
      slug: 'home',
      data: {
        hero: {
          title: 'Make Your Interior More\nMinimalistic & Modern',
          subtitle:
            'Turn your room with panto into a lot more minimalist and modern with ease.',
          background: heroBg.id,
        },
        experience: {
          title: 'We Provide You The Best Experience',
          subtitle:
            "You don't have to worry about the result because all of these interiors are made by people who are professionals.",
          image: expImg.id,
        },
        materials: {
          title: 'Very Serious Materials\nFor Making Furniture',
          subtitle:
            'Because panto was very serious about designing furniture for our environment, using very expensive materials but at a relatively low price.',
          tiles: [
            { image: tile1.id },
            { image: tile2.id },
            { image: tile3.id },
            { image: tile4.id },
          ],
        },
      },
    })

    console.log('✅ Home global mis à jour!')
  } else {
    console.warn('⚠️ Home global non mis à jour (une ou plusieurs images manquantes).')
  }

  console.log('\n✅ Seed terminé avec succès!')
  console.log('📊 Résumé:')
  console.log(`  - Images: ${mediaData.length}`)
  console.log(`  - Catégories: ${categories.length}`)
  console.log(`  - Produits: ${products.length}`)
  console.log(`  - Reviews: ${reviews.length}`)
  console.log(`  - Home global: ✅`)
}

main().catch((e) => {
  console.error('❌ Erreur:', e)
  process.exit(1)
})