import {defineType, defineField} from 'sanity'
import {HomeIcon} from '@sanity/icons'
import modulesList from '../objects/modules/modulesList'
import {baseLanguage} from '../locale/supportedLanguages'
import slug from '../fields/slug'
// console.log(modulesList)

export default defineType({
  name: 'home',
  type: 'document',
  title: 'Home',
  icon: HomeIcon,
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
      type: 'string',
      title: 'Titre',
      group: 'editorial',
    }),

    defineField({
      name: 'obj3ds',
      title: 'Trinkets list',
      type: 'array',
      of: [{type: 'obj3d'}],
      group: 'editorial',
      hidden: true,
    }),
    defineField({
      name: 'trinkets',
      title: 'Trinkets list',
      type: 'array',
      of: [{type: 'trinket'}],
      group: 'editorial',
    }),
    defineField({
      name: 'typefaces',
      title: 'Typefaces list',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'product'}]}],
      group: 'editorial',
    }),
    defineField({
      name: 'inUse',
      title: 'In Use list',
      type: 'array',
      of: [{type: 'figure'}],
      group: 'editorial',
    }),
    // slug,

    // defineField({
    //   name: 'presentation',
    //   title: 'Présentation courte',
    //   type: 'localeBlockContent',
    //   group: 'editorial',
    // }),
    // defineField({
    //   name: 'featuredProjects',
    //   title: 'Projets à la une',
    //   type: 'array',
    //   of: [{type: 'reference', to: [{type: 'project'}]}],
    //   group: 'editorial',
    // }),
    // defineField({
    //   name: 'modules',
    //   title: 'Modules',
    //   description: 'Modular Content Builder (images, textes, embed)',
    //   type: 'array',
    //   of: modulesList,
    //   group: 'editorial',
    // }),
  ],
  preview: {
    prepare() {
      return {
        subtitle: '/',
        title: 'Home',
      }
    },
  },
})
