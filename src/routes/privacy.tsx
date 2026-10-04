import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose, meta } from "@/components/site/Common";

export const Route = createFileRoute("/privacy")({
  head: () => meta("Privacy Policy — IREME Real Estate", "How IREME handles the information you share with us."),
  component: () => (
    <>
      <PageHero eyebrow="IREME" title="Privacy Policy" text="How IREME handles the information you share with us." />
      <Prose><p>This website does not store the information you type into its forms. When you send a form, it opens WhatsApp (or email) so you can send your message directly to IREME.</p><p>We use your details only to respond to your enquiry. Saved favourites stay in your own browser.</p></Prose>
    </>
  ),
});
