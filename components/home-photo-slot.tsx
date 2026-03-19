"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

function pickRandomDifferent(current: string, pool: string[]) {
  if (pool.length <= 1) return current;
  const candidates = pool.filter((p) => p !== current);
  if (!candidates.length) return current;
  const idx = Math.floor(Math.random() * candidates.length);
  return candidates[idx]!;
}

export function HomePhotoSlot({
  photos,
  initialSrc,
  alt,
  intervalMs = 5000,
  fadeMs = 2000,
}: {
  photos: string[];
  initialSrc: string;
  alt: string;
  intervalMs?: number;
  fadeMs?: number;
}) {
  const pool = useMemo(() => photos, [photos]);
  const [frontSrc, setFrontSrc] = useState(initialSrc);
  const [backSrc, setBackSrc] = useState<string | null>(null); // shown during active fade
  const [pendingSrc, setPendingSrc] = useState<string | null>(null); // preloading next while current fades
  const [transitioning, setTransitioning] = useState(false);
  const transitioningRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);
  const pendingReadyRef = useRef<string | null>(null);
  const lastStartedTransitionRef = useRef<string | null>(null);

  useEffect(() => {
    transitioningRef.current = transitioning;
  }, [transitioning]);

  useEffect(() => {
    if (!pool.length) return;

    const tick = () => {
      // If there's already a pending preload, don't start another one.
      if (pendingSrc) return;

      const avoid = new Set<string>([frontSrc]);
      if (backSrc) avoid.add(backSrc);

      const candidates = pool.filter((p) => !avoid.has(p));
      if (!candidates.length) return;

      const next = candidates[Math.floor(Math.random() * candidates.length)]!;

      // If we are already in a fade (backSrc is occupied), preload next in background.
      if (transitioning || backSrc) {
        setPendingSrc(next);
        return;
      }

      // Otherwise load and swap when ready.
      setBackSrc(next);
    };

    const id = window.setInterval(tick, intervalMs);
    return () => {
      window.clearInterval(id);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [backSrc, frontSrc, intervalMs, pool, pendingSrc, transitioning]);

  const startTransition = (toSrc: string) => {
    lastStartedTransitionRef.current = toSrc;
    setTransitioning(true);
    setBackSrc(toSrc);

    timeoutRef.current = window.setTimeout(() => {
      setFrontSrc(toSrc);
      setBackSrc(null);
      setTransitioning(false);

      const pending = pendingReadyRef.current;
      pendingReadyRef.current = null;
      setPendingSrc(null);

      if (pending) {
        startTransition(pending);
      }
    }, fadeMs);
  };

  const renderLayer = (
    src: string | null,
    layer: "front" | "back",
    onLoaded?: () => void
  ) => {
    if (!src) return null;

    const isFront = layer === "front";
    const opacity = transitioning
      ? isFront
        ? 0
        : 1
      : isFront
        ? 1
        : 0;

    return (
      <div
        className="absolute inset-0 transition-opacity ease-out"
        style={{ opacity, transitionDuration: `${fadeMs}ms` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={isFront}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          // Next/Image provides a reliable signal for when the optimized image is ready.
          onLoadingComplete={onLoaded}
        />
      </div>
    );
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      {renderLayer(frontSrc, "front")}
      {backSrc &&
        renderLayer(backSrc, "back", () => {
          // Only start a transition once the "back" image is ready
          // and we aren't currently fading.
          if (!transitioning && lastStartedTransitionRef.current !== backSrc) {
            startTransition(backSrc);
          }
        })}

      {/* Preload next image in background while current fade runs. */}
      {pendingSrc && (
        <div style={{ display: "none" }}>
          <Image
            src={pendingSrc}
            alt=""
            width={1}
            height={1}
            onLoadingComplete={() => {
              const loaded = pendingSrc;
              if (!loaded) return;
              pendingReadyRef.current = loaded;
              // If the current fade already finished, start the next one immediately.
              if (!transitioningRef.current) {
                // Avoid double-starts during state races.
                if (!backSrc) {
                  startTransition(loaded);
                }
              }
            }}
          />
        </div>
      )}
    </div>
  );
}

