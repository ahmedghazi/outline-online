import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'ztvzoay0',
    dataset: 'production',
  },
  graphql: [
    {
      id: 'production',
      workspace: 'production',
    },
    {
      id: 'preprod',
      workspace: 'preprod',
    },
  ],
  deployment: {
    appId: 'b134631054a9cf0228110693',
  },
})
