// const remoteURL = 'https://buildingbooks.gtsb.io'
// const localURL = 'http://localhost:8000'
// const previewURL = window.location.hostname === 'localhost' ? localURL + '' : remoteURL + ''

// If you add document types to desk structure manually, you can add them to this function to prevent duplicates in the root pane
const hiddenDocTypes = (listItem: any) => {
  const id = listItem.getId()

  if (!id) {
    return false
  }

  return ![
    'home',
    'infos',
    'licensing',
    'trials',
    'pageModulaire',
    'page',
    'tag',
    'product',
    'order',
    'typeface',
    'settings',
    'linkExpire',
    'media.tag',
  ].includes(id)
}

export const structure = (S) =>
  S.list()
    .title('Base')
    .items([
      S.listItem()
        .title('Settings (header, footer, Licenses ...)')
        .schemaType('settings')
        .child(
          S.editor()
            .title('Settings (header, footer, ...)')
            .schemaType('settings')
            .documentId('settings'),
        ),
      S.divider(),

      S.listItem()
        .title('Home')
        .schemaType('home')
        .child(S.editor().title('Home').schemaType('home').documentId('home')),

      S.listItem()
        .title('Infos')
        .schemaType('infos')
        .child(S.editor().title('Infos').schemaType('infos').documentId('infos')),

      S.listItem()
        .title('Licensing')
        .schemaType('licensing')
        .child(S.editor().title('Licensing').schemaType('licensing').documentId('licensing')),

      S.listItem()
        .title('Trials')
        .schemaType('trials')
        .child(S.editor().title('Trials').schemaType('trials').documentId('trials')),
      S.divider(),

      S.listItem().title('Pages').schemaType('page').child(S.documentTypeList('page')),

      // S.listItem()
      //   .title('Pages (Modulaire)')
      //   .schemaType('pageModulaire')
      //   .child(S.documentTypeList('pageModulaire')),
      // S.divider(),

      // S.listItem().title('Projects').schemaType('project').child(S.documentTypeList('project')),

      S.divider(),

      S.listItem().title('Products').schemaType('product').child(S.documentTypeList('product')),
      S.listItem()
        .title('Typefaces (regular,italic,...)')
        .schemaType('typeface')
        .child(S.documentTypeList('typeface')),
      S.listItem().title('Orders').schemaType('order').child(S.documentTypeList('order')),
      /**
       * with seo preview
       */

      // S.listItem()
      //   .title('Projets liste')
      //   .schemaType('project')
      //   .child(
      //     S.documentTypeList('project').child((id) =>
      //       S.document().schemaType('project').documentId(id).views([
      //         // The default form for editing a document
      //         S.view.form(),

      //         // Render the current selected document’s values as JSON
      //         // S.view.component(SeoPreview).title('Seo preview').options({previewURL}),
      //       ]),
      //     ),
      //   ),

      // S.listItem().title('Tags').schemaType('tag').child(S.documentTypeList('tag')),
      S.divider(),

      // We also need to remove the new singletons from the main list
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
