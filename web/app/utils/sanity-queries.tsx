import { groq } from "next-sanity";
import { client } from "./sanity-client";
import {
  Home,
  Infos,
  Licensing,
  Page,
  Product,
  Settings,
  Trials,
} from "../types/schema";
import { cache } from "react";
import { figure, productCard, seo } from "./fragments";

export const cachedClient = cache(client.fetch.bind(client));

export async function getSettings(): Promise<Settings> {
  return client.fetch(
    groq`*[_type == "settings"][0]{
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
    }`
  );
}

/**
 * PRODUCTS CART
 */
export async function getProductsCart(): Promise<Product[]> {
  return client.fetch(
    groq`
    *[_type == "product"]{
      title,
      slug{
        current
      },
      singles[]{
        _key,
        _type,
        title,
        price,
        description,
        typeface->{
          _id,
          title,
        }
      },
      bundles[]{
        _key,
        _type,
        title,
        price,
        description,
        descriptionAlt,
        typefaces[]->{
          _id,
          title,
        }
      },
      licenseSizes[]{
        ...
      },
      metadata
    }
    `
  );
}

/**
 * HOME
 *
 */
export const homeQuery = groq`*[_type == "home"][0]{
  ...,
  seo{
    ${seo}
  },

  trinkets[]{
    ...,
    // file{
    //   ...,
    //   asset->{
    //     url,
    //     originalFilename
    //   }
    // },
    image{
      asset->{
        url,
        originalFilename,
        metadata
      }
    },
    // link->{
    //   title,
    //   _type,
    //   slug
    // }
  },

  typefaces[]->{
    ${productCard}
  },
  inUse[]{
    ${figure}
  },
}`;

export async function getHome(): Promise<Home> {
  return cachedClient(homeQuery, {});
}

/**
 * INFOS
 *
 */
export const infosQuery = groq`*[_type == "infos"][0]{
  ...,
  seo{
    ${seo}
  },
}`;

export async function getInfos(): Promise<Infos> {
  return cachedClient(infosQuery, {});
}

/**
 * LICENSING
 *
 */
export const licensingQuery = groq`*[_type == "licensing"][0]{
  ...,
  seo{
    ${seo}
  },
}`;

export async function getLicensing(): Promise<Licensing> {
  return cachedClient(licensingQuery, {});
}

/**
 * TRIALS
 *
 */
export const trialsQuery = groq`*[_type == "trials"][0]{
  ...,
  seo{
    ${seo}
  },
  typefaces[]->{
    ${productCard}
  },
}`;

export async function getTrials(): Promise<Trials> {
  return cachedClient(trialsQuery, {});
}

/**
 * PRODUCT
 *
 */
export const productQuery = groq`*[_type == "product" && slug.current == $slug][0]{
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
  return cachedClient(productQuery, { slug: slug });
}

/**
 * PAGE
 *
 */
export const pageQuery = groq`*[_type == "page" && slug.current == $slug][0]{
  ...,
  seo{
    ${seo}
  }
}`;

export async function getPage(slug: string): Promise<Page> {
  return cachedClient(pageQuery, { slug: slug });
}
