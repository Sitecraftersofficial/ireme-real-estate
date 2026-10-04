import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Handshake, ShieldCheck, Users, Home as HomeIcon, Key, LandPlot } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { posts, properties, img } from "@/lib/data";
import { services } from "@/lib/services";
import { SearchBox } from "@/components/site/SearchBox";
import { PropertyCard } from "@/components/site/PropertyCard";
import { CtaBand, SectionTitle, meta } from "@/components/site/Common";

export const Route = createFileRoute("/")({
  head: () => meta("IREME Real Estate — Homes, Apartments & Land in Kigali", "Find homes, apartments, land and investment properties across Kigali and Rwanda with IREME Real Estate. Your Property. Our Priority."),
  component: Index,
});

function Index() {
  const featured = properties.filter((p) => p.featured).slice(0, 6);
  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy-deep text-primary-foreground">
        <img src={hero} alt="Modern villa in Kigali at dusk" width={1920} height={1088} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep via-navy-deep/70 to-navy-deep/10" />
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-20 md:px-6 md:pt-32">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Real estate in Rwanda</p>
          <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[1.05] md:text-7xl">Find a property you'll be proud to call home.</h1>
          <p className="mt-6 max-w-xl text-lg text-primary-foreground/85">Discover homes, apartments, land and investment properties across Kigali and Rwanda.</p>
          <div className="mt-12 text-foreground"><SearchBox /></div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-16 md:grid-cols-3 md:px-6">
        {[
          { to: "/buy" as const, icon: HomeIcon, t: "Buy a property", d: "Houses, villas and apartments for sale." },
          { to: "/rent" as const, icon: Key, t: "Rent a property", d: "Quality homes and apartments to rent." },
          { to: "/land" as const, icon: LandPlot, t: "Find land", d: "Residential and commercial plots." },
        ].map(({ to, icon: Icon, t, d }) => (
          <Link key={to} to={to} className="group flex items-center gap-5 rounded-lg border border-border bg-card p-6 transition hover:border-gold hover:shadow-elegant">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-soft text-primary"><Icon className="h-6 w-6" /></span>
            <div className="flex-1"><p className="font-display text-2xl font-semibold text-primary">{t}</p><p className="text-sm text-muted-foreground">{d}</p></div>
            <ArrowRight className="h-5 w-5 text-gold transition group-hover:translate-x-1" />
          </Link>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionTitle eyebrow="Featured" title="Featured properties" text="A selection of properties currently handled by IREME." />
          <Link to="/properties" className="flex items-center gap-2 font-semibold text-primary hover:text-gold">View all properties <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">{featured.map((p) => <PropertyCard key={p.slug} p={p} />)}</div>
      </section>

      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionTitle center eyebrow="Beyond buying & renting" title="Complete property solutions" text="We build, sell, rent and manage properties — and help you design and secure them." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {services.map((s) => (
              <Link key={s.to} to={s.to} className="group overflow-hidden rounded-lg bg-card transition hover:shadow-elegant">
                <img src={s.image} alt={s.name} loading="lazy" width={1280} height={896} className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="p-5"><p className="font-display text-xl font-semibold text-primary">{s.name}</p><p className="mt-1 text-sm text-muted-foreground">{s.short}</p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <SectionTitle center eyebrow="Why IREME" title="Your trust, our commitment" />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { i: ShieldCheck, t: "Trusted partner", d: "Honest guidance and transparent dealings." },
            { i: Users, t: "Professional team", d: "Experienced people who know Kigali." },
            { i: Award, t: "Quality workmanship", d: "High standards on every project." },
            { i: Handshake, t: "Competitive prices", d: "Fair value for buyers, tenants and owners." },
          ].map(({ i: Icon, t, d }) => (
            <div key={t} className="text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold text-gold"><Icon className="h-7 w-7" /></span>
              <p className="mt-5 font-display text-2xl font-semibold text-primary">{t}</p>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-20 md:grid-cols-2 md:px-6">
        <div className="rounded-xl bg-primary p-10 text-primary-foreground">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">Property owners</p>
          <h3 className="mt-3 text-4xl font-semibold">Sell or rent out your property with IREME</h3>
          <Link to="/list-property" className="mt-6 inline-block rounded-md bg-gold px-6 py-3 font-semibold text-foreground">List your property</Link>
        </div>
        <div className="rounded-xl border border-border bg-card p-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">Can't find it?</p>
          <h3 className="mt-3 text-4xl font-semibold text-primary">Tell us what you're looking for</h3>
          <Link to="/request-property" className="mt-6 inline-block rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground">Request a property</Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
        <SectionTitle eyebrow="Property insights" title="Latest from our blog" />
        <div className="mt-10 grid gap-7 md:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group">
              <img src={img(p.image)} alt={p.title} loading="lazy" width={1280} height={896} className="aspect-[16/10] w-full rounded-lg object-cover" />
              <p className="mt-4 font-display text-2xl font-semibold text-primary group-hover:text-gold">{p.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
