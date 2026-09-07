import { writeFileSync } from 'node:fs';
import { schoolRegistry } from '../src/schools';
import { siteConfig } from '../src/config/site';
import { FIELDS } from '../src/taxonomy/fields';
import { getSchoolIdsForField } from '../src/taxonomy/taxonomyQueries';

/**
 * Sinh public/sitemap.xml từ chính schoolRegistry/taxonomy hiện có — không hardcode danh sách
 * route, chạy prebuild nên luôn khớp catalog thật tại thời điểm build. SPA phía client, crawler
 * không chạy JS sẽ chỉ thấy index.html tĩnh — sitemap chỉ giúp discover route, không thay SSR.
 */
const staticPaths = ['/', '/compare', '/nganh'];
const schoolPaths = Object.keys(schoolRegistry).map((id) => `/${id}`);
const fieldPaths = FIELDS.filter((field) => getSchoolIdsForField(field.id).length > 0).map((field) => `/nganh/${field.id}`);

const allPaths = [...staticPaths, ...fieldPaths, ...schoolPaths];

const today = new Date().toISOString().slice(0, 10);
const urlEntries = allPaths
  .map((path) => `  <url>\n    <loc>${siteConfig.canonicalUrl}${path}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;

writeFileSync('public/sitemap.xml', xml, 'utf8');
console.log(`[generate-sitemap] Đã ghi public/sitemap.xml — ${allPaths.length} URL (${schoolPaths.length} trường, ${fieldPaths.length} lĩnh vực, ${staticPaths.length} route tĩnh).`);
