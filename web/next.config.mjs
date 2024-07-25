/** @type {import('next').NextConfig} */
// import TM from "next-transpile-modules";
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { hostname: "cdn.sanity.io" },
      // { hostname: "source.unsplash.com" },
    ],
  },
  env: {
    KEY_SENDGRID: "LA CLE API",
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  transpilePackages: ["three"],
};

// const withTM = TM(["three"]);
// export withTM();

export default nextConfig;
