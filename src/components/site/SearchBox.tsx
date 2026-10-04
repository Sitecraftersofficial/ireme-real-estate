import { useRouter } from "@/router";
import { useState } from "react";
import { Search } from "lucide-react";
import { PROPERTY_TYPES, site } from "@/lib/data";

type Mode = "sale" | "rent" | "land";

export function SearchBox() {
  const { navigate } = useRouter();
  const [mode, setMode] = useState<Mode>("sale");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [minPrice, setMin] = useState("");
  const [maxPrice, setMax] = useState("");
  const [bedrooms, setBeds] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/properties", {
      transaction: mode === "rent" ? "rent" : "sale",
      type: mode === "land" ? "Land" : type || undefined,
      location: location || undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      bedrooms: bedrooms ? Number(bedrooms) : undefined,
    });
  };

  const field =
    "h-12 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring";
  const label =
    "mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground";

  return (
    <form onSubmit={submit} className="rounded-xl bg-card p-5 shadow-elegant md:p-6">
      <p className="mb-4 font-display text-2xl font-semibold text-primary">
        What are you looking for?
      </p>
      <div className="mb-5 inline-flex rounded-md bg-secondary p-1">
        {(["sale", "rent", "land"] as Mode[]).map((m) => (
          <button
            type="button"
            key={m}
            onClick={() => setMode(m)}
            className={`rounded px-5 py-2 text-sm font-bold uppercase tracking-wider transition ${mode === m ? "bg-primary text-primary-foreground" : "text-primary"}`}
          >
            {m === "sale" ? "Buy" : m === "rent" ? "Rent" : "Land"}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <div>
          <label className={label}>Location</label>
          <select className={field} value={location} onChange={(e) => setLocation(e.target.value)}>
            <option value="">All locations</option>
            {site.locations.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </div>
        {mode !== "land" && (
          <div>
            <label className={label}>Property type</label>
            <select className={field} value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">Any type</option>
              {PROPERTY_TYPES.filter((t) => t !== "Land").map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label className={label}>Min price (RWF)</label>
          <input
            inputMode="numeric"
            className={field}
            placeholder="Minimum"
            value={minPrice}
            onChange={(e) => setMin(e.target.value.replace(/\D/g, ""))}
          />
        </div>
        <div>
          <label className={label}>Max price (RWF)</label>
          <input
            inputMode="numeric"
            className={field}
            placeholder="Maximum"
            value={maxPrice}
            onChange={(e) => setMax(e.target.value.replace(/\D/g, ""))}
          />
        </div>
        {mode !== "land" && (
          <div>
            <label className={label}>Bedrooms</label>
            <select className={field} value={bedrooms} onChange={(e) => setBeds(e.target.value)}>
              <option value="">Any</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}+
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <button className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-primary font-semibold uppercase tracking-wider text-primary-foreground hover:bg-navy-deep md:w-auto md:px-10">
        <Search className="h-4 w-4" /> Search properties
      </button>
    </form>
  );
}
