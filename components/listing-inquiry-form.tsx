"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ListingInquiryFormProps {
  listingTitle: string;
}

export function ListingInquiryForm({ listingTitle }: ListingInquiryFormProps) {
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyerName,
          buyerEmail,
          buyerPhone,
          message,
          listingTitle,
        }),
      });

      const data = (await response.json()) as { error?: string; success?: boolean };

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Failed to send inquiry.");
        return;
      }

      setStatus("success");
      setBuyerName("");
      setBuyerEmail("");
      setBuyerPhone("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMessage("Failed to send inquiry. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="mt-6 rounded-lg bg-muted/50 p-4 text-center">
        <p className="font-medium text-forest">Inquiry sent</p>
        <p className="mt-1 text-sm text-muted-foreground">
          We&apos;ll get back to you about {listingTitle} shortly.
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-4 rounded-full"
          onClick={() => setStatus("idle")}
        >
          Send another inquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <p className="text-sm font-semibold text-forest">Request Information</p>

      <div>
        <Label htmlFor="buyerName">Name</Label>
        <Input
          id="buyerName"
          value={buyerName}
          onChange={(e) => setBuyerName(e.target.value)}
          required
          className="mt-1.5"
          disabled={status === "loading"}
        />
      </div>

      <div>
        <Label htmlFor="buyerEmail">Email</Label>
        <Input
          id="buyerEmail"
          type="email"
          value={buyerEmail}
          onChange={(e) => setBuyerEmail(e.target.value)}
          required
          className="mt-1.5"
          disabled={status === "loading"}
        />
      </div>

      <div>
        <Label htmlFor="buyerPhone">Phone</Label>
        <Input
          id="buyerPhone"
          type="tel"
          value={buyerPhone}
          onChange={(e) => setBuyerPhone(e.target.value)}
          required
          className="mt-1.5"
          disabled={status === "loading"}
        />
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          className="mt-1.5 resize-none"
          placeholder="Tell us about your interest in this property..."
          disabled={status === "loading"}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-destructive">{errorMessage}</p>
      )}

      <Button
        type="submit"
        className="w-full rounded-full bg-forest hover:bg-forest-light"
        size="lg"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending..." : "Request Information"}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Connect with the listing broker for financials and site visits.
      </p>
    </form>
  );
}
