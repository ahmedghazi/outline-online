import {defineConfig, isDev} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {media} from 'sanity-plugin-media'
import {structure} from './src/deskStructure'
import {resolveProductionUrl} from './src/actions/resolveProductionUrl'
import {getStartedPlugin} from './plugins/sanity-plugin-tutorial'
const devOnlyPlugins = [getStartedPlugin()]

export default defineConfig({
  name: 'default',
  title: 'Outline Online',

  projectId: 'ztvzoay0',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool(), ...(isDev ? devOnlyPlugins : []), media()],

  schema: {
    types: schemaTypes,
  },
  document: {
    // productionUrl: resolveProductionUrl,
    actions: [resolveProductionUrl],
  },
})
