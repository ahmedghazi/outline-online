import {defineField, defineType} from 'sanity'
import slug from '../fields/slug'
import {TbLicense} from 'react-icons/tb'

export default defineType({
  name: 'licensing',
  title: 'Licensing',
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
    // slug,
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
      name: 'eulaLabel',
      type: 'string',
      group: 'editorial',
    }),
    defineField({
      name: 'eulaTtextsDropDown',
      type: 'array',
      of: [{type: 'textDropDown'}],
      group: 'editorial',
    }),
  ],
})
