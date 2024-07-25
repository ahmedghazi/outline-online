// import {FiImage} from 'react-icons/fi'
import {defineField} from 'sanity'

export default defineField({
  name: 'labelPrice',
  title: 'Label Price',
  type: 'object',
  preview: {
    select: {
      title: 'label',
      subtitle: 'price',
    },
  },
  fields: [
    defineField({
      name: 'label',
      title: 'label',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
    }),
  ],
})
