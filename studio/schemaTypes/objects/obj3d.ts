import {defineField} from 'sanity'
import linkExternalTypes from '../misc/linkExternalTypes'

export default defineField({
  title: 'obj3d',
  name: 'obj3d',
  type: 'object',
  description: '',
  // options: {
  //   collapsible: true,
  //   // collapsed: true
  //   // columns: 2,
  // },
  fields: [
    defineField({
      name: 'gltf',
      type: 'file',
    }),
    defineField({
      name: 'obj',
      type: 'file',
    }),
    defineField({
      name: 'mtl',
      type: 'file',
    }),
    defineField({
      name: 'link',
      type: 'reference',
      weak: true,
      to: linkExternalTypes,
    }),
  ],
})
