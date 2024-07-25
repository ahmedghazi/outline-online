import {defineField, defineType} from 'sanity'
import modulesList from '../objects/modules/modulesList'
import {InfoOutlineIcon} from '@sanity/icons'
import {baseLanguage} from '../locale/supportedLanguages'
import slug from '../fields/slug'

export default defineType({
  name: 'infos',
  title: 'Infos',
  type: 'document',
  icon: InfoOutlineIcon,
  groups: [
    {
      default: true,
      name: 'editorial',
      title: 'Editorial',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'seo',
      type: 'seo',
      group: 'seo',
    }),

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'editorial',
    }),
    // slug,
    defineField({
      name: 'about',
      title: 'about',
      type: 'blockContent',
      group: 'editorial',
    }),

    defineField({
      name: 'textsDropDown',
      type: 'array',
      of: [{type: 'textDropDown'}],
      group: 'editorial',
    }),
    defineField({
      name: 'colophon',
      type: 'array',
      of: [{type: 'keyVal'}],
      group: 'editorial',
    }),
    defineField({
      name: 'nav',
      title: 'Footer Naviguation',
      type: 'array',
      of: [
        {
          type: 'linkInternal',
        },
        {
          type: 'linkExternal',
        },
      ],
      group: 'editorial',
    }),
  ],
})
