import {defineField} from 'sanity'
import {BsFonts} from 'react-icons/bs'
import slug from '../fields/slug'
import {TypefaceBase64} from '../../src/components/TypefaceBase64'
import typefaceFile from './typefaceFile'
// import TypefaceBase64 from '../../src/components/TypefaceBase64'

export default defineField({
  title: 'Typeface',
  name: 'typeface',
  type: 'document',
  icon: BsFonts,
  groups: [
    {
      default: true,
      name: 'editorial',
      title: 'Editorial',
    },
  ],

  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      group: 'editorial',
    }),
    slug,
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      description:
        'Tell the website what is the style of the typeface, used in the typefaces menu, in the typeface page introduction, in bundles',
      options: {
        list: [
          {title: 'Hairline', value: 'hairline'},
          {title: 'Hairline Italic', value: 'hairlineItalic'},
          {title: 'Thin', value: 'thin'},
          {title: 'Thin Italic', value: 'thinItalic'},
          {title: 'Extra Light', value: 'extraLight'},
          {title: 'Extra Light Italic', value: 'extraLightItalic'},
          {title: 'Light', value: 'light'},
          {title: 'Light Italic', value: 'lightItalic'},
          {title: 'Book', value: 'book'},
          {title: 'Book Italic', value: 'bookItalic'},
          {title: 'Regular', value: 'regular'},
          {title: 'Regular Italic', value: 'regularItalic'},
          {title: 'Medium', value: 'medium'},
          {title: 'Medium Italic', value: 'mediumItalic'},
          {title: 'Semi Bold', value: 'semiBold'},
          {title: 'Semi Bold Italic', value: 'semiBoldItalic'},
          {title: 'Bold', value: 'bold'},
          {title: 'Bold Italic', value: 'boldItalic'},
          {title: 'Extra Bold', value: 'extraBold'},
          {title: 'Extra Bold Italic', value: 'extraBoldItalic'},
          {title: 'Black', value: 'black'},
          {title: 'Black Italic', value: 'blackItalic'},
          {title: 'Ultra Black', value: 'ultraBlack'},
          {title: 'Ultra Black Italic', value: 'ultraBlackItalic'},
          {title: 'Super Black', value: 'superBlack'},
          {title: 'Super Black Italic', value: 'superBlackItalic'},
        ],
        layout: 'radio', // <-- defaults to 'dropdown'
        // layout: 'radio', // <-- defaults to 'dropdown'
      },
      group: 'editorial',
    }),
    defineField({
      name: 'variableAxe',
      type: 'variableAxe',
      description: 'If is a variable typeface? then add the axe',
      group: 'editorial',
    }),
    defineField({
      title: 'File',
      name: 'typefaceFile',
      type: 'typefaceFile',
      description: 'File displayed on typeface page (comp tool, glyphs), typefaces in home page',
      group: 'editorial',
    }),
    defineField({
      title: 'Zip File',
      name: 'zip',
      type: 'file',
      description: 'Digital good client will receive',
      group: 'editorial',
      hidden: true,
    }),
    defineField({
      name: 'stylisticSets',
      type: 'array',
      of: [{type: 'keyValString'}],
      group: 'editorial',
    }),
    defineField({
      name: 'scriptsSupporter',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
        // isHighlighted: true,
      },
      group: 'editorial',
    }),
    defineField({
      name: 'glyphs',
      type: 'array',
      of: [{type: 'glyphSet'}],
      // options: {
      //   layout: 'tags',
      //   // isHighlighted: true,
      // },
      group: 'editorial',
    }),
    defineField({
      name: 'vendor',
      description: 'Author',
      type: 'reference',
      to: [{type: 'vendor'}],
      group: 'editorial',
    }),
  ],
})
