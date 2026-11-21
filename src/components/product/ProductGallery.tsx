"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const glass =
  "flex items-center justify-center rounded-full border border-white/25 bg-neutral-800/30 text-white " +
  "backdrop-blur-md backdrop-saturate-150 " +
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_4px_14px_rgba(0,0,0,0.18)] " +
  "transition duration-200 hover:bg-neutral-800/50 active:scale-90";

const noScrollbar = "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

function Arrow({
  dir,
  onClick,
  hidden,
}: {
  dir: "prev" | "next";
  onClick: () => void;
  hidden: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous image" : "Next image"}
      tabIndex={hidden ? -1 : 0}
      className={`${glass} absolute top-1/2 z-10 h-10 w-10 -translate-y-1/2 ${
        dir === "prev" ? "left-3" : "right-3"
      } ${hidden ? "pointer-events-none opacity-0" : "opacity-100"}`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d={dir === "prev" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"} />
      </svg>
    </button>
  );
}

export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const slider = useRef<HTMLDivElement>(null);
  const thumbs = useRef<(HTMLButtonElement | null)[]>([]);
  const total = images.length;

  const goTo = (i: number) => {
    const el = slider.current;
    if (!el) return;
    const next = Math.max(0, Math.min(total - 1, i));
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  };

  // Swipe or arrow: keep the active index in sync with the scroll position
  const onScroll = () => {
    const el = slider.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  // Keep the active thumbnail visible in its row
  useEffect(() => {
    thumbs.current[active]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [active]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goTo(active - 1);
    if (e.key === "ArrowRight") goTo(active + 1);
  };

  return (
    <div className="p-6 pb-0 md:sticky md:top-28 md:self-start ">
      {/* Main slider */}
      <div className="relative">
        <div
          ref={slider}
          onScroll={onScroll}
          onKeyDown={onKeyDown}
          tabIndex={0}
          aria-label={`${name} gallery`}
          className={`flex snap-x snap-mandatory overflow-x-auto outline-none rounded-2xl ${noScrollbar}`}
        >
          {images.map((src, i) => (
            <div
              key={src}
              className="relative aspect-square w-full shrink-0 snap-center bg-neutral-100"
            >
              <Image
                src={src}
                alt={`${name} photo ${i + 1}`}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                priority={i === 0}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {total > 1 && (
          <>
            <Arrow dir="prev" onClick={() => goTo(active - 1)} hidden={active === 0} />
            <Arrow dir="next" onClick={() => goTo(active + 1)} hidden={active === total - 1} />
            <div className={`${glass} pointer-events-none absolute bottom-3 right-3 px-3 py-1 text-xs font-semibold`}>
              {active + 1} / {total}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {total > 1 && (
        <div className={`flex gap-2 overflow-x-auto px-4 py-3 md:px-0 ${noScrollbar}`}>
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              ref={(el) => {
                thumbs.current[i] = el;
              }}
              onClick={() => goTo(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === active}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-neutral-100 transition md:h-20 md:w-20 ${
                i === active
                  ? "ring-2 ring-brand ring-offset-2"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}