import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin/admin-login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md items-center px-6 py-16">
      <div className="w-full rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-primary/70">
            WildProperty
          </p>
          <h1 className="mt-2 font-serif text-3xl text-primary">Admin Login</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your password to manage listings.
          </p>
        </div>

        <AdminLoginForm />
      </div>
    </div>
  );
}
