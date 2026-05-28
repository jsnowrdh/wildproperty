import { BlogContentRenderer } from "@/components/blog/content-renderer";
import { getBlogContent } from "@/lib/blog/content";

interface BlogArticleBodyProps {
  slug: string;
}

export function BlogArticleBody({ slug }: BlogArticleBodyProps) {
  const content = getBlogContent(slug);
  if (!content) return null;
  return <BlogContentRenderer content={content} />;
}
