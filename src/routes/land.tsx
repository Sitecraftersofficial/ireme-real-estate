import { createFileRoute } from "@tanstack/react-router";
import { Listing } from "@/components/site/Listing";
import { PageHero, meta } from "@/components/site/Common";
import { img } from "@/lib/data";

export const Route = createFileRoute("/land")({
  head: () => meta("Land for Sale in Kigali — IREME Real Estate", "Residential and commercial plots for sale in Kigali and across Rwanda."),
  component: () => (
    <>
      <PageHero eyebrow="Land" title="Land & plots for sale" text="Prime plots for residential, commercial and investment purposes." image={img("land")} />
      <Listing initial={{ type: "Land" }} lockType />
    </>
  ),
});
