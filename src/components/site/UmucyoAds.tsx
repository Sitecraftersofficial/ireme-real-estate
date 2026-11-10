import { useEffect, useState } from "react";
import { Phone, X } from "lucide-react";
import { umucyoAds } from "@/lib/data";
import { SectionTitle } from "./Common";

const UMUCYO_PHONES = [
  { display: "0788 992 134", href: "tel:+250788992134" },
  { display: "0785 429 394", href: "tel:+250785429394" },
  { display: "0735 818 085", href: "tel:+250735818085" },
];

/** UMUCYO HOME Ltd room-rate posters — slideshow: one in focus, others as side thumbnails, auto-rotating. */
export function UmucyoAds() {
  const [active, setActive] = useState(0);
  const [big, setBig] = useState<number | null>(null);

  // Auto-rotate every 7s; the timer restarts whenever `active` changes
  // (including a manual pick from the thumbnails or dots).
  useEffect(() => {
    if (umucyoAds.length < 2) return;
    const t = setTimeout(() => setActive((i) => (i + 1) % umucyoAds.length), 7000);
    return () => clearTimeout(t);
  }, [active]);

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
        title="Need a short stay in Gicumbi?"
        text="Clean rooms at the best price. Call to book."
      />
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-6">
        {/* Fixed side slots so nothing jumps — each slot crossfades to its next poster. */}
        {["left", "center", "right"].map((slotName) => {
          const isCenter = slotName === "center";
          const slotIndex = isCenter
            ? active
            : (active + (slotName === "right" ? 1 : 2)) % umucyoAds.length;
          const a = umucyoAds[slotIndex];
          if (!a) return null;
          return (
            <button
              key={slotName}
              type="button"
              onClick={() => (isCenter ? setBig(slotIndex) : setActive(slotIndex))}
              aria-label={isCenter ? "View poster in full size" : `Show poster ${slotIndex + 1}`}
              className={
                (isCenter
                  ? "w-full max-w-md sm:w-96 md:w-[26rem] lg:w-[30rem] xl:w-[34rem]"
                  : "hidden w-48 lg:w-56 xl:w-64 sm:block") +
                " group relative overflow-hidden rounded-xl bg-white transition-shadow duration-700 ease-out " +
                (isCenter ? "shadow-elegant" : "shadow-card opacity-90 hover:opacity-100")
              }
            >
              <div
                className={
                  isCenter
                    ? "flex h-[26rem] w-full items-center justify-center sm:h-[30rem] md:h-[36rem] lg:h-[40rem]"
                    : "flex h-56 w-full items-center justify-center lg:h-72 xl:h-80"
                }
              >
                {/* All posters stacked; only the slot's own poster is visible, crossfading on change. */}
                {umucyoAds.map((p, pi) => (
                  <img
                    key={p.key}
                    src={p.src}
                    alt={pi === slotIndex ? p.alt : ""}
                    aria-hidden={pi !== slotIndex}
                    loading="lazy"
                    width={1080}
                    height={1080}
                    className={
                      "absolute inset-0 mx-auto h-full w-auto max-w-full object-contain transition-opacity duration-1000 ease-in-out " +
                      (pi === slotIndex ? "opacity-100" : "opacity-0")
                    }
                  />
                ))}
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-center gap-2">
        {umucyoAds.map((a, i) => (
          <button
            key={a.key}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show poster ${i + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              i === active ? "w-8 bg-primary" : "w-2.5 bg-primary/30 hover:bg-primary/50"
            }`}
          />
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
