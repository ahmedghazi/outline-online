import {defineField} from 'sanity'
import {BsFonts} from 'react-icons/bs'
import {TypefaceBase64} from '../../src/components/TypefaceBase64'

export default defineField({
  title: 'Typeface File',
  name: 'typefaceFile',
  type: 'file',
  icon: BsFonts,
  fields: [
    defineField({
      title: 'base64',
      name: 'base64',
      type: 'string',
      description: 'for the front end',
      components: {
        input: TypefaceBase64,
      },
    }),
  ],
})
