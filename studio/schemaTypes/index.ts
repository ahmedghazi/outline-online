import home from './singletons/home'
import infos from './singletons/infos'
import licensing from './singletons/licensing'
import trials from './singletons/trials'
import settings from './singletons/settings'
import pageModulaire from './documents/pageModulaire'
import page from './documents/page'
import tag from './documents/tag'
// import linkExpire from './documents/linkExpire'

import product from './shop/product'
// import variants from './shop/variants'
// import variant from './shop/variant'
import typeface from './shop/typeface'
import typefaceFile from './shop/typefaceFile'
import productBundle from './shop/productBundle'
import productSingle from './shop/productSingle'
// import style from './shop/style'
import vendor from './shop/vendor'
import licenseType from './shop/licenseType'
import licenseSize from './shop/licenseSize'
import buyModalNotices from './shop/buyModalNotices'
// import licenseSizeOption from './shop/licenseSizeOption'

import imageUI from './objects/modules/imageUI'
import textUI from './objects/modules/textUI'
import textsUI from './objects/modules/textsUI'
import sliderUI from './objects/modules/sliderUI'
import sidebarUI from './objects/modules/sidebarUI'

import blockContent from './objects/blockContent'
import linkExternal from './objects/linkExternal'
import linkInternal from './objects/linkInternal'
import linkModal from './objects/linkModal'
import menuItem from './objects/menuItem'
import seo from './objects/seo'
import embed from './objects/embed'
import keyVal from './objects/keyVal'
import video from './objects/video'
import interTitre from './objects/interTitre'
import figure from './objects/figure'
import labelPrice from './objects/labelPrice'
// import obj3d from './objects/obj3d'
import trinket from './objects/trinket'
import textDropDown from './objects/textDropDown'
import keyValString from './objects/keyValString'
import glyphSet from './shop/glyphSet'
import order from './shop/order'

export const schemaTypes = [
  home,
  infos,
  licensing,
  trials,
  settings,
  pageModulaire,
  page,
  tag,
  product,
  typeface,
  vendor,
  order,
  // linkExpire,

  licenseType,
  licenseSize,
  // licenseSizeOption,
  // variants,
  // variant,
  typefaceFile,
  productBundle,
  productSingle,
  buyModalNotices,
  // style,

  blockContent,
  linkExternal,
  linkInternal,
  linkModal,
  menuItem,
  seo,
  embed,
  keyVal,
  keyValString,
  video,
  interTitre,
  figure,
  labelPrice,
  // obj3d,
  trinket,
  textDropDown,
  glyphSet,

  // moduleImages,
  // moduleTexts,
  // moduleEmbed,
  // moduleInterTitreUI,
  // moduleListProductUI,
  imageUI,
  textUI,
  textsUI,
  sliderUI,
  sidebarUI,
]
export default schemaTypes
