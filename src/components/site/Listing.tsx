import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { PROPERTY_TYPES, type Filters, filterProperties, properties, site } from "@/lib/data";
import { PropertyCard } from "./PropertyCard";

export function Listing({ initial, lockTransaction, lockType }: { initial?: Filters; lockTransaction?: boolean; lockType?: boolean }) {
  const [f, setF] = useState<Filters>(initial ?? {});
  const list = useMemo(() => filterProperties(properties, f), [f]);
  const set = (k: keyof Filters, v: string) =>
    setF((o) => ({ ...o, [k]: v === "" ? undefined : ["minPrice", "maxPrice", "bedrooms"].includes(k) ? Number(v) : v }));
  const field = "h-11 rounded-md border border-input bg-background px-3 text-sm";

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <div className="mb-8 flex flex-wrap items-end gap-3 rounded-lg border border-border bg-card p-4">
        {!lockTransaction && (
          <select className={field} value={f.transaction ?? ""} onChange={(e) => set("transaction", e.target.value)} aria-label="Buy or rent">
            <option value="">Buy & rent</option><option value="sale">For sale</option><option value="rent">For rent</option>
          </select>)}
        {!lockType && (
          <select className={field} value={f.type ?? ""} onChange={(e) => set("type", e.target.value)} aria-label="Property type">
            <option value="">Any type</option>{PROPERTY_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>)}
        <select className={field} value={f.location ?? ""} onChange={(e) => set("location", e.target.value)} aria-label="Location">
          <option value="">All locations</option>{site.locations.map((l) => <option key={l}>{l}</option>)}
        </select>
        <input className={`${field} w-36`} inputMode="numeric" placeholder="Min RWF" value={f.minPrice ?? ""} onChange={(e) => set("minPrice", e.target.value.replace(/\D/g, ""))} />
        <input className={`${field} w-36`} inputMode="numeric" placeholder="Max RWF" value={f.maxPrice ?? ""} onChange={(e) => set("maxPrice", e.target.value.replace(/\D/g, ""))} />
        {!lockType && (
          <select className={field} value={f.bedrooms ?? ""} onChange={(e) => set("bedrooms", e.target.value)} aria-label="Bedrooms">
            <option value="">Any beds</option>{[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}+ beds</option>)}
          </select>)}
        <select className={`${field} ml-auto`} value={f.sort ?? "newest"} onChange={(e) => set("sort", e.target.value)} aria-label="Sort">
          <option value="newest">Newest</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option>
        </select>
      </div>
      <p className="mb-6 text-sm text-muted-foreground">{list.length} {list.length === 1 ? "property" : "properties"} found</p>
      {list.length ? (
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => <PropertyCard key={p.slug} p={p} />)}</div>
      ) : (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <p className="font-display text-2xl text-primary">No properties match your search yet.</p>
          <p className="mt-2 text-muted-foreground">Tell us what you need and we will find it for you.</p>
          <Link to="/request-property" className="mt-6 inline-block rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground">Request a property</Link>
        </div>
      )}
    </section>
  );
}
