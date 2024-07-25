import {defineField} from 'sanity'
import {TbLicense} from 'react-icons/tb'

export default defineField({
  title: 'License Type',
  name: 'licenseType',
  type: 'object',
  icon: TbLicense,
  preview: {
    select: {
      title: 'label',
      subtitle: 'price',
    },
  },
  fields: [
    defineField({
      title: 'Label',
      name: 'label',
      type: 'string',
      description: 'Displayed on front end',
    }),
    defineField({
      title: 'Infos',
      name: 'infos',
      type: 'string',
      description: 'Displayed on front end',
    }),
    defineField({
      title: 'price',
      name: 'price',
      type: 'number',
    }),
  ],
})
