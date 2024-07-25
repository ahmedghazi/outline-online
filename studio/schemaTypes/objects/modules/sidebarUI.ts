import {defineField} from 'sanity'
import {FiAlignLeft} from 'react-icons/fi'
import {BsLayoutSidebarInsetReverse} from 'react-icons/bs'

export default defineField({
  name: 'sidebarUI',
  title: 'Sidebar UI',
  type: 'object',
  icon: BsLayoutSidebarInsetReverse,
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
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: title,
        subtitle: 'Sidebar UI',
      }
    },
  },
})
