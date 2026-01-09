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
   * withNav — `boolean`
   *
   * display footer nav?
   */
  withNav?: boolean;
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

  /**
   * withNav — `boolean`
   *
   * display footer nav?
   */
  withNav?: boolean;
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
   * licenseTypes — `array`
   *
   *
   */
  licenseTypes?: Array<SanityKeyed<LicenseType>>;

  /**
   * buyModalNotices — `buyModalNotices`
   *
   *
   */
  buyModalNotices?: BuyModalNotices;

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

  /**
   * withNav — `boolean`
   *
   * display footer nav?
   */
  withNav?: boolean;
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
   * Visible in buy area — `boolean`
   *
   *
   */
  visible?: boolean;

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
   * used also to display typeface in frontend
   */
  singles?: Array<SanityKeyed<ProductSingle>>;

  /**
   * Zip File Trials — `file`
   *
   * Digital good client will receive. (seems deprecated, will keep it for now)
   */
  zipTrials?: { _type: "file"; asset: SanityReference<any> };

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
   * Tell the website what is the style of the typeface, used in the typefaces menu, in the typeface page introduction, in bundles
   */
  style?:
    | "hairline"
    | "hairlineItalic"
    | "thin"
    | "thinItalic"
    | "extraLight"
    | "extraLightItalic"
    | "light"
    | "lightItalic"
    | "book"
    | "bookItalic"
    | "regular"
    | "regularItalic"
    | "medium"
    | "mediumItalic"
    | "semiBold"
    | "semiBoldItalic"
    | "bold"
    | "boldItalic"
    | "extraBold"
    | "extraBoldItalic"
    | "black"
    | "blackItalic"
    | "ultraBlack"
    | "ultraBlackItalic"
    | "superBlack"
    | "superBlackItalic";

  /**
   * variableAxe — `variableAxe`
   *
   * If is a variable typeface? then add the axe
   */
  variableAxe?: VariableAxe;

  /**
   * File — `typefaceFile`
   *
   * File displayed on typeface page (comp tool, glyphs), typefaces in home page
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
 * Order
 *
 *
 */
export interface Order extends SanityDocument {
  _type: "order";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Status — `string`
   *
   *
   */
  status?: string;

  /**
   * Invoice Number — `string`
   *
   *
   */
  invoiceNumber?: string;

  /**
   * dateTime — `datetime`
   *
   *
   */
  creationDate?: string;

  /**
   * email — `string`
   *
   *
   */
  email?: string;

  /**
   * attachments — `array`
   *
   *
   */
  attachments?: Array<SanityKeyed<LinkExternal>>;

  /**
   * json — `text`
   *
   *
   */
  json?: string;
}

/**
 * Link Expire
 *
 *
 */
export interface LinkExpire extends SanityDocument {
  _type: "linkExpire";

  /**
   * token — `string`
   *
   * Used to access the link
   */
  token?: string;

  /**
   * zips — `array`
   *
   *
   */
  zips?: Array<SanityKeyed<LinkExternal>>;

  /**
   * maxDownloads — `number`
   *
   *
   */
  maxDownloads?: number;

  /**
   * downloads — `number`
   *
   *
   */
  downloads?: number;

  /**
   * expiresAt — `datetime`
   *
   *
   */
  expiresAt?: string;
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
   * Infos — `string`
   *
   * Displayed on front end
   */
  infos?: string;

  /**
   * priceMultiplier — `number`
   *
   * Multiplier for the base price
   */
  priceMultiplier?: number;

  /**
   * Category Zip — `string`
   *
   * Used for zips
   */
  categoryZip?: "Desktop" | "Web";

  /**
   * Category Discount — `string`
   *
   * Used for discounts
   */
  CategoryDiscount?: string;

  /**
   * price — `number`
   *
   * Price if solo, no other license type selected
   */
  price?: number;

  /**
   * price Family — `number`
   *
   * Price if selected with another license type
   */
  priceFamily?: number;

  /**
   * price Essentials — `number`
   *
   * Price if selected with another license type
   */
  priceEssentials?: number;

  /**
   * price Reg It — `number`
   *
   * Price if selected with another license type
   */
  priceRegIt?: number;

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
   * priceMultiplier — `number`
   *
   * Multiplier for the base price
   */
  priceMultiplier?: number;

  /**
   * licenseType — `array`
   *
   *
   */
  licenseType?: Array<SanityKeyed<LicenseType>>;
};

export type TypefaceFile = {
  _type: "typefaceFile";
  asset: SanityReference<any>;
  /**
   * base64 — `string`
   *
   * for the front end (to prevent people from stealing it)
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
   * Categories discount — `array`
   *
   * Used for discounts
   */
  categories?: Array<SanityKeyed<string>>;

  /**
   * categoryLicensePrice — `string`
   *
   * Used to link the bundle price with the correct license price
   */
  categoryLicensePrice?: "Full Family" | "Essentials" | "Regular + Italic";

  /**
   * Price — `number`
   *
   * Based on base price (licence type + size), ex base price is 60e, this can add 330e, result: 390e
   */
  price?: number;

  /**
   * Price Discount — `number`
   *
   * %, Displayed in buy modal (green text) => save Xx%
   */
  priceDiscount?: number;

  /**
   * Price crossed — `number`
   *
   * Displayed in buy modal
   */
  priceCrossed?: number;

  /**
   * Typefaces — `array`
   *
   * Used in buy area (seems deprecated, will keep it for now)
   */
  typefaces?: Array<SanityKeyedReference<Typeface>>;

  /**
   * Zip File — `file`
   *
   * Digital good client will receive
   */
  zip?: { _type: "file"; asset: SanityReference<any> };

  /**
   * Zip File Desktop — `file`
   *
   * Digital good client will receive
   */
  zipDesktop?: { _type: "file"; asset: SanityReference<any> };

  /**
   * Zip File Web — `file`
   *
   * Digital good client will receive
   */
  zipWeb?: { _type: "file"; asset: SanityReference<any> };

  /**
   * Zip File Trials — `file`
   *
   * Digital good client will receive. (seems deprecated, will keep it for now)
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
   * isDefault — `boolean`
   *
   *
   */
  isDefault?: boolean;

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
   * Price Discount — `number`
   *
   * %, Displayed in buy modal (green text) => save Xx%
   */
  priceDiscount?: number;

  /**
   * Price crossed — `number`
   *
   * Displayed in buy modal
   */
  priceCrossed?: number;

  /**
   * Typeface — `reference`
   *
   * Used in typefaces, product page, trials, buy area
   */
  typeface?: SanityReference<Typeface>;

  /**
   * Zip File — `file`
   *
   * Digital good client will receive
   */
  zip?: { _type: "file"; asset: SanityReference<any> };

  /**
   * Zip File Desktop — `file`
   *
   * Digital good client will receive
   */
  zipDesktop?: { _type: "file"; asset: SanityReference<any> };

  /**
   * Zip File Web — `file`
   *
   * Digital good client will receive
   */
  zipWeb?: { _type: "file"; asset: SanityReference<any> };

  /**
   * Zip File Trials — `file`
   *
   * Digital good client will receive
   */
  zipTrials?: { _type: "file"; asset: SanityReference<any> };
};

export type BuyModalNotices = {
  _type: "buyModalNotices";
  /**
   * Title — `string`
   *
   * Licenses for
   */
  title?: string;

  /**
   * items — `array`
   *
   *
   */
  items?: Array<SanityKeyed<KeyVal>>;
};

export type VariableAxe = {
  _type: "variableAxe";
  /**
   * Name — `string`
   *
   *
   */
  name?:
    | "wdth"
    | "wght"
    | "ital"
    | "mono"
    | "cont"
    | "slnt"
    | "opsz"
    | "trap"
    | "waff"
    | "shck"
    | "cstm"
    | "grnd"
    | "uppr"
    | "goth"
    | "spik";

  /**
   * min — `number`
   *
   *
   */
  min?: number;

  /**
   * max — `number`
   *
   *
   */
  max?: number;
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
   * key — `string`
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
   * Simple glyph (abcdefg...)
   */
  items?: Array<SanityKeyed<string>>;

  /**
   * Items Advanced — `array`
   *
   * Advanced glyph (liga, oldstyle, ...). https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant
   */
  itemsAdvanced?: Array<SanityKeyed<KeyValString>>;
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
  | Order
  | LinkExpire;
