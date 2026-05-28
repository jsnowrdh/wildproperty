import { campgroundCostContent } from "./articles/campground-cost";
import { campgroundVsGlampingContent } from "./articles/campground-vs-glamping";
import { bestStatesCampgroundContent } from "./articles/best-states-to-buy-campground";
import { buyingGlampingResortContent } from "./articles/buying-a-glamping-resort";
import { campgroundCapRatesContent } from "./articles/campground-cap-rates";
import { campgroundDueDiligenceContent } from "./articles/campground-due-diligence-checklist";
import { campgroundValuationContent } from "./articles/campground-valuation-guide";
import { campgroundVsRvParkContent } from "./articles/campground-vs-rv-park-investment";
import { costOwningRvParkContent } from "./articles/cost-of-owning-rv-park";
import { financeCampgroundContent } from "./articles/how-to-finance-a-campground";
import { buyCampgroundContent } from "./articles/how-to-buy-a-campground";
import { buyRvParkContent } from "./articles/how-to-buy-an-rv-park";
import { valueRvParkContent } from "./articles/how-to-value-an-rv-park";
import { glampingOperatingCostsContent } from "./articles/glamping-retreat-operating-costs";
import { glampingResortRevenueContent } from "./articles/glamping-resort-revenue";
import { glampingRoiContent } from "./articles/glamping-retreat-roi";
import { howLongBuyCampgroundContent } from "./articles/how-long-to-buy-a-campground";
import { increaseRvParkRevenueContent } from "./articles/increase-rv-park-revenue";
import { isBuyingCampgroundGoodContent } from "./articles/is-buying-a-campground-a-good-investment";
import { natureResortVsCampgroundContent } from "./articles/nature-resort-vs-campground";
import { sbaLoansContent } from "./articles/sba-loans-campgrounds-rv-parks";
import { outdoorHospitalityContent } from "./articles/what-is-outdoor-hospitality";

const BLOG_CONTENT: Record<string, string> = {
  "how-much-does-it-cost-to-buy-a-campground": campgroundCostContent,
  "campground-vs-glamping-retreat-which-is-the-better-investment":
    campgroundVsGlampingContent,
  "how-to-buy-a-campground": buyCampgroundContent,
  "how-to-buy-an-rv-park": buyRvParkContent,
  "glamping-retreat-roi": glampingRoiContent,
  "campground-valuation-guide": campgroundValuationContent,
  "cost-of-owning-rv-park": costOwningRvParkContent,
  "campground-vs-rv-park-investment": campgroundVsRvParkContent,
  "how-to-finance-a-campground": financeCampgroundContent,
  "buying-a-glamping-resort": buyingGlampingResortContent,
  "sba-loans-campgrounds-rv-parks": sbaLoansContent,
  "best-states-to-buy-campground": bestStatesCampgroundContent,
  "glamping-resort-revenue": glampingResortRevenueContent,
  "campground-due-diligence-checklist": campgroundDueDiligenceContent,
  "nature-resort-vs-campground": natureResortVsCampgroundContent,
  "increase-rv-park-revenue": increaseRvParkRevenueContent,
  "campground-cap-rates": campgroundCapRatesContent,
  "what-is-outdoor-hospitality": outdoorHospitalityContent,
  "how-to-value-an-rv-park": valueRvParkContent,
  "glamping-retreat-operating-costs": glampingOperatingCostsContent,
  "how-long-to-buy-a-campground": howLongBuyCampgroundContent,
  "is-buying-a-campground-a-good-investment": isBuyingCampgroundGoodContent,
};

export function getBlogContent(slug: string): string | undefined {
  return BLOG_CONTENT[slug];
}
