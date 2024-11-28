import {defineField} from 'sanity'
import {TbLicense} from 'react-icons/tb'

export default defineField({
  title: 'Buy Modal Notices',
  name: 'buyModalNotices',
  type: 'object',
  icon: TbLicense,
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
      description: 'Licenses for',
    }),
    defineField({
      title: 'items',
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'keyVal',
        },
      ],
      description: '',
    }),
  ],
})
