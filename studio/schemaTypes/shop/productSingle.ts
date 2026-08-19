import {defineField} from 'sanity'
import {BsFonts} from 'react-icons/bs'

export default defineField({
  title: 'Single',
  name: 'productSingle',
  type: 'object',
  icon: BsFonts,
  // preview: {
  //   select: {
  //     title: 'title',
  //     subtitle: 'isDefault',
  //   },
  // },
  preview: {
    select: {
      title: `title`,
      isDefault: 'isDefault',
      price: 'price',
    },
    prepare(selection) {
      const {title, isDefault, price} = selection
      // console.log(images)
      const priceStr = `Start at ${price}€`
      return {
        title: title,
        subtitle: isDefault ? `default (${priceStr})` : priceStr,
      }
    },
  },

  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'isDefault',
      type: 'boolean',
    }),

    defineField({
      title: 'Description',
      name: 'description',
      type: 'string',
    }),
    defineField({
      title: 'Description alt',
      name: 'descriptionAlt',
      type: 'string',
      description: 'green text after description',
      hidden: true,
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      description:
        '"License" = sellable Latin weight (Thin/Light/Regular/...). "Scripts" = non-Latin script variant (Georgian, Greek, ...). "Non-Latin" is the signal the site\'s type-tester hero uses to keep script variants from collapsing into a Latin weight row of the same style name (e.g. both "Regular") — always tag script variants with it, since they may also carry "Latin" (their glyph set includes Latin characters too, which is not the same as the "License" family membership).',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
        list: [
          {title: 'License', value: 'License'},
          {title: 'Scripts', value: 'Scripts'},
          {title: 'Latin', value: 'Latin'},
          {title: 'Non-Latin', value: 'Non-Latin'},
        ],
      },
      validation: (Rule) =>
        Rule.custom((categories?: string[]) => {
          if (!categories || categories.length === 0) return true
          const allowed = ['License', 'Scripts', 'Latin', 'Non-Latin']
          const invalid = categories.filter((c) => !allowed.includes(c))
          return invalid.length === 0
            ? true
            : `Unknown categor${invalid.length > 1 ? 'ies' : 'y'}: ${invalid.join(', ')}. Allowed: ${allowed.join(', ')}`
        }),
    }),
    defineField({
      title: 'Price',
      name: 'price',
      type: 'number',
      description:
        'Based on base price (licence type + size), ex base price is 50 CHF, this can add 60 CHF, result: 110 CHF',
    }),
    defineField({
      title: 'Price Discount',
      name: 'priceDiscount',
      type: 'number',
      description: '%, Displayed in buy modal (green text) => save Xx%',
    }),
    defineField({
      title: 'Price crossed',
      name: 'priceCrossed',
      type: 'number',
      description: 'Displayed in buy modal',
      hidden: true,
    }),

    defineField({
      title: 'Typeface',
      name: 'typeface',
      type: 'reference',
      description: 'Used in typefaces, product page, trials, buy area',
      to: [
        {
          type: 'typeface',
        },
      ],
    }),
    defineField({
      title: 'Related Regular Typeface',
      name: 'relatedTypeface',
      description:
        'Used to look for the regular version of the italic, to apply the discount if the regular is selected',
      type: 'reference',
      to: [
        {
          type: 'typeface',
        },
      ],
    }),
    defineField({
      title: 'Zip File',
      name: 'zip',
      type: 'file',
      description: 'Digital good client will receive',
      hidden: true,
    }),
    defineField({
      title: 'Zip File Desktop',
      name: 'zipDesktop',
      type: 'file',
      description: 'Digital good client will receive',
    }),
    defineField({
      title: 'Zip File Web',
      name: 'zipWeb',
      type: 'file',
      description: 'Digital good client will receive',
    }),
    defineField({
      title: 'Zip File Trials',
      name: 'zipTrials',
      type: 'file',
      description: 'Digital good client will receive',
    }),
  ],
})
