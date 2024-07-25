import {PiTextAaBold} from 'react-icons/pi'
import {defineField} from 'sanity'
import {baseLanguage} from '../locale/supportedLanguages'

export default defineField({
  name: 'interTitre',
  title: 'Inter Titre',
  type: 'object',
  icon: PiTextAaBold,
  preview: {
    select: {
      title: `title.${baseLanguage}`,
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: title,
        subtitle: 'Inter Titre avec index',
      }
    },
  },
  fields: [
    defineField({
      name: 'index',
      type: 'number',
      title: 'Index',
    }),
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
    }),
  ],
})
