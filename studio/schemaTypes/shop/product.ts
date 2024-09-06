import {defineArrayMember, defineField, defineType} from 'sanity'
import slug from '../fields/slug'
import sku from '../fields/sku'
import {RiFontSize2} from 'react-icons/ri'
import modulesList from '../objects/modules/modulesList'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  // icon: HiOutlineShoppingBag,
  icon: RiFontSize2,
  validation: (Rule) =>
    Rule.custom((fields) => {
      return fields && fields.seo ? true : 'SEO needed'
    }),
  preview: {
    select: {
      title: 'seo.metaTitle',
      subtitle: 'seo.metaDescription',
      media: 'seo.metaImage',
    },
  },
  groups: [
    {
      default: true,
      name: 'editorial',
      title: 'Editorial',
    },
    {
      name: 'shop',
      title: 'Shop',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'misc',
      title: 'Misc',
    },
  ],
  // initialValue: {
  //   noticeInternal:
  //     'ex licence web, desktop, Base price defined here, company size will increment base price, bundle or single style will give the final price',
  // },
  fields: [
    defineField({
      name: 'seo',
      type: 'seo',
      group: 'seo',
    }),

    defineField({
      name: 'supTitle',
      title: 'Sup Title',
      type: 'string',
      group: 'editorial',
    }),

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'editorial',
    }),

    slug,

    defineField({
      name: 'subTitle',
      title: 'Sub Title',
      type: 'string',
      group: 'editorial',
    }),

    // defineField({
    //   name: 'tag',
    //   title: 'Tag',
    //   type: 'reference',
    //   to: {type: 'tag'},
    //   group: 'editorial',
    // }),

    // defineField({
    //   title: 'Product variants',
    //   name: 'variants',
    //   type: 'array',
    //   description:
    //     'ex licence web, desktop, Base price defined here, company size will increment base price, bundle or single style will give the final price',
    //   of: [
    //     {
    //       title: 'Variants',
    //       type: 'variants',
    //     },
    //   ],
    //   group: 'shop',
    //   hidden: true,
    // }),

    // defineField({
    //   name: 'noticeInternal',
    //   type: 'text',
    //   readOnly: true,
    //   group: 'shop',
    // }),
    defineField({
      name: 'licenseSizes',
      type: 'array',
      of: [{type: 'licenseSize'}],
      group: 'shop',
      hidden: true,
    }),

    defineField({
      name: 'metadata',
      // title: 'licenses Type',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      group: 'shop',
    }),

    defineField({
      name: 'bundles',
      title: 'Bundles',
      type: 'array',
      of: [
        {
          type: 'productBundle',
        },
      ],
      group: 'shop',
    }),
    defineField({
      name: 'singles',
      title: 'singles',
      type: 'array',
      of: [
        {
          type: 'productSingle',
        },
      ],
      group: 'shop',
    }),
    // defineField({
    //   name: 'styles',
    //   title: 'Styles',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'style',
    //     },
    //   ],
    //   group: 'shop',
    //   hidden: true,
    // }),
    defineField({
      name: 'pangrams',
      title: 'Pangrams',
      type: 'array',
      of: [
        {
          type: 'text',
        },
      ],
      // description: 'short description for the cart',
      group: 'editorial',
    }),
    defineField({
      name: 'blurb',
      title: 'Blurb',
      type: 'string',
      description: 'short description for the cart',
      group: 'shop',
    }),
    defineField({
      name: 'sidebar',
      title: 'Sidebar',
      type: 'blockContent',
      group: 'editorial',
    }),

    defineField({
      name: 'content',
      title: 'Content',
      description: 'Modular zonze (image, texte)',
      type: 'array',
      of: modulesList,
      group: 'editorial',
    }),

    defineField({
      name: 'related',
      title: 'Related Products',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'product'}],
        },
      ],
      group: 'editorial',
    }),

    defineField({
      name: 'customCSS',
      title: 'Custom css',
      type: 'text',
      rows: 10,
      group: 'misc',
    }),
  ],
})
