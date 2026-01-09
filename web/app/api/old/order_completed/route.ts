import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Product } from "@/app/types/schema";
import { client } from "@/app/sanity-api/sanity.client";

export async function POST(req: NextRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    // res.status(405).json({ message: "INVALID_METHOD" });
    // return;
    return new NextResponse(JSON.stringify({ message: "INVALID_METHOD" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await req.json(); // res now contains body
  const { items, user } = body.content;
  /*
  paddleData: data.data,
  products: products.value,
  */
  /*
  old:
  item: {
    metadata": {
    "productId":"843ef4d8-d90a-444c-b534-d0328050f1a0",
    "type":"single",
    "_key":"e1d49c71e4dc66ee630c3b74f4b11e2d"
}
  },
  new:
  item: {
    bundleOrSingleKey: "e1d49c71e4dc66ee630c3b74f4b11e2d",
    type: "productBundle" | "productSingle";
    productId: "843ef4d8-d90a-444c-b534-d0328050f1a0";
  }

  */

  /*
  ITEMS = products data from snipcart
  */

  /**
   * collect product ids from items.metada
   */
  const _productIds = _collectProductsId(items);

  /**
   * from these ids get content (bundles, singles)
   */
  const _productsData = await _collectProductsData(_productIds);

  /**
   * filter content to get only bundles and zip that are in items.metadata
   */
  const _filteredBundlesAndSingles = await _filterBundlesAndSingles(
    items,
    _productsData
  );
  // const _zipFiles = await _collectTypefacesZip(items);

  // console.log(_filteredBundlesAndSingles);
  return new NextResponse(JSON.stringify(_filteredBundlesAndSingles), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}

const _collectProductsId = (items: any) => {
  let _ids: string[] = [];
  items.forEach((element: any) => {
    const metadata = JSON.parse(element.metadata);
    const { productId } = metadata;
    _ids.push(productId);
  });
  return _ids;
};

const _collectProductsData = async (_ids: string[]) => {
  const query = `*[_type == "product" && _id in $_ids
    ]{
    title,
    singles[]{
      _key,
      title,
      zip{
        asset->{
          url
        }
      }
    },
    bundles[]{
      _key,
      title,
      zip{
        asset->{
          url
        }
      }
    }
  }`;
  // console.log(query);
  const res = await client.fetch(query, { _ids: _ids });
  // const data = await res.json();
  return res;
};

/**
 * 2 arrays, one with items from snipcart, one with products from sanity
 * items (metadata): Snipcart
 * _productsData (bundleOrSingle): Sanity
 *
 */
const _filterBundlesAndSingles = async (
  items: any,
  _productsData: Product[]
) => {
  // console.log(_productsData);
  let zips: any[] = [];
  items.forEach((element: any) => {
    const metadata = JSON.parse(element.metadata);
    const { _key, type } = metadata;
    // console.log(_productsData);

    _productsData.forEach((el) => {
      const bundleOrSingleFiltered: any = _getBundleOrSingle(type, _key, el);
      // console.log(bundleOrSingleFiltered);
      if (bundleOrSingleFiltered) {
        bundleOrSingleFiltered[0].typefaceTitle = el.title;
        console.log(el.title);
        zips.push(bundleOrSingleFiltered[0]);
      }
    });
  });
  // console.log(zips);

  return zips;
};

const _getBundleOrSingle = (
  type: string,
  _key: string,
  _productData: Product
) => {
  const bundleOrSingle =
    type === "bundle" ? _productData.bundles : _productData.singles;

  return bundleOrSingle?.filter((el) => el._key === _key);
};

/*
Schema
{
  "singles": [
      {
          "_key": "e1d49c71e4dc66ee630c3b74f4b11e2d",
          "zip": {
              "asset": {
                  "url": "https://cdn.sanity.io/files/ztvzoay0/production/4947a88dd56ba54b0d9908ade1cbb86dc0975568.zip"
              }
          }
      }
  ],
  "bundles": [
      {
          "_key": "1c777b491eae",
          "zip": {
              "asset": {
                  "url": "https://cdn.sanity.io/files/ztvzoay0/production/4947a88dd56ba54b0d9908ade1cbb86dc0975568.zip"
              }
          }
      },
      {
          "_key": "bf93157a9418",
          "zip": {
              "asset": {
                  "url": "https://cdn.sanity.io/files/ztvzoay0/production/4947a88dd56ba54b0d9908ade1cbb86dc0975568.zip"
              }
          }
      },
      {
          "_key": "2387f8edfb11",
          "zip": {
              "asset": {
                  "url": "https://cdn.sanity.io/files/ztvzoay0/production/4947a88dd56ba54b0d9908ade1cbb86dc0975568.zip"
              }
          }
      }
  ]
}
  */
