import {defineField} from 'sanity'
import {FiAlignLeft} from 'react-icons/fi'

export default defineField({
  name: 'textUI',
  title: 'Text UI',
  type: 'object',
  icon: FiAlignLeft,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Module title (displayed only in the admin)',
    }),
    defineField({
      name: 'text',
      type: 'blockContent',
      title: 'Text',
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
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: title,
        subtitle: 'Text UI',
      }
    },
  },
})
