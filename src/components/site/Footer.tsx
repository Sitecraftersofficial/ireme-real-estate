import { Link } from "@tanstack/react-router";
import { MapPin, Phone, MessageCircle, Mail } from "lucide-react";
import { site, whatsappLink } from "@/lib/data";
import { services } from "@/lib/services";
import { Logo } from "./Header";

export function Footer() {
  const h = "mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gold";
  const a = "block py-1 text-sm text-primary-foreground/75 hover:text-gold";
  return (
    <footer className="bg-navy-deep text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo className="h-20" />
          <p className="mt-5 max-w-xs text-sm text-primary-foreground/75">Buy, sell, rent, build, manage, design and secure — your trusted real estate partner in Rwanda.</p>
          <p className="mt-4 font-display text-xl italic text-gold">{site.tagline}</p>
        </div>
        <div>
          <p className={h}>Explore</p>
          <Link to="/properties" className={a}>All properties</Link>
          <Link to="/buy" className={a}>Buy</Link>
          <Link to="/rent" className={a}>Rent</Link>
          <Link to="/land" className={a}>Land</Link>
          <Link to="/request-property" className={a}>Request a property</Link>
          <Link to="/list-property" className={a}>List your property</Link>
          <Link to="/blog" className={a}>Property insights</Link>
        </div>
        <div>
          <p className={h}>Services</p>
          {services.map((s) => <Link key={s.to} to={s.to} className={a}>{s.name}</Link>)}
          <Link to="/about" className={a}>About IREME</Link>
          <Link to="/faqs" className={a}>FAQs</Link>
        </div>
        <div>
          <p className={h}>Contact</p>
          <a href={`tel:${site.phoneIntl}`} className={`${a} flex items-center gap-2`}><Phone className="h-4 w-4" /> {site.phone}</a>
          <a href={whatsappLink("Hello IREME!")} target="_blank" rel="noreferrer" className={`${a} flex items-center gap-2`}><MessageCircle className="h-4 w-4" /> WhatsApp</a>
          {site.email && <a href={`mailto:${site.email}`} className={`${a} flex items-center gap-2`}><Mail className="h-4 w-4" /> {site.email}</a>}
          <p className={`${a} flex items-center gap-2`}><MapPin className="h-4 w-4" /> {site.address}</p>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-xs text-primary-foreground/60 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} IREME Real Estate. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-gold">Privacy</Link>
            <Link to="/terms" className="hover:text-gold">Terms</Link>
            <Link to="/disclaimer" className="hover:text-gold">Listing disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink("Hello IREME, I'd like some help with a property.")}
      target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-success text-primary-foreground shadow-elegant transition hover:scale-105"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
