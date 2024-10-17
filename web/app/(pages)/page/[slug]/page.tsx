import ContentPage from "@/app/components/ContentPage";

// import { TypeContextProvider } from "@/app/components/typeface/typeContext";
import website from "@/app/config/website";
import { Page } from "@/app/types/schema";
import { getClient } from "@/app/utils/sanity-client";
import { getPage, pageQuery } from "@/app/utils/sanity-queries";
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
  const data = await getPage(params.slug);
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
  let data: Page;
  if (preview) {
    data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
      pageQuery,
      params
    );
  } else {
    data = await getPage(params.slug);
  }

  if (!data) return <div>please edit page</div>;

  return (
    <div className='template template--page' data-template='page'>
      <ContentPage input={data} />
    </div>
  );
};

export default PageTemplate;
