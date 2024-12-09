import {defineField} from 'sanity'
import {BsFonts} from 'react-icons/bs'

export default defineField({
  title: 'Single',
  name: 'productSingle',
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
      title: 'Description alt',
      name: 'descriptionAlt',
      type: 'string',
      description: 'green text after description',
      hidden: true,
    }),
    defineField({
      name: 'categories',
      description: 'Used for discounts',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      title: 'Price',
      name: 'price',
      type: 'number',
      description:
        'Based on base price (licence type + size), ex base price is 50 CHF, this can add 60 CHF, result: 110 CHF',
    }),
    defineField({
      title: 'Price Discount',
      name: 'priceDiscount',
      type: 'number',
      description: '%, Displayed in buy modal (green text) => save Xx%',
    }),
    defineField({
      title: 'Price crossed',
      name: 'priceCrossed',
      type: 'number',
      description: 'Displayed in buy modal',
      hidden: true,
    }),

    defineField({
      title: 'Typeface',
      name: 'typeface',
      type: 'reference',
      description: 'Used in typefaces, product page, trials, buy area',
      to: [
        {
          type: 'typeface',
        },
      ],
    }),
    defineField({
      title: 'Zip File',
      name: 'zip',
      type: 'file',
      description: 'Digital good client will receive',
      hidden: true,
    }),
    defineField({
      title: 'Zip File Desktop',
      name: 'zipDesktop',
      type: 'file',
      description: 'Digital good client will receive',
    }),
    defineField({
      title: 'Zip File Web',
      name: 'zipWeb',
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
