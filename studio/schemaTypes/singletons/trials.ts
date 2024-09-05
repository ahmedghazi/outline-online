import {defineField, defineType} from 'sanity'
import slug from '../fields/slug'
import {TbLicense} from 'react-icons/tb'

export default defineType({
  name: 'trials',
  title: 'Trials',
  type: 'document',
  icon: TbLicense,
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
    defineField({
      name: 'infosLabel',
      title: 'Infos label',
      type: 'string',
      group: 'editorial',
    }),
    defineField({
      name: 'infos',
      title: 'Infos',
      type: 'blockContent',
      group: 'editorial',
    }),
    // slug,
    defineField({
      name: 'typefaces',
      title: 'Typefaces list',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'product'}]}],
      group: 'editorial',
    }),
  ],
})
