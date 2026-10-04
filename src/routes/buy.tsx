import { createFileRoute } from "@tanstack/react-router";
import { Listing } from "@/components/site/Listing";
import { PageHero, meta } from "@/components/site/Common";
import { img } from "@/lib/data";

export const Route = createFileRoute("/buy")({
  head: () => meta("Properties for Sale in Kigali — IREME Real Estate", "Houses, villas and apartments for sale in Kigali, Gasabo, Kicukiro and Nyarugenge. Prices in RWF."),
  component: () => (
    <>
      <PageHero eyebrow="Buy" title="Properties for sale" text="Homes and investment properties ready for you to own." image={img("house")} />
      <Listing initial={{ transaction: "sale" }} lockTransaction />
    </>
  ),
});
