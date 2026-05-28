"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";

const navLinks = [
  { href: "/listings", label: "Browse Properties" },
  { href: "/list", label: "List Your Property" },
  { href: "/alerts", label: "Buyer Alerts" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-foreground/80 transition-colors hover:text-forest"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/alerts"
            className="inline-flex items-center rounded-full bg-forest px-5 py-2 text-sm font-medium text-cream transition-colors hover:bg-forest-deep"
          >
            Get Alerts
          </Link>
        </nav>

        <button
          type="button"
          className="p-2 text-foreground md:hidden"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? (
            <X className="size-5" />
          ) : (
            <Menu className="size-5" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border/60 bg-background/95 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-foreground/80 transition-colors hover:text-forest"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/alerts"
              className="inline-flex w-fit items-center rounded-full bg-forest px-5 py-2 text-sm font-medium text-cream transition-colors hover:bg-forest-deep"
              onClick={() => setMobileOpen(false)}
            >
              Get Alerts
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
