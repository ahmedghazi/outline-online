import {defineField} from 'sanity'
import linkExternalTypes from '../misc/linkExternalTypes'

export default defineField({
  title: 'Trinket',
  name: 'trinket',
  type: 'object',
  description: '',
  preview: {
    select: {
      label: `file.asset.url`,
    },
  },
  fields: [
    defineField({
      name: 'file',
      type: 'file',
    }),
    defineField({
      name: 'image',
      type: 'image',
      description: 'Image Fallback',
    }),
    defineField({
      name: 'link',
      type: 'reference',
      weak: true,
      to: linkExternalTypes,
    }),
  ],
})
