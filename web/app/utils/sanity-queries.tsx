import { groq } from "next-sanity";
import { client } from "./sanity-client";
import {
  Home,
  Infos,
  Licensing,
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

        _type == 'linkInternal' => {
          ...,
          link->{
            _type,
            slug
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
      styles[]{
        ...,
        typeface->
      },
      bundles[]{
        ...,
        typeface->
      },
      licenseSizes[]{
        ...
      }
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


  obj3ds[]{
    ...,
    gltf{
      ...,
      asset->{
        url
      }
    }
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
  styles[]{
		...,
		typeface->
	}
}`;

export async function getProduct(slug: string): Promise<Product> {
  return cachedClient(productQuery, { slug: slug });
}
