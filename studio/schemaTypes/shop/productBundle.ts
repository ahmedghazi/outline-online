import {defineField} from 'sanity'
import {FaLayerGroup, FaShapes} from 'react-icons/fa'

export default defineField({
  title: 'Bundle',
  name: 'productBundle',
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
      title: 'Description alt',
      name: 'descriptionAlt',
      type: 'string',
      description: 'green text after description',
    }),

    defineField({
      title: 'Price',
      name: 'price',
      type: 'number',
      description:
        'Based on base price (licence type + size), ex base price is 60e, this can add 330e, result: 390e',
    }),

    defineField({
      title: 'Typefaces',
      name: 'typefaces',
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
    defineField({
      title: 'Zip File',
      name: 'zip',
      type: 'file',
      description: 'Digital good client will receive',
    }),
    defineField({
      title: 'Zip File Trials',
      name: 'zipTrials',
      type: 'file',
      description: 'Digital good client will receive',
    }),
  ],
})
