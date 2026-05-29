import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogArticleBody } from "@/components/blog/article-body";
import { JsonLd } from "@/components/json-ld";
import {
  BLOG_POSTS,
  getBlogImageUrl,
  getBlogPostBySlug,
} from "@/lib/data";
import { formatDate } from "@/lib/format";
import {
  blogPostJsonLd,
  breadcrumbJsonLd,
  buildBlogPostMetadata,
} from "@/lib/seo";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return buildBlogPostMetadata(post);
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={[
          blogPostJsonLd(post),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <article className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/blog"
          className="mb-6 flex w-fit items-center gap-2 text-sm text-primary/80 transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All posts
        </Link>

        <span className="block text-xs uppercase tracking-[0.2em] text-primary/70">
          {post.category}
        </span>
        <h1 className="mt-3 font-serif text-4xl leading-[1.1] text-primary md:text-5xl">
          {post.title}
        </h1>

        <div className="mt-5 flex items-center gap-5 text-sm text-foreground/60">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {post.readTime}
          </span>
        </div>

        <Image
          src={getBlogImageUrl(post.imageSeed)}
          alt={post.title}
          width={1200}
          height={675}
          priority
          className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover"
        />

        <div className="prose-blog mt-10">
          <BlogArticleBody slug={post.slug} />
        </div>
      </article>
    </>
  );
}
