import Link from "next/link";
import { TreePine } from "lucide-react";

interface LogoProps {
  className?: string;
  light?: boolean;
  size?: "default" | "sm";
}

export function Logo({
  className = "",
  light = false,
  size = "default",
}: LogoProps) {
  const color = light ? "text-cream" : "text-forest";
  const iconSize = size === "sm" ? "size-5" : "size-6";
  const textSize = size === "sm" ? "text-xl" : "text-2xl";

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2 ${color} ${className}`}
    >
      <TreePine
        className={`${iconSize} shrink-0 transition-transform group-hover:-rotate-6`}
        strokeWidth={2}
      />
      <span className={`font-serif ${textSize} tracking-tight`}>
        WildProperty
      </span>
    </Link>
  );
}
