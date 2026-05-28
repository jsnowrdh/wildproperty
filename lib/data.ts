export type PropertyType =
  | "campground"
  | "glamping-retreat"
  | "rv-park"
  | "nature-resort";

export interface Listing {
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
  imageSeed: string;
  featured: boolean;
  sites?: number;
  highlights: string[];
  amenities: string[];
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
  imageSeed: string;
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

export const LISTINGS: Listing[] = [
  {
    slug: "blue-ridge-glamping",
    title: "Blue Ridge Glamping Retreat",
    city: "Asheville",
    state: "NC",
    stateSlug: "north-carolina",
    location: "Asheville, NC",
    price: 1250000,
    priceDisplay: "$1.25M",
    acres: 22,
    type: "glamping-retreat",
    summary:
      "Fully operational glamping resort with 14 luxury tents, main lodge, and mountain views.",
    description:
      "Blue Ridge Glamping Retreat is a turnkey luxury outdoor hospitality asset in the heart of the Blue Ridge Mountains near Asheville. The property features 14 fully outfitted safari-style tents with en-suite bathrooms, a central lodge with commercial kitchen and event space, and panoramic mountain views. Strong ADR and occupancy driven by wedding groups, corporate retreats, and leisure travelers seeking a premium nature experience.",
    imageSeed: "photo-1632367294096-4e77d53c4ae9",
    featured: true,
    sites: 14,
    highlights: [
      "14 luxury glamping tents with private bathrooms",
      "Main lodge with commercial kitchen",
      "Mountain views and hiking trail access",
      "Strong wedding and event revenue stream",
    ],
    amenities: [
      "Wi-Fi",
      "Fire pits",
      "Event pavilion",
      "On-site parking",
      "Laundry facilities",
    ],
    financials: {
      grossRevenue: "$890K",
      noi: "$420K",
      occupancy: "72%",
    },
  },
  {
    slug: "riverbend-rv-park",
    title: "Riverbend RV Park",
    city: "Bend",
    state: "OR",
    stateSlug: "oregon",
    location: "Bend, OR",
    price: 875000,
    priceDisplay: "$875K",
    acres: 8,
    type: "rv-park",
    summary:
      "45-site RV park along the Deschutes River. Strong occupancy and repeat guest base.",
    description:
      "Riverbend RV Park sits on 8 acres along the Deschutes River in Central Oregon, one of the fastest-growing outdoor recreation markets in the West. The park includes 45 full-hookup sites, a club house, laundry, and river access. Consistent year-round occupancy from snowbirds, fly fishermen, and Bend-area visitors supports stable cash flow.",
    imageSeed: "photo-1441974231531-c6227db76b6e",
    featured: true,
    sites: 45,
    highlights: [
      "45 full-hookup RV sites",
      "Deschutes River frontage",
      "Established repeat guest base",
      "Near Bend outdoor recreation corridor",
    ],
    amenities: [
      "Full hookups",
      "River access",
      "Club house",
      "Pet-friendly",
      "Wi-Fi",
    ],
    financials: {
      grossRevenue: "$620K",
      noi: "$310K",
      occupancy: "68%",
    },
  },
  {
    slug: "pinecrest-family",
    title: "Pinecrest Family Campground",
    city: "Lake Tahoe",
    state: "CA",
    stateSlug: "california",
    location: "Lake Tahoe, CA",
    price: 2100000,
    priceDisplay: "$2.1M",
    acres: 47,
    type: "campground",
    summary:
      "Beloved family campground operating for 30+ years. 80 sites, pool, and recreation hall.",
    description:
      "Pinecrest Family Campground is a legacy outdoor hospitality asset on 47 acres near Lake Tahoe. Operating for over three decades, the campground offers 80 sites ranging from tent loops to full-hookup RV pads, a swimming pool, recreation hall, and general store. Multi-generational guest loyalty and proximity to Tahoe recreation create durable demand.",
    imageSeed: "photo-1576176539998-0237d1ac6a85",
    featured: true,
    sites: 80,
    highlights: [
      "80 campsites with mixed tent and RV inventory",
      "30+ years of operating history",
      "Pool and recreation hall",
      "General store on-site",
    ],
    amenities: [
      "Swimming pool",
      "Recreation hall",
      "General store",
      "Playground",
      "Shower houses",
    ],
    financials: {
      grossRevenue: "$1.4M",
      noi: "$680K",
      occupancy: "78%",
    },
  },
  {
    slug: "coastal-pines-nature-resort",
    title: "Coastal Pines Nature Resort",
    city: "Olympic Peninsula",
    state: "WA",
    stateSlug: "washington",
    location: "Olympic Peninsula, WA",
    price: 3400000,
    priceDisplay: "$3.4M",
    acres: 112,
    type: "nature-resort",
    summary:
      "Rare 112-acre coastal forest property with 12 cabins and development potential.",
    description:
      "Coastal Pines Nature Resort is a rare large-acreage opportunity on Washington's Olympic Peninsula. The property spans 112 acres of coastal forest with 12 custom-built cabins, trail systems, and significant entitlements for additional development. Ideal for an operator seeking a flagship eco-resort or a developer with a long-term hospitality vision.",
    imageSeed: "photo-1470071459604-3b5ec3a7fe05",
    featured: true,
    sites: 12,
    highlights: [
      "112 acres of coastal forest",
      "12 custom cabin units",
      "Trail network throughout property",
      "Additional development potential",
    ],
    amenities: [
      "Private trails",
      "Cabin kitchens",
      "Fire pits",
      "Wildlife viewing",
      "Parking",
    ],
    financials: {
      grossRevenue: "$1.1M",
      noi: "$520K",
      occupancy: "61%",
    },
  },
  {
    slug: "desert-star-glamping",
    title: "Desert Star Glamping",
    city: "Sedona",
    state: "AZ",
    stateSlug: "arizona",
    location: "Sedona, AZ",
    price: 640000,
    priceDisplay: "$640K",
    acres: 6,
    type: "glamping-retreat",
    summary:
      "6 custom safari tents on a stunning red rock property. Turnkey and fully booked.",
    description:
      "Desert Star Glamping is a boutique glamping operation on 6 acres surrounded by Sedona's iconic red rock formations. Six custom safari tents with premium furnishings, outdoor soaking tubs, and stargazing decks command strong nightly rates. The business is turnkey with existing booking channels, staff, and vendor relationships in place.",
    imageSeed: "photo-1676766268952-f959fff2945b",
    featured: true,
    sites: 6,
    highlights: [
      "6 custom safari tents",
      "Red rock views",
      "Turnkey operations",
      "Strong booking calendar",
    ],
    amenities: [
      "Outdoor soaking tubs",
      "Stargazing decks",
      "Premium furnishings",
      "Concierge service",
      "Wi-Fi",
    ],
    financials: {
      grossRevenue: "$480K",
      noi: "$245K",
      occupancy: "85%",
    },
  },
  {
    slug: "lakeside-haven-campground",
    title: "Lakeside Haven Campground",
    city: "Boundary Waters",
    state: "MN",
    stateSlug: "minnesota",
    location: "Boundary Waters, MN",
    price: 990000,
    priceDisplay: "$990K",
    acres: 35,
    type: "campground",
    summary:
      "Pristine lakefront campground with canoe access, 60 sites, and strong seasonal revenue.",
    description:
      "Lakeside Haven Campground offers 35 acres of lakefront property at the gateway to Minnesota's Boundary Waters Canoe Area. Sixty campsites, canoe rentals, and a camp store serve paddlers and families during peak summer season. The property benefits from limited competition and strong regional demand for authentic wilderness-adjacent camping.",
    imageSeed: "photo-1472214103451-9374bd1c798e",
    featured: true,
    sites: 60,
    highlights: [
      "Lakefront with canoe access",
      "60 campsites",
      "Canoe rental operation",
      "Gateway to Boundary Waters",
    ],
    amenities: [
      "Canoe rentals",
      "Camp store",
      "Boat launch",
      "Shower houses",
      "Firewood sales",
    ],
    financials: {
      grossRevenue: "$720K",
      noi: "$340K",
      occupancy: "82%",
    },
  },
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
    imageSeed: "wp-blog-buy-campground",
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
    imageSeed: "wp-blog-buy-rv-park",
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
    imageSeed: "wp-blog-glamping-roi",
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
    imageSeed: "wp-blog-campground-valuation",
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
    imageSeed: "wp-blog-rv-park-costs",
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
    imageSeed: "wp-blog-campground-vs-rv",
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
    imageSeed: "wp-blog-campground-finance",
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
    imageSeed: "wp-blog-buy-glamping",
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
    imageSeed: "wp-blog-sba-loans",
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
    imageSeed: "wp-blog-best-states",
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
    imageSeed: "wp-blog-glamping-revenue",
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
    imageSeed: "wp-blog-due-diligence",
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
    imageSeed: "wp-blog-nature-vs-camp",
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
    imageSeed: "wp-blog-rv-revenue",
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
    imageSeed: "wp-blog-cap-rates",
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
    imageSeed: "wp-blog-outdoor-hospitality",
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
    imageSeed: "wp-blog-value-rv-park",
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
    imageSeed: "wp-blog-glamping-costs",
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
    imageSeed: "wp-blog-buy-timeline",
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
    imageSeed: "wp-blog-cost",
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
    imageSeed: "wp-blog-campground-investment",
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
    imageSeed: "wp-blog-compare",
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

export function getListingBySlug(slug: string): Listing | undefined {
  return LISTINGS.find((l) => l.slug === slug);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getListingsByTypeAndState(
  type: PropertyType,
  stateSlug: string
): Listing[] {
  return LISTINGS.filter(
    (l) => l.type === type && l.stateSlug === stateSlug
  );
}

export function getUniqueStatesFromListings(): string[] {
  return [...new Set(LISTINGS.map((l) => l.state))];
}

export function getListingImageUrl(imageId: string, width = 800, height = 600) {
  return `https://images.unsplash.com/${imageId}?auto=format&fit=crop&w=${width}&h=${height}&q=80`;
}

export function getBlogImageUrl(seed: string, width = 1200, height = 800) {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}
