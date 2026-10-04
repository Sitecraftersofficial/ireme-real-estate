import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ArrowRight,
  Award,
  Bath,
  BedDouble,
  Camera,
  Check,
  FileCheck,
  Handshake,
  Home as HomeIcon,
  Key,
  LandPlot,
  Mail,
  MapPin,
  Maximize,
  MessageCircle,
  Phone,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";

import { RouterProvider, Link, useRouter, useParams, type SearchParams } from "@/router";
import { Header } from "@/components/site/Header";
import { Footer, WhatsAppFab } from "@/components/site/Footer";
import { PropertyCard, StatusBadge } from "@/components/site/PropertyCard";
import { SearchBox } from "@/components/site/SearchBox";
import { ServicePage } from "@/components/site/ServicePage";
import {
  CtaBand,
  PageHero,
  Prose,
  SectionTitle,
  WhatsAppForm,
  usePageMeta,
} from "@/components/site/Common";
import { Listing } from "@/components/site/Listing";
import {
  faqs,
  formatPrice,
  getProperty,
  getPost,
  img,
  posts,
  properties,
  site,
  whatsappLink,
} from "@/lib/data";
import { services } from "@/lib/services";

/* ---------------------------------- Home ---------------------------------- */

function HomePage() {
  usePageMeta(
    "IREME Real Estate — Homes, Apartments & Land in Kigali",
    "Find homes, apartments, land and investment properties across Kigali and Rwanda with IREME Real Estate. Your Property. Our Priority.",
  );
  const hero = img("hero");
  const featured = properties.filter((p) => p.featured).slice(0, 6);
  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy-deep text-primary-foreground">
        <img
          src={hero}
          alt="Modern villa in Kigali at dusk"
          width={1920}
          height={1088}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-navy-deep via-navy-deep/70 to-navy-deep/10" />
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-20 md:px-6 md:pt-32">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">
            Real estate in Rwanda
          </p>
          <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[1.05] md:text-7xl">
            Find a property you'll be proud to call home.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-primary-foreground/85">
            Discover homes, apartments, land and investment properties across Kigali and Rwanda.
          </p>
          <div className="mt-12 text-foreground">
            <SearchBox />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-16 md:grid-cols-3 md:px-6">
        {[
          {
            to: "/buy",
            icon: HomeIcon,
            t: "Buy a property",
            d: "Houses, villas and apartments for sale.",
          },
          {
            to: "/rent",
            icon: Key,
            t: "Rent a property",
            d: "Quality homes and apartments to rent.",
          },
          { to: "/land", icon: LandPlot, t: "Find land", d: "Residential and commercial plots." },
        ].map(({ to, icon: Icon, t, d }) => (
          <Link
            key={to}
            to={to}
            className="group flex items-center gap-5 rounded-lg border border-border bg-card p-6 transition hover:border-gold hover:shadow-elegant"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-soft text-primary">
              <Icon className="h-6 w-6" />
            </span>
            <div className="flex-1">
              <p className="font-display text-2xl font-semibold text-primary">{t}</p>
              <p className="text-sm text-muted-foreground">{d}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-gold transition group-hover:translate-x-1" />
          </Link>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionTitle
            eyebrow="Featured"
            title="Featured properties"
            text="A selection of properties currently handled by IREME."
          />
          <Link
            to="/properties"
            className="flex items-center gap-2 font-semibold text-primary hover:text-gold"
          >
            View all properties <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PropertyCard key={p.slug} p={p} />
          ))}
        </div>
      </section>

      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionTitle
            center
            eyebrow="Beyond buying & renting"
            title="Complete property solutions"
            text="We build, sell, rent and manage properties — and help you design and secure them."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {services.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                className="group overflow-hidden rounded-lg bg-card transition hover:shadow-elegant"
              >
                <img
                  src={s.image}
                  alt={s.name}
                  loading="lazy"
                  width={1280}
                  height={896}
                  className="aspect-4/3 w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="p-5">
                  <p className="font-display text-xl font-semibold text-primary">{s.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.short}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <SectionTitle center eyebrow="Why IREME" title="Your trust, our commitment" />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              i: ShieldCheck,
              t: "Trusted partner",
              d: "Honest guidance and transparent dealings.",
            },
            { i: Users, t: "Professional team", d: "Experienced people who know Kigali." },
            { i: Award, t: "Quality workmanship", d: "High standards on every project." },
            {
              i: Handshake,
              t: "Competitive prices",
              d: "Fair value for buyers, tenants and owners.",
            },
          ].map(({ i: Icon, t, d }) => (
            <div key={t} className="text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold text-gold">
                <Icon className="h-7 w-7" />
              </span>
              <p className="mt-5 font-display text-2xl font-semibold text-primary">{t}</p>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-20 md:grid-cols-2 md:px-6">
        <div className="rounded-xl bg-primary p-10 text-primary-foreground">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">Property owners</p>
          <h3 className="mt-3 text-4xl font-semibold">Sell or rent out your property with IREME</h3>
          <Link
            to="/list-property"
            className="mt-6 inline-block rounded-md bg-gold px-6 py-3 font-semibold text-foreground"
          >
            List your property
          </Link>
        </div>
        <div className="rounded-xl border border-border bg-card p-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">Can't find it?</p>
          <h3 className="mt-3 text-4xl font-semibold text-primary">
            Tell us what you're looking for
          </h3>
          <Link
            to="/request-property"
            className="mt-6 inline-block rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground"
          >
            Request a property
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
        <SectionTitle eyebrow="Property insights" title="Latest from our blog" />
        <div className="mt-10 grid gap-7 md:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.slug} to={`/blog/${p.slug}`} className="group">
              <img
                src={img(p.image)}
                alt={p.title}
                loading="lazy"
                width={1280}
                height={896}
                className="aspect-16/10 w-full rounded-lg object-cover"
              />
              <p className="mt-4 font-display text-2xl font-semibold text-primary group-hover:text-gold">
                {p.title}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}

/* -------------------------------- Properties ------------------------------- */

function PropertiesPage() {
  usePageMeta(
    "Properties in Kigali — IREME Real Estate",
    "Browse houses, apartments, villas, land and commercial properties for sale and rent in Kigali.",
  );
  const { search } = useRouter();
  const initial: SearchParams = {
    transaction:
      search["transaction"] === "rent" || search["transaction"] === "sale"
        ? search["transaction"]
        : undefined,
    type: typeof search["type"] === "string" ? search["type"] : undefined,
    location: typeof search["location"] === "string" ? search["location"] : undefined,
    minPrice: typeof search["minPrice"] === "number" ? search["minPrice"] : undefined,
    maxPrice: typeof search["maxPrice"] === "number" ? search["maxPrice"] : undefined,
    bedrooms: typeof search["bedrooms"] === "number" ? search["bedrooms"] : undefined,
  };
  return (
    <>
      <PageHero
        eyebrow="Properties"
        title="Explore properties across Kigali"
        text="Filter by location, type, price and bedrooms to find the right fit."
        image={img("apartment")}
      />
      <Listing key={JSON.stringify(initial)} initial={initial} />
    </>
  );
}

function BuyPage() {
  usePageMeta(
    "Properties for Sale in Kigali — IREME Real Estate",
    "Houses, villas and apartments for sale in Kigali, Gasabo, Kicukiro and Nyarugenge. Prices in RWF.",
  );
  return (
    <>
      <PageHero
        eyebrow="Buy"
        title="Properties for sale"
        text="Homes and investment properties ready for you to own."
        image={img("house")}
      />
      <Listing initial={{ transaction: "sale" }} lockTransaction />
    </>
  );
}

function RentPage() {
  usePageMeta(
    "Properties for Rent in Kigali — IREME Real Estate",
    "Houses and apartments for rent in Kigali with monthly prices in RWF.",
  );
  return (
    <>
      <PageHero
        eyebrow="Rent"
        title="Properties for rent"
        text="Comfortable homes and apartments to rent across Kigali."
        image={img("apartment")}
      />
      <Listing initial={{ transaction: "rent" }} lockTransaction />
    </>
  );
}

function LandPage() {
  usePageMeta(
    "Land for Sale in Kigali — IREME Real Estate",
    "Residential and commercial plots for sale in Kigali and across Rwanda.",
  );
  return (
    <>
      <PageHero
        eyebrow="Land"
        title="Land & plots for sale"
        text="Prime plots for residential, commercial and investment purposes."
        image={img("land")}
      />
      <Listing initial={{ type: "Land" }} lockType />
    </>
  );
}

function PropertyDetailPage() {
  const params = useParams("/properties/$slug");
  const property = params["slug"] ? getProperty(params["slug"]) : undefined;
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
    if (property) {
      const title = `${property.title}, ${property.district} — IREME Real Estate`;
      const description = `${formatPrice(property)} · ${property.type} for ${property.transaction} in ${property.district}, ${property.city}.`;
      document.title = title;
      const tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (tag) tag.content = description;
    } else {
      document.title = "Property not found — IREME";
    }
  }, [property, params["slug"]]);

  if (!property) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-4xl font-semibold text-primary">Property not found</h1>
        <Link
          to="/properties"
          className="mt-6 inline-block rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground"
        >
          Browse properties
        </Link>
      </div>
    );
  }

  const p = property;
  const similar = properties
    .filter((x) => x.slug !== p.slug && (x.type === p.type || x.transaction === p.transaction))
    .slice(0, 3);
  const waMsg = `Hello IREME, I'm interested in "${p.title}" (${p.district}, ${formatPrice(p)}). Is it still available?`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link to="/properties" className="hover:text-primary">
          Properties
        </Link>{" "}
        / {p.title}
      </nav>
      {p.sample && (
        <p className="mb-6 rounded-md border border-gold bg-gold-soft px-4 py-3 text-sm">
          This is a sample listing used for demonstration. Real IREME listings will replace it.
        </p>
      )}
      <div className="grid gap-4 lg:grid-cols-[1fr_140px]">
        <img
          src={img(p.images[active] ?? p.images[0])}
          alt={p.title}
          width={1280}
          height={896}
          className="aspect-16/10 w-full rounded-xl object-cover"
        />
        <div className="flex gap-3 lg:flex-col">
          {p.images.map((k, i) => (
            <button
              key={k + i}
              onClick={() => setActive(i)}
              className={`overflow-hidden rounded-lg border-2 ${i === active ? "border-gold" : "border-transparent"}`}
            >
              <img
                src={img(k)}
                alt=""
                loading="lazy"
                width={280}
                height={196}
                className="aspect-4/3 w-28 object-cover lg:w-full"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_400px]">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={p.status} />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
              {p.type} · For {p.transaction === "sale" ? "sale" : "rent"}
            </span>
          </div>
          <h1 className="mt-3 text-5xl font-semibold text-primary">{p.title}</h1>
          <p className="mt-2 flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="h-4 w-4" /> {p.district}, {p.city}
          </p>
          <p className="mt-5 text-3xl font-bold text-primary">{formatPrice(p)}</p>
          <div className="mt-6 flex flex-wrap gap-8 border-y border-border py-5">
            {p.bedrooms > 0 && (
              <span className="flex items-center gap-2">
                <BedDouble className="h-5 w-5 text-gold" /> {p.bedrooms} Bedrooms
              </span>
            )}
            {p.bathrooms > 0 && (
              <span className="flex items-center gap-2">
                <Bath className="h-5 w-5 text-gold" /> {p.bathrooms} Bathrooms
              </span>
            )}
            <span className="flex items-center gap-2">
              <Maximize className="h-5 w-5 text-gold" /> {p.size.toLocaleString()} m²
            </span>
          </div>
          <h2 className="mt-10 text-3xl font-semibold text-primary">Description</h2>
          <p className="mt-3 leading-relaxed text-foreground/85">{p.description}</p>
          <h2 className="mt-10 text-3xl font-semibold text-primary">Features</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {p.features.map((f) => (
              <li key={f} className="flex gap-2">
                <Check className="h-5 w-5 text-gold" /> {f}
              </li>
            ))}
          </ul>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <a
            href={whatsappLink(waMsg)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-md bg-success py-4 font-semibold text-primary-foreground"
          >
            <MessageCircle className="h-5 w-5" /> Chat about this property on WhatsApp
          </a>
          <a
            href={`tel:${site.phoneIntl}`}
            className="flex items-center justify-center gap-2 rounded-md border border-border py-4 font-semibold"
          >
            <Phone className="h-5 w-5" /> Call {site.phone}
          </a>
          <h2 className="pt-4 text-2xl font-semibold text-primary">Request a viewing</h2>
          <WhatsAppForm
            title={`Viewing request: ${p.title}`}
            submitLabel="Request viewing"
            defaults={{ property: `${p.title} (${p.district})` }}
            fields={[
              { name: "property", label: "Property" },
              { name: "name", label: "Full name", required: true },
              { name: "phone", label: "Phone", type: "tel", required: true },
              { name: "date", label: "Preferred date", type: "date" },
              { name: "message", label: "Message", type: "textarea" },
            ]}
          />
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="mt-20">
          <h2 className="text-4xl font-semibold text-primary">Similar properties</h2>
          <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((x) => (
              <PropertyCard key={x.slug} p={x} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

/* ----------------------------------- Blog ---------------------------------- */

function BlogPage() {
  usePageMeta(
    "Property Insights — IREME Real Estate",
    "Guides and tips on buying, renting and investing in property in Rwanda.",
  );
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Property insights"
        text="Practical guides for buyers, tenants and owners in Rwanda."
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-3 md:px-6">
        {posts.map((p) => (
          <Link key={p.slug} to={`/blog/${p.slug}`} className="group">
            <img
              src={img(p.image)}
              alt={p.title}
              loading="lazy"
              width={1280}
              height={896}
              className="aspect-16/10 w-full rounded-lg object-cover"
            />
            <p className="mt-4 font-display text-2xl font-semibold text-primary group-hover:text-gold">
              {p.title}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{p.excerpt}</p>
          </Link>
        ))}
      </section>
    </>
  );
}

function BlogPostPage() {
  const params = useParams("/blog/$slug");
  const post = params["slug"] ? getPost(params["slug"]) : undefined;

  useEffect(() => {
    if (post) {
      document.title = `${post.title} — IREME`;
      const tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (tag) tag.content = post.excerpt;
    } else {
      document.title = "Article not found — IREME";
    }
  }, [post]);

  if (!post) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-4xl font-semibold text-primary">Article not found</h1>
        <Link
          to="/blog"
          className="mt-6 inline-block rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground"
        >
          Back to blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <PageHero
        eyebrow={post.date}
        title={post.title}
        text={post.excerpt}
        image={img(post.image)}
      />
      <Prose>
        {post.body.map((b, i) => (
          <p key={i}>{b}</p>
        ))}
      </Prose>
    </>
  );
}

/* --------------------------------- Services -------------------------------- */

function ServicePageWrapper({ index }: { index: number }) {
  const s = services[index] ?? services[0];
  usePageMeta(`${s.name} in Kigali — IREME Real Estate`, s.intro);
  return <ServicePage s={s} />;
}

/* ------------------------------ Simple pages ------------------------------ */

function AboutPage() {
  usePageMeta(
    "About IREME — IREME Real Estate",
    "A Rwandan real estate company helping you buy, sell, rent, build, manage, design and secure property.",
  );
  return (
    <>
      <PageHero
        eyebrow="IREME"
        title="About IREME"
        text="A Rwandan real estate company helping you buy, sell, rent, build, manage, design and secure property."
      />
      <Prose>
        <p>
          IREME Real Estate is based in Kigali, Rwanda. We help customers buy, sell and rent homes,
          apartments and land, and we offer construction, property management, interior design,
          electrical installation and CCTV and security services.
        </p>
        <h2>Our promise</h2>
        <p>
          Your Property. Our Priority. We work with honesty, professionalism and care for every
          client.
        </p>
      </Prose>
    </>
  );
}

function ContactPage() {
  usePageMeta(
    "Contact IREME — IREME Real Estate",
    "Call 0788289323, message us on WhatsApp, or send us your enquiry below. Based in Kigali, Rwanda.",
  );
  return (
    <>
      <PageHero
        eyebrow="IREME"
        title="Contact IREME"
        text="Call 0788289323, message us on WhatsApp, or send us your enquiry below. Based in Kigali, Rwanda."
      />

      {/* Quick contact methods */}
      <section className="mx-auto max-w-7xl px-4 pt-16 md:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          <a
            href={whatsappLink("Hello IREME, I'd like some help with a property.")}
            target="_blank"
            rel="noreferrer"
            className="group rounded-xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-success hover:shadow-elegant"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
              <MessageCircle className="h-6 w-6" />
            </span>
            <p className="mt-4 font-display text-xl font-semibold text-primary">WhatsApp us</p>
            <p className="mt-1 text-sm text-muted-foreground">Fastest response — usually within the hour during working days.</p>
            <p className="mt-3 text-sm font-semibold text-success group-hover:underline">Start a chat →</p>
          </a>
          <a
            href={`tel:${site.phoneIntl}`}
            className="group rounded-xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-gold hover:shadow-elegant"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft text-primary">
              <Phone className="h-6 w-6" />
            </span>
            <p className="mt-4 font-display text-xl font-semibold text-primary">Call us</p>
            <p className="mt-1 text-sm text-muted-foreground">Talk directly to a member of the IREME team.</p>
            <p className="mt-3 text-sm font-semibold text-primary group-hover:underline">{site.phone} →</p>
          </a>
          <a
            href={`mailto:${site.email}?subject=${encodeURIComponent("Property enquiry")}`}
            className="group rounded-xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-gold hover:shadow-elegant"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft text-primary">
              <Mail className="h-6 w-6" />
            </span>
            <p className="mt-4 font-display text-xl font-semibold text-primary">Email us</p>
            <p className="mt-1 text-sm text-muted-foreground">Send detailed enquiries or documents at your convenience.</p>
            <p className="mt-3 break-all text-sm font-semibold text-primary group-hover:underline">{site.email} →</p>
          </a>
        </div>
      </section>

      {/* Form + office info */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">Send a message</p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-primary">Tell us how we can help</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Whether you're buying, renting, selling or need one of our services — fill in the form and
              your message opens in WhatsApp, ready to send straight to our team.
            </p>
            <div className="mt-8">
              <WhatsAppForm
                title="Contact IREME"
                fields={[
                  { name: "name", label: "Full name", required: true },
                  { name: "phone", label: "Phone", type: "tel", required: true },
                  { name: "subject", label: "Subject" },
                  { name: "message", label: "Message", type: "textarea", required: true },
                ]}
              />
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl bg-primary p-6 text-primary-foreground">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">Visit us</p>
              <p className="mt-3 flex items-start gap-2 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {site.address}
              </p>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-gold">Office hours</p>
              <p className="mt-2 text-sm">Monday – Friday: 8:00 AM – 6:00 PM</p>
              <p className="text-sm">Saturday: 9:00 AM – 4:00 PM</p>
              <p className="text-sm text-primary-foreground/70">Sunday: Closed (WhatsApp still monitored)</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">What happens next?</p>
              <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2"><span className="font-semibold text-primary">1.</span> We read your message and reply on WhatsApp or by phone.</li>
                <li className="flex gap-2"><span className="font-semibold text-primary">2.</span> We match you with properties or services that fit your request.</li>
                <li className="flex gap-2"><span className="font-semibold text-primary">3.</span> We arrange viewings or a consultation at your convenience.</li>
              </ol>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <p className="font-display text-lg font-semibold text-primary">Looking for a property already?</p>
              <Link
                to="/properties"
                className="mt-3 inline-block rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-navy-deep"
              >
                Browse listings
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function ListPropertyPage() {
  usePageMeta(
    "Sell or Rent Your Property — IREME Real Estate",
    "List your house, apartment or land with IREME and reach serious buyers and tenants.",
  );
  return (
    <>
      <PageHero
        eyebrow="IREME"
        title="Sell or Rent Your Property"
        text="List your house, apartment or land with IREME and reach serious buyers and tenants."
      />

      {/* Benefits */}
      <section className="mx-auto max-w-7xl px-4 pt-16 md:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">Why list with us</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold text-primary">
          Your property, in front of the right people
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Users,
              t: "Serious buyers & tenants",
              d: "We screen enquiries and connect you with people ready to transact.",
            },
            {
              icon: Camera,
              t: "Professional presentation",
              d: "Quality photos, clear descriptions and prominent placement on our site.",
            },
            {
              icon: FileCheck,
              t: "Guidance at every step",
              d: "From pricing to viewings and paperwork, we stay involved until the deal closes.",
            },
            {
              icon: Wallet,
              t: "Fair, transparent terms",
              d: "No hidden fees. We agree on terms with you before anything is published.",
            },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-xl border border-border bg-card p-6 transition hover:shadow-elegant">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-soft text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-4 font-display text-lg font-semibold text-primary">{t}</p>
              <p className="mt-1.5 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="rounded-xl bg-primary px-6 py-12 text-primary-foreground md:px-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">How it works</p>
          <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">From listing to closing, in four steps</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-4">
            {[
              { n: "1", t: "Share your property", d: "Send us the details below — type, location, price and photos if you have them." },
              { n: "2", t: "Property review & visit", d: "We verify the details and arrange a visit or call to assess it properly." },
              { n: "3", t: "Listing goes live", d: "We prepare the listing and publish it across our channels to qualified prospects." },
              { n: "4", t: "We handle viewings", d: "We screen enquiries, arrange viewings and keep you updated on every offer." },
            ].map((s) => (
              <div key={s.n}>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold font-display text-lg font-bold text-foreground">
                  {s.n}
                </span>
                <p className="mt-4 font-display text-xl font-semibold">{s.t}</p>
                <p className="mt-1.5 text-sm text-primary-foreground/75">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + info sidebar */}
      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">Get started</p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-primary">Tell us about your property</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Fill in the details below and your message opens in WhatsApp, ready to send. We reply with
              next steps — usually the same day.
            </p>
            <div className="mt-8">
              <WhatsAppForm
                title="Sell or Rent Your Property"
                fields={[
                  { name: "name", label: "Full name", required: true },
                  { name: "phone", label: "Phone", type: "tel", required: true },
                  {
                    name: "deal",
                    label: "Sell or rent out",
                    type: "select",
                    options: ["Sell", "Rent out"],
                  },
                  {
                    name: "type",
                    label: "Property type",
                    type: "select",
                    options: ["House", "Apartment", "Villa", "Land", "Commercial", "Office", "Other"],
                  },
                  { name: "location", label: "Location", required: true },
                  { name: "price", label: "Expected price (RWF)" },
                  { name: "details", label: "Property details", type: "textarea" },
                ]}
              />
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">What helps us price it right</p>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {[
                  "Exact location — district, sector or nearest landmark",
                  "Property size and year built (if known)",
                  "Clear photos, especially of the exterior and kitchen",
                  "Any documents: title, lease or ownership papers",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">Also need this?</p>
              <p className="mt-3 text-sm text-muted-foreground">
                We manage properties, handle tenant sourcing, and offer construction and interior design
                services for owners preparing a home for the market.
              </p>
              <Link
                to="/about"
                className="mt-4 inline-block text-sm font-semibold text-primary hover:text-gold"
              >
                Learn more about IREME →
              </Link>
            </div>
            <div className="rounded-xl bg-primary p-6 text-primary-foreground">
              <p className="font-display text-lg font-semibold">Prefer to talk first?</p>
              <a
                href={`tel:${site.phoneIntl}`}
                className="mt-3 flex items-center justify-center gap-2 rounded-md bg-gold px-6 py-3 font-semibold text-foreground transition hover:opacity-90"
              >
                <Phone className="h-4 w-4" /> Call {site.phone}
              </a>
              <a
                href={whatsappLink("Hello IREME, I'd like to list my property.")}
                target="_blank"
                rel="noreferrer"
                className="mt-2 flex items-center justify-center gap-2 rounded-md border border-primary-foreground/30 px-6 py-3 font-semibold transition hover:border-gold hover:text-gold"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp us
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function RequestPropertyPage() {
  usePageMeta(
    "Request a Property — IREME Real Estate",
    "Tell us what you are looking for and IREME will search on your behalf.",
  );
  return (
    <>
      <PageHero
        eyebrow="IREME"
        title="Request a Property"
        text="Tell us what you are looking for and IREME will search on your behalf."
      />
      <section className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <WhatsAppForm
          title="Request a Property"
          fields={[
            { name: "name", label: "Full name", required: true },
            { name: "phone", label: "Phone", type: "tel", required: true },
            { name: "deal", label: "Buy or rent", type: "select", options: ["Buy", "Rent"] },
            {
              name: "type",
              label: "Property type",
              type: "select",
              options: ["House", "Apartment", "Villa", "Land", "Commercial", "Office", "Other"],
            },
            { name: "location", label: "Preferred location" },
            { name: "budget", label: "Budget (RWF)" },
            { name: "details", label: "Other requirements", type: "textarea" },
          ]}
        />
      </section>
    </>
  );
}

function FaqsPage() {
  usePageMeta(
    "FAQs — IREME Real Estate",
    "Answers to common questions about buying, renting and listing property with IREME.",
  );
  return (
    <>
      <PageHero eyebrow="Help" title="Frequently asked questions" />
      <Prose>
        {faqs.map((f) => (
          <details key={f.q} className="rounded-lg border border-border bg-card p-5">
            <summary className="cursor-pointer font-semibold text-primary">{f.q}</summary>
            <p className="mt-3">{f.a}</p>
          </details>
        ))}
      </Prose>
    </>
  );
}

function PrivacyPage() {
  usePageMeta(
    "Privacy Policy — IREME Real Estate",
    "How IREME handles the information you share with us.",
  );
  return (
    <>
      <PageHero
        eyebrow="IREME"
        title="Privacy Policy"
        text="How IREME handles the information you share with us."
      />
      <Prose>
        <p>
          This website does not store the information you type into its forms. When you send a form,
          it opens WhatsApp (or email) so you can send your message directly to IREME.
        </p>
        <p>
          We use your details only to respond to your enquiry. Saved favourites stay in your own
          browser.
        </p>
      </Prose>
    </>
  );
}

function TermsPage() {
  usePageMeta(
    "Terms & Conditions — IREME Real Estate",
    "Terms for using the IREME Real Estate website.",
  );
  return (
    <>
      <PageHero
        eyebrow="IREME"
        title="Terms & Conditions"
        text="Terms for using the IREME Real Estate website."
      />
      <Prose>
        <p>
          Information on this website is provided for general guidance. Property details, prices and
          availability may change without notice. Agreements are only binding when made in writing
          with IREME.
        </p>
      </Prose>
    </>
  );
}

function DisclaimerPage() {
  usePageMeta(
    "Property Listing Disclaimer — IREME Real Estate",
    "Important information about the listings shown on this website.",
  );
  return (
    <>
      <PageHero
        eyebrow="IREME"
        title="Property Listing Disclaimer"
        text="Important information about the listings shown on this website."
      />
      <Prose>
        <p>
          Listings are provided in good faith but may contain errors or be out of date. Always
          confirm details, ownership and land titles before any payment. Listings marked as samples
          are for demonstration only.
        </p>
      </Prose>
    </>
  );
}

/* --------------------------------- 404 page -------------------------------- */

function NotFoundPage() {
  usePageMeta(
    "Page not found — IREME",
    "The page you're looking for doesn't exist or has been moved.",
  );
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- Routing --------------------------------- */

type RouteDef = { path: string; component: () => ReactNode };

const routes: RouteDef[] = [
  { path: "/", component: HomePage },
  { path: "/properties", component: PropertiesPage },
  { path: "/properties/$slug", component: PropertyDetailPage },
  { path: "/buy", component: BuyPage },
  { path: "/rent", component: RentPage },
  { path: "/land", component: LandPage },
  { path: "/blog", component: BlogPage },
  { path: "/blog/$slug", component: BlogPostPage },
  { path: "/about", component: AboutPage },
  { path: "/contact", component: ContactPage },
  { path: "/list-property", component: ListPropertyPage },
  { path: "/request-property", component: RequestPropertyPage },
  { path: "/faqs", component: FaqsPage },
  { path: "/privacy", component: PrivacyPage },
  { path: "/terms", component: TermsPage },
  { path: "/disclaimer", component: DisclaimerPage },
  { path: "/services/construction", component: () => <ServicePageWrapper index={0} /> },
  { path: "/services/property-management", component: () => <ServicePageWrapper index={1} /> },
  { path: "/services/interior-design", component: () => <ServicePageWrapper index={2} /> },
  { path: "/services/electrical", component: () => <ServicePageWrapper index={3} /> },
  { path: "/services/cctv-security", component: () => <ServicePageWrapper index={4} /> },
];

function matchRoute(path: string): RouteDef | undefined {
  const pathParts = path.split("/").filter(Boolean);
  // Prefer exact static matches, then dynamic ones.
  const scored = routes
    .map((r) => {
      const parts = r.path.split("/").filter(Boolean);
      if (parts.length !== pathParts.length) return { r, score: -1 };
      let score = 100;
      let ok = true;
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (part === undefined) break;
        if (part.startsWith("$")) {
          score -= 10;
        } else if (part !== pathParts[i]) {
          ok = false;
          break;
        }
      }
      return ok ? { r, score } : { r, score: -1 };
    })
    .filter((m) => m.score >= 0)
    .sort((a, b) => b.score - a.score);
  return scored[0]?.r;
}

function RouterOutlet() {
  const { path } = useRouter();
  const route = useMemo(() => matchRoute(path), [path]);
  const Component = route?.component;
  return Component ? <Component /> : <NotFoundPage />;
}

export default function App() {
  return (
    <RouterProvider>
      <Header />
      <main>
        <RouterOutlet />
      </main>
      <Footer />
      <WhatsAppFab />
    </RouterProvider>
  );
}
