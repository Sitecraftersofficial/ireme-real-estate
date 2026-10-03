import { Check } from "lucide-react";
import type { Service } from "@/lib/services";
import { CtaBand, PageHero, WhatsAppForm } from "./Common";

export function ServicePage({ s }: { s: Service }) {
  return (
    <>
      <PageHero eyebrow="IREME Services" title={s.name} text={s.intro} image={s.image} />
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:px-6 lg:grid-cols-2">
        <div>
          <img src={s.image} alt={s.name} loading="lazy" width={1280} height={896} className="aspect-[4/3] w-full rounded-xl object-cover shadow-elegant" />
          <h2 className="mt-10 text-4xl font-semibold text-primary">What we offer</h2>
          <ul className="mt-6 space-y-3">
            {s.points.map((p) => <li key={p} className="flex gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" /> {p}</li>)}
          </ul>
        </div>
        <div>
          <h2 className="mb-6 text-4xl font-semibold text-primary">Request a quote</h2>
          <WhatsAppForm title={`${s.name} enquiry`} fields={[
            { name: "name", label: "Full name", required: true },
            { name: "phone", label: "Phone", type: "tel", required: true },
            { name: "location", label: "Project location" },
            { name: "details", label: "Tell us about your project", type: "textarea", required: true },
          ]} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
