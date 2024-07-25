import {defineField} from 'sanity'
import {FaLayerGroup, FaShapes} from 'react-icons/fa'

export default defineField({
  title: 'Bundle',
  name: 'bundle',
  type: 'object',
  icon: FaLayerGroup,
  preview: {
    select: {
      title: 'title',
      subtitle: 'price',
    },
    // prepare({title}) {
    //   return {
    //     title:
    //   }
    // }
  },
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
    defineField({
      title: 'Description',
      name: 'description',
      type: 'string',
    }),

    defineField({
      title: 'Price',
      name: 'price',
      type: 'number',
      description:
        'Based on base price (licence type + size), ex base price is 60e, this can add 330e, result: 390e',
    }),

    defineField({
      title: 'items',
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'typeface',
            },
          ],
        },
      ],
    }),
  ],
})
