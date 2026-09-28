import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/wh-panel/", "/wh-auth", "/admin/"],
      },
    ],
    sitemap: "https://webhoster.co.id/sitemap.xml",
  };
}
