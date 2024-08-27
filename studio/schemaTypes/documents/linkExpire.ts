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
      title: `title`,
    },
  },
  // groups: [
  //   {
  //     default: true,
  //     name: 'editorial',
  //     title: 'Editorial',
  //   },
  // ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      // group: 'editorial',
    }),
    defineField({
      name: 'url',
      title: 'Url',
      type: 'url',
      // group: 'editorial',
    }),
    defineField({
      name: 'expired',
      title: 'expired',
      type: 'boolean',
      // group: 'editorial',
    }),
    defineField({
      name: 'count',
      title: 'Hit count',
      type: 'number',
      // group: 'editorial',
    }),
  ],

  // orderings: [
  //   {
  //     title: 'Trier par theme ASC',
  //     name: 'themeAsc',
  //     by: [{field: 'tagType', direction: 'asc'}],
  //   },
  //   {
  //     title: 'Trier par theme DESC',
  //     name: 'themeDesc',
  //     by: [{field: 'tagType', direction: 'desc'}],
  //   },
  // ],
})
