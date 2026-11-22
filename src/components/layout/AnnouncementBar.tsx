"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const messages = [
  "30-DAY MONEY BACK GUARANTEE",
  "FAST SHIPPING",
  "CASH ON DELIVERY",
];

export default function AnnouncementBar() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray<HTMLElement>(".msg");
        const tl = gsap.timeline({ repeat: -1 });

        items.forEach((item) => {
          tl.fromTo(
            item,
            {
              y: 14,
              filter: "blur(8px)",
              autoAlpha: 0,
            },
            {
              y: 0,
              filter: "blur(0px)",
              autoAlpha: 1,
              duration: 0.35,
              ease: "power3.out",
            }
          ).to(item, {
            y: -14,
            filter: "blur(8px)",
            autoAlpha: 0,
            duration: 0.5,
            ease: "power3.in",
            delay: 1,
          });
        });

        const el = root.current;
        if (!el) return;

        const pause = () => tl.pause();
        const play = () => tl.play();

        el.addEventListener("mouseenter", pause);
        el.addEventListener("mouseleave", play);

        return () => {
          el.removeEventListener("mouseenter", pause);
          el.removeEventListener("mouseleave", play);
        };
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      className="announcement-bg relative h-[36px] select-none overflow-hidden"
    >
      {messages.map((text) => (
        <p
          key={text}
          className="msg absolute inset-0 flex items-center justify-center whitespace-nowrap text-xs font-extrabold tracking-[2px] text-white opacity-0"
        >
          {text}
        </p>
      ))}
    </div>
  );
}