import type { MetadataRoute } from "next";

// Static export friendly: emits a sitemap.xml at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://agentlead.dev";
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/skills/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/flow/`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
