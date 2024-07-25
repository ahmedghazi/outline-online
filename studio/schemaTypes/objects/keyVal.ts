// import {FiImage} from 'react-icons/fi'
import {defineField} from 'sanity'

export default defineField({
  name: 'keyVal',
  title: 'Clef Valeur',
  type: 'object',
  fields: [
    defineField({
      name: 'key',
      type: 'string',
      title: 'Clef',
    }),
    defineField({
      name: 'val',
      type: 'blockContent',
      title: 'Valeur',
    }),
  ],
})
