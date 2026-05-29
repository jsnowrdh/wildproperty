import Link from "next/link";

interface AdminNavProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function AdminNav({ title, subtitle, action }: AdminNavProps) {
  return (
    <div className="mb-8 flex items-start justify-between gap-4">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-primary/70">
          WildProperty Admin
        </p>
        <h1 className="mt-2 font-serif text-3xl text-primary">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      <div className="flex flex-col items-end gap-3">
        {action}
        <Link
          href="/api/admin/logout"
          className="text-xs text-muted-foreground underline-offset-4 hover:text-forest hover:underline"
        >
          Logout
        </Link>
      </div>
    </div>
  );
}
