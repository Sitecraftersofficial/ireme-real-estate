import { createFileRoute } from "@tanstack/react-router";
import { Listing } from "@/components/site/Listing";
import { PageHero, meta } from "@/components/site/Common";
import { img } from "@/lib/data";

export const Route = createFileRoute("/rent")({
  head: () => meta("Properties for Rent in Kigali — IREME Real Estate", "Houses and apartments for rent in Kigali with monthly prices in RWF."),
  component: () => (
    <>
      <PageHero eyebrow="Rent" title="Properties for rent" text="Comfortable homes and apartments to rent across Kigali." image={img("apartment")} />
      <Listing initial={{ transaction: "rent" }} lockTransaction />
    </>
  ),
});
