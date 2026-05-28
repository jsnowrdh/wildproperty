import type { Listing, PropertyType } from "./data";
import {
  PROPERTY_TYPES,
  US_STATES,
  getPropertyTypeLabel,
} from "./data";

export interface StateMarketContext {
  region: string;
  landscape: string;
  seasonality: string;
  demandDriver: string;
}

export interface LocationPageContent {
  path: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  intro: string;
  marketOverview: string;
  buyerTips: string[];
  faq: { question: string; answer: string }[];
  relatedTypeLinks: { label: string; href: string }[];
  relatedStateLinks: { label: string; href: string }[];
}

const TYPE_MARKET: Record<
  PropertyType,
  {
    plural: string;
    pluralLower: string;
    priceRange: string;
    valuationNote: string;
    buyerPriorities: string[];
    investmentAngle: string;
    emptyStateNote: string;
  }
> = {
  campground: {
    plural: "Campgrounds",
    pluralLower: "campgrounds",
    priceRange: "$400K–$2.5M",
    valuationNote:
      "Campgrounds are typically valued at 5x–8x net operating income, with stronger multiples for properties near major metros and tourist corridors.",
    buyerPriorities: [
      "Occupancy trends across at least three seasons",
      "Infrastructure condition — electrical, septic, roads, and bathhouses",
      "Permitted site count and expansion potential",
      "Ancillary revenue from stores, rentals, or events",
    ],
    investmentAngle:
      "Established campgrounds offer predictable seasonal cash flow, repeat family guests, and clear value-add paths through rate increases, amenity upgrades, or glamping conversions.",
    emptyStateNote:
      "Campground inventory moves quickly in high-demand states. Set a buyer alert to get notified when new campground listings are posted.",
  },
  "glamping-retreat": {
    plural: "Glamping Retreats",
    pluralLower: "glamping retreats",
    priceRange: "$400K–$2M",
    valuationNote:
      "Glamping properties often trade at higher revenue multiples than traditional campgrounds because of premium nightly rates and lower site counts.",
    buyerPriorities: [
      "Average daily rate and booking channel mix",
      "Unit condition, turnover costs, and furnishing quality",
      "Permits for additional units or structures",
      "Proximity to wedding, retreat, and leisure travel demand",
    ],
    investmentAngle:
      "Glamping retreats command $150–$600 per night in many markets, with strong upside for operators who excel at hospitality, design, and digital marketing.",
    emptyStateNote:
      "Glamping inventory is limited in most states. Create a buyer alert and we will email you when matching glamping retreats are listed.",
  },
  "rv-park": {
    plural: "RV Parks",
    pluralLower: "RV parks",
    priceRange: "$500K–$3M",
    valuationNote:
      "RV parks are often benchmarked at $10,000–$30,000 per site, adjusted for hookup level, location, and year-round occupancy.",
    buyerPriorities: [
      "Full-hookup ratio and utility capacity per site",
      "Year-round versus seasonal revenue profile",
      "Road access for large rigs and turn radius",
      "Clubhouse, laundry, and long-term guest potential",
    ],
    investmentAngle:
      "RV parks benefit from the growing full-time RV lifestyle segment, snowbird migration patterns, and stable demand near outdoor recreation hubs.",
    emptyStateNote:
      "RV park listings are posted as sellers come to market. Use buyer alerts to monitor new RV park opportunities in your target state.",
  },
  "nature-resort": {
    plural: "Nature Resorts",
    pluralLower: "nature resorts",
    priceRange: "$1M–$10M+",
    valuationNote:
      "Nature resorts are valued as hospitality businesses with significant real estate components — acreage, entitlements, and cabin inventory all factor in.",
    buyerPriorities: [
      "Total acreage, cabin count, and development entitlements",
      "Trail systems, water features, and guest experience assets",
      "Staffing model and management infrastructure",
      "Long-term eco-tourism and destination demand",
    ],
    investmentAngle:
      "Large-acreage nature resorts are rare assets with flagship potential — ideal for operators building a regional brand or developers with a multi-year hospitality vision.",
    emptyStateNote:
      "Nature resort listings are infrequent. Set an alert to be first in line when a matching property in this state is listed.",
  },
};

const STATE_MARKET: Record<string, StateMarketContext> = {
  alabama: {
    region: "Southeast",
    landscape: "Gulf Coast beaches, Tennessee Valley lakes, and southern Appalachian foothills",
    seasonality: "Coastal parks see year-round visitors; inland campgrounds peak spring through fall.",
    demandDriver: "beach camping, lake recreation, and college football weekend travel",
  },
  alaska: {
    region: "Pacific",
    landscape: "Glacial fjords, boreal forest, and vast wilderness corridors",
    seasonality: "The primary season runs May through September, with limited winter operations in select markets.",
    demandDriver: "fishing lodges, RV tourism along the Alaska Highway, and adventure travel",
  },
  arizona: {
    region: "Southwest",
    landscape: "Sonoran Desert, red rock country, and high-country pine forests",
    seasonality: "Desert markets thrive October through April; northern Arizona draws summer mountain campers.",
    demandDriver: "snowbird RV traffic, Sedona tourism, and Grand Canyon gateway travel",
  },
  arkansas: {
    region: "South Central",
    landscape: "Ozark Mountains, Hot Springs, and the Buffalo National River",
    seasonality: "Strong spring-through-fall demand with holiday peaks in lake and river markets.",
    demandDriver: "floating and paddling tourism, Ozark outdoor recreation, and family road trips",
  },
  california: {
    region: "Pacific",
    landscape: "Sierra Nevada peaks, Pacific coastline, desert parks, and redwood forests",
    seasonality: "Coastal and southern markets operate year-round; mountain properties peak summer.",
    demandDriver: "national park tourism, wine country travel, and one of the largest RV markets in the country",
  },
  colorado: {
    region: "Mountain West",
    landscape: "Rocky Mountain alpine terrain, high desert mesas, and river valleys",
    seasonality: "Summer camping and winter shoulder-season glamping both drive revenue.",
    demandDriver: "ski-town adjacency, fourteeners hiking culture, and Front Range metro escape travel",
  },
  connecticut: {
    region: "Northeast",
    landscape: "Long Island Sound shoreline, Litchfield Hills, and river valleys",
    seasonality: "Memorial Day through Labor Day is core season, with fall foliage weekends strong.",
    demandDriver: "NYC and Boston weekend getaways, coastal camping, and fall leaf-peeping",
  },
  delaware: {
    region: "Mid-Atlantic",
    landscape: "Atlantic beaches, inland bays, and rural farmland",
    seasonality: "Beach season dominates May through September with strong holiday weekends.",
    demandDriver: "Mid-Atlantic beach tourism and drive-market camping from Philadelphia and Baltimore",
  },
  florida: {
    region: "Southeast",
    landscape: "Atlantic and Gulf coastlines, Everglades, springs, and inland lakes",
    seasonality: "Year-round operations are common, with snowbird season driving RV park occupancy.",
    demandDriver: "the nation's largest snowbird RV corridor, theme park travel, and spring break tourism",
  },
  georgia: {
    region: "Southeast",
    landscape: "Blue Ridge Mountains, coastal islands, and lake country around Atlanta",
    seasonality: "Mountain markets peak summer; coastal and lake properties draw spring and fall crowds.",
    demandDriver: "Atlanta drive-market camping, North Georgia mountain tourism, and coastal island travel",
  },
  hawaii: {
    region: "Pacific",
    landscape: "Volcanic coastlines, tropical valleys, and high-elevation ranch land",
    seasonality: "Tourism is year-round with peak demand in winter and summer holiday periods.",
    demandDriver: "international tourism, eco-lodge demand, and premium glamping near natural landmarks",
  },
  idaho: {
    region: "Mountain West",
    landscape: "Sawtooth Range, Snake River canyon, and vast forest service land",
    seasonality: "Summer is peak; select markets near ski areas extend into shoulder seasons.",
    demandDriver: "Boise metro growth, Sawtooth recreation, and RV travel along I-84",
  },
  illinois: {
    region: "Midwest",
    landscape: "Great Lakes shoreline, Shawnee National Forest, and Mississippi River bluffs",
    seasonality: "Memorial Day through Labor Day drives most revenue; fall camping is growing.",
    demandDriver: "Chicago weekend camping, Shawnee outdoor recreation, and Great Lakes tourism",
  },
  indiana: {
    region: "Midwest",
    landscape: "Indiana Dunes, southern hills, and lake country north of Indianapolis",
    seasonality: "Traditional summer camping season with strong holiday weekend occupancy.",
    demandDriver: "Indianapolis and Chicago drive-market demand and state park adjacency",
  },
  iowa: {
    region: "Midwest",
    landscape: "Mississippi River bluffs, lake regions, and rolling agricultural countryside",
    seasonality: "May through October is the core operating window for most properties.",
    demandDriver: "family camping, county fair season travel, and Des Moines metro getaways",
  },
  kansas: {
    region: "Great Plains",
    landscape: "Flint Hills tallgrass prairie, reservoirs, and wide-open prairie skies",
    seasonality: "Summer camping dominates; fall hunting season supports select RV markets.",
    demandDriver: "cross-country RV travel on I-70, lake recreation, and prairie tourism",
  },
  kentucky: {
    region: "Southeast",
    landscape: "Daniel Boone National Forest, Mammoth Cave country, and bourbon trail towns",
    seasonality: "Spring through fall is peak; Derby weekend and fall color drive strong weekends.",
    demandDriver: "cave country tourism, bourbon trail travel, and Appalachian outdoor recreation",
  },
  louisiana: {
    region: "South Central",
    landscape: "Bayou country, Gulf Coast marshes, and piney hill country",
    seasonality: "Fall through spring is preferred for camping; summer heat limits some markets.",
    demandDriver: "New Orleans festival travel, fishing tourism, and Cajun country road trips",
  },
  maine: {
    region: "Northeast",
    landscape: "Rocky Atlantic coastline, Acadia country, and vast northern forests",
    seasonality: "June through September is peak; fall foliage extends the shoulder season.",
    demandDriver: "coastal camping, Acadia National Park tourism, and New England leaf-peeping",
  },
  maryland: {
    region: "Mid-Atlantic",
    landscape: "Chesapeake Bay, Appalachian ridges, and Atlantic beach towns",
    seasonality: "Summer drives bay and beach camping; fall weekends are strong inland.",
    demandDriver: "DC and Baltimore metro escape travel, Chesapeake boating, and Assateague tourism",
  },
  massachusetts: {
    region: "Northeast",
    landscape: "Cape Cod, Berkshires, and coastal New England forest",
    seasonality: "Short but intense summer season; fall foliage and Cape tourism extend demand.",
    demandDriver: "Boston metro weekend travel, Cape Cod camping, and Berkshires cultural tourism",
  },
  michigan: {
    region: "Great Lakes",
    landscape: "Great Lakes shoreline, Upper Peninsula forests, and inland lake country",
    seasonality: "Memorial Day through Labor Day is core; UP fall color is a growing draw.",
    demandDriver: "Great Lakes boating and camping, UP wilderness tourism, and Detroit/Chicago drive markets",
  },
  minnesota: {
    region: "Upper Midwest",
    landscape: "Boundary Waters lakes, North Shore of Lake Superior, and prairie lake country",
    seasonality: "June through August is peak; fall hunting season supports select RV parks.",
    demandDriver: "canoe country tourism, Lake Superior travel, and Twin Cities weekend camping",
  },
  mississippi: {
    region: "Southeast",
    landscape: "Gulf Coast beaches, Delta river country, and pine forest hills",
    seasonality: "Coastal markets operate year-round; inland properties peak spring and fall.",
    demandDriver: "Gulf Coast casino and beach tourism, Natchez Trace travel, and river recreation",
  },
  missouri: {
    region: "Midwest",
    landscape: "Ozark hills, Lake of the Ozarks, and Missouri River bluffs",
    seasonality: "Memorial Day through Labor Day drives most revenue across lake and river markets.",
    demandDriver: "Lake of the Ozarks boating tourism, Branson entertainment travel, and Ozark outdoor recreation",
  },
  montana: {
    region: "Mountain West",
    landscape: "Glacier country, Yellowstone gateway towns, and Big Sky ranch land",
    seasonality: "June through September is the primary season for most outdoor hospitality assets.",
    demandDriver: "national park gateway tourism, fly fishing, and ranch-style glamping demand",
  },
  nebraska: {
    region: "Great Plains",
    landscape: "Sandhills prairie, Platte River valley, and reservoir lake country",
    seasonality: "Summer camping season with spring migration tourism along the Platte River.",
    demandDriver: "crane migration tourism, cross-state RV travel on I-80, and lake recreation",
  },
  nevada: {
    region: "West",
    landscape: "Mojave Desert, Great Basin ranges, and Lake Tahoe basin",
    seasonality: "Desert RV parks thrive fall through spring; Tahoe markets peak summer.",
    demandDriver: "Las Vegas tourism overflow, Tahoe recreation, and desert stargazing glamping",
  },
  "new-hampshire": {
    region: "Northeast",
    landscape: "White Mountains, Lakes Region, and seacoast",
    seasonality: "Summer is peak; fall foliage is a major revenue driver for mountain properties.",
    demandDriver: "White Mountain hiking tourism, Boston metro weekend travel, and fall leaf-peeping",
  },
  "new-jersey": {
    region: "Mid-Atlantic",
    landscape: "Jersey Shore, Pine Barrens, and Delaware River valley",
    seasonality: "Memorial Day through Labor Day dominates shore markets; shoulder seasons are shorter inland.",
    demandDriver: "NYC and Philadelphia beach camping, Pine Barrens recreation, and Shore tourism",
  },
  "new-mexico": {
    region: "Southwest",
    landscape: "High desert mesas, Sangre de Cristo peaks, and Rio Grande valley",
    seasonality: "Spring and fall are ideal; summer monsoon season and winter ski markets add diversity.",
    demandDriver: "Santa Fe and Taos art tourism, national monument travel, and desert glamping demand",
  },
  "new-york": {
    region: "Northeast",
    landscape: "Adirondack peaks, Catskills, Finger Lakes, and Long Island coastline",
    seasonality: "Summer drives Adirondack and Catskill demand; fall foliage extends the season.",
    demandDriver: "NYC metro escape camping, Adirondack wilderness tourism, and Finger Lakes wine travel",
  },
  "north-carolina": {
    region: "Southeast",
    landscape: "Blue Ridge Parkway, Outer Banks, and Piedmont lake country",
    seasonality: "Mountain markets peak summer; coastal properties draw spring through fall visitors.",
    demandDriver: "Blue Ridge tourism, OBX beach camping, and Charlotte/Raleigh drive-market demand",
  },
  "north-dakota": {
    region: "Northern Plains",
    landscape: "Badlands, Missouri River, and prairie lake country",
    seasonality: "Memorial Day through Labor Day is the core camping season.",
    demandDriver: "Badlands tourism, oil patch RV housing demand, and prairie lake recreation",
  },
  ohio: {
    region: "Midwest",
    landscape: "Lake Erie islands, Hocking Hills, and Amish country farmland",
    seasonality: "Memorial Day through Labor Day is peak; fall camping is growing in Hocking Hills.",
    demandDriver: "Cleveland and Columbus metro camping, Hocking Hills tourism, and Lake Erie island travel",
  },
  oklahoma: {
    region: "South Central",
    landscape: "Wichita Mountains, Ozark foothills, and prairie lake country",
    seasonality: "Spring and fall are strongest; summer lake camping drives family demand.",
    demandDriver: "lake recreation, Route 66 tourism, and Dallas/Fort Worth drive-market camping",
  },
  oregon: {
    region: "Pacific Northwest",
    landscape: "Cascade Range, Oregon Coast, high desert, and Willamette Valley",
    seasonality: "Coastal and mountain markets peak summer; desert RV parks draw year-round travel.",
    demandDriver: "Crater Lake and coast tourism, Bend outdoor recreation, and Portland metro escape travel",
  },
  pennsylvania: {
    region: "Mid-Atlantic",
    landscape: "Pocono Mountains, Laurel Highlands, and Amish farmland",
    seasonality: "Memorial Day through Labor Day is core; fall foliage drives strong weekend demand.",
    demandDriver: "Pocono resort tourism, Pittsburgh and Philadelphia metro camping, and fall leaf-peeping",
  },
  "rhode-island": {
    region: "Northeast",
    landscape: "Narragansett Bay coastline and rural New England woodland",
    seasonality: "Short summer season with strong holiday weekend demand.",
    demandDriver: "New England coastal camping and Boston/Providence metro weekend travel",
  },
  "south-carolina": {
    region: "Southeast",
    landscape: "Lowcountry marshes, Grand Strand beaches, and Upstate mountains",
    seasonality: "Coastal markets operate March through November; mountain markets peak summer.",
    demandDriver: "Myrtle Beach tourism, Charleston travel, and Greenville metro outdoor recreation",
  },
  "south-dakota": {
    region: "Northern Plains",
    landscape: "Black Hills, Badlands, and Missouri River reservoirs",
    seasonality: "Memorial Day through Labor Day is peak; Sturgis Rally drives August RV demand.",
    demandDriver: "Mount Rushmore tourism, Badlands travel, and Sturgis Motorcycle Rally RV overflow",
  },
  tennessee: {
    region: "Southeast",
    landscape: "Great Smoky Mountains, Cumberland Plateau, and Mississippi River bluffs",
    seasonality: "Smokies markets operate year-round with summer and fall peaks.",
    demandDriver: "Great Smoky Mountains tourism — the most visited national park in the US — and Nashville travel",
  },
  texas: {
    region: "South Central",
    landscape: "Hill Country, Gulf Coast, Big Bend desert, and Piney Woods",
    seasonality: "Year-round operations are common; Hill Country and Gulf Coast draw distinct seasonal peaks.",
    demandDriver: "Hill Country tourism, Gulf Coast beach camping, and one of the largest RV markets in the country",
  },
  utah: {
    region: "Mountain West",
    landscape: "Red rock canyon country, Wasatch Range, and high desert plateaus",
    seasonality: "Spring and fall are ideal for desert parks; ski-town RV markets extend into winter.",
    demandDriver: "Mighty Five national parks tourism, Moab adventure travel, and Salt Lake City metro demand",
  },
  vermont: {
    region: "Northeast",
    landscape: "Green Mountains, maple forests, and pastoral river valleys",
    seasonality: "Summer camping and fall foliage are the two primary revenue seasons.",
    demandDriver: "New England leaf-peeping, ski-town shoulder-season glamping, and Boston metro escape travel",
  },
  virginia: {
    region: "Mid-Atlantic",
    landscape: "Blue Ridge Mountains, Chesapeake Bay, and Shenandoah Valley",
    seasonality: "Memorial Day through Labor Day is core; fall foliage drives Blue Ridge weekend demand.",
    demandDriver: "Shenandoah National Park tourism, DC metro escape camping, and Virginia wine country travel",
  },
  washington: {
    region: "Pacific Northwest",
    landscape: "Olympic rainforest, Cascade volcanoes, San Juan Islands, and eastern high desert",
    seasonality: "Western markets peak June through September; eastern Washington RV parks draw longer seasons.",
    demandDriver: "Olympic and Cascade outdoor recreation, Seattle metro escape travel, and San Juan tourism",
  },
  "west-virginia": {
    region: "Appalachia",
    landscape: "Allegheny Mountains, New River Gorge, and Appalachian forest",
    seasonality: "Memorial Day through Labor Day is peak; fall rafting and foliage extend demand.",
    demandDriver: "New River Gorge adventure tourism, whitewater rafting, and Pittsburgh metro camping",
  },
  wisconsin: {
    region: "Upper Midwest",
    landscape: "Door County peninsula, Northwoods lakes, and Mississippi River bluffs",
    seasonality: "Memorial Day through Labor Day is core; fall color and hunting season extend RV demand.",
    demandDriver: "Door County tourism, Northwoods lake camping, and Chicago/Milwaukee drive-market demand",
  },
  wyoming: {
    region: "Mountain West",
    landscape: "Yellowstone and Grand Teton gateway country, Wind River Range, and high plains",
    seasonality: "June through September is the primary operating window for most properties.",
    demandDriver: "Yellowstone and Grand Teton gateway tourism, Jackson Hole travel, and ranch glamping demand",
  },
};

const NEIGHBORING_STATES: Record<string, string[]> = {
  alabama: ["georgia", "tennessee", "florida", "mississippi"],
  alaska: ["washington", "montana", "idaho"],
  arizona: ["california", "nevada", "utah", "colorado", "new-mexico"],
  arkansas: ["missouri", "tennessee", "mississippi", "louisiana", "texas", "oklahoma"],
  california: ["oregon", "nevada", "arizona"],
  colorado: ["wyoming", "utah", "new-mexico", "oklahoma", "kansas", "nebraska", "arizona"],
  connecticut: ["new-york", "massachusetts", "rhode-island"],
  delaware: ["maryland", "new-jersey", "pennsylvania"],
  florida: ["georgia", "alabama"],
  georgia: ["florida", "alabama", "tennessee", "north-carolina", "south-carolina"],
  hawaii: ["california", "washington"],
  idaho: ["montana", "wyoming", "utah", "nevada", "oregon", "washington"],
  illinois: ["wisconsin", "indiana", "iowa", "missouri", "kentucky", "michigan"],
  indiana: ["illinois", "michigan", "ohio", "kentucky"],
  iowa: ["minnesota", "wisconsin", "illinois", "missouri", "nebraska", "south-dakota"],
  kansas: ["nebraska", "missouri", "oklahoma", "colorado"],
  kentucky: ["tennessee", "virginia", "west-virginia", "ohio", "indiana", "illinois", "missouri"],
  louisiana: ["texas", "arkansas", "mississippi"],
  maine: ["new-hampshire", "massachusetts", "vermont"],
  maryland: ["virginia", "west-virginia", "pennsylvania", "delaware"],
  massachusetts: ["new-hampshire", "vermont", "new-york", "connecticut", "rhode-island"],
  michigan: ["wisconsin", "indiana", "ohio"],
  minnesota: ["wisconsin", "iowa", "north-dakota", "south-dakota"],
  mississippi: ["louisiana", "arkansas", "tennessee", "alabama"],
  missouri: ["iowa", "illinois", "kentucky", "tennessee", "arkansas", "oklahoma", "kansas", "nebraska"],
  montana: ["idaho", "wyoming", "north-dakota", "south-dakota"],
  nebraska: ["south-dakota", "iowa", "missouri", "kansas", "colorado", "wyoming"],
  nevada: ["california", "oregon", "idaho", "utah", "arizona"],
  "new-hampshire": ["maine", "vermont", "massachusetts"],
  "new-jersey": ["new-york", "pennsylvania", "delaware"],
  "new-mexico": ["arizona", "utah", "colorado", "oklahoma", "texas"],
  "new-york": ["vermont", "massachusetts", "connecticut", "new-jersey", "pennsylvania"],
  "north-carolina": ["virginia", "tennessee", "georgia", "south-carolina"],
  "north-dakota": ["minnesota", "south-dakota", "montana"],
  ohio: ["michigan", "indiana", "kentucky", "west-virginia", "pennsylvania"],
  oklahoma: ["texas", "arkansas", "missouri", "kansas", "colorado", "new-mexico"],
  oregon: ["washington", "california", "idaho", "nevada"],
  pennsylvania: ["new-york", "new-jersey", "delaware", "maryland", "west-virginia", "ohio"],
  "rhode-island": ["massachusetts", "connecticut"],
  "south-carolina": ["north-carolina", "georgia"],
  "south-dakota": ["north-dakota", "minnesota", "iowa", "nebraska", "wyoming", "montana"],
  tennessee: ["kentucky", "virginia", "north-carolina", "georgia", "alabama", "mississippi", "arkansas", "missouri"],
  texas: ["louisiana", "arkansas", "oklahoma", "new-mexico"],
  utah: ["idaho", "wyoming", "colorado", "new-mexico", "arizona", "nevada"],
  vermont: ["new-hampshire", "massachusetts", "new-york"],
  virginia: ["maryland", "west-virginia", "kentucky", "pennsylvania", "north-carolina", "tennessee"],
  washington: ["oregon", "idaho", "montana", "alaska"],
  "west-virginia": ["pennsylvania", "maryland", "virginia", "kentucky", "ohio"],
  wisconsin: ["minnesota", "iowa", "illinois", "michigan"],
  wyoming: ["montana", "idaho", "utah", "colorado", "nebraska", "south-dakota"],
};

export function isValidPropertyTypeSlug(slug: string): slug is PropertyType {
  return PROPERTY_TYPES.some((t) => t.slug === slug);
}

export function getAllLocationPageParams(): { type: PropertyType; stateSlug: string }[] {
  const params: { type: PropertyType; stateSlug: string }[] = [];
  for (const type of PROPERTY_TYPES) {
    for (const state of US_STATES) {
      params.push({ type: type.slug, stateSlug: state.slug });
    }
  }
  return params;
}

export function generateLocationPageContent(
  type: PropertyType,
  stateSlug: string,
  listings: Listing[] = []
): LocationPageContent | null {
  const state = US_STATES.find((s) => s.slug === stateSlug);
  const typeInfo = TYPE_MARKET[type];
  const stateInfo = STATE_MARKET[stateSlug];

  if (!state || !stateInfo) {
    return null;
  }

  const typeLabel = getPropertyTypeLabel(type);
  const count = listings.length;
  const path = `/listings/${type}/${stateSlug}`;

  const metaTitle = `${typeInfo.plural} for Sale in ${state.label} | WildProperty`;
  const metaDescription =
    count > 0
      ? `Browse ${count} ${typeInfo.pluralLower} for sale in ${state.label}. ${typeInfo.valuationNote.split(".")[0]}. Filter by price and acreage on WildProperty.`
      : `Search ${typeInfo.pluralLower} for sale in ${state.label}. ${stateInfo.demandDriver.charAt(0).toUpperCase() + stateInfo.demandDriver.slice(1)}. Set buyer alerts on WildProperty.`;

  const h1 = `${typeInfo.plural} for Sale in ${state.label}`;
  const subtitle =
    count > 0
      ? `${count} active ${count === 1 ? "listing" : "listings"} in ${state.label}`
      : `Explore the ${state.label} ${typeInfo.pluralLower} market`;

  const intro = `${state.label}'s outdoor hospitality market spans ${stateInfo.landscape}. Buyers evaluating ${typeInfo.pluralLower} here typically focus on ${stateInfo.demandDriver}. ${stateInfo.seasonality.charAt(0).toUpperCase() + stateInfo.seasonality.slice(1)} In the ${stateInfo.region}, ${typeInfo.pluralLower} typically trade in the ${typeInfo.priceRange} range depending on site count, revenue history, and location quality.`;

  const marketOverview = count > 0
    ? `WildProperty currently lists ${count} ${typeInfo.pluralLower} for sale in ${state.label}. ${typeInfo.investmentAngle} ${typeInfo.valuationNote} Active listings below represent real opportunities — request financials and schedule site visits directly through each listing.`
    : `There are no active ${typeInfo.pluralLower} listed in ${state.label} right now, but the market remains active. ${typeInfo.emptyStateNote} ${typeInfo.investmentAngle}`;

  const buyerTips = typeInfo.buyerPriorities.map(
    (tip) => `In ${state.label}, prioritize ${tip.charAt(0).toLowerCase() + tip.slice(1)}`
  );

  const faq = [
    {
      question: `How much does a ${typeLabel.toLowerCase()} cost in ${state.label}?`,
      answer: `${typeInfo.plural} in ${state.label} typically range from ${typeInfo.priceRange}, depending on site count, revenue history, and proximity to ${stateInfo.demandDriver.split(",")[0]}. ${typeInfo.valuationNote}`,
    },
    {
      question: `What should I look for when buying a ${typeLabel.toLowerCase()} in ${state.label}?`,
      answer: `Focus on ${typeInfo.buyerPriorities.slice(0, 2).join(" and ").toLowerCase()}. ${state.label}'s market is shaped by ${stateInfo.demandDriver}, so properties aligned with that demand tend to outperform.`,
    },
    {
      question: `Is a ${typeLabel.toLowerCase()} a good investment in ${state.label}?`,
      answer: `${typeInfo.investmentAngle} ${stateInfo.seasonality.charAt(0).toUpperCase() + stateInfo.seasonality.slice(1)} ${state.label}'s ${stateInfo.region} location and ${stateInfo.landscape.split(",")[0]} create durable demand for well-operated outdoor hospitality assets.`,
    },
  ];

  const otherTypes = PROPERTY_TYPES.filter((t) => t.slug !== type);
  const relatedTypeLinks = otherTypes.map((t) => ({
    label: `${TYPE_MARKET[t.slug].plural} in ${state.label}`,
    href: `/listings/${t.slug}/${stateSlug}`,
  }));

  const neighborSlugs = (NEIGHBORING_STATES[stateSlug] ?? []).slice(0, 4);
  const relatedStateLinks = neighborSlugs
    .map((slug) => {
      const neighbor = US_STATES.find((s) => s.slug === slug);
      if (!neighbor) return null;
      return {
        label: `${typeInfo.plural} in ${neighbor.label}`,
        href: `/listings/${type}/${slug}`,
      };
    })
    .filter((link): link is { label: string; href: string } => link !== null);

  return {
    path,
    metaTitle,
    metaDescription,
    h1,
    subtitle,
    intro,
    marketOverview,
    buyerTips,
    faq,
    relatedTypeLinks,
    relatedStateLinks,
  };
}
