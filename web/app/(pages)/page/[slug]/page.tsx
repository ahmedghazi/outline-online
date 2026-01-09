import ContentPage from "@/app/components/ContentPage";

// import { TypeContextProvider } from "@/app/components/typeface/typeContext";
import website from "@/app/config/website";
import { Page } from "@/app/types/schema";
import { getClient } from "@/app/sanity-api/sanity.client";
// import { getProduct, productQuery } from "@/app/utils/sanity-queries";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import React from "react";
import { getPage, PAGE_QUERY } from "@/app/sanity-api/sanity-queries";

type Params = Promise<{ slug: string }>;
type PageProps = {
  params: Params;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPage(slug);
  return {
    title: `${data?.seo?.metaTitle || data?.title || ""}`,
    description: data?.seo?.metaDescription,
    openGraph: {
      images: data?.seo?.metaImage?.asset.url || website.image,
    },
  };
}

const PageTemplate: ({ params }: PageProps) => Promise<JSX.Element> = async ({
  params,
}) => {
  const { isEnabled: preview } = draftMode();
  const { slug } = await params;

  let data: Page;
  if (preview) {
    data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
      PAGE_QUERY,
      params
    );
  } else {
    data = await getPage(slug);
  }

  if (!data) return <div>please edit page</div>;

  return (
    <div className='template template--page' data-template='page'>
      <ContentPage input={data} />
    </div>
  );
};

export default PageTemplate;
