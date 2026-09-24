"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

import { Placeholder } from "@/components/placeholder";

/**
 * Lite embed di YouTube: finché nessuno clicca si vede solo la miniatura, e
 * l'iframe (con i suoi script e cookie) viene creato al primo click.
 *
 * Non porta con sé il proprio riquadro: si posiziona dentro il contenitore
 * del chiamante — `.card-video .player` nella pagina Videos, `.colonna-video`
 * nella sezione demo della home — e ne riempie l'area.
 *
 * `children` sono le etichette sovrapposte (side view, 1x speed, 10 cm):
 * spariscono durante la riproduzione, perché starebbero proprio sopra i
 * comandi del player.
 */
export function VideoEmbed({
  youtubeId,
  title,
  fallbackLabel,
  start,
  children,
}: {
  youtubeId: string | null;
  title: string;
  /** Segnaposto usato quando la riga non ha ancora un ID YouTube. */
  fallbackLabel: string;
  /** Secondo da cui far partire il video. */
  start?: number;
  children?: ReactNode;
}) {
  const [playing, setPlaying] = useState(false);
  // YouTube genera maxresdefault solo per i video caricati in alta
  // risoluzione. Sugli altri risponde 404, ma con dentro un'immagine grigia
  // di 120x90: il browser la carica senza lamentarsi e onError non scatta.
  // L'unico segnale affidabile è quindi la dimensione. hqdefault esiste
  // sempre, ed è ciò su cui si ripiega.
  const [miniaturaHD, setMiniaturaHD] = useState(true);

  if (!youtubeId) {
    return (
      <>
        <Placeholder label={fallbackLabel} variant="black" />
        <div className="play-btn" />
        {children}
      </>
    );
  }

  if (playing) {
    const params = new URLSearchParams({ autoplay: "1", rel: "0" });
    if (start) params.set("start", String(start));

    return (
      <iframe
        className="video-iframe"
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?${params}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <>
      <button
        type="button"
        className="avvia-video"
        onClick={() => setPlaying(true)}
        aria-label={`Play: ${title}`}
      >
        <Image
          className="video-thumb"
          src={`https://i.ytimg.com/vi/${youtubeId}/${
            miniaturaHD ? "maxresdefault" : "hqdefault"
          }.jpg`}
          alt=""
          fill
          sizes="(max-width: 960px) 100vw, 60vw"
          onLoad={(e) => {
            if (e.currentTarget.naturalWidth <= 120) setMiniaturaHD(false);
          }}
          onError={() => setMiniaturaHD(false)}
        />
        <span className="play-btn" />
      </button>
      {children}
    </>
  );
}
