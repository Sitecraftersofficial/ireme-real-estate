import { z } from "zod";
import siteJson from "@/data/site.json";
import propertiesJson from "@/data/properties.json";
import postsJson from "@/data/posts.json";
import faqsJson from "@/data/faqs.json";

import hero from "@/assets/hero.jpg";
import house from "@/assets/prop-house.jpg";
import apartment from "@/assets/prop-apartment.jpg";
import land from "@/assets/prop-land.jpg";
import interior from "@/assets/svc-interior.jpg";
import construction from "@/assets/svc-construction.jpg";
import electrical from "@/assets/svc-electrical.jpg";
import cctv from "@/assets/svc-cctv.jpg";
import house11 from "@/assets/House1-1.jpeg";
import house12 from "@/assets/House1-2.jpeg";
import house13 from "@/assets/House1-3.jpeg";
import house21 from "@/assets/House2-1.jpeg";
import house22 from "@/assets/House2-2.jpeg";
import house23 from "@/assets/House2-3.jpeg";
import umucyo1 from "@/assets/umucyo-1.jpeg";
import umucyo2 from "@/assets/umucyo-2.jpeg";
import umucyo3 from "@/assets/umucyo-3.jpeg";
import house31 from "@/assets/House3-1.jpeg";
import house32 from "@/assets/House3-2.jpeg";
import house33 from "@/assets/House3-3.jpeg";
import house34 from "@/assets/House3-4.jpeg";
import house35 from "@/assets/House3-5.jpeg";
import house36 from "@/assets/House3-6.jpeg";
import house37 from "@/assets/House3-7.jpeg";
import house38 from "@/assets/House3-8.jpeg";
import house39 from "@/assets/House3-9.jpeg";
import house310 from "@/assets/House3-10.jpeg";
import house311 from "@/assets/House3-11.jpeg";
import house312 from "@/assets/House3-12.jpeg";
import house313 from "@/assets/House3-13.jpeg";
import house314 from "@/assets/House3-14.jpeg";
import house315 from "@/assets/House3-15.jpeg";
import house41 from "@/assets/House4-1.jpeg";
import house42 from "@/assets/House4-2.jpeg";
import house43 from "@/assets/House4-3.jpeg";
import house44 from "@/assets/House4-4.jpeg";
import house45 from "@/assets/House4-5.jpeg";
import house46 from "@/assets/House4-6.jpeg";
import house47 from "@/assets/House4-7.jpeg";
import house48 from "@/assets/House4-8.jpeg";
import house49 from "@/assets/House4-9.jpeg";
import house410 from "@/assets/House4-10.jpeg";

import vid1 from "@/assets/Vid-1.mp4";
import vid2 from "@/assets/Vid-2.mp4";
import vid3 from "@/assets/Vid-3.mp4";

/** Image keys usable from the JSON files. Add a file to src/assets and register it here. */
export const images: Record<string, string> = {
  hero,
  house,
  apartment,
  land,
  interior,
  construction,
  electrical,
  cctv,
  "house1-1": house11,
  "house1-2": house12,
  "house1-3": house13,
  "house2-1": house21,
  "house2-2": house22,
  "house2-3": house23,
  "umucyo-1": umucyo1,
  "umucyo-2": umucyo2,
  "umucyo-3": umucyo3,
  "house3-1": house31,
  "house3-2": house32,
  "house3-3": house33,
  "house3-4": house34,
  "house3-5": house35,
  "house3-6": house36,
  "house3-7": house37,
  "house3-8": house38,
  "house3-9": house39,
  "house3-10": house310,
  "house3-11": house311,
  "house3-12": house312,
  "house3-13": house313,
  "house3-14": house314,
  "house3-15": house315,
  "house4-1": house41,
  "house4-2": house42,
  "house4-3": house43,
  "house4-4": house44,
  "house4-5": house45,
  "house4-6": house46,
  "house4-7": house47,
  "house4-8": house48,
  "house4-9": house49,
  "house4-10": house410,
};

/** Sponsored promo posters (UMUCYO HOME Ltd room rates). Shown as an ad slot, not as listings. */
export const umucyoAds = [
  {
    key: "umucyo-1",
    src: umucyo1,
    alt: "UMUCYO HOME Ltd — room rates 10,000 RWF day / 10,000 RWF night / 20,000 RWF 24 hours",
  },
  {
    key: "umucyo-2",
    src: umucyo2,
    alt: "UMUCYO HOME Ltd — room rates 5,000 RWF day / 5,000 RWF night / 10,000 RWF 24 hours",
  },
  {
    key: "umucyo-3",
    src: umucyo3,
    alt: "UMUCYO HOME Ltd — room rates 15,000 RWF day / 15,000 RWF night / 30,000 RWF 24 hours",
  },
];

/** Video keys usable from the JSON files. Add a file to src/assets and register it here. */
export const videos: Record<string, string> = {
  "Vid-1": vid1,
  "Vid-2": vid2,
  "Vid-3": vid3,
};
export const vid = (key?: string) => (key && videos[key]) || undefined;
export const img = (key?: string) => (key && images[key]) || house;

/**
 * Video-only listings: videos that are properties in their own right, appended
 * to the photo listings so they appear in search results and the count.
 */
const videoPropertyEntries: Property[] = Object.entries(videos).map(([key], i) => ({
  slug: `video-listing-${key.toLowerCase()}`,
  title: `Video Listing ${i + 1}`,
  transaction: "sale" as const,
  type: "Other" as const,
  status: "Available" as const,
  featured: false,
  district: "Kigali",
  city: "Kigali",
  price: 0,
  bedrooms: 0,
  bathrooms: 0,
  size: 0,
  images: ["house"],
  videos: [key],
  description: "Video listing — watch the walk-through for the full tour of this property.",
  features: ["Video tour available"],
}));

export const PROPERTY_TYPES = [
  "House",
  "Apartment",
  "Villa",
  "Land",
  "Commercial",
  "Office",
  "Warehouse",
  "Other",
] as const;
export const STATUSES = ["Available", "Pending", "Sold", "Rented", "Unavailable"] as const;

const propertySchema = z.object({
  slug: z.string(),
  title: z.string(),
  sample: z.boolean().optional(),
  transaction: z.enum(["sale", "rent"]),
  type: z.enum(PROPERTY_TYPES),
  status: z.enum(STATUSES),
  featured: z.boolean(),
  district: z.string(),
  city: z.string(),
  price: z.number(),
  bedrooms: z.number(),
  bathrooms: z.number(),
  size: z.number(),
  images: z.array(z.string()).min(1),
  /** Optional short vertical video tour keys (see `videos` above). */
  videos: z.array(z.string()).optional(),
  description: z.string(),
  features: z.array(z.string()),
});
export type Property = z.infer<typeof propertySchema>;

const postSchema = z.object({
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  date: z.string(),
  image: z.string(),
  body: z.array(z.string()),
});
export type Post = z.infer<typeof postSchema>;

export const site = z
  .object({
    name: z.string(),
    tagline: z.string(),
    phone: z.string(),
    phoneIntl: z.string(),
    whatsapp: z.string(),
    email: z.string(),
    address: z.string(),
    hours: z.string(),
    socials: z.record(z.string(), z.string()),
    locations: z.array(z.string()),
  })
  .parse(siteJson);

export const properties: Property[] = z.array(propertySchema).parse(propertiesJson);
/**
 * Every searchable listing: the photo properties from properties.json plus the
 * video-only listings above (videos are properties too). Used for the count,
 * the grid, the Shorts row and the detail pages.
 */
export const allProperties: Property[] = [...properties, ...videoPropertyEntries];
export const posts: Post[] = z.array(postSchema).parse(postsJson);
export const faqs = z.array(z.object({ q: z.string(), a: z.string() })).parse(faqsJson);

export const getProperty = (slug: string) => allProperties.find((p) => p.slug === slug);
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export function formatPrice(p: Pick<Property, "price" | "transaction">) {
  const v = `RWF ${p.price.toLocaleString("en-US")}`;
  return p.transaction === "rent" ? `${v} / month` : v;
}

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export type Filters = {
  transaction?: "sale" | "rent" | undefined;
  type?: string | undefined;
  location?: string | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  bedrooms?: number | undefined;
  sort?: "newest" | "price-asc" | "price-desc" | undefined;
};

export function filterProperties(list: Property[], f: Filters) {
  let out = list.filter(
    (p) =>
      (!f.transaction || p.transaction === f.transaction) &&
      (!f.type || p.type === f.type) &&
      (!f.location || p.district === f.location || p.city === f.location) &&
      (f.minPrice == null || p.price >= f.minPrice) &&
      (f.maxPrice == null || p.price <= f.maxPrice) &&
      (!f.bedrooms || p.bedrooms >= f.bedrooms),
  );
  if (f.sort === "price-asc") out = [...out].sort((a, b) => a.price - b.price);
  if (f.sort === "price-desc") out = [...out].sort((a, b) => b.price - a.price);
  return out;
}
