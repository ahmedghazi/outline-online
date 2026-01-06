import website from "@/app/config/website";
import { urlFor } from "@/app/sanity-api/sanity-utils";
import Image from "next/image";
import React from "react";
import { SanityImageAsset } from "sanity-codegen";

type Props = {
  asset: SanityImageAsset | any;
  width?: number;
  alt?: string | any;
};

const Figure = ({ asset, width = 1000, alt = website.title }: Props) => {
  return (
    <figure>
      <Image
        src={urlFor(asset, width)}
        width={asset?.metadata?.dimensions.width || width}
        height={asset?.metadata?.dimensions.height || width}
        alt={alt || ""}
        sizes='100vw'
        style={{
          width: "100%",
          height: "auto",
          aspectRatio: `${asset?.metadata?.dimensions.width} / ${asset?.metadata?.dimensions.height}`,
          // '--aspect-ratio': asset?.metadata?.dimensions.aspectRatio
          // objectFit: "cover",
        }}
        blurDataURL={asset?.metadata?.lqip}
        // placeholder='blur'
        placeholder={asset?.metadata?.lqip}
      />
    </figure>
  );
};

export default Figure;
