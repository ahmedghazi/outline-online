import {defineField} from 'sanity'
import {FaShapes} from 'react-icons/fa'

export default defineField({
  title: 'Product variant',
  name: 'variant',
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
      title: 'Price Modifier',
      name: 'priceModifier',
      type: 'number',
      description: 'Based on base price, ex base price is 30e, this variant can add 6e ending 36e',
    }),
  ],
})
