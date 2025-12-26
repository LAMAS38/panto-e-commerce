import type { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'product', 'rating', 'featured', 'published'],
  },
  access: {
    // Tout le monde peut lire les reviews publiés
    read: () => true,
    
    // Seuls les customers peuvent créer
    create: ({ req }) => req.user?.collection === 'customers',
    
    // Un customer peut modifier/supprimer seulement ses propres reviews
    update: ({ req }) => {
      if (req.user?.collection === 'customers') {
        return { customer: { equals: req.user.id } }
      }
      if (req.user?.collection === 'users') return true // admins
      return false
    },
    delete: ({ req }) => {
      if (req.user?.collection === 'customers') {
        return { customer: { equals: req.user.id } }
      }
      if (req.user?.collection === 'users') return true
      return false
    },
  },
  fields: [
    // --- Champs pour TESTIMONIALS (page home) ---
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Nom affiché (ex: "Sofia R.")',
      },
    },
    {
      name: 'role',
      type: 'text',
      admin: {
        description: 'Profession du client (optionnel, pour testimonials)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        description: 'Slug unique (généré automatiquement)',
      },
    },
    {
      name: 'quote',
      type: 'textarea',
      admin: {
        description: 'Citation courte (pour testimonials)',
      },
    },
    {
      name: 'background',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Image de fond (pour testimonials)',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Photo du client (pour testimonials)',
      },
    },
    
    // --- Champs pour PRODUCT REVIEWS ---
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      admin: {
        description: 'Produit évalué (optionnel si testimonial général)',
      },
    },
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'customers',
      admin: {
        description: 'Client qui a laissé l\'avis',
      },
    },
    {
      name: 'comment',
      type: 'textarea',
      admin: {
        description: 'Commentaire détaillé (pour product reviews)',
      },
    },
    
    // --- Champs communs ---
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      defaultValue: 5,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Afficher sur la homepage ?',
        position: 'sidebar',
      },
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Visible publiquement ?',
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Ordre d\'affichage sur la home',
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        // Générer un slug automatiquement si pas fourni
        if (operation === 'create' && !data?.slug && data?.name) {
          data.slug = data.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        }
        return data
      },
    ],
  },
}