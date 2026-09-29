# Scroll Car Animation — Welcome Itzfizz

A Next.js + Tailwind + GSAP rebuild of the reference hero
(https://paraschaturvedi.github.io/car-scroll-animation/).

As you scroll, a car drives along the road. It leaves a green trail and reveals the
headline **WELCOME ITZFIZZ** letter by letter as it passes. Four stat boxes fade in
one after another during the drive.

**Stack:** Next.js 14 (static export) · React 18 · Tailwind CSS 3 · GSAP 3 + ScrollTrigger · `@gsap/react`

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
```

## Deploy to GitHub Pages

1. Push this project to the `main` branch of a new GitHub repo.
2. In the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. `.github/workflows/deploy.yml` builds and publishes on every push.
   The site appears at `https://<username>.github.io/<repo-name>/`.

## Using your own car image

Put a top-view car image (facing right, transparent background) in `public/`,
then change `CAR_SRC` at the top of `components/Hero.jsx`, for example to
`` `${base}/car.png` ``. The code measures the image's size, so any aspect ratio works.

## How it works (`components/Hero.jsx`)

**Intro on load:** the road fades in and the car rolls in from the left.

**Scroll drive:** the hero is pinned for two screen-heights of scrolling. One
timeline, scrubbed with `scrub: 1`, moves the car from the left edge until its
centre reaches the right edge. The numeric scrub makes the car ease toward the
scroll position instead of jumping, which keeps the motion smooth.
On each update:

- the green trail's `scaleX` is set to the car centre ÷ road width;
- each letter fades in (with a small lift) once the car centre passes it, and
  fades out again when you scroll back.

The stat boxes are tweens inside the same timeline, at 22%, 33%, 44% and 55% of
the drive, in the same order as the reference.

## Changes from the reference

The look and behaviour match the reference. The implementation is improved in
these ways:

- **Responsive:** the road, car, headline and boxes scale with the screen, and
  all positions are re-measured on resize. The reference measures once on load,
  so it breaks when the window is resized.
- **No layout work while scrolling:** positions are measured only on refresh.
  Per-frame work is number comparisons plus `transform`/`opacity` updates. The
  trail uses `scaleX` instead of animating `width`, and a letter is only animated
  when its visible state changes.
- **Smoother:** eased scrub instead of `scrub: true`, eased letter reveals instead
  of instant opacity toggles, and a load intro.
- **Boxes can't overlap:** each row is a flex container with a fixed gap.
- **Cleanup:** `useGSAP` removes all tweens and ScrollTriggers on unmount.
