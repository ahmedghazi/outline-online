import {defineArrayMember, defineField, defineType} from 'sanity'
import {FaReceipt} from 'react-icons/fa'

export default defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  // icon: HiOutlineShoppingBag,
  icon: FaReceipt,

  // initialValue: {
  //   noticeInternal:
  //     'ex licence web, desktop, Base price defined here, company size will increment base price, bundle or single style will give the final price',
  // },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
    }),
    defineField({
      name: 'invoiceNumber',
      title: 'Invoice Number',
      type: 'string',
    }),
    defineField({
      name: 'creationDate',
      title: 'dateTime',
      type: 'datetime',
    }),
    defineField({
      name: 'email',
      title: 'email',
      type: 'string',
    }),
    defineField({
      name: 'attachments',
      title: 'attachments',
      type: 'array',
      of: [{type: 'linkExternal'}],
    }),
    defineField({
      name: 'json',
      title: 'json',
      type: 'text',
    }),
  ],
})
