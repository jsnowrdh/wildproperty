"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterCta() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/alerts");
  }

  return (
    <section className="relative overflow-hidden bg-forest py-20 text-cream">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(42,74,58,0.5)_0%,transparent_70%)]" />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="font-serif text-3xl leading-snug sm:text-4xl">
          Be first to know when new properties hit the market.
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 flex max-w-xl flex-col gap-2 rounded-2xl border border-cream/15 bg-forest-light/40 p-1.5 sm:flex-row sm:items-center"
        >
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="h-12 flex-1 border-0 bg-transparent px-4 text-cream placeholder:text-cream/45 focus-visible:ring-0"
          />
          <Button
            type="submit"
            className="h-12 rounded-xl bg-terracotta px-6 text-cream hover:bg-terracotta/90"
          >
            Get Alerts
          </Button>
        </form>
      </div>
    </section>
  );
}
