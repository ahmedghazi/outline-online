import website from "@/app/config/website";
import { getAllProducts } from "@/app/sanity-api/sanity-queries";
import { _linkResolver } from "@/app/sanity-api/utils";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();

  return products.map((item) => ({
    url: `${website.url}${_linkResolver(item)}`,
    lastModified: item._updatedAt,
  }));
}
