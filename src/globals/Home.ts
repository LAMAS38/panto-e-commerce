// src/globals/Home.ts
import type { GlobalConfig } from 'payload'

export const Home: GlobalConfig = {
  slug: 'home',
  access: { read: () => true },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'subtitle', type: 'textarea', required: true },
        {
          name: 'background',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },

    {
      name: 'experience',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'subtitle', type: 'textarea', required: true },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },

    {
      name: 'materials',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'subtitle', type: 'textarea', required: true },
        {
          name: 'tiles',
          type: 'array',
          minRows: 4,
          maxRows: 4,
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
