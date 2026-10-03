import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Menu, Phone, X, MessageCircle } from "lucide-react";
import logo from "@/assets/ireme-logo-crop.jpg";
import { site, whatsappLink } from "@/lib/data";
import { services } from "@/lib/services";

const main = [
  { to: "/", label: "Home" },
  { to: "/properties", label: "Properties" },
  { to: "/buy", label: "Buy" },
  { to: "/rent", label: "Rent" },
  { to: "/land", label: "Land" },
] as const;

export function Logo({ className = "h-12" }: { className?: string }) {
  return (
    <img src={logo} alt="IREME Real Estate" className={`${className} w-auto rounded-md bg-logo-surface`} width={400} height={360} />
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const linkCls = "text-[13px] font-semibold uppercase tracking-[0.14em] text-foreground/80 hover:text-primary transition-colors";
  const active = { className: "!text-primary border-b-2 border-gold pb-1" };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="hidden bg-primary text-primary-foreground md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
          <span className="tracking-wide">{site.tagline} · {site.address}</span>
          <a href={`tel:${site.phoneIntl}`} className="flex items-center gap-2 hover:text-gold"><Phone className="h-3.5 w-3.5" /> {site.phone}</a>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 md:px-6">
        <Link to="/" aria-label="IREME Real Estate home"><Logo /></Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {main.map((l) => (
            <Link key={l.to} to={l.to} className={linkCls} activeProps={active} activeOptions={{ exact: l.to === "/" }}>{l.label}</Link>
          ))}
          <div className="group relative">
            <button className={`${linkCls} flex items-center gap-1`}>Services <ChevronDown className="h-3.5 w-3.5" /></button>
            <div className="invisible absolute left-1/2 top-full w-64 -translate-x-1/2 pt-4 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="rounded-lg border border-border bg-card p-2 shadow-elegant">
                {services.map((s) => (
                  <Link key={s.to} to={s.to} className="block rounded-md px-3 py-2.5 text-sm hover:bg-secondary">{s.name}</Link>
                ))}
              </div>
            </div>
          </div>
          <Link to="/about" className={linkCls} activeProps={active}>About</Link>
          <Link to="/contact" className={linkCls} activeProps={active}>Contact</Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/list-property" className="text-sm font-semibold text-primary hover:text-gold">List your property</Link>
          <Link to="/properties" className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-navy-deep">Find a property</Link>
        </div>

        <button className="rounded-md p-2 lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu className="h-7 w-7" /></button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-background lg:hidden">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <Logo />
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2"><X className="h-7 w-7" /></button>
          </div>
          <nav className="flex flex-col px-4 py-4" onClick={() => setOpen(false)}>
            {main.map((l) => <Link key={l.to} to={l.to} className="border-b border-border py-4 text-lg font-semibold">{l.label}</Link>)}
            <p className="pt-6 text-xs font-bold uppercase tracking-[0.2em] text-gold">Services</p>
            {services.map((s) => <Link key={s.to} to={s.to} className="py-3 text-base">{s.name}</Link>)}
            <Link to="/about" className="mt-4 border-t border-border py-4 text-lg font-semibold">About</Link>
            <Link to="/contact" className="border-t border-border py-4 text-lg font-semibold">Contact</Link>
            <div className="mt-6 grid gap-3">
              <Link to="/properties" className="rounded-md bg-primary py-4 text-center font-semibold text-primary-foreground">Find a property</Link>
              <a href={whatsappLink("Hello IREME, I'd like some help with a property.")} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-md border border-border py-4 font-semibold"><MessageCircle className="h-5 w-5" /> WhatsApp us</a>
              <a href={`tel:${site.phoneIntl}`} className="flex items-center justify-center gap-2 rounded-md border border-border py-4 font-semibold"><Phone className="h-5 w-5" /> {site.phone}</a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
