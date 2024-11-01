import {defineField, defineType} from 'sanity'
// import modulesList from '../objects/modules/modulesList'
import {LuTextQuote} from 'react-icons/lu'
// import { baseLanguage } from '../locale/supportedLanguages'
import slug from '../fields/slug'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: LuTextQuote,
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
    slug,
    defineField({
      name: 'text',
      title: 'Text',
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
      name: 'withNav',
      type: 'boolean',
      description: 'display footer nav?',
      initialValue: false,
      group: 'editorial',
    }),
  ],
})
