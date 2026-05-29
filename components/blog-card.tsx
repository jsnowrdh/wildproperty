import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/data";
import { getBlogImageUrl } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { Calendar, Clock } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <Image
          src={getBlogImageUrl(post.imageUrl)}
          alt={post.title}
          width={1200}
          height={800}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <span className="text-xs uppercase tracking-wider text-primary/80">
          {post.category}
        </span>
        <h2 className="mt-2 font-serif text-2xl leading-snug text-primary">
          {post.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-foreground/70">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center gap-4 text-xs text-foreground/60">
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {post.readTime}
          </span>
        </div>
      </div>
    </Link>
  );
}
