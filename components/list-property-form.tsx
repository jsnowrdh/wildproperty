"use client";

import { useState } from "react";
import { PROPERTY_TYPES, US_STATES } from "@/lib/data";

const inputClassName =
  "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1";

const labelClassName =
  "mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground";

export function ListPropertyForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="py-8 text-center">
        <p className="font-serif text-2xl text-forest">
          Thank you for your submission
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          We review all submissions within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <label className="block">
        <span className={labelClassName}>
          Your Name<span className="text-terracotta"> *</span>
        </span>
        <input required name="name" className={inputClassName} />
      </label>

      <label className="block">
        <span className={labelClassName}>
          Email<span className="text-terracotta"> *</span>
        </span>
        <input required type="email" name="email" className={inputClassName} />
      </label>

      <label className="block">
        <span className={labelClassName}>Phone</span>
        <input type="tel" name="phone" className={inputClassName} />
      </label>

      <label className="block">
        <span className={labelClassName}>
          Property Name<span className="text-terracotta"> *</span>
        </span>
        <input required name="propertyName" className={inputClassName} />
      </label>

      <label className="block">
        <span className={labelClassName}>
          Property Type<span className="text-terracotta"> *</span>
        </span>
        <select required name="propertyType" className={inputClassName} defaultValue="">
          <option value="" disabled>
            Select...
          </option>
          {PROPERTY_TYPES.map((type) => (
            <option key={type.slug} value={type.slug}>
              {type.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className={labelClassName}>
          State<span className="text-terracotta"> *</span>
        </span>
        <select required name="state" className={inputClassName} defaultValue="">
          <option value="" disabled>
            Select...
          </option>
          {US_STATES.map((state) => (
            <option key={state.value} value={state.value}>
              {state.value}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className={labelClassName}>Asking Price</span>
        <input name="askingPrice" placeholder="$" className={inputClassName} />
      </label>

      <label className="block">
        <span className={labelClassName}>Acreage</span>
        <input type="number" name="acres" className={inputClassName} />
      </label>

      <label className="block sm:col-span-2">
        <span className={labelClassName}>
          Short Description<span className="text-terracotta"> *</span>
        </span>
        <textarea
          required
          name="description"
          rows={4}
          placeholder="A few sentences about the property..."
          className={`${inputClassName} resize-none`}
        />
      </label>

      <div className="sm:col-span-2">
        <button
          type="submit"
          className="rounded-full bg-forest px-8 py-3 text-sm font-medium text-cream transition-colors hover:bg-forest-deep sm:w-auto w-full"
        >
          Submit for Review
        </button>
        <p className="mt-4 text-xs text-muted-foreground">
          We review all submissions within 24 hours.
        </p>
      </div>
    </form>
  );
}
