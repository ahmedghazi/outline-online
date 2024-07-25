import {defineField} from 'sanity'
import {FiImage} from 'react-icons/fi'

export default defineField({
  name: 'imageUI',
  title: 'Image UI',
  type: 'object',
  icon: FiImage,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Module title (displayed only in the admin)',
    }),
    defineField({
      name: 'image',
      type: 'figure',
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
      image: 'image.image',
      title: 'title',
    },
    prepare(selection) {
      const {title, image} = selection
      return {
        title: title,
        subtitle: 'Image UI',
        media: image,
      }
    },
  },
})
