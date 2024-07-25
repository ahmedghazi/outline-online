import Script from "next/script";
import React from "react";

type Props = {
  price: number;
  title: string;
  description: string;
  image: string;
  shopUrl: string;
};

const ProductStructuredData = ({
  price,
  title,
  description,
  image,
  shopUrl,
}: Props) => {
  return (
    <Script type='application/ld+json' id={shopUrl}>
      {`{
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "${title},
        "image": ${image},
        "offers": {
          "@type": "Offer",
          "price": ${price},
          "priceCurrency": "EUR",
          "url": ${shopUrl}
        }
      }`}
    </Script>
  );
};

export default ProductStructuredData;
