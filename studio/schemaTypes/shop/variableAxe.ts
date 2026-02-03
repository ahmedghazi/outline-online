import {defineField} from 'sanity'
import {LuAxe} from 'react-icons/lu'

export default {
  name: 'variableAxe',
  title: 'Variable Axe',
  type: 'object',
  icon: LuAxe,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      options: {
        list: [
          {title: 'wdth', value: 'wdth'},
          {title: 'wght', value: 'wght'},
          {title: 'ital', value: 'ital'},
          {title: 'mono', value: 'mono'},
          {title: 'cont', value: 'cont'},
          {title: 'slnt', value: 'slnt'},
          {title: 'opsz', value: 'opsz'},
          {title: 'trap', value: 'trap'},
          {title: 'waff', value: 'waff'},
          {title: 'shck', value: 'shck'},
          {title: 'cstm', value: 'cstm'},
          {title: 'grnd', value: 'grnd'},
          {title: 'uppr', value: 'uppr'},
          {title: 'goth', value: 'goth'},
          {title: 'spik', value: 'spik'},
        ],
      },
    }),
    defineField({
      name: 'min',
      type: 'number',
    }),
    defineField({
      name: 'max',
      type: 'number',
    }),
    defineField({
      name: 'initialValue',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: `name`,
    },
    prepare(selection) {
      const {title} = selection
      // console.log(images)
      return {
        title: title,
        subtitle: `Variable Axe`,
      }
    },
  },
}
