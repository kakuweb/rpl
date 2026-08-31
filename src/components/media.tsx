import Image from "next/image";

import { Placeholder } from "@/components/placeholder";
import { asset } from "@/lib/site";

/**
 * Immagine di un contenuto, con il segnaposto del wireframe come ripiego
 * finché la riga non ha un `url`. Due modi di occupare lo spazio:
 *
 *   fill=true   riempie il riquadro del contenitore ritagliando il necessario
 *               (anteprime delle card, dove il taglio non fa danni)
 *   fill=false  tiene la sua proporzione naturale
 *               (figure degli articoli, dove ritagliare falserebbe la figura)
 */
export function Media({
  url,
  label,
  width,
  height,
  fill = false,
  sizes,
  className,
}: {
  url?: string | null;
  label: string;
  width?: number | null;
  height?: number | null;
  fill?: boolean;
  sizes?: string;
  className?: string;
}) {
  if (!url) return <Placeholder label={label} className={className} />;

  const src = asset(url);

  // Il testo del segnaposto descrive già il contenuto: riusarlo come alt
  // evita didascalie doppie, togliendo il prefisso "Image —".
  const alt = label.replace(/^(Image|Photo|Video still|Preview)\s+—\s+/i, "");

  if (fill) {
    return (
      <Image
        className={className}
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "(max-width: 960px) 100vw, 50vw"}
        unoptimized={url.endsWith(".webp")}
      />
    );
  }

  return (
    <Image
      className={className}
      src={src}
      alt={alt}
      width={width ?? 1600}
      height={height ?? 900}
      sizes={sizes ?? "(max-width: 900px) 100vw, 820px"}
      unoptimized={url.endsWith(".webp")}
    />
  );
}
