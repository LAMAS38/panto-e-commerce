import type { CollectionConfig } from 'payload'

/**
 * Reviews collection configured for product reviews.
 *
 * This collection replaces the previous testimonials structure with
 * fields relevant to product reviews. Each review references a product
 * and the customer who authored it, stores a numeric rating, and a
 * comment. The `featured` and `published` flags can be used to
 * control whether a review appears on the homepage or is visible to
 * other users. Access rules ensure that only authenticated customers
 * can create and manage their own reviews, while admins can read and
 * moderate all content.
 */
export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'comment',
    defaultColumns: ['product', 'customer', 'rating', 'published', 'featured'],
  },
  access: {
    /** Allow everyone to read published reviews */
    read: () => true,
    /** Only authenticated customers can create a review */
    create: ({ req }) => req.user?.collection === 'customers',
    /** Allow a customer to update only their own review */
    update: ({ req }) => {
      if (req.user?.collection === 'customers') {
        return { customer: { equals: req.user.id } }
      }
      return false
    },
    /** Allow a customer to delete only their own review */
    delete: ({ req }) => {
      if (req.user?.collection === 'customers') {
        return { customer: { equals: req.user.id } }
      }
      return false
    },
  },
  fields: [
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      required: true,
    },
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'customers',
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
    },
    {
      name: 'comment',
      type: 'textarea',
      required: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
  ],
}