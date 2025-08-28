import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/"], // nếu có
    },
    sitemap: "https://ro-phim.com/sitemap.xml",
  };
}
