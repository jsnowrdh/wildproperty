"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PROPERTY_TYPES, US_STATES } from "@/lib/data";

interface SearchHeroProps {
  centered?: boolean;
}

export function SearchHero({ centered = true }: SearchHeroProps) {
  const router = useRouter();
  const [type, setType] = useState("all");
  const [state, setState] = useState("all");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (type !== "all") params.set("type", type);
    if (state !== "all") params.set("state", state);
    const query = params.toString();
    router.push(query ? `/listings?${query}` : "/listings");
  }

  return (
    <form
      onSubmit={handleSearch}
      className={`flex w-full max-w-3xl flex-col overflow-hidden rounded-full bg-cream shadow-lg sm:flex-row sm:items-stretch ${
        centered ? "mx-auto" : ""
      }`}
    >
      <div className="flex flex-1 flex-col sm:flex-row sm:items-center">
        <div className="flex-1 px-5 py-3 sm:py-0">
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="h-10 w-full border-0 bg-transparent px-0 text-sm font-medium text-forest shadow-none focus:ring-0">
              <SelectValue placeholder="All Property Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Property Types</SelectItem>
              {PROPERTY_TYPES.map((item) => (
                <SelectItem key={item.slug} value={item.slug}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="hidden h-8 w-px bg-border sm:block" />
        <div className="mx-5 h-px bg-border sm:hidden" />

        <div className="flex-1 px-5 py-3 sm:py-0">
          <Select value={state} onValueChange={setState}>
            <SelectTrigger className="h-10 w-full border-0 bg-transparent px-0 text-sm font-medium text-forest shadow-none focus:ring-0">
              <SelectValue placeholder="All States" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              {US_STATES.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        type="submit"
        className="m-1.5 rounded-full bg-forest px-6 text-cream hover:bg-forest-light sm:m-1.5 sm:px-8"
      >
        <Search className="size-4" />
        Search
      </Button>
    </form>
  );
}
