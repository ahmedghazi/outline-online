import {defineField} from 'sanity'
import {FaShapes} from 'react-icons/fa'

export default defineField({
  title: 'Product variants',
  name: 'variants',
  type: 'object',
  icon: FaShapes,
  preview: {
    select: {
      title: `title`,
    },
  },
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'basePrice',
      title: 'Base Price',
      type: 'number',
      description: 'Base price, variants will increment this value',
      // group: 'shop',
    }),
    defineField({
      title: 'Variants Title',
      name: 'variantsTitle',
      type: 'string',
      description: 'Ex: Company size',
    }),
    defineField({
      name: 'items',
      title: 'Variant',
      description: 'Company size',
      type: 'array',
      of: [
        {
          type: 'variant',
        },
      ],
    }),
    // defineField({
    //   title: 'SKU',
    //   name: 'sku',
    //   type: 'string',
    // }),
  ],
})
