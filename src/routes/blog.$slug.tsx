import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/site/Common";
import { getPost, img } from "@/lib/data";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Article not found" }, { name: "robots", content: "noindex" }] };
    const { title, excerpt } = loaderData.post;
    return { meta: [{ title: `${title} — IREME` }, { name: "description", content: excerpt }, { property: "og:title", content: title }, { property: "og:description", content: excerpt }, { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  component: Page,
});

function Page() {
  const { post } = Route.useLoaderData();
  return (
    <>
      <PageHero eyebrow={post.date} title={post.title} text={post.excerpt} image={img(post.image)} />
      <Prose>{post.body.map((b, i) => <p key={i}>{b}</p>)}</Prose>
    </>
  );
}
