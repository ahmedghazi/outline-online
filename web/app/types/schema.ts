export declare type SanityReference<T> = T & {
  _ref: string;
};

export declare type SanityKeyedReference<T> = T & {
  _key: string;
  _ref: string;
};

import type {
  // SanityReference,
  // SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from "sanity-codegen";

export type {
  // SanityReference,
  // SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * Home
 *
 *
 */
export interface Home extends SanityDocument {
  _type: "home";

  /**
   * seo — `seo`
   *
   *
   */
  seo?: Seo;

  /**
   * Titre — `string`
   *
   *
   */
  title?: string;

  /**
   * Trinkets list — `array`
   *
   *
   */
  trinkets?: Array<SanityKeyed<Trinket>>;

  /**
   * Typefaces list — `array`
   *
   *
   */
  typefaces?: Array<SanityKeyedReference<Product>>;

  /**
   * In Use list — `array`
   *
   *
   */
  inUse?: Array<SanityKeyed<Figure>>;
}

/**
 * Infos
 *
 *
 */
export interface Infos extends SanityDocument {
  _type: "infos";

  /**
   * seo — `seo`
   *
   *
   */
  seo?: Seo;

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * about — `blockContent`
   *
   *
   */
  about?: BlockContent;

  /**
   * textsDropDown — `array`
   *
   *
   */
  textsDropDown?: Array<SanityKeyed<TextDropDown>>;

  /**
   * colophon — `array`
   *
   *
   */
  colophon?: Array<SanityKeyed<KeyVal>>;

  /**
   * Footer Naviguation — `array`
   *
   *
   */
  nav?: Array<SanityKeyed<LinkInternal> | SanityKeyed<LinkExternal>>;
}

/**
 * Licensing
 *
 *
 */
export interface Licensing extends SanityDocument {
  _type: "licensing";

  /**
   * seo — `seo`
   *
   *
   */
  seo?: Seo;

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Text — `blockContent`
   *
   *
   */
  text?: BlockContent;

  /**
   * textsDropDown — `array`
   *
   *
   */
  textsDropDown?: Array<SanityKeyed<TextDropDown>>;

  /**
   * eulaLabel — `string`
   *
   *
   */
  eulaLabel?: string;

  /**
   * eulaTtextsDropDown — `array`
   *
   *
   */
  eulaTtextsDropDown?: Array<SanityKeyed<TextDropDown>>;
}

/**
 * Trials
 *
 *
 */
export interface Trials extends SanityDocument {
  _type: "trials";

  /**
   * seo — `seo`
   *
   *
   */
  seo?: Seo;

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Infos label — `string`
   *
   *
   */
  infosLabel?: string;

  /**
   * Infos — `blockContent`
   *
   *
   */
  infos?: BlockContent;

  /**
   * Typefaces list — `array`
   *
   *
   */
  typefaces?: Array<SanityKeyedReference<Product>>;
}

/**
 * Réglages (header, footer, ...)
 *
 *
 */
export interface Settings extends SanityDocument {
  _type: "settings";

  /**
   * Nom du site — `string`
   *
   *
   */
  siteName?: string;

  /**
   * Naviguation Primary — `array`
   *
   *
   */
  navPrimary?: Array<SanityKeyed<MenuItem> | SanityKeyed<LinkExternal>>;

  /**
   * Naviguation Secondary — `array`
   *
   *
   */
  navSecondary?: Array<SanityKeyed<LinkInternal> | SanityKeyed<LinkExternal>>;

  /**
   * Naviguation Tertiary — `array`
   *
   *
   */
  navTertiary?: Array<SanityKeyed<LinkInternal> | SanityKeyed<LinkExternal>>;

  /**
   * licenseSizes — `array`
   *
   *
   */
  licenseSizes?: Array<SanityKeyed<LicenseSize>>;

  /**
   * Message Cookie — `blockContent`
   *
   *
   */
  messageCookie?: BlockContent;

  /**
   * Message 404 — `blockContent`
   *
   *
   */
  message404?: BlockContent;

  /**
   * customCss — `text`
   *
   *
   */
  customCss?: string;
}

/**
 * Page Modulaire
 *
 *
 */
export interface PageModulaire extends SanityDocument {
  _type: "pageModulaire";

  /**
   * seo — `seo`
   *
   *
   */
  seo?: Seo;

  /**
   * Titre — `string`
   *
   * Le nom de la page
   */
  title?: string;

  /**
   * Soustitre — `string`
   *
   *
   */
  subTitle?: string;

  /**
   * Slug — `slug`
   *
   * URL basée sur le titre (sans espace ni caractère autre que a-z-0-9
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Modules — `array`
   *
   * Zone de contenu Modulaire (images, textes, embed)
   */
  modules?: Array<
    | SanityKeyed<ImageUI>
    | SanityKeyed<TextUI>
    | SanityKeyed<SliderUI>
    | SanityKeyed<SidebarUI>
  >;
}

/**
 * Page
 *
 *
 */
export interface Page extends SanityDocument {
  _type: "page";

  /**
   * seo — `seo`
   *
   *
   */
  seo?: Seo;

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   * Click on generate, Semantic URL based on title (no space no char other than a-z-0-9
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Text — `blockContent`
   *
   *
   */
  text?: BlockContent;

  /**
   * textsDropDown — `array`
   *
   *
   */
  textsDropDown?: Array<SanityKeyed<TextDropDown>>;
}

/**
 * Tag
 *
 *
 */
export interface Tag extends SanityDocument {
  _type: "tag";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   * Click on generate, Semantic URL based on title (no space no char other than a-z-0-9
   */
  slug?: { _type: "slug"; current: string };
}

/**
 * Product
 *
 *
 */
export interface Product extends SanityDocument {
  _type: "product";

  /**
   * seo — `seo`
   *
   *
   */
  seo?: Seo;

  /**
   * Sup Title — `string`
   *
   *
   */
  supTitle?: string;

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   * Click on generate, Semantic URL based on title (no space no char other than a-z-0-9
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Sub Title — `string`
   *
   *
   */
  subTitle?: string;

  /**
   * licenseSizes — `array`
   *
   *
   */
  licenseSizes?: Array<SanityKeyed<LicenseSize>>;

  /**
   * metadata — `array`
   *
   *
   */
  metadata?: Array<SanityKeyed<string>>;

  /**
   * Bundles — `array`
   *
   *
   */
  bundles?: Array<SanityKeyed<ProductBundle>>;

  /**
   * singles — `array`
   *
   *
   */
  singles?: Array<SanityKeyed<ProductSingle>>;

  /**
   * Pangrams — `array`
   *
   *
   */
  pangrams?: Array<SanityKeyed<string>>;

  /**
   * Blurb — `string`
   *
   * short description for the cart
   */
  blurb?: string;

  /**
   * Sidebar — `blockContent`
   *
   *
   */
  sidebar?: BlockContent;

  /**
   * Content — `array`
   *
   * Modular zonze (image, texte)
   */
  content?: Array<
    | SanityKeyed<ImageUI>
    | SanityKeyed<TextUI>
    | SanityKeyed<SliderUI>
    | SanityKeyed<SidebarUI>
  >;

  /**
   * Related Products — `array`
   *
   *
   */
  related?: Array<SanityKeyedReference<Product>>;

  /**
   * Custom css — `text`
   *
   *
   */
  customCSS?: string;
}

/**
 * Typeface
 *
 *
 */
export interface Typeface extends SanityDocument {
  _type: "typeface";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   * Click on generate, Semantic URL based on title (no space no char other than a-z-0-9
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Style — `string`
   *
   *
   */
  style?:
    | "thin"
    | "thinItalic"
    | "light"
    | "lightItalic"
    | "regular"
    | "regularItalic"
    | "medium"
    | "mediumItalic"
    | "book"
    | "bookItalic"
    | "bold"
    | "boldItalic"
    | "black"
    | "blackItalic";

  /**
   * File — `typefaceFile`
   *
   *
   */
  typefaceFile?: TypefaceFile;

  /**
   * Zip File — `file`
   *
   * Digital good client will receive
   */
  zip?: { _type: "file"; asset: SanityReference<any> };

  /**
   * stylisticSets — `array`
   *
   *
   */
  stylisticSets?: Array<SanityKeyed<KeyValString>>;

  /**
   * scriptsSupporter — `array`
   *
   *
   */
  scriptsSupporter?: Array<SanityKeyed<string>>;

  /**
   * glyphs — `array`
   *
   *
   */
  glyphs?: Array<SanityKeyed<GlyphSet>>;

  /**
   * vendor — `reference`
   *
   * Author
   */
  vendor?: SanityReference<Vendor>;
}

/**
 * Vendor
 *
 *
 */
export interface Vendor extends SanityDocument {
  _type: "vendor";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * logo — `image`
   *
   *
   */
  logo?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Description — `blockContent`
   *
   *
   */
  description?: BlockContent;
}

/**
 * Link Expire
 *
 *
 */
export interface LinkExpire extends SanityDocument {
  _type: "linkExpire";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Url — `url`
   *
   *
   */
  url?: string;

  /**
   * expired — `boolean`
   *
   *
   */
  expired?: boolean;

  /**
   * Hit count — `number`
   *
   *
   */
  count?: number;
}

export type LicenseType = {
  _type: "licenseType";
  /**
   * Label — `string`
   *
   * Displayed on front end
   */
  label?: string;

  /**
   * category — `string`
   *
   * Used for discounts
   */
  category?: string;

  /**
   * Infos — `string`
   *
   * Displayed on front end
   */
  infos?: string;

  /**
   * price — `number`
   *
   * Price if solo, no other license type selected
   */
  price?: number;

  /**
   * price multi — `number`
   *
   * Price if selected with another license type
   */
  priceMulti?: number;
};

export type LicenseSize = {
  _type: "licenseSize";
  /**
   * Title — `string`
   *
   * Displayed on front end
   */
  title?: string;

  /**
   * Infos — `string`
   *
   * Displayed on front end
   */
  infos?: string;

  /**
   * licenseType — `array`
   *
   *
   */
  licenseType?: Array<SanityKeyed<LicenseType>>;
};

export type LicenseSizeOption = {
  _type: "licenseSizeOption";
  /**
   * label — `string`
   *
   *
   */
  label?: string;

  /**
   * Price — `number`
   *
   *
   */
  price?: number;
};

export type Variants = {
  _type: "variants";
  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Base Price — `number`
   *
   * Base price, variants will increment this value
   */
  basePrice?: number;

  /**
   * Variants Title — `string`
   *
   * Ex: Company size
   */
  variantsTitle?: string;

  /**
   * Variant — `array`
   *
   * Company size
   */
  items?: Array<SanityKeyed<Variant>>;
};

export type Variant = {
  _type: "variant";
  /**
   * Title — `string`
   *
   * lowercase, no space, ex: 1,10,100; 10k, 20k
   */
  title?: string;

  /**
   * Price Modifier — `number`
   *
   * Based on base price, ex base price is 30e, this variant can add 6e ending 36e
   */
  priceModifier?: number;
};

export type TypefaceFile = {
  _type: "typefaceFile";
  asset: SanityReference<any>;
  /**
   * base64 — `string`
   *
   * for the front end
   */
  base64?: string;
};

export type ProductBundle = {
  _type: "productBundle";
  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Description — `string`
   *
   *
   */
  description?: string;

  /**
   * Description alt — `string`
   *
   * green text after description
   */
  descriptionAlt?: string;

  /**
   * categories — `array`
   *
   * Used for discounts
   */
  categories?: Array<SanityKeyed<string>>;

  /**
   * Price — `number`
   *
   * Based on base price (licence type + size), ex base price is 60e, this can add 330e, result: 390e
   */
  price?: number;

  /**
   * Typefaces — `array`
   *
   *
   */
  typefaces?: Array<SanityKeyedReference<Typeface>>;

  /**
   * Zip File — `file`
   *
   * Digital good client will receive
   */
  zip?: { _type: "file"; asset: SanityReference<any> };

  /**
   * Zip File Trials — `file`
   *
   * Digital good client will receive
   */
  zipTrials?: { _type: "file"; asset: SanityReference<any> };
};

export type ProductSingle = {
  _type: "productSingle";
  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Description — `string`
   *
   *
   */
  description?: string;

  /**
   * Description alt — `string`
   *
   * green text after description
   */
  descriptionAlt?: string;

  /**
   * categories — `array`
   *
   * Used for discounts
   */
  categories?: Array<SanityKeyed<string>>;

  /**
   * Price — `number`
   *
   * Based on base price (licence type + size), ex base price is 50 CHF, this can add 60 CHF, result: 110 CHF
   */
  price?: number;

  /**
   * Typeface — `reference`
   *
   * rename this (cf bundles)
   */
  typeface?: SanityReference<Typeface>;

  /**
   * Zip File — `file`
   *
   * Digital good client will receive
   */
  zip?: { _type: "file"; asset: SanityReference<any> };

  /**
   * Zip File Trials — `file`
   *
   * Digital good client will receive
   */
  zipTrials?: { _type: "file"; asset: SanityReference<any> };
};

export type Style = {
  _type: "style";
  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Description — `string`
   *
   *
   */
  description?: string;

  /**
   * Price — `number`
   *
   * Based on base price (licence type + size), ex base price is 50 CHF, this can add 60 CHF, result: 110 CHF
   */
  price?: number;

  /**
   * items — `reference`
   *
   * rename this (cf bundles)
   */
  items?: SanityReference<Typeface>;
};

export type BlockContent = Array<SanityKeyed<SanityBlock>>;

export type LinkExternal = {
  _type: "linkExternal";
  /**
   * Label — `string`
   *
   *
   */
  label?: string;

  /**
   * Link — `string`
   *
   *
   */
  link?: string;
};

export type LinkInternal = {
  _type: "linkInternal";
  /**
   * label — `string`
   *
   *
   */
  label?: string;

  /**
   * link — `reference`
   *
   *
   */
  link?: SanityReference<Infos | Home | Product | Licensing | Trials | Page>;
};

export type LinkModal = {
  _type: "linkModal";
  /**
   * label — `string`
   *
   *
   */
  label?: string;

  /**
   * target — `string`
   *
   *
   */
  target?: "modal-works";
};

export type MenuItem = {
  _type: "menuItem";
  /**
   * link — `linkInternal`
   *
   *
   */
  link?: LinkInternal;

  /**
   * Sub menu — `array`
   *
   *
   */
  subMenu?: Array<SanityKeyed<LinkInternal> | SanityKeyed<LinkExternal>>;
};

export type Seo = {
  _type: "seo";
  /**
   * Meta title — `string`
   *
   *
   */
  metaTitle?: string;

  /**
   * Meta description — `string`
   *
   *
   */
  metaDescription?: string;

  /**
   * Meta image — `image`
   *
   *
   */
  metaImage?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };
};

export type Embed = {
  _type: "embed";
  /**
   * url — `url`
   *
   * url publique du media ex: https://www.youtube.com/watch?v=exTZ9vB6ZeE
   */
  url?: string;
};

export type KeyVal = {
  _type: "keyVal";
  /**
   * Clef — `string`
   *
   *
   */
  key?: string;

  /**
   * Valeur — `blockContent`
   *
   *
   */
  val?: BlockContent;
};

export type KeyValString = {
  _type: "keyValString";
  /**
   * Clef — `string`
   *
   *
   */
  key?: string;

  /**
   * Value — `string`
   *
   *
   */
  val?: string;
};

export type Video = {
  _type: "video";
  /**
   * url — `url`
   *
   *
   */
  url?: string;

  /**
   * placeholder — `image`
   *
   *
   */
  placeholder?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };
};

export type InterTitre = {
  _type: "interTitre";
  /**
   * Index — `number`
   *
   *
   */
  index?: number;

  /**
   * Titre — `string`
   *
   *
   */
  title?: string;
};

export type Figure = {
  _type: "figure";
  /**
   * Image — `image`
   *
   * jpg, 2000px wide, 72dpi
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Caption — `string`
   *
   *
   */
  caption?: string;
};

export type LabelPrice = {
  _type: "labelPrice";
  /**
   * label — `string`
   *
   *
   */
  label?: string;

  /**
   * Price — `number`
   *
   *
   */
  price?: number;
};

export type Obj3d = {
  _type: "obj3d";
  /**
   * gltf — `file`
   *
   *
   */
  gltf?: { _type: "file"; asset: SanityReference<any> };

  /**
   * image — `image`
   *
   * Image Fallback
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * link — `reference`
   *
   *
   */
  link?: SanityReference<Infos | Home | Product | Licensing | Trials | Page>;
};

export type Trinket = {
  _type: "trinket";
  /**
   * file — `file`
   *
   *
   */
  file?: { _type: "file"; asset: SanityReference<any> };

  /**
   * name — `string`
   *
   * Ex: LUPA, KEYCHAIN
   */
  name?: string;

  /**
   * image — `image`
   *
   * Image Fallback
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * metadata — `text`
   *
   *
   */
  metadata?: string;

  /**
   * link — `reference`
   *
   *
   */
  link?: SanityReference<Infos | Home | Product | Licensing | Trials | Page>;
};

export type TextDropDown = {
  _type: "textDropDown";
  /**
   * title — `string`
   *
   *
   */
  title?: string;

  /**
   * text — `blockContent`
   *
   *
   */
  text?: BlockContent;
};

export type GlyphSet = {
  _type: "glyphSet";
  /**
   * Title — `string`
   *
   * lowercase, no space, ex: 1,10,100; 10k, 20k
   */
  title?: string;

  /**
   * items — `array`
   *
   *
   */
  items?: Array<SanityKeyed<string>>;
};

export type ImageUI = {
  _type: "imageUI";
  /**
   * title — `string`
   *
   * Module title (displayed only in the admin)
   */
  title?: string;

  /**
   * image — `figure`
   *
   *
   */
  image?: Figure;

  /**
   * size — `number`
   *
   * column span out of 3 columns grid, ex: 2
   */
  size?: number;
};

export type TextUI = {
  _type: "textUI";
  /**
   * title — `string`
   *
   * Module title (displayed only in the admin)
   */
  title?: string;

  /**
   * Text — `blockContent`
   *
   *
   */
  text?: BlockContent;

  /**
   * size — `number`
   *
   * column span out of 3 columns grid, ex: 2
   */
  size?: number;
};

export type TextsUI = {
  _type: "textsUI";
  /**
   * title — `string`
   *
   * Module titre (visible uniquement dans l'admin)
   */
  title?: string;

  /**
   * items — `array`
   *
   *
   */
  items?: Array<SanityKeyed<BlockContent>>;
};

export type SliderUI = {
  _type: "sliderUI";
  /**
   * title — `string`
   *
   *
   */
  title?: string;

  /**
   * items — `array`
   *
   *
   */
  items?: Array<SanityKeyed<Figure>>;

  /**
   * size — `number`
   *
   * column span out of 3 columns grid, ex: 2
   */
  size?: number;
};

export type SidebarUI = {
  _type: "sidebarUI";
  /**
   * title — `string`
   *
   * Module title (displayed only in the admin)
   */
  title?: string;

  /**
   * Text — `blockContent`
   *
   *
   */
  text?: BlockContent;
};

export type Documents =
  | Home
  | Infos
  | Licensing
  | Trials
  | Settings
  | PageModulaire
  | Page
  | Tag
  | Product
  | Typeface
  | Vendor
  | LinkExpire;
