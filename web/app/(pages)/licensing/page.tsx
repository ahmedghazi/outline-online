import React from "react";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { getClient } from "@/app/sanity-api/sanity.client";
import { Infos, Licensing } from "@/app/types/schema";

import website from "@/app/config/website";
import ContentInfos from "@/app/components/ContentInfos";
import ContentLicensing from "@/app/components/ContentLicensing";
import { getLicensing, LICENSING_QUERY } from "@/app/sanity-api/sanity-queries";
// import ContentInfos from "@/app/components/ContentInfos";

type PageProps = {
  params: {
    slug: string;
  };
};

export const revalidate = 3600; // revalidate every hour

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const data = await getLicensing();
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
  // const data = await getLicensing(params.slug);
  // console.log(params.slug);

  const { isEnabled: preview } = draftMode();
  let data: Licensing;
  if (preview) {
    data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
      LICENSING_QUERY,
      params
    );
  } else {
    data = (await getLicensing()) as Licensing;
  }

  if (!data) return <div>please edit page</div>;
  return (
    <div className='template--infos' data-template='infos'>
      {/* <ContentInfos input={data} /> */}
      <ContentLicensing input={data} />
    </div>
  );
};

export default Page;
