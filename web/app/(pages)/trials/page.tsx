import React from "react";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { getClient } from "@/app/sanity-api/sanity.client";
import { Trials } from "@/app/types/schema";

import website from "@/app/config/website";
import ContentTrials from "@/app/components/ContentTrials";
import {
  getInfos,
  getTrials,
  INFOS_QUERY,
  TRIALS_QUERY,
} from "@/app/sanity-api/sanity-queries";
// import ContentInfos from "@/app/components/ContentInfos";

type PageProps = {
  params: {
    slug: string;
  };
};

export const revalidate = 3600; // revalidate every hour
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const data = await getTrials();
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
  // const data = await getInfos(params.slug);
  // console.log(params.slug);

  const { isEnabled: preview } = draftMode();
  let data: Trials;
  if (preview) {
    data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
      TRIALS_QUERY,
      params
    );
  } else {
    data = (await getTrials()) as Trials;
  }

  if (!data) return <div>please edit page</div>;
  return (
    <div className='template--trials' data-template='trials'>
      <ContentTrials input={data} />
    </div>
  );
};

export default Page;
