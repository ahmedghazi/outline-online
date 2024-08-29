import {defineField} from 'sanity'
import {BsFonts} from 'react-icons/bs'

export default defineField({
  title: 'Style',
  name: 'style',
  type: 'object',
  icon: BsFonts,
  preview: {
    select: {
      title: 'title',
      subtitle: 'price',
    },
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
        'Based on base price (licence type + size), ex base price is 50 CHF, this can add 60 CHF, result: 110 CHF',
    }),

    defineField({
      title: 'items',
      name: 'items',
      type: 'reference',
      description: 'rename this (cf bundles)',
      to: [
        {
          type: 'typeface',
        },
      ],
    }),
  ],
})
