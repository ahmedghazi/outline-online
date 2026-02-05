import {defineField} from 'sanity'
import {BsFonts} from 'react-icons/bs'
import {TypefacePreview} from '../../src/components/TypefacePreview'

export default defineField({
  title: 'Typeface File',
  name: 'typefaceFile',
  type: 'file',
  icon: BsFonts,
  components: {
    input: TypefacePreview,
  },
})
