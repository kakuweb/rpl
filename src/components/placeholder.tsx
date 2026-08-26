type Variant = "light" | "dark" | "black";

const variantClass: Record<Variant, string> = {
  light: "ph",
  dark: "ph dark",
  black: "ph nerobg",
};

/**
 * Segnaposto immagine del wireframe. `label` accetta "\n" per andare a capo,
 * come i <br> dell'originale. Sparirà dalle pagine man mano che arrivano le
 * foto vere (basta valorizzare le colonne *_url sulle tabelle).
 */
export function Placeholder({
  label,
  variant = "light",
  className,
}: {
  label: string;
  variant?: Variant;
  className?: string;
}) {
  const lines = label.split("\n");

  return (
    <div
      className={[variantClass[variant], className].filter(Boolean).join(" ")}
      role="img"
      aria-label={lines.join(" ")}
    >
      <span>
        {lines.map((line, i) => (
          <span key={i} style={{ display: "block" }}>
            {line}
          </span>
        ))}
      </span>
    </div>
  );
}
