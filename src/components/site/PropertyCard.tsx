import { Link } from "@/router";
import { ArrowRight, Bath, BedDouble, MapPin, Maximize } from "lucide-react";
import { type Property, formatPrice, img } from "@/lib/data";
import { ShareButton } from "./ShareButton";

export function StatusBadge({ status }: { status: Property["status"] }) {
  const cls: Record<Property["status"], string> = {
    Available: "bg-success text-primary-foreground",
    Pending: "bg-warning text-foreground",
    Sold: "bg-destructive text-primary-foreground",
    Rented: "bg-primary text-primary-foreground",
    Unavailable: "bg-muted-foreground text-primary-foreground",
  };
  return (
    <span
      className={`rounded px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${cls[status]}`}
    >
      {status}
    </span>
  );
}

export function PropertyCard({ p }: { p: Property }) {
  return (
    <article className="group relative cursor-pointer overflow-hidden rounded-lg border border-border bg-card transition hover:-translate-y-1 hover:shadow-elegant">
      {/* Whole-card link (stretched over the card, under the floating buttons) */}
      <Link
        to="/properties/$slug"
        params={{ slug: p.slug }}
        className="absolute inset-0 z-0"
        aria-label={`View details of ${p.title}`}
      />

      <div className="relative z-10 pointer-events-none">
        <div className="relative aspect-4/3 overflow-hidden">
          <img
            src={img(p.images[0])}
            alt={p.title}
            loading="lazy"
            width={1280}
            height={896}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            <span className="rounded bg-background/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
              For {p.transaction === "sale" ? "Sale" : "Rent"}
            </span>
            {p.featured && (
              <span className="rounded bg-gold px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-foreground">
                Featured
              </span>
            )}
          </div>
          <div className="pointer-events-auto absolute right-3 top-3">
            <ShareButton
              slug={p.slug}
              title={p.title}
              className="cursor-pointer rounded-full bg-background/95 p-2 text-primary hover:text-gold"
            />
          </div>
          <div className="absolute bottom-3 left-3">
            <StatusBadge status={p.status} />
          </div>
        </div>
        <div className="p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">{p.type}</p>
          <h3 className="mt-1 text-2xl font-semibold text-primary">{p.title}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" /> {p.district}, {p.city}
          </p>
          <p className="mt-3 text-lg font-bold text-primary">{formatPrice(p)}</p>
          <div className="mt-4 flex gap-5 border-t border-border pt-4 text-sm text-muted-foreground">
            {p.bedrooms > 0 && (
              <span className="flex items-center gap-1.5">
                <BedDouble className="h-4 w-4" /> {p.bedrooms} Beds
              </span>
            )}
            {p.bathrooms > 0 && (
              <span className="flex items-center gap-1.5">
                <Bath className="h-4 w-4" /> {p.bathrooms} Baths
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Maximize className="h-4 w-4" /> {p.size.toLocaleString()} m²
            </span>
          </div>
          <Link
            to="/properties/$slug"
            params={{ slug: p.slug }}
            className="pointer-events-auto mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 font-semibold text-primary-foreground transition hover:bg-navy-deep"
          >
            View details <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
