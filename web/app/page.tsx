import { draftMode } from "next/headers";
import { Home } from "./types/schema";
import { getClient } from "./sanity-api/sanity.client";
import ContentHome from "./components/ContentHome";
import { Metadata } from "next";
import website from "./config/website";
import { getHome, HOME_QUERY } from "./sanity-api/sanity-queries";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const data = await getHome();
  // console.log(data.seo);
  return {
    title: `${data?.seo?.metaTitle || data?.title || ""}`,
    description: data?.seo?.metaDescription,
    openGraph: {
      images: data?.seo?.metaImage?.asset.url || website.image,
    },
  };
}

export const revalidate = 3600; // revalidate every hour

type PageProps = {
  params: {
    slug: string;
  };
};

const Page: ({ params }: PageProps) => Promise<JSX.Element> = async ({
  params,
}) => {
  const { isEnabled: preview } = draftMode();
  let data: Home;
  if (preview) {
    data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
      HOME_QUERY,
      params,
    );
  } else {
    data = (await getHome()) as Home;
  }

  if (!data) return notFound();
  return (
    <div className='template template--home' data-template='home'>
      {/* <Test3d /> */}
      <ContentHome input={data} />
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};

export default Page;
