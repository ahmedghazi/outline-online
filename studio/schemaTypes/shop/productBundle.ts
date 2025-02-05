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
      hidden: true,
    }),
    defineField({
      name: 'categories',
      title: 'Categories discount',
      description: 'Used for discounts',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'categoryLicensePrice',
      description: 'Used to link the bundle price with the correct license price',
      type: 'string',
      options: {
        list: [
          {title: 'Full Family', value: 'Full Family'},
          {title: 'Essentials', value: 'Essentials'},
          {title: 'Regular + Italic', value: 'Regular + Italic'},
        ], // <-- predefined values
        //layout: 'radio' // <-- defaults to 'dropdown'
      },
    }),
    defineField({
      title: 'Price',
      name: 'price',
      type: 'number',
      description:
        'Based on base price (licence type + size), ex base price is 60e, this can add 330e, result: 390e',
    }),
    defineField({
      title: 'Price Discount',
      name: 'priceDiscount',
      type: 'number',
      description: '%, Displayed in buy modal (green text) => save Xx%',
    }),
    defineField({
      hidden: true,
      title: 'Price crossed',
      name: 'priceCrossed',
      type: 'number',
      description: 'Displayed in buy modal',
    }),

    defineField({
      hidden: true,
      title: 'Typefaces',
      name: 'typefaces',
      description: 'Used in buy area (seems deprecated, will keep it for now)',
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
      hidden: true,
      title: 'Zip File Trials',
      name: 'zipTrials',
      type: 'file',
      description: 'Digital good client will receive. (seems deprecated, will keep it for now)',
    }),
  ],
})
