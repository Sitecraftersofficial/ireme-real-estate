import {
  ArrowRight,
  ChevronDown,
  CircleUserRound,
  ListChecks,
  MessageCircle,
  Phone,
  Wrench,
} from "lucide-react";
import type { Service } from "@/lib/services";
import { services } from "@/lib/services";
import { site, whatsappLink } from "@/lib/data";
import { Link } from "@/router";
import { PageHero, WhatsAppForm } from "./Common";

export function ServicePage({ s }: { s: Service }) {
  const waMsg = `Hello IREME, I'd like to enquire about your ${s.name.toLowerCase()} service.`;

  return (
    <>
      <PageHero eyebrow={s.heroTagline} title={s.name} text={s.intro} image={s.image} />

      {/* Intro + image */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <img
            src={s.image}
            alt={s.name}
            loading="lazy"
            width={1280}
            height={896}
            className="aspect-4/3 w-full rounded-xl object-cover shadow-elegant"
          />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">The IREME approach</p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-primary">
              Why work with us on {s.name.toLowerCase()}
            </h2>
            {s.description.map((para) => (
              <p key={para.slice(0, 30)} className="mt-4 leading-relaxed text-foreground/85">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">What's included</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-primary">What we offer</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {s.offerings.map((o) => (
              <div key={o.title} className="rounded-xl border border-border bg-card p-6 transition hover:shadow-elegant">
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-soft text-primary">
                    <Wrench className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display text-xl font-semibold text-primary">{o.title}</p>
                    <p className="mt-1.5 text-sm text-muted-foreground">{o.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">How it works</p>
        <h2 className="mt-3 font-display text-4xl font-semibold text-primary">
          Getting started is simple
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-4">
          {s.process.map((step, i) => (
            <div key={step.t} className="relative">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-display text-lg font-bold text-primary-foreground">
                {i + 1}
              </span>
              {i < s.process.length - 1 && (
                <span className="absolute left-5 top-10 hidden h-8 w-px bg-border md:block" aria-hidden />
              )}
              <p className="mt-4 font-display text-xl font-semibold text-primary">{step.t}</p>
              <p className="mt-1.5 text-sm text-muted-foreground">{step.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ideal for + quote form */}
      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">Is this for you?</p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-primary">Who this service is for</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {s.idealFor.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                  <CircleUserRound className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <span className="text-sm text-foreground/85">{item}</span>
                </li>
              ))}
            </ul>

            {/* FAQs */}
            <p className="mt-16 text-xs font-bold uppercase tracking-[0.25em] text-gold">Common questions</p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-primary">FAQs</h2>
            <div className="mt-8 space-y-3">
              {s.faqs.map((f) => (
                <details key={f.q} className="group rounded-lg border border-border bg-card p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-primary">
                    {f.q}
                    <ChevronDown className="h-4 w-4 shrink-0 text-gold transition group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          {/* Quote sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-xl bg-primary p-6 text-primary-foreground">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-gold">
                <ListChecks className="h-4 w-4" /> Request a quote
              </p>
              <p className="mt-3 text-sm text-primary-foreground/85">
                Tell us about your project and we'll respond with next steps and an honest assessment.
              </p>
              <a
                href={`tel:${site.phoneIntl}`}
                className="mt-4 flex items-center justify-center gap-2 rounded-md bg-gold px-6 py-3 font-semibold text-foreground transition hover:opacity-90"
              >
                <Phone className="h-4 w-4" /> Call {site.phone}
              </a>
              <a
                href={whatsappLink(waMsg)}
                target="_blank"
                rel="noreferrer"
                className="mt-2 flex items-center justify-center gap-2 rounded-md border border-primary-foreground/30 px-6 py-3 font-semibold transition hover:border-gold hover:text-gold"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp us
              </a>
            </div>
            <WhatsAppForm
              title={`${s.name} enquiry`}
              fields={[
                { name: "name", label: "Full name", required: true },
                { name: "phone", label: "Phone", type: "tel", required: true },
                { name: "location", label: "Project location" },
                {
                  name: "details",
                  label: "Tell us about your project",
                  type: "textarea",
                  required: true,
                },
              ]}
            />
          </aside>
        </div>
      </section>

      {/* Other services */}
      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="font-display text-3xl font-semibold text-primary">Explore our other services</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.filter((x) => x.to !== s.to).map((o) => (
              <Link
                key={o.to}
                to={o.to}
                className="group overflow-hidden rounded-lg bg-card transition hover:shadow-elegant"
              >
                <img
                  src={o.image}
                  alt={o.name}
                  loading="lazy"
                  width={1280}
                  height={896}
                  className="aspect-4/3 w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="flex items-center justify-between gap-2 p-4">
                  <p className="font-display text-lg font-semibold text-primary">{o.name}</p>
                  <ArrowRight className="h-4 w-4 shrink-0 text-gold transition group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
