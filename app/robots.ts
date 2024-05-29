import { MetadataRoute } from 'next';
import siteMetadata from '@/assets/siteMetadata';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    sitemap: `${siteMetadata.siteUrl}/sitemap.xml`
  }
}
