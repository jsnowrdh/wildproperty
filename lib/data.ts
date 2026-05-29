export type PropertyType =
  | "campground"
  | "glamping-retreat"
  | "rv-park"
  | "nature-resort";

export interface Listing {
  id?: string;
  slug: string;
  title: string;
  city: string;
  state: string;
  stateSlug: string;
  location: string;
  price: number;
  priceDisplay: string;
  acres: number;
  type: PropertyType;
  description: string;
  summary: string;
  imageUrl: string;
  featured: boolean;
  sites?: number;
  highlights: string[];
  amenities: string[];
  status?: string;
  createdAt?: string;
  financials?: {
    grossRevenue?: string;
    noi?: string;
    occupancy?: string;
  };
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  imageUrl: string;
  keyword: string;
}

export const SITE_URL = "https://wildproperty.org";

export const PROPERTY_TYPES: {
  value: PropertyType | "all";
  label: string;
  slug: PropertyType;
  description: string;
}[] = [
  {
    value: "campground",
    label: "Campground",
    slug: "campground",
    description:
      "Established family campgrounds, lakeside sites, and tent-only retreats.",
  },
  {
    value: "glamping-retreat",
    label: "Glamping Retreat",
    slug: "glamping-retreat",
    description:
      "Safari tents, yurts, and luxury canvas resorts with strong margins.",
  },
  {
    value: "rv-park",
    label: "RV Park",
    slug: "rv-park",
    description:
      "Full-hookup parks, destination resorts, and roadside cash-flow plays.",
  },
  {
    value: "nature-resort",
    label: "Nature Resort",
    slug: "nature-resort",
    description:
      "Cabin compounds, eco-lodges, and rare large-acreage opportunities.",
  },
];

export const US_STATES: { value: string; label: string; slug: string }[] = [
  { value: "AL", label: "Alabama", slug: "alabama" },
  { value: "AK", label: "Alaska", slug: "alaska" },
  { value: "AZ", label: "Arizona", slug: "arizona" },
  { value: "AR", label: "Arkansas", slug: "arkansas" },
  { value: "CA", label: "California", slug: "california" },
  { value: "CO", label: "Colorado", slug: "colorado" },
  { value: "CT", label: "Connecticut", slug: "connecticut" },
  { value: "DE", label: "Delaware", slug: "delaware" },
  { value: "FL", label: "Florida", slug: "florida" },
  { value: "GA", label: "Georgia", slug: "georgia" },
  { value: "HI", label: "Hawaii", slug: "hawaii" },
  { value: "ID", label: "Idaho", slug: "idaho" },
  { value: "IL", label: "Illinois", slug: "illinois" },
  { value: "IN", label: "Indiana", slug: "indiana" },
  { value: "IA", label: "Iowa", slug: "iowa" },
  { value: "KS", label: "Kansas", slug: "kansas" },
  { value: "KY", label: "Kentucky", slug: "kentucky" },
  { value: "LA", label: "Louisiana", slug: "louisiana" },
  { value: "ME", label: "Maine", slug: "maine" },
  { value: "MD", label: "Maryland", slug: "maryland" },
  { value: "MA", label: "Massachusetts", slug: "massachusetts" },
  { value: "MI", label: "Michigan", slug: "michigan" },
  { value: "MN", label: "Minnesota", slug: "minnesota" },
  { value: "MS", label: "Mississippi", slug: "mississippi" },
  { value: "MO", label: "Missouri", slug: "missouri" },
  { value: "MT", label: "Montana", slug: "montana" },
  { value: "NE", label: "Nebraska", slug: "nebraska" },
  { value: "NV", label: "Nevada", slug: "nevada" },
  { value: "NH", label: "New Hampshire", slug: "new-hampshire" },
  { value: "NJ", label: "New Jersey", slug: "new-jersey" },
  { value: "NM", label: "New Mexico", slug: "new-mexico" },
  { value: "NY", label: "New York", slug: "new-york" },
  { value: "NC", label: "North Carolina", slug: "north-carolina" },
  { value: "ND", label: "North Dakota", slug: "north-dakota" },
  { value: "OH", label: "Ohio", slug: "ohio" },
  { value: "OK", label: "Oklahoma", slug: "oklahoma" },
  { value: "OR", label: "Oregon", slug: "oregon" },
  { value: "PA", label: "Pennsylvania", slug: "pennsylvania" },
  { value: "RI", label: "Rhode Island", slug: "rhode-island" },
  { value: "SC", label: "South Carolina", slug: "south-carolina" },
  { value: "SD", label: "South Dakota", slug: "south-dakota" },
  { value: "TN", label: "Tennessee", slug: "tennessee" },
  { value: "TX", label: "Texas", slug: "texas" },
  { value: "UT", label: "Utah", slug: "utah" },
  { value: "VT", label: "Vermont", slug: "vermont" },
  { value: "VA", label: "Virginia", slug: "virginia" },
  { value: "WA", label: "Washington", slug: "washington" },
  { value: "WV", label: "West Virginia", slug: "west-virginia" },
  { value: "WI", label: "Wisconsin", slug: "wisconsin" },
  { value: "WY", label: "Wyoming", slug: "wyoming" },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-buy-a-campground",
    title: "How to Buy a Campground: A Complete Guide for First-Time Buyers",
    excerpt:
      "A step-by-step guide to buying a campground — from defining your goals and building your team to due diligence, financing, and closing on your first outdoor hospitality property.",
    category: "Buying Guide",
    publishedAt: "2026-05-01",
    readTime: "5 min read",
    imageUrl: "wp-blog-buy-campground",
    keyword: "how to buy a campground",
  },
  {
    slug: "how-to-buy-an-rv-park",
    title: "How to Buy an RV Park: What Every Investor Needs to Know",
    excerpt:
      "Everything investors need to know before buying an RV park — site counts, utility infrastructure, financing options, valuation methods, and the due diligence that protects your capital.",
    category: "Buying Guide",
    publishedAt: "2026-05-02",
    readTime: "5 min read",
    imageUrl: "wp-blog-buy-rv-park",
    keyword: "how to buy an rv park",
  },
  {
    slug: "glamping-retreat-roi",
    title: "Glamping Retreat ROI: What Returns Can You Really Expect?",
    excerpt:
      "A realistic look at glamping retreat ROI — revenue per unit, occupancy assumptions, operating costs, and the returns investors actually achieve in 2026.",
    category: "Investment Guide",
    publishedAt: "2026-05-03",
    readTime: "5 min read",
    imageUrl: "wp-blog-glamping-roi",
    keyword: "glamping retreat ROI",
  },
  {
    slug: "campground-valuation-guide",
    title: "Campground Valuation: How Much Is Your Campground Worth?",
    excerpt:
      "How campground valuation works in 2026 — income approach multiples, price-per-site benchmarks, and the factors that push values up or down.",
    category: "Valuation Guide",
    publishedAt: "2026-05-04",
    readTime: "5 min read",
    imageUrl: "wp-blog-campground-valuation",
    keyword: "campground valuation",
  },
  {
    slug: "cost-of-owning-rv-park",
    title: "The True Cost of Owning an RV Park in 2026",
    excerpt:
      "Beyond the purchase price — a full breakdown of RV park operating costs including utilities, staffing, maintenance, insurance, and capital reserves.",
    category: "Operations Guide",
    publishedAt: "2026-05-05",
    readTime: "5 min read",
    imageUrl: "wp-blog-rv-park-costs",
    keyword: "cost of owning an rv park",
  },
  {
    slug: "campground-vs-rv-park-investment",
    title: "Campground vs RV Park: Which Is the Better Investment?",
    excerpt:
      "Campground vs RV park investment compared — purchase price, revenue models, operating intensity, financing, and which asset type fits your goals.",
    category: "Investment Guide",
    publishedAt: "2026-05-06",
    readTime: "5 min read",
    imageUrl: "wp-blog-campground-vs-rv",
    keyword: "campground vs rv park investment",
  },
  {
    slug: "how-to-finance-a-campground",
    title: "How to Finance a Campground Purchase",
    excerpt:
      "Campground financing options explained — SBA 7(a) loans, seller financing, commercial loans, and how to prepare a loan package lenders will approve.",
    category: "Financing Guide",
    publishedAt: "2026-05-07",
    readTime: "5 min read",
    imageUrl: "wp-blog-campground-finance",
    keyword: "campground financing",
  },
  {
    slug: "buying-a-glamping-resort",
    title: "What to Look for When Buying a Glamping Resort",
    excerpt:
      "What to evaluate when buying a glamping resort — unit quality, booking data, permits, operating costs, and the due diligence checklist premium buyers use.",
    category: "Buying Guide",
    publishedAt: "2026-05-08",
    readTime: "5 min read",
    imageUrl: "wp-blog-buy-glamping",
    keyword: "buying a glamping resort",
  },
  {
    slug: "sba-loans-campgrounds-rv-parks",
    title: "SBA Loans for Campgrounds and RV Parks: Everything You Need to Know",
    excerpt:
      "SBA loan campground and RV park guide — eligibility, down payment requirements, documentation, timelines, and how to improve your approval odds.",
    category: "Financing Guide",
    publishedAt: "2026-05-09",
    readTime: "5 min read",
    imageUrl: "wp-blog-sba-loans",
    keyword: "sba loan campground",
  },
  {
    slug: "best-states-to-buy-campground",
    title: "Top 10 States to Buy a Campground in 2026",
    excerpt:
      "The best states to buy a campground in 2026 — ranked by tourism demand, regulatory environment, seasonality, and buyer activity across the outdoor hospitality market.",
    category: "Market Guide",
    publishedAt: "2026-05-10",
    readTime: "5 min read",
    imageUrl: "wp-blog-best-states",
    keyword: "best states to buy a campground",
  },
  {
    slug: "glamping-resort-revenue",
    title: "How Much Does a Glamping Resort Make Per Year?",
    excerpt:
      "Glamping resort revenue benchmarks for 2026 — nightly rates, occupancy ranges, annual gross revenue by unit count, and what top performers earn.",
    category: "Investment Guide",
    publishedAt: "2026-05-11",
    readTime: "5 min read",
    imageUrl: "wp-blog-glamping-revenue",
    keyword: "glamping resort revenue",
  },
  {
    slug: "campground-due-diligence-checklist",
    title: "Due Diligence Checklist for Buying a Campground",
    excerpt:
      "A complete campground due diligence checklist — financials, environmental review, infrastructure inspection, permits, and the documents every buyer should verify.",
    category: "Buying Guide",
    publishedAt: "2026-05-12",
    readTime: "5 min read",
    imageUrl: "wp-blog-due-diligence",
    keyword: "campground due diligence",
  },
  {
    slug: "nature-resort-vs-campground",
    title: "Nature Resort vs Campground: Which Should You Buy?",
    excerpt:
      "Nature resort vs campground — how these outdoor hospitality assets compare on price, revenue, management intensity, and long-term investment potential.",
    category: "Investment Guide",
    publishedAt: "2026-05-13",
    readTime: "5 min read",
    imageUrl: "wp-blog-nature-vs-camp",
    keyword: "nature resort vs campground",
  },
  {
    slug: "increase-rv-park-revenue",
    title: "How to Increase Revenue at Your RV Park",
    excerpt:
      "Proven strategies to increase RV park revenue — rate optimization, amenity upgrades, long-term stays, ancillary income, and marketing that fills sites.",
    category: "Operations Guide",
    publishedAt: "2026-05-14",
    readTime: "5 min read",
    imageUrl: "wp-blog-rv-revenue",
    keyword: "increase rv park revenue",
  },
  {
    slug: "campground-cap-rates",
    title: "Campground Cap Rates Explained for Buyers and Sellers",
    excerpt:
      "Campground cap rates explained — how they are calculated, typical ranges in 2026, and what drives cap rates up or down in outdoor hospitality markets.",
    category: "Valuation Guide",
    publishedAt: "2026-05-15",
    readTime: "5 min read",
    imageUrl: "wp-blog-cap-rates",
    keyword: "campground cap rate",
  },
  {
    slug: "what-is-outdoor-hospitality",
    title: "What Is Outdoor Hospitality and Why Investors Love It",
    excerpt:
      "Outdoor hospitality investment explained — the asset types, market growth drivers, and why campgrounds, glamping retreats, and RV parks attract capital in 2026.",
    category: "Industry Guide",
    publishedAt: "2026-05-16",
    readTime: "5 min read",
    imageUrl: "wp-blog-outdoor-hospitality",
    keyword: "outdoor hospitality investment",
  },
  {
    slug: "how-to-value-an-rv-park",
    title: "How to Value an RV Park Before You Buy",
    excerpt:
      "How to value an RV park before you buy — income multiples, price per site, utility-adjusted valuations, and red flags that signal overpricing.",
    category: "Valuation Guide",
    publishedAt: "2026-05-17",
    readTime: "5 min read",
    imageUrl: "wp-blog-value-rv-park",
    keyword: "how to value an rv park",
  },
  {
    slug: "glamping-retreat-operating-costs",
    title: "Glamping Retreat Operating Costs: A Full Breakdown",
    excerpt:
      "Glamping retreat operating costs broken down — housekeeping, linen service, maintenance, marketing, staffing, and the per-unit expenses that affect margins.",
    category: "Operations Guide",
    publishedAt: "2026-05-18",
    readTime: "5 min read",
    imageUrl: "wp-blog-glamping-costs",
    keyword: "glamping retreat operating costs",
  },
  {
    slug: "how-long-to-buy-a-campground",
    title: "How Long Does It Take to Buy a Campground?",
    excerpt:
      "The campground buying process timeline from first search to closing — typical durations for financing, due diligence, and the steps that cause delays.",
    category: "Buying Guide",
    publishedAt: "2026-05-19",
    readTime: "5 min read",
    imageUrl: "wp-blog-buy-timeline",
    keyword: "campground buying process timeline",
  },
  {
    slug: "how-much-does-it-cost-to-buy-a-campground",
    title: "How Much Does It Cost to Buy a Campground in 2026?",
    excerpt:
      "A practical breakdown of campground purchase prices in 2026, what drives valuation up or down, and what to budget beyond the sticker price.",
    category: "Buying Guide",
    publishedAt: "2026-05-20",
    readTime: "5 min read",
    imageUrl: "wp-blog-cost",
    keyword: "how much does it cost to buy a campground",
  },
  {
    slug: "is-buying-a-campground-a-good-investment",
    title: "Is Buying a Campground a Good Investment in 2026?",
    excerpt:
      "Is buying a campground a good investment? Returns, risks, market trends, and the conditions that make campground ownership a strong or weak bet in 2026.",
    category: "Investment Guide",
    publishedAt: "2026-05-21",
    readTime: "5 min read",
    imageUrl: "wp-blog-campground-investment",
    keyword: "is buying a campground a good investment",
  },
  {
    slug: "campground-vs-glamping-retreat-which-is-the-better-investment",
    title:
      "Campground vs. Glamping Retreat: Which Is the Better Investment in 2026?",
    excerpt:
      "A head-to-head comparison of traditional campgrounds and glamping retreats: purchase price, revenue, occupancy, costs, financing, and growth potential.",
    category: "Investment Guide",
    publishedAt: "2026-05-22",
    readTime: "5 min read",
    imageUrl: "wp-blog-compare",
    keyword: "campground vs glamping investment",
  },
];

export function getPropertyTypeLabel(type: PropertyType): string {
  return PROPERTY_TYPES.find((t) => t.slug === type)?.label ?? type;
}

export function getStateBySlug(slug: string) {
  return US_STATES.find((s) => s.slug === slug);
}

export function getStateByCode(code: string) {
  return US_STATES.find((s) => s.value === code);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getBlogImageUrl(imageUrl: string, width = 800) {
  if (imageUrl.startsWith("http")) {
    const base = imageUrl.split("?")[0];
    return `${base}?w=${width}&q=80`;
  }
  return `https://picsum.photos/seed/${imageUrl}/${width}/${Math.round(width * 0.667)}`;
}
