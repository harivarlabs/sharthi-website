import type { MetadataRoute } from "next";

/** The site is not public yet: keep every crawler out. */
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
