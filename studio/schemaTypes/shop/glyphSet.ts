import {defineField} from 'sanity'
import {FaShapes} from 'react-icons/fa'

export default defineField({
  title: 'Glyph Set',
  name: 'glyphSet',
  type: 'object',
  icon: FaShapes,
  preview: {
    select: {
      title: 'title',
    },
  },
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'lowercase, no space, ex: 1,10,100; 10k, 20k',
    }),

    defineField({
      title: 'items',
      name: 'items',
      type: 'array',
      of: [{type: 'string'}],
      // description: 'separated by comma',
      options: {
        // layout: 'tags',
        // isHighlighted: true,
      },
      // of: [{type: 'string'}],
    }),
  ],
})
