"use client";

import { useState } from "react";
import { PROPERTY_TYPES, US_STATES } from "@/lib/data";

const inputClassName =
  "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1";

const labelClassName =
  "mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground";

const BUDGET_OPTIONS = [
  "No maximum",
  "Up to $500K",
  "Up to $1M",
  "Up to $2.5M",
  "Up to $5M",
  "$5M+",
];

export function BuyerAlertsForm() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);

  function toggleType(slug: string) {
    setSelectedTypes((current) =>
      current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug]
    );
  }

  function toggleState(code: string) {
    setSelectedStates((current) =>
      current.includes(code)
        ? current.filter((item) => item !== code)
        : [...current, code]
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-[var(--shadow-card)] sm:p-10">
        <p className="font-serif text-2xl text-forest">
          You&apos;re subscribed
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          We&apos;ll email you when new properties match your criteria.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)] sm:p-10"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelClassName}>First Name</span>
          <input required name="firstName" className={inputClassName} />
        </label>
        <label className="block">
          <span className={labelClassName}>Email</span>
          <input required type="email" name="email" className={inputClassName} />
        </label>
      </div>

      <div>
        <span className={`${labelClassName} mb-3`}>Property Types</span>
        <div className="grid grid-cols-2 gap-2">
          {PROPERTY_TYPES.map((type) => (
            <label
              key={type.slug}
              className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition-colors hover:border-forest/40 ${
                selectedTypes.includes(type.slug)
                  ? "border-forest bg-secondary"
                  : "border-border"
              }`}
            >
              <input
                type="checkbox"
                checked={selectedTypes.includes(type.slug)}
                onChange={() => toggleType(type.slug)}
                className="accent-forest"
              />
              {type.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <span className={`${labelClassName} mb-3`}>States of Interest</span>
        <div className="grid max-h-40 grid-cols-5 gap-1.5 overflow-y-auto rounded-lg border border-border p-3 sm:grid-cols-8">
          {US_STATES.map((state) => (
            <button
              key={state.value}
              type="button"
              onClick={() => toggleState(state.value)}
              className={`rounded py-1.5 text-xs transition-colors ${
                selectedStates.includes(state.value)
                  ? "bg-forest text-cream"
                  : "hover:bg-secondary"
              }`}
            >
              {state.value}
            </button>
          ))}
        </div>
      </div>

      <label className="block">
        <span className={labelClassName}>Max Budget</span>
        <select name="maxBudget" className={inputClassName} defaultValue="No maximum">
          {BUDGET_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        className="w-full rounded-full bg-forest py-3.5 font-medium text-cream transition-colors hover:bg-forest-deep"
      >
        Subscribe to Alerts
      </button>

      <p className="text-center text-xs text-muted-foreground">
        No spam. Unsubscribe anytime. We send alerts only when matching
        properties are listed.
      </p>
    </form>
  );
}
