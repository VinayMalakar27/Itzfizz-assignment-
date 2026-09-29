# Scroll Car Animation — Welcome Itzfizz

A Next.js + Tailwind + GSAP 


As you scroll, a car drives along the road. It leaves a green trail and reveals the
headline **WELCOME ITZFIZZ** letter by letter as it passes. Four stat boxes fade in
one after another during the drive.

**Stack:** Next.js 14 (static export) · React 18 · Tailwind CSS 3 · GSAP 3 + ScrollTrigger · `@gsap/react`


## How it works 

**Intro on load:** the road fades in and the car rolls in from the left.

**Scroll drive:** the hero is pinned for two screen-heights of scrolling. One
timeline, scrubbed with `scrub: 1`, moves the car from the left edge until its
centre reaches the right edge. The numeric scrub makes the car ease toward the
scroll position instead of jumping, which keeps the motion smooth.
On each update:

- the green trail's `scaleX` is set to the car centre ÷ road width;
- each letter fades in (with a small lift) once the car centre passes it, and
  fades out again when you scroll back.


