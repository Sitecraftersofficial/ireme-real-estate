import { useEffect, useState } from "react";
import { Phone, X } from "lucide-react";
import { umucyoAds } from "@/lib/data";
import { SectionTitle } from "./Common";

const UMUCYO_PHONES = [
  { display: "0788 992 134", href: "tel:+250788992134" },
  { display: "0785 429 394", href: "tel:+250785429394" },
  { display: "0735 818 085", href: "tel:+250735818085" },
];

/** UMUCYO HOME Ltd room-rate posters — shown as-is, all three side by side. */
export function UmucyoAds() {
  const [big, setBig] = useState<number | null>(null);

  useEffect(() => {
    if (big === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setBig(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [big]);

  if (!umucyoAds.length) return null;
  const selected = big !== null ? umucyoAds[big] : null;

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
      <SectionTitle
        center
        eyebrow="UMUCYO HOME Ltd"
        title="Need a short stay in Kigali?"
        text="Clean rooms at the best price. Call to book."
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {umucyoAds.map((a, i) => (
          <button
            key={a.key}
            type="button"
            onClick={() => setBig(i)}
            aria-label={`View poster ${i + 1} in full size`}
            className="block overflow-hidden rounded-xl bg-white shadow-elegant transition hover:-translate-y-1"
          >
            <img
              src={a.src}
              alt={a.alt}
              loading="lazy"
              width={1080}
              height={1080}
              className="h-auto w-full object-contain"
            />
          </button>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {UMUCYO_PHONES.map((p) => (
          <a
            key={p.href}
            href={p.href}
            className="flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:bg-navy-deep"
          >
            <Phone className="h-5 w-5" /> Call to book: {p.display}
          </a>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={selected.alt}
          onClick={() => setBig(null)}
        >
          <img
            src={selected.src}
            alt={selected.alt}
            className="max-h-[90vh] max-w-full rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setBig(null)}
            aria-label="Close poster"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      )}
    </section>
  );
}
