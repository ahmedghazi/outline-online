import {defineField, defineType} from 'sanity'
import slug from '../fields/slug'
import {RiLinkUnlinkM} from 'react-icons/ri'

export default defineType({
  name: 'linkExpire',
  title: 'Link Expire',
  type: 'document',
  icon: RiLinkUnlinkM,
  preview: {
    select: {
      title: `token`,
      subtitle: `downloads`,
    },
  },

  fields: [
    defineField({
      name: 'token',
      type: 'string',
      description: 'Used to access the link',
    }),
    defineField({
      name: 'zips',
      type: 'array',
      of: [{type: 'linkExternal'}],
    }),
    defineField({
      name: 'maxDownloads',
      type: 'number',
    }),
    defineField({
      name: 'downloads',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'expiresAt',
      type: 'datetime',
    }),
  ],
})
