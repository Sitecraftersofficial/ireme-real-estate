import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose, meta } from "@/components/site/Common";

export const Route = createFileRoute("/terms")({
  head: () => meta("Terms & Conditions — IREME Real Estate", "Terms for using the IREME Real Estate website."),
  component: () => (
    <>
      <PageHero eyebrow="IREME" title="Terms & Conditions" text="Terms for using the IREME Real Estate website." />
      <Prose><p>Information on this website is provided for general guidance. Property details, prices and availability may change without notice. Agreements are only binding when made in writing with IREME.</p></Prose>
    </>
  ),
});
