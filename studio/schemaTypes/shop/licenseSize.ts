import {defineField} from 'sanity'
import {TbLicense} from 'react-icons/tb'

export default defineField({
  title: 'License Size',
  name: 'licenseSize',
  type: 'object',
  icon: TbLicense,
  preview: {
    select: {
      title: 'title',
      subtitle: 'priceMultiplier',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      // console.log(images)
      return {
        title: title,
        subtitle: `*${subtitle}`,
      }
    },
  },
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
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
      name: 'priceMultiplier',
      type: 'number',
      description: 'Multiplier for the base price',
    }),
    // defineField({
    //   title: 'Items',
    //   name: 'items',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'labelPrice',
    //     },
    //   ],
    //   // description: 'Based on base price, ex base price is 30e, this variant can add 6e ending 36e',
    // }),
    defineField({
      name: 'licenseType',
      // title: 'licenses Type',
      type: 'array',
      of: [{type: 'licenseType'}],
      hidden: true,
      // group: 'shop',
    }),
  ],
})
