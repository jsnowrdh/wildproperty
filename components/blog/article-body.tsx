import { CampgroundCostArticle } from "@/components/blog/campground-cost-article";
import { CampgroundVsGlampingArticle } from "@/components/blog/campground-vs-glamping-article";

const ARTICLES: Record<string, React.ComponentType> = {
  "how-much-does-it-cost-to-buy-a-campground": CampgroundCostArticle,
  "campground-vs-glamping-retreat-which-is-the-better-investment":
    CampgroundVsGlampingArticle,
};

interface BlogArticleBodyProps {
  slug: string;
}

export function BlogArticleBody({ slug }: BlogArticleBodyProps) {
  const Article = ARTICLES[slug];
  if (!Article) return null;
  return <Article />;
}
