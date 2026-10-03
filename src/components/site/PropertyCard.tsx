import { Link } from "@tanstack/react-router";
import { Bath, BedDouble, Heart, MapPin, Maximize } from "lucide-react";
import { type Property, formatPrice, img } from "@/lib/data";
import { useFavorites } from "@/lib/favorites";

export function StatusBadge({ status }: { status: Property["status"] }) {
  const cls: Record<Property["status"], string> = {
    Available: "bg-success text-primary-foreground",
    Pending: "bg-warning text-foreground",
    Sold: "bg-destructive text-primary-foreground",
    Rented: "bg-primary text-primary-foreground",
    Unavailable: "bg-muted-foreground text-primary-foreground",
  };
  return <span className={`rounded px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${cls[status]}`}>{status}</span>;
}

export function PropertyCard({ p }: { p: Property }) {
  const { isFav, toggle } = useFavorites();
  const fav = isFav(p.slug);
  return (
    <article className="group overflow-hidden rounded-lg border border-border bg-card transition hover:-translate-y-1 hover:shadow-elegant">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link to="/properties/$slug" params={{ slug: p.slug }}>
          <img src={img(p.images[0])} alt={p.title} loading="lazy" width={1280} height={896} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        </Link>
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span className="rounded bg-background/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">For {p.transaction === "sale" ? "Sale" : "Rent"}</span>
          {p.featured && <span className="rounded bg-gold px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-foreground">Featured</span>}
        </div>
        <button onClick={() => toggle(p.slug)} aria-label={fav ? "Remove from favorites" : "Save to favorites"} className="absolute right-3 top-3 rounded-full bg-background/95 p-2">
          <Heart className={`h-4 w-4 ${fav ? "fill-destructive text-destructive" : "text-primary"}`} />
        </button>
        <div className="absolute bottom-3 left-3"><StatusBadge status={p.status} /></div>
      </div>
      <div className="p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">{p.type}{p.sample && " · Sample"}</p>
        <Link to="/properties/$slug" params={{ slug: p.slug }}><h3 className="mt-1 text-2xl font-semibold text-primary">{p.title}</h3></Link>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="h-4 w-4" /> {p.district}, {p.city}</p>
        <p className="mt-3 text-lg font-bold text-primary">{formatPrice(p)}</p>
        <div className="mt-4 flex gap-5 border-t border-border pt-4 text-sm text-muted-foreground">
          {p.bedrooms > 0 && <span className="flex items-center gap-1.5"><BedDouble className="h-4 w-4" /> {p.bedrooms} Beds</span>}
          {p.bathrooms > 0 && <span className="flex items-center gap-1.5"><Bath className="h-4 w-4" /> {p.bathrooms} Baths</span>}
          <span className="flex items-center gap-1.5"><Maximize className="h-4 w-4" /> {p.size.toLocaleString()} m²</span>
        </div>
      </div>
    </article>
  );
}
