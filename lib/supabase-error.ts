export function formatSupabaseError(error: unknown, fallback: string): string {
  if (error instanceof Error && !("code" in error)) {
    return error.message || fallback;
  }

  if (typeof error === "object" && error !== null) {
    const e = error as {
      message?: string;
      code?: string;
      details?: string;
      hint?: string;
    };

    const parts = [
      e.message,
      e.code ? `code: ${e.code}` : null,
      e.details ? `details: ${e.details}` : null,
      e.hint ? `hint: ${e.hint}` : null,
    ].filter(Boolean);

    if (parts.length > 0) {
      return parts.join(" | ");
    }
  }

  if (typeof error === "string" && error.trim()) {
    return error;
  }

  return fallback;
}

export const toErrorMessage = formatSupabaseError;
