import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { MessageCircle, Mail } from "lucide-react";
import { site, whatsappLink } from "@/lib/data";

export function PageHero({ eyebrow, title, text, image }: { eyebrow: string; title: string; text?: string; image?: string }) {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      {image && <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" width={1280} height={896} />}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">{title}</h1>
        {text && <p className="mt-5 max-w-2xl text-lg text-primary-foreground/80">{text}</p>}
      </div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, text, center }: { eyebrow: string; title: string; text?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">{eyebrow}</p>
      <h2 className="mt-3 text-4xl font-semibold text-primary md:text-5xl">{title}</h2>
      {text && <p className="mt-4 text-muted-foreground">{text}</p>}
    </div>
  );
}

export function CtaBand() {
  return (
    <section className="bg-navy-deep text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-16 md:flex-row md:items-center md:px-6">
        <div>
          <h2 className="text-4xl font-semibold">Ready to find your next property?</h2>
          <p className="mt-2 text-primary-foreground/75">Talk to IREME today — we respond quickly on WhatsApp.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={whatsappLink("Hello IREME, I'd like some help with a property.")} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-md bg-gold px-6 py-3.5 font-semibold text-foreground"><MessageCircle className="h-5 w-5" /> WhatsApp us</a>
          <Link to="/properties" className="rounded-md border border-primary-foreground/30 px-6 py-3.5 font-semibold hover:border-gold hover:text-gold">Browse properties</Link>
        </div>
      </div>
    </section>
  );
}

export type FieldDef = { name: string; label: string; type?: "text" | "tel" | "email" | "textarea" | "select" | "date"; options?: string[]; required?: boolean };

/** Form that sends its content to IREME via WhatsApp (or email if configured). Nothing is stored on the site. */
export function WhatsAppForm({ title, fields, intro, submitLabel = "Send via WhatsApp", defaults = {} }: {
  title: string; fields: FieldDef[]; intro?: string; submitLabel?: string; defaults?: Record<string, string>;
}) {
  const [values, setValues] = useState<Record<string, string>>(defaults);
  const [error, setError] = useState("");
  const message = () => [`*${title}*`, ...fields.filter((f) => values[f.name]).map((f) => `${f.label}: ${values[f.name]}`)].join("\n");
  const valid = () => {
    const missing = fields.find((f) => f.required && !values[f.name]?.trim());
    setError(missing ? `Please fill in "${missing.label}".` : "");
    return !missing;
  };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (valid()) window.open(whatsappLink(message()), "_blank", "noopener");
  };
  const input = "w-full rounded-md border border-input bg-background px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring";
  return (
    <form onSubmit={submit} className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-elegant">
      {intro && <p className="text-sm text-muted-foreground">{intro}</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((f) => {
          const v = values[f.name] ?? "";
          const on = (val: string) => setValues((o) => ({ ...o, [f.name]: val }));
          return (
            <label key={f.name} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">{f.label}{f.required && " *"}</span>
              {f.type === "textarea" ? <textarea rows={4} className={input} value={v} onChange={(e) => on(e.target.value)} maxLength={1000} />
                : f.type === "select" ? <select className={input} value={v} onChange={(e) => on(e.target.value)}><option value="">Select…</option>{f.options?.map((o) => <option key={o}>{o}</option>)}</select>
                : <input type={f.type ?? "text"} className={input} value={v} onChange={(e) => on(e.target.value)} maxLength={200} />}
            </label>
          );
        })}
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <div className="flex flex-wrap gap-3">
        <button className="flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 font-semibold text-primary-foreground hover:bg-navy-deep"><MessageCircle className="h-5 w-5" /> {submitLabel}</button>
        {site.email && (
          <button type="button" onClick={() => valid() && (window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(message().replace(/\*/g, ""))}`)}
            className="flex items-center gap-2 rounded-md border border-border px-6 py-3.5 font-semibold"><Mail className="h-5 w-5" /> Send by email</button>
        )}
      </div>
      <p className="text-xs text-muted-foreground">Your message opens in WhatsApp, ready to send to IREME ({site.phone}).</p>
    </form>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-3xl space-y-5 px-4 py-16 text-foreground/85 [&_h2]:mt-10 [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:text-primary md:px-6">{children}</div>;
}

export const meta = (title: string, description: string) => ({
  meta: [
    { title }, { name: "description", content: description },
    { property: "og:title", content: title }, { property: "og:description", content: description },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ],
});
