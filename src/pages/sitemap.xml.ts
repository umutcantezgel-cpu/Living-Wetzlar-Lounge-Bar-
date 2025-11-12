import type { APIRoute } from 'astro';
import seoRoutes from '../../contracts/seo.routes.json';

export const GET: APIRoute = () => {
  const siteUrl = 'https://living-wetzlar.de';

  const urls = seoRoutes.routes
    .filter(route => !route.robots?.includes('noindex'))
    .map(route => {
      const loc = `${siteUrl}${route.path}`;
      const lastmod = new Date().toISOString().split('T')[0];
      const changefreq = route.changefreq || 'monthly';
      const priority = route.priority || 0.5;

      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
