import { MetadataRoute } from "next";
import { WEB_URL } from "@/data/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: WEB_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${WEB_URL}/unit-converter`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${WEB_URL}/password-generator`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${WEB_URL}/qr-generator`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${WEB_URL}/word-counter`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
