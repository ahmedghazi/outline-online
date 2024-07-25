import {BsInfoSquare} from 'react-icons/bs'
import {defineField} from 'sanity'

export default defineField({
  name: 'bannerMessage',
  title: 'Banner message',
  type: 'object',
  icon: BsInfoSquare,

  fields: [
    defineField({
      type: 'boolean',
      name: 'display',
      title: 'Display',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'localeText',
    }),
  ],
})
