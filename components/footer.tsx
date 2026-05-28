import Link from "next/link";
import { Logo } from "@/components/logo";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-forest text-cream">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <Logo light size="sm" />
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/75">
              The marketplace for outdoor hospitality properties.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <Link href="/listings" className="text-cream/85 hover:text-white">
              Browse
            </Link>
            <Link href="/list" className="text-cream/85 hover:text-white">
              List a Property
            </Link>
            <Link href="/alerts" className="text-cream/85 hover:text-white">
              Buyer Alerts
            </Link>
            <Link href="/blog" className="text-cream/85 hover:text-white">
              Blog
            </Link>
          </nav>
        </div>
        <Separator className="my-8 bg-cream/15" />
        <p className="text-sm text-cream/55">
          © {new Date().getFullYear()} WildProperty.org
        </p>
      </div>
    </footer>
  );
}
