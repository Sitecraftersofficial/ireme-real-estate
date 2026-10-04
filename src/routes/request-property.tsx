import { createFileRoute } from "@tanstack/react-router";
import { PageHero, WhatsAppForm, meta } from "@/components/site/Common";

export const Route = createFileRoute("/request-property")({
  head: () => meta("Request a Property — IREME Real Estate", "Tell us what you are looking for and IREME will search on your behalf."),
  component: () => (
    <>
      <PageHero eyebrow="IREME" title="Request a Property" text="Tell us what you are looking for and IREME will search on your behalf." />
      <section className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <WhatsAppForm title="Request a Property" fields={[{ name: "name", label: "Full name", required: true }, { name: "phone", label: "Phone", type: "tel", required: true }, { name: "deal", label: "Buy or rent", type: "select", options: ["Buy", "Rent"] }, { name: "type", label: "Property type", type: "select", options: ["House", "Apartment", "Villa", "Land", "Commercial", "Office", "Other"] }, { name: "location", label: "Preferred location" }, { name: "budget", label: "Budget (RWF)" }, { name: "details", label: "Other requirements", type: "textarea" }]} />
      </section>
    </>
  ),
});
