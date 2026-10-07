import type { ReactElement } from "react";
import { site } from "@/lib/data";
import { SectionTitle } from "./Common";

/* ----------------------------- Brand SVG icons ---------------------------- */

type IconProps = { className?: string };

export function FacebookIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5H16V5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.4-3.8 3.9V11H7.5v3H10v7h3.5Z" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 4.4c2.5 0 2.8 0 3.7.1.9 0 1.4.2 1.7.3.4.2.7.4 1 .7.3.3.5.6.7 1 .1.3.3.8.3 1.7 0 .9.1 1.2.1 3.8s0 2.8-.1 3.7c0 .9-.2 1.4-.3 1.7-.2.4-.4.7-.7 1-.3.3-.6.5-1 .7-.3.1-.8.3-1.7.3-.9 0-1.2.1-3.7.1s-2.8 0-3.8-.1c-.9 0-1.4-.2-1.7-.3-.4-.2-.7-.4-1-.7-.3-.3-.5-.6-.7-1-.1-.3-.3-.8-.3-1.7 0-.9-.1-1.2-.1-3.8s0-2.8.1-3.7c0-.9.2-1.4.3-1.7.2-.4.4-.7.7-1 .3-.3.6-.5 1-.7.3-.1.8-.3 1.7-.3.9-.1 2.4-.1 3.7-.1ZM12 2.5c-2.5 0-2.8 0-3.8.1-1 0-1.6.2-2.2.4-.6.2-1.1.6-1.6 1.1-.5.5-.8 1-1.1 1.6-.2.6-.4 1.2-.4 2.2-.1 1-.1 1.3-.1 3.8s0 2.8.1 3.8c0 1 .2 1.6.4 2.2.2.6.6 1.1 1.1 1.6.5.5 1 .8 1.6 1.1.6.2 1.2.4 2.2.4 1 .1 1.3.1 3.8.1s2.8 0 3.8-.1c1 0 1.6-.2 2.2-.4.6-.2 1.1-.6 1.6-1.1.5-.5.8-1 1.1-1.6.2-.6.4-1.2.4-2.2.1-1 .1-1.3.1-3.8s0-2.8-.1-3.8c0-1-.2-1.6-.4-2.2-.2-.6-.6-1.1-1.1-1.6-.5-.5-1-.8-1.6-1.1-.6-.2-1.2-.4-2.2-.4-1-.1-1.3-.1-3.8-.1Zm0 4.6a4.9 4.9 0 1 0 0 9.8 4.9 4.9 0 0 0 0-9.8Zm0 8.1a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm5.1-8.3a1.1 1.1 0 1 1-2.3 0 1.1 1.1 0 0 1 2.3 0Z" />
    </svg>
  );
}

export function TikTokIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .6 0 .9.1V9.7a5.8 5.8 0 1 0 4.9 5.7V8.7a7.3 7.3 0 0 0 4.3 1.4V7a4.3 4.3 0 0 1-3.3-1.2Z" />
    </svg>
  );
}

export function YouTubeIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8A26 26 0 0 0 2 12c0 1.6.1 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.3-1.6.4-3.2.4-4.8 0-1.6-.1-3.2-.4-4.8ZM10 15.2V8.8L15.5 12 10 15.2Z" />
    </svg>
  );
}

/* ----------------------------- Social links ------------------------------ */

export type SocialKey = "facebook" | "instagram" | "tiktok" | "youtube";

const SOCIAL_META: Record<SocialKey, { label: string; Icon: (p: IconProps) => ReactElement }> = {
  facebook: { label: "Facebook", Icon: FacebookIcon },
  instagram: { label: "Instagram", Icon: InstagramIcon },
  tiktok: { label: "TikTok", Icon: TikTokIcon },
  youtube: { label: "YouTube", Icon: YouTubeIcon },
};

export const socialLinks = (Object.keys(SOCIAL_META) as SocialKey[])
  .map((k) => ({
    key: k,
    ...(SOCIAL_META[k] as (typeof SOCIAL_META)[SocialKey]),
    url: site.socials[k],
  }))
  .filter((s) => s.url);

/** Row of social icon links. `tone="dark"` is for dark surfaces, `tone="light"` for light ones. */
export function SocialIcons({
  className = "",
  tone = "dark",
  compact = false,
}: {
  className?: string;
  tone?: "dark" | "light";
  compact?: boolean;
}) {
  const btn =
    tone === "dark"
      ? "border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground/80 hover:border-gold hover:text-gold"
      : "border-border bg-secondary text-foreground/70 hover:border-gold hover:text-primary";
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socialLinks.map(({ key, label, Icon, url }) => (
        <a
          key={key}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`IREME Real Estate on ${label}`}
          title={label}
          className={`${compact ? "flex h-7 w-7" : "flex h-10 w-10"} items-center justify-center rounded-full border transition ${btn}`}
        >
          <Icon className={compact ? "h-3.5 w-3.5" : "h-5 w-5"} />
        </a>
      ))}
    </div>
  );
}

/* -------------------------- YouTube video gallery ------------------------ */

export type Video = { id: string; title: string };

/** A selection of the latest uploads from the IREME REAL ESTATE YouTube channel (newest first). */
export const youtubeVideos: Video[] = [
  {
    id: "8SgYMjmEW6g",
    title: "Beautiful Plots for Sale in Rweri, Gahengeri, Rwamagana — 8.5M RWF",
  },
  { id: "9H823B2djnA", title: "Kibagabaga Fully Furnished Apartment for Rent — $2,000/Month" },
  { id: "FQg9mitRDO8", title: "Plots for Sale in Muyumbu — 13 Million RWF" },
  { id: "uY5ue4dTJzA", title: "Plot for Sale in Busanza, Kigali — 309m², R1 Residential, 30M RWF" },
  { id: "MqtnoONLt9Y", title: "Villa y'Akataraboneka Igurishwa — $2.2 Million USD" },
  { id: "el9di69R3hk", title: "Beautiful House for Sale in Nyagasambu — 45M RWF Negotiable" },
];

/** Lazy-loaded, privacy-enhanced YouTube embed (vertical 9:16, matching the channel's Shorts format). */
function VideoEmbed({ id, title }: Video) {
  return (
    <div
      className="relative mx-auto w-full max-w-75 overflow-hidden rounded-lg bg-navy-deep shadow-elegant"
      style={{ aspectRatio: "9 / 16" }}
    >
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}

export function VideoGallery() {
  const yt = site.socials["youtube"];
  return (
    <section className="bg-navy-deep py-20 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionTitle
          center
          eyebrow="Video tours"
          title="Watch our latest property tours"
          text="Walk through real plots, houses and apartments with the IREME team — straight from our YouTube channel."
        />
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {youtubeVideos.map((v) => (
            <VideoEmbed key={v.id} {...v} />
          ))}
        </div>
        {yt && (
          <div className="mt-10 text-center">
            <a
              href={yt}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/30 px-6 py-3.5 font-semibold transition hover:border-gold hover:text-gold"
            >
              <YouTubeIcon className="h-5 w-5" /> Visit our YouTube channel
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

/** Compact social strip: "Follow us" + icons. */
export function FollowBand({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Follow us</p>
      <SocialIcons tone="light" />
    </div>
  );
}
