import ContentProduct from "@/app/components/ContentProduct";
import { TypeContextProvider } from "@/app/components/typeface/TypeContext";
// import { TypeContextProvider } from "@/app/components/typeface/typeContext";
import website from "@/app/config/website";
import { Product } from "@/app/types/schema";
import { getClient } from "@/app/sanity-api/sanity.client";
// import { getProduct, productQuery } from "@/app/utils/sanity-queries";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import React from "react";
import { getProduct, PRODUCT_QUERY } from "@/app/sanity-api/sanity-queries";

// export const revalidate = 3600; // revalidate every hour
// export const revalidate = 10; // revalidate every hour
// export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

type PageProps = {
  params: Params;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getProduct(slug);
  return {
    title: `${data?.seo?.metaTitle || data?.title || ""}`,
    description: data?.seo?.metaDescription,
    openGraph: {
      images: data?.seo?.metaImage?.asset.url || website.image,
    },
  };
}

const Page: ({ params }: PageProps) => Promise<JSX.Element> = async ({
  params,
}) => {
  const { isEnabled: preview } = draftMode();
  const { slug } = await params;
  let data: Product;
  if (preview) {
    data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
      PRODUCT_QUERY,
      params
    );
  } else {
    data = await getProduct(slug);
  }

  if (!data) return <div>please edit page</div>;

  return (
    <div className='template template--product' data-template='product'>
      <TypeContextProvider>
        <ContentProduct input={data} />
      </TypeContextProvider>
    </div>
  );
};

export default Page;
