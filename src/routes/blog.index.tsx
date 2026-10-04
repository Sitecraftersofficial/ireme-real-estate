import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, meta } from "@/components/site/Common";
import { img, posts } from "@/lib/data";

export const Route = createFileRoute("/blog/")({
  head: () => meta("Property Insights — IREME Real Estate", "Guides and tips on buying, renting and investing in property in Rwanda."),
  component: () => (
    <>
      <PageHero eyebrow="Blog" title="Property insights" text="Practical guides for buyers, tenants and owners in Rwanda." />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-3 md:px-6">
        {posts.map((p) => (
          <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group">
            <img src={img(p.image)} alt={p.title} loading="lazy" width={1280} height={896} className="aspect-[16/10] w-full rounded-lg object-cover" />
            <p className="mt-4 font-display text-2xl font-semibold text-primary group-hover:text-gold">{p.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{p.excerpt}</p>
          </Link>
        ))}
      </section>
    </>
  ),
});
