// import {defineField, defineArrayMember, defineType} from 'sanity'
// import {FolderIcon} from '@sanity/icons'
// import modulesList from '../objects/modules/modulesList'
// import {baseLanguage} from '../locale/supportedLanguages'

// export default defineType({
//   type: 'document',
//   name: 'project',
//   title: 'Project',
//   icon: FolderIcon,
//   groups: [
//     {
//       default: true,
//       name: 'editorial',
//       title: 'Editorial',
//     },
//     {
//       name: 'seo',
//       title: 'SEO',
//     },
//   ],
//   fields: [
//     defineField({
//       name: 'seo',
//       type: 'seo',
//       group: 'seo',
//     }),
//     defineField({
//       name: 'title',
//       type: 'localeString',
//       title: 'Titre',
//       group: 'editorial',
//     }),
//     defineField({
//       name: 'slug',
//       title: 'Slug',
//       type: 'slug',
//       description: 'URL basée sur le titre (sans espace ni caractère autre que a-z-0-9',
//       options: {
//         source: `title.${baseLanguage}`,
//         maxLength: 96,
//       },
//       validation: (Rule) => Rule.required(),
//       group: 'editorial',
//     }),
//     defineField({
//       name: 'subTitle',
//       type: 'string',
//       title: 'Soustitre',
//       group: 'editorial',
//     }),
//     defineField({
//       name: 'year',
//       type: 'string',
//       title: 'Année',
//       group: 'editorial',
//     }),

//     defineField({
//       name: 'theme',
//       title: 'Thème',
//       type: 'array',
//       of: [
//         {
//           type: 'reference',
//           to: [{type: 'tag'}],
//         },
//       ],
//       group: 'editorial',
//     }),
//     defineField({
//       name: 'geography',
//       title: 'Géographie',
//       type: 'array',
//       of: [
//         {
//           type: 'reference',
//           to: [{type: 'tag'}],
//         },
//       ],
//       group: 'editorial',
//     }),
//     defineField({
//       name: 'job',
//       title: 'Métier',
//       type: 'array',
//       of: [
//         {
//           type: 'reference',
//           to: [{type: 'tag'}],
//         },
//       ],
//       group: 'editorial',
//     }),

//     defineField({
//       name: 'imageCover',
//       type: 'image',
//       title: 'Image clef',
//       description: 'Visible on liste pages, project cards (largeur 1400px)',
//       group: 'editorial',
//     }),

//     defineField({
//       name: 'chapo',
//       title: 'Chapo',
//       type: 'localeBlockContent',
//       group: 'editorial',
//     }),

//     defineField({
//       name: 'metas',
//       title: 'fiche technique',
//       type: 'array',
//       of: [{type: 'keyVal'}],
//       // description: 'fiche technique',
//       group: 'editorial',
//     }),

//     defineField({
//       name: 'text',
//       title: 'Texte',
//       type: 'localeBlockContent',
//       group: 'editorial',
//     }),

//     defineField({
//       name: 'modules',
//       title: 'Modules',
//       description: 'Zone de contenu Modulaire (images, textes, embed)',
//       type: 'array',
//       of: modulesList,
//       group: 'editorial',
//     }),

//     // defineField({
//     //   name: 'relatedProjects',
//     //   title: 'Projets liés',
//     //   type: 'array',
//     //   of: [{type: 'reference', to: [{type: 'project'}]}],
//     //   group: 'editorial',
//     // }),
//   ],

//   preview: {
//     select: {
//       title: `title.${baseLanguage}`,
//       slug: 'slug',
//       image: 'imageCover',
//     },
//     prepare(selection) {
//       const {title, slug, image} = selection
//       // console.log(images)
//       return {
//         title: title,
//         subtitle: `/project/${slug.current}`,
//         media: image,
//       }
//     },
//   },
// })
