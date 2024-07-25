import ContentProduct from "@/app/components/ContentProduct";
import { TypeContextProvider } from "@/app/components/typeface/TypeContext";
// import { TypeContextProvider } from "@/app/components/typeface/typeContext";
import website from "@/app/config/website";
import { Product } from "@/app/types/schema";
import { getClient } from "@/app/utils/sanity-client";
import { getProduct, productQuery } from "@/app/utils/sanity-queries";
// import { getProduct, productQuery } from "@/app/utils/sanity-queries";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import React from "react";

export const revalidate = 3600; // revalidate every hour
export const dynamic = "force-dynamic";

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const data = await getProduct(params.slug);
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
  // const data = await getPageModulaire(params.slug);
  // console.log(params.slug);

  const { isEnabled: preview } = draftMode();
  let data: Product;
  if (preview) {
    data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
      productQuery,
      params
    );
  } else {
    data = await getProduct(params.slug);
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
