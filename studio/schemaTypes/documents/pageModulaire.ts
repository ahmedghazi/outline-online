// import i18n from "../i18n";
// import localizePreview from "../localizePreview";
import {defineField, defineArrayMember, defineType} from 'sanity'
// import {baseLanguage} from '../locale/supportedLanguages'
// import {FiServer} from 'react-icons/fi'
import modulesList from '../objects/modules/modulesList'
// import {validateSlug} from '../../utils/validateSlug'
import {StackIcon} from '@sanity/icons'
import {baseLanguage} from '../locale/supportedLanguages'

export default defineType({
  name: 'pageModulaire',
  type: 'document',
  title: 'Page Modulaire',
  icon: StackIcon,
  validation: (Rule) =>
    Rule.custom((fields) => {
      return fields && fields.seo ? true : 'SEO needed'
    }),
  preview: {
    select: {
      title: 'seo.metaTitle',
      subtitle: 'seo.metaDescription',
      media: 'seo.metaImage',
    },
  },
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
      description: 'Le nom de la page',
      group: 'editorial',
    }),
    defineField({
      name: 'subTitle',
      type: 'string',
      title: 'Soustitre',
      group: 'editorial',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL basée sur le titre (sans espace ni caractère autre que a-z-0-9',
      options: {
        source: `title.${baseLanguage}`,
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'editorial',
    }),
    defineField({
      name: 'modules',
      title: 'Modules',
      description: 'Zone de contenu Modulaire (images, textes, embed)',
      type: 'array',
      of: modulesList,
      group: 'editorial',
    }),
  ],
})
