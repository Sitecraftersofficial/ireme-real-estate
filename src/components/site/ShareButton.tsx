import { useState } from "react";
import { Check, Copy, MessageCircle, Send, Share2 } from "lucide-react";
import { whatsappLink } from "@/lib/data";

const SITE_URL = "https://www.iremerealestate.com";

/** Share a property link: Web Share API with a WhatsApp / Telegram / copy fallback dialog. */
export function ShareButton({
  slug,
  title,
  className = "",
}: {
  slug: string;
  title: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const url = `${SITE_URL}/properties/${slug}`;

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* user dismissed — fall through to dialog */
      }
    }
    setOpen(true);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={share}
        aria-label={`Share ${title}`}
        className={`flex cursor-pointer items-center justify-center gap-2 ${className}`}
      >
        <Share2 className="h-5 w-5" /> Share
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Share ${title}`}
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-xl bg-card p-6 shadow-elegant"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-display text-2xl font-semibold text-primary">Share this property</p>
            <p className="mt-1 truncate text-sm text-muted-foreground">{url}</p>
            <div className="mt-5 grid gap-3">
              <a
                href={whatsappLink(`${title} — ${url}`)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-md bg-success py-3 font-semibold text-primary-foreground"
              >
                <MessageCircle className="h-5 w-5" /> Share on WhatsApp
              </a>
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-md bg-primary py-3 font-semibold text-primary-foreground"
              >
                <Send className="h-5 w-5" /> Share on Telegram
              </a>
              <button
                onClick={copy}
                className="flex items-center justify-center gap-2 rounded-md border border-border py-3 font-semibold"
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
            <button
              onClick={() => setOpen(false)}
              aria-label="Close share dialog"
              className="mt-4 w-full text-sm font-semibold text-muted-foreground hover:text-primary"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
