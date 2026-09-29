"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
// Swap in your own top-view car image here (PNG or SVG, facing right).
const CAR_SRC = `${base}/car.svg`;

const HEADLINE = "WELCOME ITZFIZZ";

// Two rows like the reference; `at` = point in the drive (0–1) where each box fades in.
const STAT_ROWS = [
  {
    pos: "top-[5%] md:right-[10%]",
    items: [
      { value: "58%", label: "Increase in pick up point use", bg: "bg-lime text-ink", at: 0.22 },
      { value: "27%", label: "Increase in pick up point use", bg: "bg-graphite text-white", at: 0.44 },
    ],
  },
  {
    pos: "bottom-[5%] md:right-[12.5%]",
    items: [
      { value: "23%", label: "Decreased in customer phone calls", bg: "bg-sky text-ink", at: 0.33 },
      { value: "40%", label: "Decreased in customer phone calls", bg: "bg-tangerine text-ink", at: 0.55 },
    ],
  },
];

export default function Hero() {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const road = q(".js-road")[0];
      const car = q(".js-car")[0];
      const headline = q(".js-headline")[0];
      const letters = q(".js-letter");
      const trail = q(".js-trail")[0];

      /* ---- Cached measurements (only re-read on refresh / resize) ---- */
      let roadW = 0;
      let carW = 0;
      let letterX = [];

      function measure() {
        roadW = road.offsetWidth;
        carW = car.offsetWidth;
        letterX = letters.map((l) => headline.offsetLeft + l.offsetLeft);
      }
      measure();

      /* ---- Per-frame work: numbers only, no layout reads ---- */
      const setTrail = gsap.quickSetter(trail, "scaleX");
      const shown = letters.map(() => false);

      function render() {
        const carCenter = gsap.getProperty(car, "x") + carW / 2;
        setTrail(roadW ? carCenter / roadW : 0);

        letters.forEach((el, i) => {
          const visible = carCenter >= letterX[i];
          if (visible !== shown[i]) {
            shown[i] = visible;
            gsap.to(el, {
              opacity: visible ? 1 : 0,
              yPercent: visible ? 0 : 12,
              duration: 0.35,
              ease: "power2.out",
              overwrite: true,
            });
          }
        });
      }

      /* ---- 1. Intro on load: road + car roll in ---- */
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(road, { opacity: 0, duration: 0.8 })
        .from(q(".js-car-inner"), { xPercent: -110, duration: 1.3, ease: "power4.out" }, 0.1);

      /* ---- 2. Scroll-driven drive ---- */
      const drive = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1, // eases toward the scroll position for smooth motion
          invalidateOnRefresh: true,
          onRefresh: () => {
            measure();
            render();
          },
        },
        onUpdate: render,
      });

      // Like the reference, the car drives until its centre reaches the road's
      // right edge (half the car leaves the screen), so every letter is revealed.
      drive.fromTo(car, { x: 0 }, { x: () => roadW - carW / 2, duration: 1 }, 0);

      // Stat boxes fade (and lift slightly) in at set points of the drive.
      q(".js-stat").forEach((box) => {
        drive.fromTo(
          box,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.11, ease: "power1.out" },
          Number(box.dataset.at)
        );
      });

      render();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative flex h-[100svh] min-h-[520px] w-full items-center justify-center overflow-hidden bg-stage"
    >
      <h1 className="sr-only">Welcome Itzfizz</h1>

      {/* Road */}
      <div className="js-road relative h-[clamp(80px,14vw,200px)] w-full overflow-hidden bg-road">
        <div className="js-trail absolute inset-0 origin-left scale-x-0 bg-trail will-change-transform" />

        <div
          className="js-headline absolute left-[5%] top-1/2 z-[5] flex -translate-y-1/2 gap-[0.15rem] md:gap-[0.3rem] font-bold leading-none text-ink text-[7.4vw] md:text-[clamp(2.2rem,8.5vw,8rem)]"
          aria-hidden="true"
        >
          {HEADLINE.split("").map((ch, i) => (
            <span key={i} className="js-letter inline-block opacity-0">
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </div>

        <div className="js-car absolute left-0 top-0 z-10 h-full will-change-transform">
          <img
            src={CAR_SRC}
            alt="Car seen from above"
            className="js-car-inner block h-full w-auto max-w-none select-none"
            draggable="false"
            onLoad={() => ScrollTrigger.refresh()}
          />
        </div>
      </div>

      {/* Stat boxes */}
      {STAT_ROWS.map((row, r) => (
        <div
          key={r}
          className={`absolute inset-x-[4%] z-[5] flex gap-3 md:inset-x-auto md:gap-8 ${row.pos}`}
        >
          {row.items.map((s) => (
            <div
              key={s.value}
              data-at={s.at}
              className={`js-stat flex flex-1 flex-col items-start gap-1 rounded-[10px] p-4 opacity-0 md:flex-none md:p-[30px] ${s.bg}`}
            >
              <span className="text-[clamp(2rem,4vw,58px)] font-semibold leading-none">{s.value}</span>
              <span className="text-sm md:text-lg">{s.label}</span>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
