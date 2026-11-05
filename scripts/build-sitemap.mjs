// Generates public/sitemap.xml from the data files (properties + posts) plus the
// static pages. Runs automatically before every `npm run build`.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(fileURLToPath(import.meta.url));
const SITE = "https://www.iremerealestate.com";

// Strip a UTF-8 BOM if present so JSON.parse doesn't choke.
const readJson = (file) =>
  JSON.parse(readFileSync(path.join(root, file), "utf8").replace(/^\uFEFF/, ""));

const properties = readJson("../src/data/properties.json");
const posts = readJson("../src/data/posts.json");

const staticPaths = [
  "/",
  "/properties",
  "/buy",
  "/rent",
  "/land",
  "/construction",
  "/property-management",
  "/electrical-installation",
  "/cctv-and-security",
  "/interior-design",
  "/about",
  "/blog",
  "/contact",
  "/request-property",
  "/list-property",
  "/favorites",
  "/faqs",
  "/privacy",
  "/terms",
];

const today = new Date().toISOString().slice(0, 10);
const urls = [
  ...staticPaths.map((p) => ({ loc: `${SITE}${p === "/" ? "/" : p}` })),
  ...properties.map((p) => ({ loc: `${SITE}/properties/${p.slug}` })),
  ...posts.map((b) => ({ loc: `${SITE}/blog/${b.slug}` })),
];

const xml = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  ...urls.map(
    ({ loc }) =>
      `  <url><loc>${loc}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq></url>`,
  ),
  `</urlset>`,
  "",
].join("\n");

writeFileSync(path.join(root, "../public/sitemap.xml"), xml);
console.log(`sitemap.xml written with ${urls.length} URLs`);
