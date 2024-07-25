const website = {
  pathPrefix: "/", // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"
  title: "Site Name", // Navigation and Site Title
  titleAlt: "SN", // Title for JSONLD
  description: "...",
  headline: "", // Headline for schema.org JSONLD
  url: "https://aaa.fr", // Domain of your site. No trailing slash!
  image: "", // Used for SEO
  ogLanguage: "fr_FR", // Facebook Language

  // JSONLD / Manifest
  faviconLetter: "B",
  favicon: "src/images/logo.png", // Used for manifest favicon generation
  shortName: "aeai", // shortname for manifest. MUST be shorter than 12 characters
  author: "aeai", // Author for schemaORGJSONLD
  themeColor: "#000000",
  backgroundColor: "#000000",

  instagram: "",
  twitter: "", // Twitter Username
  facebook: "", // Facebook Site Name
  googleAnalyticsID: "",

  skipNavId: "reach-skip-nav", // ID for the "Skip to content" a11y feature
};

export default website;
