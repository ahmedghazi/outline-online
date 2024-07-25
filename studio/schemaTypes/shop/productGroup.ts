import {defineField} from 'sanity'

export default defineField({
  title: 'Products group',
  name: 'productGroup',
  type: 'object',
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'products',
      title: 'products',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'product'}],
        },
      ],
    }),
  ],
})
