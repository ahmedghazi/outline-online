import { groq } from "next-sanity";
// import { client } from "./sanity-client";
import { sanityFetch } from "./sanity.client";
import {
  Home,
  Infos,
  Licensing,
  Page,
  Product,
  Settings,
  Trials,
} from "../types/schema";
// import { cache } from "react";
import { figure, productCard, productCardLight, seo } from "./fragments";
// import { client } from "./sanity.client";

// export const cachedClient = cache(client.fetch.bind(client));

const SETTINGS_QUERY = groq`*[_type == "settings"][0]{
      ...,

      navPrimary[]{
        ...,
        _type == 'menuItem' => {
          ...,
          link{
            ...,
            link->{
              _type,
              slug
            }
          },
          subMenu[]{
            ...,
             link->{
              _type,
              slug
            }
          }
        }
      },
      navSecondary[]{
        ...,
        _type == 'linkInternal' => {
          ...,
          link->{
            _type,
            slug
          }
        }
      },
      navTertiary[]{
        ...,
        _type == 'linkInternal' => {
          ...,
          link->{
            _type,
            slug
          }
        }
      },
      licenseSizes[]{
        ...
      }
    }`;
export async function getSettings(): Promise<Settings> {
  return sanityFetch({
    query: SETTINGS_QUERY,
    tags: ["settings"],
  });
}

/**
 * PRODUCTS CART
 * (only published ones)
 */
const PRODUCTS_CART_QUERY = groq`
    *[_type == "product" && !(_id in path('drafts.**')) && visible == true]{
      _id,
      title,
      slug{
        current
      },

      singles[title != "Variable"][]{
        _key,
        _type,
        title,
        isDefault,
        price,
        priceDiscount,
        description,
        descriptionAlt,
        categories,
        relatedTypeface->{
          slug{
            current
          }
        },
        typeface->{
          slug{
            current
          },
        }
      },
      bundles[]{
        _key,
        _type,
        title,
        categoryLicensePrice,
        price,
        priceDiscount,
        description,
        descriptionAlt,
        categories,
        // typefaces[]->{
        //   _id,
        //   title,
        // }
      },
      licenseSizes[]{
        ...
      },
      metadata
    }
    `;
export async function getProductsCart(): Promise<Product[]> {
  return sanityFetch({
    query: PRODUCTS_CART_QUERY,
    tags: ["productsCart"],
  });
}

/**
 * HOME
 *
 */
export const HOME_QUERY = groq`*[_type == "home"][0]{
  ...,
  seo{
    ${seo}
  },

  trinkets[]{
    ...,
    image{
      asset->{
        url,
        originalFilename,
        metadata
      }
    },
  },

  typefaces[]->{
    ${productCard}
  },
  inUse[]{
    ${figure}
  },
}`;

export async function getHome(): Promise<Home> {
  return sanityFetch({
    query: HOME_QUERY,
    tags: ["home"],
  });
}

/**
 * INFOS
 *
 */
export const INFOS_QUERY = groq`*[_type == "infos"][0]{
  ...,
  seo{
    ${seo}
  },
}`;

export async function getInfos(): Promise<Infos> {
  return sanityFetch({
    query: INFOS_QUERY,
    tags: ["infos"],
  });
}

/**
 * LICENSING
 *
 */
export const LICENSING_QUERY = groq`*[_type == "licensing"][0]{
  ...,
  seo{
    ${seo}
  },
}`;

export async function getLicensing(): Promise<Licensing> {
  return sanityFetch({
    query: LICENSING_QUERY,
    tags: ["licensing"],
  });
}

/**
 * TRIALS
 *
 */
export const TRIALS_QUERY = groq`*[_type == "trials"][0]{
  ...,
  seo{
    ${seo}
  },
  typefaces[]->{
    ${productCardLight}
  },
}`;

export async function getTrials(): Promise<Trials> {
  return sanityFetch({
    query: TRIALS_QUERY,
    tags: ["trials"],
  });
}

/**
 * PRODUCT
 *
 */
export const PRODUCT_QUERY = groq`*[_type == "product" && slug.current == $slug][0]{
  ...,
  seo{
    ${seo}
  },
  singles[]{
		...,
		typeface->
	}
}`;

export async function getProduct(slug: string): Promise<Product> {
  return sanityFetch({
    query: PRODUCT_QUERY,
    tags: ["product"],
    qParams: { slug: slug },
  });
}

/**
 * PAGE
 *
 */
export const PAGE_QUERY = groq`*[_type == "page" && slug.current == $slug][0]{
  ...,
  seo{
    ${seo}
  }
}`;

export async function getPage(slug: string): Promise<Page> {
  return sanityFetch({
    query: PAGE_QUERY,
    tags: ["page"],
    qParams: { slug: slug },
  });
}
