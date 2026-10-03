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

/** Image keys usable from the JSON files. Add a file to src/assets and register it here. */
export const images: Record<string, string> = {
  hero, house, apartment, land, interior, construction, electrical, cctv,
};
export const img = (key: string) => images[key] ?? house;

export const PROPERTY_TYPES = ["House", "Apartment", "Villa", "Land", "Commercial", "Office", "Warehouse", "Other"] as const;
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
  description: z.string(),
  features: z.array(z.string()),
});
export type Property = z.infer<typeof propertySchema>;

const postSchema = z.object({
  slug: z.string(), title: z.string(), excerpt: z.string(), date: z.string(),
  image: z.string(), body: z.array(z.string()),
});
export type Post = z.infer<typeof postSchema>;

export const site = z.object({
  name: z.string(), tagline: z.string(), phone: z.string(), phoneIntl: z.string(),
  whatsapp: z.string(), email: z.string(), address: z.string(), hours: z.string(),
  socials: z.record(z.string(), z.string()), locations: z.array(z.string()),
}).parse(siteJson);

export const properties: Property[] = z.array(propertySchema).parse(propertiesJson);
export const posts: Post[] = z.array(postSchema).parse(postsJson);
export const faqs = z.array(z.object({ q: z.string(), a: z.string() })).parse(faqsJson);

export const getProperty = (slug: string) => properties.find((p) => p.slug === slug);
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export function formatPrice(p: Pick<Property, "price" | "transaction">) {
  const v = `RWF ${p.price.toLocaleString("en-US")}`;
  return p.transaction === "rent" ? `${v} / month` : v;
}

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export type Filters = {
  transaction?: "sale" | "rent";
  type?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  sort?: "newest" | "price-asc" | "price-desc";
};

export function filterProperties(list: Property[], f: Filters) {
  let out = list.filter((p) =>
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
