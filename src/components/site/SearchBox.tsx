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
    "h-9 w-full rounded-md border border-white/30 bg-white/10 px-2.5 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-gold/60 [&>option]:text-primary";
  const label =
    "mb-0.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/70";

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-white/25 bg-white/10 p-3 shadow-elegant backdrop-blur-md md:p-4"
    >
      <p className="mb-2.5 font-display text-base font-semibold text-white md:text-lg">
        What are you looking for?
      </p>
      <div className="mb-3 inline-flex rounded-md bg-white/10 p-0.5">
        {(["sale", "rent", "land"] as Mode[]).map((m) => (
          <button
            type="button"
            key={m}
            onClick={() => setMode(m)}
            className={`rounded px-3 py-1 text-xs font-bold uppercase tracking-wider transition md:px-4 md:py-1.5 ${mode === m ? "bg-gold text-primary" : "text-white/80 hover:text-white"}`}
          >
            {m === "sale" ? "Buy" : m === "rent" ? "Rent" : "Land"}
          </button>
        ))}
      </div>
      <div className="grid gap-2 md:grid-cols-3 lg:grid-cols-5">
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
      <button className="mt-3 flex h-9 w-full items-center justify-center gap-2 rounded-md bg-gold text-sm font-semibold uppercase tracking-wider text-primary transition hover:brightness-110 md:w-auto md:px-8">
        <Search className="h-4 w-4" /> Search properties
      </button>
    </form>
  );
}
