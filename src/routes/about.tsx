import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose, meta } from "@/components/site/Common";

export const Route = createFileRoute("/about")({
  head: () => meta("About IREME — IREME Real Estate", "A Rwandan real estate company helping you buy, sell, rent, build, manage, design and secure property."),
  component: () => (
    <>
      <PageHero eyebrow="IREME" title="About IREME" text="A Rwandan real estate company helping you buy, sell, rent, build, manage, design and secure property." />
      <Prose><p>IREME Real Estate is based in Kigali, Rwanda. We help customers buy, sell and rent homes, apartments and land, and we offer construction, property management, interior design, electrical installation and CCTV and security services.</p><h2>Our promise</h2><p>Your Property. Our Priority. We work with honesty, professionalism and care for every client.</p></Prose>
    </>
  ),
});
