import { createFileRoute } from "@tanstack/react-router";
import { PageHero, WhatsAppForm, meta } from "@/components/site/Common";

export const Route = createFileRoute("/contact")({
  head: () => meta("Contact IREME — IREME Real Estate", "Call 0788289323, message us on WhatsApp, or send us your enquiry below. Based in Kigali, Rwanda."),
  component: () => (
    <>
      <PageHero eyebrow="IREME" title="Contact IREME" text="Call 0788289323, message us on WhatsApp, or send us your enquiry below. Based in Kigali, Rwanda." />
      <section className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <WhatsAppForm title="Contact IREME" fields={[{ name: "name", label: "Full name", required: true }, { name: "phone", label: "Phone", type: "tel", required: true }, { name: "subject", label: "Subject" }, { name: "message", label: "Message", type: "textarea", required: true }]} />
      </section>
    </>
  ),
});
