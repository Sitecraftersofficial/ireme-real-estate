import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose, meta } from "@/components/site/Common";
import { faqs } from "@/lib/data";

export const Route = createFileRoute("/faqs")({
  head: () => meta("FAQs — IREME Real Estate", "Answers to common questions about buying, renting and listing property with IREME."),
  component: () => (
    <>
      <PageHero eyebrow="Help" title="Frequently asked questions" />
      <Prose>{faqs.map((f) => (
        <details key={f.q} className="rounded-lg border border-border bg-card p-5">
          <summary className="cursor-pointer font-semibold text-primary">{f.q}</summary>
          <p className="mt-3">{f.a}</p>
        </details>
      ))}</Prose>
    </>
  ),
});
