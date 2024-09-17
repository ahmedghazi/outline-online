import {defineField} from 'sanity'
import linkExternalTypes from '../misc/linkExternalTypes'

export default defineField({
  title: 'Trinket',
  name: 'trinket',
  type: 'object',
  description: '',
  preview: {
    select: {
      title: 'name',
      label: `file.asset.url`,
    },
  },
  fields: [
    defineField({
      name: 'file',
      type: 'file',
      hidden: true,
    }),
    defineField({
      name: 'name',
      type: 'string',
      description: 'Ex: LUPA, KEYCHAIN',
    }),
    defineField({
      name: 'image',
      type: 'image',
      description: 'Image Fallback',
    }),
    defineField({
      name: 'metadata',
      type: 'text',
    }),
    defineField({
      name: 'link',
      type: 'reference',
      weak: true,
      to: linkExternalTypes,
    }),
  ],
})
