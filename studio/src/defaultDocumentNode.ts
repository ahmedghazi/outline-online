import {type DefaultDocumentNodeResolver} from 'sanity/structure'
import {Iframe} from 'sanity-plugin-iframe-pane'
import {type SanityDocument} from 'sanity'

const remoteURL = 'https://outline-online-landing-git-main-outline-onlines-projects.vercel.app/'
const localURL = 'http://localhost:3000/'
const previewURL = window.location.hostname === 'localhost' ? localURL : remoteURL

// Customise this function to show the correct URL based on the current document
// function getPreviewUrl(doc: SanityDocument) {
//   // const {_type, slug} = doc
//   // console.log(location.origin)
//   // let pagePath = `?slug=${doc?.slug?.current}&type=${doc._type}`

//   return doc?.slug?.current
//     ? `${previewURL}?slug=${doc?.slug?.current}&type=${doc._type}`
//     : `${previewURL}`
// }

// Import this into the deskTool() plugin
export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  // Only show preview pane on `movie` schema type documents
  switch (schemaType) {
    // case `home`:
    case `page`:
    case `product`:
      return S.document().views([
        S.view.form(),
        S.view
          .component(Iframe)
          .options({
            // url: (doc: SanityDocument) => getPreviewUrl(doc),
            url: {
              origin: previewURL, // or 'same-origin' if the app and studio are on the same origin
              preview: (document: SanityDocument) =>
                document?.slug?.current
                  ? `/api/preview?slug=${document?.slug?.current}&type=${document._type}`
                  : new Error('Missing slug'),
              draftMode: '', // the route you enable draft mode, see: https://github.com/sanity-io/visual-editing/tree/main/packages/preview-url-secret#sanitypreview-url-secret
            },
            reload: {
              button: true, // default `undefined`
            },
          })
          .title('Preview'),
      ])
    default:
      return S.document().views([S.view.form()])
  }
}
