import Link from "next/link";

/**
 * per screen; everything else is secondary or a plain text link.
 */
export function ButtonLink({
  href,
  variant = "primary",
  external = false,
  className = "",
  children,
}: {
  href: string;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors";
  const variants = {
    primary: "bg-brand-navy text-white hover:bg-brand-navy-deep",
    secondary:
      "border border-brand-navy/20 text-brand-navy hover:border-brand-teal-ink hover:text-brand-teal-ink",
  } as const;
  const cls = `${base} ${variants[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
