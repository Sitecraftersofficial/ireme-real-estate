import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Bath, BedDouble, Check, MapPin, Maximize, MessageCircle, Phone } from "lucide-react";
import { formatPrice, getProperty, img, properties, site, whatsappLink } from "@/lib/data";
import { PropertyCard, StatusBadge } from "@/components/site/PropertyCard";
import { WhatsAppForm } from "@/components/site/Common";

export const Route = createFileRoute("/properties/$slug")({
  loader: ({ params }) => {
    const property = getProperty(params.slug);
    if (!property) throw notFound();
    return { property };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Property not found — IREME" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.property;
    const t = `${p.title}, ${p.district} — IREME Real Estate`;
    const d = `${formatPrice(p)} · ${p.type} for ${p.transaction} in ${p.district}, ${p.city}.`;
    return { meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  notFoundComponent: NotFound,
  component: Page,
});

function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-4xl font-semibold text-primary">Property not found</h1>
      <Link to="/properties" className="mt-6 inline-block rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground">Browse properties</Link>
    </div>
  );
}

function Page() {
  const { property: p } = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const similar = properties.filter((x) => x.slug !== p.slug && (x.type === p.type || x.transaction === p.transaction)).slice(0, 3);
  const waMsg = `Hello IREME, I'm interested in "${p.title}" (${p.district}, ${formatPrice(p)}). Is it still available?`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <nav className="mb-6 text-sm text-muted-foreground"><Link to="/properties" className="hover:text-primary">Properties</Link> / {p.title}</nav>
      {p.sample && <p className="mb-6 rounded-md border border-gold bg-gold-soft px-4 py-3 text-sm">This is a sample listing used for demonstration. Real IREME listings will replace it.</p>}
      <div className="grid gap-4 lg:grid-cols-[1fr_140px]">
        <img src={img(p.images[active])} alt={p.title} width={1280} height={896} className="aspect-[16/10] w-full rounded-xl object-cover" />
        <div className="flex gap-3 lg:flex-col">
          {p.images.map((k, i) => (
            <button key={k + i} onClick={() => setActive(i)} className={`overflow-hidden rounded-lg border-2 ${i === active ? "border-gold" : "border-transparent"}`}>
              <img src={img(k)} alt="" loading="lazy" width={280} height={196} className="aspect-[4/3] w-28 object-cover lg:w-full" />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_400px]">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={p.status} />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-gold">{p.type} · For {p.transaction === "sale" ? "sale" : "rent"}</span>
          </div>
          <h1 className="mt-3 text-5xl font-semibold text-primary">{p.title}</h1>
          <p className="mt-2 flex items-center gap-1.5 text-muted-foreground"><MapPin className="h-4 w-4" /> {p.district}, {p.city}</p>
          <p className="mt-5 text-3xl font-bold text-primary">{formatPrice(p)}</p>
          <div className="mt-6 flex flex-wrap gap-8 border-y border-border py-5">
            {p.bedrooms > 0 && <span className="flex items-center gap-2"><BedDouble className="h-5 w-5 text-gold" /> {p.bedrooms} Bedrooms</span>}
            {p.bathrooms > 0 && <span className="flex items-center gap-2"><Bath className="h-5 w-5 text-gold" /> {p.bathrooms} Bathrooms</span>}
            <span className="flex items-center gap-2"><Maximize className="h-5 w-5 text-gold" /> {p.size.toLocaleString()} m²</span>
          </div>
          <h2 className="mt-10 text-3xl font-semibold text-primary">Description</h2>
          <p className="mt-3 leading-relaxed text-foreground/85">{p.description}</p>
          <h2 className="mt-10 text-3xl font-semibold text-primary">Features</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">{p.features.map((f) => <li key={f} className="flex gap-2"><Check className="h-5 w-5 text-gold" /> {f}</li>)}</ul>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <a href={whatsappLink(waMsg)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-md bg-success py-4 font-semibold text-primary-foreground"><MessageCircle className="h-5 w-5" /> Chat about this property on WhatsApp</a>
          <a href={`tel:${site.phoneIntl}`} className="flex items-center justify-center gap-2 rounded-md border border-border py-4 font-semibold"><Phone className="h-5 w-5" /> Call {site.phone}</a>
          <h2 className="pt-4 text-2xl font-semibold text-primary">Request a viewing</h2>
          <WhatsAppForm title={`Viewing request: ${p.title}`} submitLabel="Request viewing" defaults={{ property: `${p.title} (${p.district})` }} fields={[
            { name: "property", label: "Property" },
            { name: "name", label: "Full name", required: true },
            { name: "phone", label: "Phone", type: "tel", required: true },
            { name: "date", label: "Preferred date", type: "date" },
            { name: "message", label: "Message", type: "textarea" },
          ]} />
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="mt-20">
          <h2 className="text-4xl font-semibold text-primary">Similar properties</h2>
          <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">{similar.map((x) => <PropertyCard key={x.slug} p={x} />)}</div>
        </section>
      )}
    </div>
  );
}
