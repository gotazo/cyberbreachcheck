import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('blog');

  const baseUrl = 'https://cyberbreachcheck.com';

  const urls = posts.map((post) => `
    <url>
      <loc>${baseUrl}/guides/${post.id}</loc>
    </url>
  `).join('');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      
      <url>
        <loc>${baseUrl}/</loc>
      </url>

      <url>
        <loc>${baseUrl}/guides</loc>
      </url>

      ${urls}

    </urlset>
  `, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}