import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Check, Copy, MessageCircle, Share2, X } from "lucide-react";
import {
  type Property,
  buildPropertyUrl,
  formatPrice,
  site,
  whatsappLink,
} from "@/lib/data";

function featureEmoji(feature: string) {
  const value = feature.toLowerCase();
  if (value.includes("bedroom")) return "🛏️";
  if (value.includes("furnished") || value.includes("living room")) return "🛋️";
  if (value.includes("dining")) return "🍽️";
  if (value.includes("bathroom") || value.includes("shower")) return "🚿";
  if (value.includes("ideal")) return "🏡";
  return "✨";
}

/** Share a property's full details, one photo link, and its specific page URL. */
export function ShareButton({
  property,
  className = "",
}: {
  property: Property;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { slug, title } = property;
  const url = buildPropertyUrl(slug);
  const shareText = [
    title.toUpperCase(),
    "",
    "🏠 PROPERTY FEATURES:",
    ...property.features.map((feature) => `${featureEmoji(feature)} ${feature}`),
    "",
    `📍 Location: ${property.district}, ${property.city}, Rwanda`,
    `💰 ${property.transaction === "rent" ? "Monthly Rent" : "Price"}: ${formatPrice(property)}`,
    "",
    property.description,
    "",
    ...(property.transaction === "rent"
      ? ["🔥 Don't miss this opportunity to secure a beautiful and spacious home!", ""]
      : []),
    "📞 BOOK YOUR SITE VISIT TODAY!",
    `Call / WhatsApp: ${site.phone}`,
    "",
    `🏡 View this property: ${url}`,
  ].join("\n");
  const companyMessage = `Hello ${site.name}, I would like more details about this property:\n\n${shareText}`;
  const friendsWhatsAppLink = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  const companyWhatsAppLink = whatsappLink(companyMessage);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Share ${title}`}
        className={`flex cursor-pointer items-center justify-center gap-2 ${className}`}
      >
        <Share2 className="h-5 w-5" /> Share
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setOpen(false);
              event.stopPropagation();
            }}
            onMouseEnter={(event) => event.stopPropagation()}
            onMouseMove={(event) => event.stopPropagation()}
            onPointerMove={(event) => event.stopPropagation()}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-label={`Share ${title}`}
              className="max-h-[90dvh] w-full max-w-md overflow-y-auto overscroll-contain rounded-xl bg-card p-6 shadow-elegant"
              onMouseDown={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-semibold text-primary">
                    Share this property
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Choose who you would like to share it with.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close share dialog"
                  className="rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-primary"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-5 space-y-5">
                <div>
                  <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-primary">
                    Ask the company for more details
                  </h3>
                  <a
                    href={companyWhatsAppLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-md bg-success py-3 font-semibold text-primary-foreground transition hover:brightness-95"
                  >
                    <MessageCircle className="h-5 w-5" /> Message IREME Real Estate
                  </a>
                </div>

                <div>
                  <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-primary">
                    Share with friends and family
                  </h3>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <a
                      href={friendsWhatsAppLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 rounded-md bg-success py-3 font-semibold text-primary-foreground transition hover:brightness-95"
                    >
                      <MessageCircle className="h-5 w-5" /> WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={copy}
                      className="flex items-center justify-center gap-2 rounded-md border border-border py-3 font-semibold transition hover:border-gold hover:text-gold"
                    >
                      {copied ? (
                        <>
                          <Check className="h-5 w-5 text-success" /> Link copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-5 w-5" /> Copy link
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <p className="mt-4 break-all text-xs text-muted-foreground">
                Share the property on WhatsApp or copy its direct link.
              </p>
            </section>
          </div>,
          document.body,
        )}
    </>
  );
}
