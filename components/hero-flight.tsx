"use client";

import { useRef } from "react";
import { countries } from "../lib/countries";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP, ScrollTrigger, MotionPathPlugin);

const places = [
  ["uk", "UK"],
  ["usa", "USA"],
  ["canada", "Canada"],
  ["australia", "Australia"],
  ["ireland", "Ireland"],
  ["france", "France"],
  ["nz", "New Zealand"],
].flatMap(([slug, label]) => {
  const country = countries.find((item) => item.slug === slug);
  return country ? [{ label, href: `/${country.path}` }] : [];
});

const chapters = [
  {
    title: "University shortlisting",
    text: "A realistic list, built around the course, the country, and the intake you can make.",
    image: "shortlist",
    alt: "A student comparing printed photographs of university campuses.",
  },
  {
    title: "Securing finance",
    text: "Fees, living costs, and funding, looked at before an application goes out.",
    image: "finance",
    alt: "A student working through study costs at the kitchen table.",
  },
  {
    title: "Building application",
    text: "Documents, deadlines, and the order the applications should leave in.",
    image: "application",
    alt: "A student preparing an application on a laptop, with papers and a passport beside her.",
  },
  {
    title: "Get visa ready",
    text: "Once an offer is in hand, preparation for that country’s student visa.",
    image: "visa",
    alt: "A packed suitcase, a closed passport, and a student ready to leave.",
  },
];

function PaperPlane({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 210" fill="none" aria-hidden="true">
      <path className="plane-shadow" d="M86 186 L352 128 L168 156 Z" fill="rgba(16,44,62,0.14)" />
      <path className="plane-body" d="M64 172 L368 104 L148 132 Z" fill="#102C3E" />
      <path className="plane-wing" d="M36 42 L368 104 L148 116 Z" />
      <path className="plane-fold" d="M148 116 L368 104 L196 158 Z" fill="#102C3E" />
      <path className="plane-crease" d="M96 74 L368 104" stroke="#102C3E" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

const HERO_PORCELAIN = "#f7f8f5";
const HERO_COAST = "#0b75a2";

export function HeroFlight() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;

      const q = gsap.utils.selector(section);
      const yellow = q(".flight-yellow");
      const plane = q(".flight-plane");
      const stage = q(".flight-stage");
      const blurbs = q(".flight-blurb");
      const cards = q(".flight-card");

      const motion = gsap.matchMedia();

      motion.add("(prefers-reduced-motion: reduce)", () => {
        section.style.removeProperty("--hero-pull");
        gsap.set([stage, blurbs, cards], { autoAlpha: 1, y: 0 });
        gsap.set(q(".flight-frame"), { clipPath: "none" });
      });

      const play = (desktop: boolean) => {
        const header = document.querySelector(".site-header");
        const headerMargin = header ? Number.parseFloat(getComputedStyle(header).marginTop) : 0;
        let pull = header
          ? Math.round(header.getBoundingClientRect().height + (Number.isFinite(headerMargin) ? headerMargin : 0))
          : 0;
        const applyPull = (value: number) => {
          pull = Math.max(0, Math.round(value));
          section.style.setProperty("--hero-pull", `${pull}px`);
        };
        applyPull(pull);
        const slipped = Math.round(section.getBoundingClientRect().top + window.scrollY);
        if (Math.abs(slipped) > 1) applyPull(pull + slipped);

        gsap.set(stage, { autoAlpha: 0 });
        gsap.set(section, { backgroundColor: HERO_PORCELAIN });
        gsap.set(yellow, { autoAlpha: 0 });

        const count = cards.length;
        const turns = cards.map((card) => card.querySelector(".flight-turn") as HTMLElement);
        const frames = cards.map((card) => card.querySelector(".flight-frame") as HTMLElement);
        const slots = [
          { rotation: -5, rx: 4, x: 0, y: -18, scale: 1, z: 20 },
          { rotation: 12, rx: 10, x: 46, y: 18, scale: 0.94, z: 6 },
          { rotation: -14, rx: 14, x: -42, y: 28, scale: 0.9, z: 5 },
          { rotation: 8, rx: 8, x: 14, y: 52, scale: 0.86, z: 4 },
        ];
        const grounds = [
          { rotation: -6, rx: 14, ry: 2, x: 210, y: 108, scale: 0.66, z: 9 },
          { rotation: 5, rx: 12, ry: -2, x: 168, y: 142, scale: 0.58, z: 8 },
          { rotation: -2, rx: 16, ry: 2, x: 230, y: 168, scale: 0.5, z: 7 },
        ];
        const spread = () => {
          const stack = section.querySelector(".flight-stack") as HTMLElement | null;
          const width = stack?.clientWidth || 640;
          return Math.min(desktop ? 1 : 0.34, width / 820);
        };
        const tiltOf = () => (desktop ? 1 : 0.7);
        const reach = () => {
          const stack = section.querySelector(".flight-stack") as HTMLElement | null;
          const width = stack?.clientWidth || 640;
          const card = desktop ? Math.min(width * 0.82, 512) : Math.min(width * 0.78, 312);
          const anchor = width * (desktop ? 0.42 : 0.5);
          const half = card * (desktop ? 0.33 : 0.28);
          return Math.max(48, width - anchor - half - 18);
        };
        const stackPose = (depth: number) => {
          const slot = slots[Math.min(depth, slots.length - 1)];
          const s = spread();
          return {
            card: {
              xPercent: -50,
              yPercent: -50,
              x: slot.x * s,
              y: slot.y * s,
              rotation: slot.rotation * tiltOf(),
              scale: slot.scale,
              transformPerspective: 860,
              zIndex: slot.z,
            },
            turn: { rotationX: slot.rx * tiltOf(), rotationY: 0 },
            shadow: "0 22px 46px rgba(16,16,20,0.16)",
          };
        };
        const groundPose = (age: number) => {
          const spot = grounds[Math.min(age, grounds.length - 1)];
          const s = spread();
          const tilt = tiltOf();
          return {
            card: {
              xPercent: -50,
              yPercent: -50,
              x: Math.min(spot.x * s, reach()),
              y: spot.y * s,
              rotation: spot.rotation * tilt,
              scale: spot.scale,
              transformPerspective: 860,
              zIndex: spot.z,
            },
            turn: { rotationX: spot.rx, rotationY: spot.ry * tilt },
            shadow: "0 12px 16px rgba(16,16,20,0.22)",
          };
        };
        const poseFor = (cardIndex: number, active: number) =>
          cardIndex < active ? groundPose(active - cardIndex - 1) : stackPose(cardIndex - active);

        gsap.set(q(".flight-kicker, .flight-title-word, .flight-sentence"), { autoAlpha: 0 });

        let current = 0;
        let revealed = false;
        let introStale = false;
        let flick: gsap.core.Timeline | null = null;

        const showChapter = (index: number) => {
          introStale = true;
          const prev = current;
          const first = !revealed;
          const jump = !first && Math.abs(index - prev) > 1;
          const forward = index >= prev;
          revealed = true;
          current = index;
          const flickIndex = first || jump ? -1 : forward ? prev : index;

          if (flick) flick.kill();
          flick = gsap.timeline();

          cards.forEach((card, cardIndex) => {
            const pose = poseFor(cardIndex, index);
            const turn = turns[cardIndex];
            const frame = frames[cardIndex];

            if (cardIndex !== flickIndex) {
              const duration = first ? 0 : jump ? 0.4 : 0.5;
              const { zIndex, ...rest } = pose.card;
              flick!.set(card, { zIndex }, 0);
              flick!.to(card, { ...rest, duration, ease: "power3.out" }, 0);
              flick!.to(turn, { ...pose.turn, duration, ease: "power3.out" }, 0);
              flick!.to(frame, { boxShadow: pose.shadow, duration, ease: "power2.out" }, 0);
              return;
            }

            const s = spread();
            const { zIndex, ...rest } = pose.card;
            flick!.set(card, { zIndex: forward ? 30 : zIndex }, 0);
            if (forward) flick!.set(card, { zIndex }, 0.16);
            flick!.to(
              card,
              {
                xPercent: -50,
                yPercent: -50,
                x: forward ? rest.x + 18 * s : rest.x,
                y: forward ? -4 * s : rest.y - 28 * s,
                rotation: forward ? 6 : -4,
                scale: forward ? 0.9 : 1,
                duration: 0.2,
                ease: "power3.out",
              },
              0,
            );
            flick!.to(
              turn,
              { rotationX: forward ? 2 : 6, rotationY: forward ? 6 : 0, duration: 0.22, ease: "power2.out" },
              0,
            );
            flick!.to(frame, { boxShadow: "0 26px 20px rgba(16,16,20,0.2)", duration: 0.22 }, 0);
            flick!.to(
              card,
              { ...rest, y: rest.y + 16, duration: 0.24, ease: "power2.in" },
              0.16,
            );
            flick!.to(turn, { ...pose.turn, duration: 0.22, ease: "power2.out" }, 0.18);
            flick!.to(card, { y: rest.y, duration: 0.14, ease: "bounce.out" }, 0.4);
            flick!.to(frame, { boxShadow: pose.shadow, duration: 0.16 }, 0.4);
          });

          const chapterText = q(".flight-kicker, .flight-title-word, .flight-sentence");
          gsap.killTweensOf(blurbs);
          gsap.killTweensOf(chapterText);
          blurbs.forEach((blurb, blurbIndex) => {
            const bits = blurb.querySelectorAll(".flight-kicker, .flight-title-word, .flight-sentence");
            gsap.killTweensOf(blurb);
            gsap.killTweensOf(bits);
            if (blurbIndex !== index) {
              gsap.set(blurb, { autoAlpha: 0 });
              gsap.set(bits, { autoAlpha: 0, y: 0, rotation: 0, scale: 1 });
            }
          });
          const active = blurbs[index];
          const bits = active.querySelectorAll(".flight-kicker, .flight-title-word, .flight-sentence");
          const kicker = active.querySelector(".flight-kicker");
          const title = active.querySelectorAll(".flight-title-word");
          const sentence = active.querySelector(".flight-sentence");
          gsap.set(active, { autoAlpha: 1 });
          if (first) {
            gsap.set(kicker, { autoAlpha: 1, y: 0, rotation: -3, scale: 1 });
            gsap.set(title, { autoAlpha: 1, y: 0 });
            gsap.set(sentence, { autoAlpha: 1, y: 0 });
          } else {
            gsap.set(bits, { autoAlpha: 0, y: 0, rotation: 0, scale: 1 });
            flick!.fromTo(
              kicker,
              { autoAlpha: 0, y: 16, rotation: 4, scale: 0.96 },
              { autoAlpha: 1, y: 0, rotation: -3, scale: 1, duration: 0.32, ease: "power3.out" },
              0,
            );
            flick!.fromTo(
              title,
              { autoAlpha: 0, y: 12 },
              { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.03, ease: "power3.out" },
              0,
            );
            flick!.fromTo(
              sentence,
              { autoAlpha: 0, y: 8 },
              { autoAlpha: 1, y: 0, duration: 0.28, ease: "power3.out" },
              0,
            );
          }
        };

        const chapterScroll = desktop ? 316.4 : 258.88;
        const introScroll = desktop ? 156 : 72;
        const introPortion = introScroll / (introScroll + chapterScroll);
        const heroBits = q(".flight-copy .eyebrow, .flight-copy .display, .flight-aside");
        const wash = q(".flight-wash")[0] as HTMLElement;
        const trailSvg = q(".flight-trail")[0] as unknown as SVGSVGElement;
        const trailFade = q(".flight-trail-fade")[0] as unknown as SVGPathElement;
        const trailPath = q(".flight-trail-path")[0] as unknown as SVGPathElement;
        const viewport = section.querySelector(".flight-viewport") as HTMLElement;
        const copy = section.querySelector(".flight-copy") as HTMLElement;
        const planeEl = plane[0] as HTMLElement;
        const opening = blurbs[0];
        const openingKicker = opening.querySelector(".flight-kicker");
        const openingTitle = opening.querySelectorAll(".flight-title-word");
        const openingSentence = opening.querySelector(".flight-sentence");

        const round = (value: number) => Math.round(value * 100) / 100;
        const boxOf = (el: HTMLElement) => {
          const vr = viewport.getBoundingClientRect();
          const er = el.getBoundingClientRect();
          return {
            top: er.top - vr.top,
            left: er.left - vr.left,
            width: er.width,
            height: er.height,
            right: vr.width - (er.left - vr.left) - er.width,
            bottom: vr.height - (er.top - vr.top) - er.height,
          };
        };
        const cardClip = () => {
          const box = boxOf(copy);
          const radius = Number.parseFloat(getComputedStyle(copy).borderTopLeftRadius) || (desktop ? 44 : 30);
          return {
            "--wash-top": `${round(Math.max(0, box.top))}px`,
            "--wash-right": `${round(Math.max(0, box.right))}px`,
            "--wash-bottom": `${round(Math.max(0, box.bottom))}px`,
            "--wash-left": `${round(Math.max(0, box.left))}px`,
            "--wash-radius": `${round(radius)}px`,
          } as gsap.TweenVars;
        };

        type Pt = [number, number];
        type Cubic = [Pt, Pt, Pt, Pt];
        const planeTurn = planeEl.querySelector(".flight-plane-turn") as HTMLElement;

        const flightCurve = () => {
          gsap.set(planeEl, { x: 0, y: 0, rotation: 0, scale: 1 });
          gsap.set(planeTurn, { rotation: 0, scaleX: 1, transformOrigin: "50% 50%" });
          const box = boxOf(planeEl);
          const sx = box.left + box.width * 0.5;
          const sy = box.top + box.height * 0.5;
          const w = viewport.clientWidth;
          const h = viewport.clientHeight;
          const padX = box.width * (desktop ? 0.32 : 0.26);
          const padY = box.height * (desktop ? 0.34 : 0.28);
          const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

          const launch = desktop ? -148 : -162;
          const launchRad = (launch * Math.PI) / 180;
          const nose: Pt = [Math.cos(launchRad), Math.sin(launchRad)];
          const start: Pt = [sx, sy];
          const phantom: Pt = [sx - nose[0] * (desktop ? 160 : 70), sy - nose[1] * (desktop ? 160 : 70)];
          const guides = (desktop
            ? [
                [0.68, 0.46], [0.5, 0.54], [0.32, 0.64], [0.18, 0.74],
                [0.14, 0.84], [0.28, 0.88], [0.46, 0.86], [0.64, 0.8],
                [0.8, 0.7], [0.9, 0.56],
              ]
            : [
                [0.48, 0.84], [0.28, 0.8], [0.14, 0.72], [0.12, 0.58],
                [0.24, 0.44], [0.46, 0.36], [0.68, 0.38], [0.86, 0.46],
              ]
          ).map(([nx, ny]) => [clamp(nx * w, padX, w - padX), clamp(ny * h, padY, h - padY)] as Pt);
          const depart: Pt = [
            clamp(sx + nose[0] * (desktop ? 190 : 72), padX, w - padX),
            clamp(sy + nose[1] * (desktop ? 190 : 72), padY, h - padY),
          ];
          const last = guides[guides.length - 1];
          const before = guides[guides.length - 2];
          const dx = last[0] - before[0];
          const dy = last[1] - before[1];
          const span = Math.hypot(dx, dy) || 1;
          const step = box.width * (desktop ? 1.7 : 1.55);
          const exitA: Pt = [last[0] + (dx / span) * step, last[1] + (dy / span) * step];
          const exitB: Pt = [last[0] + (dx / span) * step * 2.1, last[1] + (dy / span) * step * 2.1];
          const knots: Pt[] = [phantom, start, depart, ...guides, exitA, exitB, exitB];
          const tension = desktop ? 0.17 : 0.18;
          const glide: Cubic[] = [];
          for (let index = 1; index < knots.length - 2; index += 1) {
            const prev = knots[index - 1];
            const current = knots[index];
            const next = knots[index + 1];
            const after = knots[index + 2];
            glide.push([
              current,
              [current[0] + (next[0] - prev[0]) * tension, current[1] + (next[1] - prev[1]) * tension],
              [next[0] - (after[0] - current[0]) * tension, next[1] - (after[1] - current[1]) * tension],
              next,
            ]);
          }

          const cubics = glide;
          const command = (originX: number, originY: number) => {
            const [first, c1, c2, c3] = cubics[0];
            let path = `M ${round(first[0] - originX)} ${round(first[1] - originY)} C ${round(c1[0] - originX)} ${round(c1[1] - originY)}, ${round(c2[0] - originX)} ${round(c2[1] - originY)}, ${round(c3[0] - originX)} ${round(c3[1] - originY)}`;
            for (let index = 1; index < cubics.length; index += 1) {
              const [, a, b, c] = cubics[index];
              path += ` C ${round(a[0] - originX)} ${round(a[1] - originY)}, ${round(b[0] - originX)} ${round(b[1] - originY)}, ${round(c[0] - originX)} ${round(c[1] - originY)}`;
            }
            return path;
          };

          trailSvg.setAttribute("viewBox", `0 0 ${Math.max(1, Math.round(w))} ${Math.max(1, Math.round(h))}`);
          const absolute = command(0, 0);
          trailFade.setAttribute("d", absolute);
          trailPath.setAttribute("d", absolute);
          return command(sx, sy);
        };

        let introTl: gsap.core.Timeline | null = null;
        const buildIntro = () => {
          const relativePath = flightCurve();
          const length = Math.max(trailPath.getTotalLength(), 1);
          const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
          const lift = desktop ? -18 : -10;
          const exitY = desktop ? -48 : -28;
          const cardLift = desktop ? 70 : 36;
          const cardTilt = desktop ? 6 : 3.5;
          const flight = 0.8;

          const clip = cardClip();
          tl.set(wash, { autoAlpha: 1, ...clip }, 0);
          tl.set(section, { backgroundColor: HERO_PORCELAIN }, 0);
          tl.set(heroBits, { y: 0, autoAlpha: 1 }, 0);
          tl.set(planeEl, { zIndex: 2, autoAlpha: 1, scale: 1 }, 0);
          const launchPose = desktop ? -148 : -162;
          const launchFlip = Math.abs(launchPose) > 92;
          tl.set(
            planeTurn,
            {
              transformOrigin: "50% 50%",
              rotation: launchFlip ? launchPose - Math.sign(launchPose) * 180 : launchPose,
              scaleX: launchFlip ? -1 : 1,
            },
            0,
          );
          tl.set(stage, { autoAlpha: 0 }, 0);
          tl.set(opening, { autoAlpha: 1 }, 0);
          tl.set(blurbs.slice(1), { autoAlpha: 0 }, 0);
          tl.set([openingKicker, openingTitle, openingSentence], { autoAlpha: 0, y: 0, rotation: 0, scale: 1 }, 0);

          const comet = (pathEl: SVGPathElement, tailRatio: number, opacity: number) => {
            const tail = Math.max(22, length * tailRatio);
            const gap = length + tail;
            tl.set(pathEl, { strokeDasharray: `${tail} ${gap}`, strokeDashoffset: tail, opacity }, 0);
            tl.to(pathEl, { strokeDashoffset: tail - length, duration: flight }, 0);
            tl.to(pathEl, { opacity: 0, duration: 0.12, ease: "power1.in" }, flight - 0.1);
          };
          comet(trailFade, desktop ? 0.34 : 0.28, desktop ? 0.2 : 0.16);
          comet(trailPath, desktop ? 0.14 : 0.12, desktop ? 0.45 : 0.34);

          tl.fromTo(
            heroBits,
            { y: 0, autoAlpha: 1 },
            { y: lift, duration: 0.12, ease: "power1.out", immediateRender: false },
            0,
          );
          tl.fromTo(
            heroBits,
            { y: lift, autoAlpha: 1 },
            { y: exitY, autoAlpha: 0, duration: 0.16, ease: "power2.in", immediateRender: false },
            0.14,
          );

          tl.fromTo(
            wash,
            clip,
            {
              "--wash-top": "0px",
              "--wash-right": "0px",
              "--wash-bottom": "0px",
              "--wash-left": "0px",
              "--wash-radius": "0px",
              duration: 0.24,
              ease: "power2.inOut",
              immediateRender: false,
            },
            0.1,
          );
          tl.set(section, { backgroundColor: HERO_COAST }, 0.34);
          tl.set(planeEl, { zIndex: 6 }, 0.04);

          const steer = (progress: number) => {
            const distance = gsap.utils.clamp(0, 1, progress) * length;
            const sample = Math.max(2, length * 0.012);
            const behind = trailPath.getPointAtLength(Math.max(0, distance - sample));
            const ahead = trailPath.getPointAtLength(Math.min(length, distance + sample));
            let theta = (Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180) / Math.PI;
            const earlier = trailPath.getPointAtLength(Math.max(0, distance - sample * 3));
            let previous = (Math.atan2(behind.y - earlier.y, behind.x - earlier.x) * 180) / Math.PI;
            let turn = theta - previous;
            if (turn > 180) turn -= 360;
            if (turn < -180) turn += 360;
            theta += gsap.utils.clamp(-9, 9, turn * 0.45);
            const flip = Math.abs(theta) > 92;
            gsap.set(planeTurn, {
              rotation: flip ? theta - Math.sign(theta) * 180 : theta,
              scaleX: flip ? -1 : 1,
            });
          };
          tl.to(
            planeEl,
            {
              motionPath: { path: relativePath, autoRotate: false },
              duration: flight,
              onUpdate() {
                steer(this.progress());
              },
            },
            0,
          );
          steer(0);
          tl.to(planeEl, { autoAlpha: 0, duration: 0.14, ease: "power1.in" }, flight - 0.14);

          tl.set(stage, { autoAlpha: 1 }, 0.34);
          tl.fromTo(
            openingKicker,
            { autoAlpha: 0, y: desktop ? 36 : 20 },
            { autoAlpha: 1, y: 0, duration: 0.08, ease: "power3.out", immediateRender: false },
            0.36,
          );
          tl.fromTo(
            openingTitle,
            { autoAlpha: 0, y: desktop ? 26 : 14 },
            { autoAlpha: 1, y: 0, duration: 0.09, stagger: 0.025, ease: "power3.out", immediateRender: false },
            0.42,
          );
          tl.fromTo(
            openingSentence,
            { autoAlpha: 0, y: desktop ? 14 : 8 },
            { autoAlpha: 1, y: 0, duration: 0.08, ease: "power3.out", immediateRender: false },
            0.5,
          );

          cards.forEach((card, cardIndex) => {
            const pose = stackPose(cardIndex);
            tl.set(turns[cardIndex], pose.turn, 0);
            if (cardIndex === 0) {
              tl.set(
                card,
                { ...pose.card, y: pose.card.y + cardLift, rotation: pose.card.rotation - cardTilt, scale: 0.94, autoAlpha: 0 },
                0,
              );
              tl.set(frames[cardIndex], { boxShadow: "0 12px 22px rgba(16,16,20,0.08)" }, 0);
              tl.to(card, { ...pose.card, autoAlpha: 1, duration: 0.28, ease: "power3.out" }, 0.48);
              tl.to(frames[cardIndex], { boxShadow: pose.shadow, duration: 0.28, ease: "power2.out" }, 0.48);
              return;
            }
            tl.set(card, { ...pose.card, autoAlpha: 0 }, 0);
            tl.set(frames[cardIndex], { boxShadow: pose.shadow }, 0);
            tl.to(card, { autoAlpha: 1, duration: 0.14, ease: "power1.out" }, 0.66);
          });

          return tl;
        };

        const renderIntro = (progress: number) => {
          if (!introTl) return;
          introTl.progress(gsap.utils.clamp(0, 1, progress));
        };

        let introActive = true;
        let lastIntroP = 0;
        let alive = true;

        const sync = (self: ScrollTrigger) => {
          if (!introTl) return;
          if (self.progress <= introPortion) {
            const introP = introPortion === 0 ? 1 : self.progress / introPortion;
            if (!introActive) {
              flick?.kill();
              if (introStale && introTl) {
                introTl.kill();
                introTl = buildIntro();
                introStale = false;
              }
            }
            introActive = true;
            lastIntroP = introP;
            current = 0;
            revealed = true;
            renderIntro(introP);
            return;
          }

          if (introActive) {
            introActive = false;
            lastIntroP = 1;
            renderIntro(1);
          }

          const raw = ((self.progress - introPortion) / (1 - introPortion)) * count;
          const target = Math.min(count - 1, Math.max(0, Math.floor(raw)));
          if (target > current && raw < current + 0.88) return;
          if (target < current && raw > current - 0.12) return;
          if (target !== current) showChapter(target);
        };

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: `+=${introScroll + chapterScroll}%`,
          pin: true,
          anticipatePin: 0,
          invalidateOnRefresh: true,
          onUpdate: sync,
        });

        const rebuildAt = (progress: number) => {
          introTl?.kill();
          introTl = buildIntro();
          renderIntro(progress);
        };
        introTl = buildIntro();
        sync(trigger);

        const onResize = () => {
          const bar = document.querySelector(".site-header");
          if (!bar) return;
          const margin = Number.parseFloat(getComputedStyle(bar).marginTop);
          applyPull(bar.getBoundingClientRect().height + (Number.isFinite(margin) ? margin : 0));
          if (window.scrollY < 2) {
            const gap = Math.round(section.getBoundingClientRect().top);
            if (Math.abs(gap) > 1) applyPull(pull + gap);
          }
          if (introActive && !introStale) rebuildAt(lastIntroP);
          ScrollTrigger.refresh();
        };
        const realign = () => {
          if (!alive || !introActive || introStale) return;
          rebuildAt(lastIntroP);
          ScrollTrigger.refresh();
        };
        window.addEventListener("resize", onResize);
        if (document.readyState !== "complete") window.addEventListener("load", realign, { once: true });
        document.fonts?.ready.then(realign);
        return () => {
          alive = false;
          window.removeEventListener("resize", onResize);
          window.removeEventListener("load", realign);
          introTl?.kill();
          section.style.removeProperty("--hero-pull");
        };
      };
      motion.add("(prefers-reduced-motion: no-preference) and (min-width: 901px)", () => play(true));
      motion.add("(prefers-reduced-motion: no-preference) and (max-width: 900px)", () => play(false));

      return () => motion.revert();
    },
    { scope: root },
  );

  return (
    <section className="flight" id="top" ref={root} aria-labelledby="flight-title">
        <div className="flight-viewport">
        <div className="flight-wash" aria-hidden="true" />
        <svg className="flight-trail" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
          <path className="flight-trail-fade" d="" />
          <path className="flight-trail-path" d="" />
        </svg>
        <div className="flight-copy">
          <div className="flight-yellow" aria-hidden="true" />
          <p className="eyebrow">Study abroad consultants in Navi Mumbai</p>
          <h1 className="display" id="flight-title">
            <span className="flight-line">
              <span className="flight-word">Your </span>
              <span className="flight-word">future </span>
              <span className="flight-word">has</span>
            </span>
            <span className="flight-line">
              <span className="flight-word mark">no borders.</span>
            </span>
          </h1>
          <div className="flight-aside">
            <p className="lede">
              Eduvert helps students choose a country and a university, prepare the application,
              look at scholarships where they exist, and get ready for the visa and the departure.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#consult">
                Book a counselling <span className="arrow" aria-hidden="true">→</span>
              </a>
              <a className="btn btn-secondary" href="#destinations">
                Explore destinations
              </a>
            </div>
            <ul className="flight-places">
              {places.map((place) => (
                <li key={place.href}>
                  <a href={place.href}>{place.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flight-plane">
          <div className="flight-plane-turn">
            <PaperPlane />
          </div>
        </div>

        <div className="flight-stage">
          <div className="flight-board">
            <div className="flight-blurbs">
              {chapters.map((chapter, index) => (
                <div className="flight-blurb" key={chapter.image}>
                  <p className="flight-kicker">{String(index + 1).padStart(2, "0")}</p>
                  <h2>
                    {chapter.title.split(" ").map((word, wordIndex) => (
                      <span className="flight-title-word" key={`${chapter.image}-${wordIndex}`}>
                        {word}
                      </span>
                    ))}
                  </h2>
                  <p className="flight-sentence">{chapter.text}</p>
                </div>
              ))}
            </div>
            <div className="flight-stack">
              {chapters.map((chapter) => (
                <figure className="flight-card" key={chapter.image}>
                  <div className="flight-turn">
                  <div className="flight-frame">
                    <picture>
                      <source media="(max-width: 900px)" srcSet={`/story/${chapter.image}-mobile.jpg`} />
                      <img src={`/story/${chapter.image}-desktop.jpg`} alt={chapter.alt} />
                    </picture>
                  </div>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
