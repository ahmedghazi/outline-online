import {defineConfig, isDev} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {media} from 'sanity-plugin-media'
import {structure} from './src/deskStructure'
import {resolveProductionUrl} from './src/actions/resolveProductionUrl'
import {getStartedPlugin} from './plugins/sanity-plugin-tutorial'
import {defaultDocumentNode} from './src/defaultDocumentNode'

const devOnlyPlugins = [getStartedPlugin()]
const plugins = [
  structureTool({defaultDocumentNode, structure}),
  visionTool(),
  ...(isDev ? devOnlyPlugins : []),
  media(),
]
export default defineConfig([
  {
    name: 'production',
    title: 'Outline Online (Production)',
    basePath: '/production',
    projectId: 'ztvzoay0',
    dataset: 'production',

    plugins: plugins,
    schema: {
      types: schemaTypes,
    },
    graphql: {
      playground: true, // Explicitly enable
    },
    document: {
      // productionUrl: resolveProductionUrl,
      // actions: [resolveProductionUrl],
    },
  },
  {
    name: 'preprod',
    title: 'Outline Online [Preprod]',
    basePath: '/preprod',
    projectId: 'ztvzoay0',
    dataset: 'preprod',
    plugins: plugins,
    schema: {
      types: schemaTypes,
    },
    graphql: {
      playground: false, // Explicitly enable
    },
  },
])
