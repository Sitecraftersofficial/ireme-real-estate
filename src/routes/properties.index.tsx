import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Listing } from "@/components/site/Listing";
import { PageHero, meta } from "@/components/site/Common";
import { img } from "@/lib/data";

const search = z.object({
  transaction: z.enum(["sale", "rent"]).optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  bedrooms: z.number().optional(),
});

export const Route = createFileRoute("/properties/")({
  validateSearch: (s) => search.parse(s),
  head: () => meta("Properties in Kigali — IREME Real Estate", "Browse houses, apartments, villas, land and commercial properties for sale and rent in Kigali."),
  component: Page,
});

function Page() {
  const s = Route.useSearch();
  return (
    <>
      <PageHero eyebrow="Properties" title="Explore properties across Kigali" text="Filter by location, type, price and bedrooms to find the right fit." image={img("apartment")} />
      <Listing key={JSON.stringify(s)} initial={s} />
    </>
  );
}
