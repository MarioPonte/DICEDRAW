import type { MetadataRoute } from 'next';
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://dicedraw.vercel.app/',
      priority: 1,
    }
  ]
}