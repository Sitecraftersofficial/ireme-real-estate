import { describe, expect, it } from "vitest";

import { buildHref, searchToString } from "@/router";
import { properties, posts, faqs, site, getProperty, getPost } from "@/lib/data";

describe("Content data", () => {
  it("has valid properties, posts, faqs and site info", () => {
    expect(properties.length).toBeGreaterThan(0);
    expect(posts.length).toBeGreaterThan(0);
    expect(faqs.length).toBeGreaterThan(0);
    expect(site.name).toContain("IREME");
    for (const p of properties) {
      expect(getProperty(p.slug)).toBeDefined();
    }
    for (const p of posts) {
      expect(getPost(p.slug)).toBeDefined();
    }
  });
});

describe("Router helpers", () => {
  it("builds hrefs with path params and search params", () => {
    expect(buildHref("/properties/$slug", { slug: "villa-123" })).toBe("/properties/villa-123");
    expect(searchToString({ transaction: "sale", minPrice: 1000 })).toBe(
      "?transaction=sale&minPrice=1000",
    );
    expect(searchToString({ type: undefined, location: "Kigali" })).toBe("?location=Kigali");
  });
});
