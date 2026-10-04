import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose, meta } from "@/components/site/Common";

export const Route = createFileRoute("/disclaimer")({
  head: () => meta("Property Listing Disclaimer — IREME Real Estate", "Important information about the listings shown on this website."),
  component: () => (
    <>
      <PageHero eyebrow="IREME" title="Property Listing Disclaimer" text="Important information about the listings shown on this website." />
      <Prose><p>Listings are provided in good faith but may contain errors or be out of date. Always confirm details, ownership and land titles before any payment. Listings marked as samples are for demonstration only.</p></Prose>
    </>
  ),
});
