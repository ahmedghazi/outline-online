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
      name: 'category',
      type: 'string',
      description: 'Used for discounts',
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
      description: 'Price if solo, no other license type selected',
    }),
    defineField({
      title: 'price Family',
      name: 'priceFamily',
      type: 'number',
      description: 'Price if selected with another license type',
    }),
    defineField({
      title: 'price Essentials',
      name: 'priceEssentials',
      type: 'number',
      description: 'Price if selected with another license type',
    }),
    defineField({
      title: 'price Reg It',
      name: 'priceRegIt',
      type: 'number',
      description: 'Price if selected with another license type',
    }),
    defineField({
      title: 'price multi',
      name: 'priceMulti',
      type: 'number',
      description: 'Price if selected with another license type',
      hidden: true,
    }),
  ],
})
