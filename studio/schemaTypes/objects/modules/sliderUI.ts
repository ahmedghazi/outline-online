import {defineField} from 'sanity'
import {BiCarousel} from 'react-icons/bi'

export default defineField({
  name: 'sliderUI',
  title: 'Slider UI',
  type: 'object',
  icon: BiCarousel,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'figure',
        },
      ],
    }),
    defineField({
      name: 'size',
      type: 'number',
      description: 'column span out of 3 columns grid, ex: 2',
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'items.0.image',
    },
    prepare(selection) {
      const {title, media} = selection
      return {
        title: title,
        subtitle: 'Slider UI',
        media: media,
      }
    },
  },
})
