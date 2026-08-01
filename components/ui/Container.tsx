/**
 * horizontal padding, one vertical rhythm, so pages differ in content and
 * never in geometry.
 */

export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`mx-auto max-w-6xl px-6 ${className}`}>{children}</div>
  );
}

/**
 * A page section with the standard vertical rhythm. `tone` picks the
 * background: white by default, `surface` for the light band, `navy` for
 * the dark band (text inside must use light ink).
 */
export function Section({
  id,
  tone = "white",
  className = "",
  children,
}: {
  id?: string;
  tone?: "white" | "surface" | "navy";
  className?: string;
  children: React.ReactNode;
}) {
  const tones = {
    white: "bg-white",
    surface: "bg-surface",
    navy: "bg-brand-navy-deep text-white",
  } as const;
  return (
    <section id={id} className={`${tones[tone]} py-20 sm:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
