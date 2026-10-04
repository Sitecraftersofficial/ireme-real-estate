import { createFileRoute } from "@tanstack/react-router";
import { PageHero, WhatsAppForm, meta } from "@/components/site/Common";

export const Route = createFileRoute("/list-property")({
  head: () => meta("Sell or Rent Your Property — IREME Real Estate", "List your house, apartment or land with IREME and reach serious buyers and tenants."),
  component: () => (
    <>
      <PageHero eyebrow="IREME" title="Sell or Rent Your Property" text="List your house, apartment or land with IREME and reach serious buyers and tenants." />
      <section className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <WhatsAppForm title="Sell or Rent Your Property" fields={[{ name: "name", label: "Full name", required: true }, { name: "phone", label: "Phone", type: "tel", required: true }, { name: "deal", label: "Sell or rent out", type: "select", options: ["Sell", "Rent out"] }, { name: "type", label: "Property type", type: "select", options: ["House", "Apartment", "Villa", "Land", "Commercial", "Office", "Other"] }, { name: "location", label: "Location", required: true }, { name: "price", label: "Expected price (RWF)" }, { name: "details", label: "Property details", type: "textarea" }]} />
      </section>
    </>
  ),
});
