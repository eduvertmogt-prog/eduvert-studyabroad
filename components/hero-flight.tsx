"use client";

import { useRef } from "react";
import { countries } from "../lib/countries";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP, ScrollTrigger);

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
      <path d="M86 186 L352 128 L168 156 Z" fill="rgba(16,16,20,0.12)" />
      <path d="M64 172 L368 104 L148 132 Z" fill="#101014" />
      <path d="M36 42 L368 104 L148 116 Z" fill="#F9F91E" />
      <path d="M148 116 L368 104 L196 158 Z" fill="#101014" />
      <path d="M96 74 L368 104" stroke="#101014" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function HeroFlight() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;

      const q = gsap.utils.selector(section);
      const words = q(".flight-word");
      const yellow = q(".flight-yellow");
      const plane = q(".flight-plane");
      const aside = q(".flight-aside");
      const stage = q(".flight-stage");
      const blurbs = q(".flight-blurb");
      const cards = q(".flight-card");

      const motion = gsap.matchMedia();

      motion.add("(prefers-reduced-motion: reduce)", () => {
        section.style.removeProperty("--hero-pull");
        gsap.set([stage, blurbs, cards], { autoAlpha: 1, y: 0 });
        gsap.set(q(".flight-frame"), { clipPath: "none" });
      });

      motion.add("(prefers-reduced-motion: no-preference)", () => {
        const desktop = window.matchMedia("(min-width: 901px)").matches;
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

        gsap.set(blurbs, { autoAlpha: 1 });
        gsap.set(cards, { autoAlpha: 1 });
        gsap.set(stage, { autoAlpha: 0 });
        gsap.set(section, { backgroundColor: "#F7F7F2" });

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

        cards.forEach((card, cardIndex) => {
          const pose = stackPose(cardIndex);
          gsap.set(card, pose.card);
          gsap.set(turns[cardIndex], pose.turn);
        });
        gsap.set(q(".flight-kicker, .flight-title-word, .flight-sentence"), { autoAlpha: 0 });

        let current = 0;
        let revealed = false;
        let flick: gsap.core.Timeline | null = null;

        const showChapter = (index: number) => {
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
            gsap.fromTo(
              kicker,
              { autoAlpha: 0, y: 16, rotation: 4, scale: 0.96 },
              { autoAlpha: 1, y: 0, rotation: -3, scale: 1, duration: 0.32, overwrite: true, ease: "power3.out" },
            );
            gsap.fromTo(
              title,
              { autoAlpha: 0, y: 12 },
              { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.03, overwrite: true, ease: "power3.out" },
            );
            gsap.fromTo(
              sentence,
              { autoAlpha: 0, y: 8 },
              { autoAlpha: 1, y: 0, duration: 0.28, overwrite: true, ease: "power3.out" },
            );
          }
        };

        let tl!: gsap.core.Timeline;
        tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: desktop ? "+=440%" : "+=360%",
            pin: true,
            scrub: true,
            anticipatePin: 0,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (!tl) return;
              const storyStart = 1.25 / tl.duration();
              if (self.progress < storyStart) return;
              const raw = ((self.progress - storyStart) / (1 - storyStart)) * count;
              const target = Math.min(count - 1, Math.max(0, Math.floor(raw)));
              if (!revealed) {
                showChapter(target);
                return;
              }
              if (target > current && raw < current + 0.88) return;
              if (target < current && raw > current - 0.12) return;
              if (target !== current) showChapter(target);
            },
          },
        });

        words.forEach((word, index) => {
          const closeness = words.length - index;
          tl.to(
            word,
            {
              x: 30 + closeness * (desktop ? 92 : 48),
              y: closeness * -8,
              opacity: 0,
              duration: 0.55,
            },
            0.035 * index,
          );
        });

        tl.to(q(".flight-copy .eyebrow"), { x: desktop ? 70 : 24, opacity: 0, duration: 0.4 }, 0);
        tl.to(aside, { x: desktop ? 120 : 40, opacity: 0, duration: 0.5 }, 0.12);

        const flightPath = desktop
          ? [
              { x: 70, y: -18, rotation: -8 },
              { x: 190, y: -46, rotation: -4 },
              { x: 280, y: -128, rotation: -14 },
            ]
          : [
              { x: 28, y: -8, rotation: -7 },
              { x: 72, y: -18, rotation: -4 },
              { x: 108, y: -58, rotation: -12 },
            ];
        gsap.set(plane, { transformOrigin: "32% 52%" });
        tl.to(plane, { ...flightPath[0], duration: 0.26, ease: "power1.in" }, 0);
        tl.to(plane, { ...flightPath[1], duration: 0.32, ease: "none" }, 0.26);
        tl.to(plane, { ...flightPath[2], scale: desktop ? 1.08 : 1.03, duration: 0.34, ease: "power2.in" }, 0.58);
        tl.to(plane, { opacity: 0, duration: 0.28 }, 0.64);

        tl.to(section, { backgroundColor: "#F9F91E", duration: 0.85 }, 0);
        tl.to(yellow, { autoAlpha: 0, duration: 0.24 }, 0.85);
        tl.to(stage, { autoAlpha: 1, duration: 0.4 }, 0.85);
        tl.to({}, { duration: 3.2 }, 1.25);

        const onResize = () => {
          const bar = document.querySelector(".site-header");
          if (!bar) return;
          const margin = Number.parseFloat(getComputedStyle(bar).marginTop);
          applyPull(bar.getBoundingClientRect().height + (Number.isFinite(margin) ? margin : 0));
          if (window.scrollY < 2) {
            const gap = Math.round(section.getBoundingClientRect().top);
            if (Math.abs(gap) > 1) applyPull(pull + gap);
          }
          ScrollTrigger.refresh();
        };
        window.addEventListener("resize", onResize);
        return () => {
          window.removeEventListener("resize", onResize);
          section.style.removeProperty("--hero-pull");
        };
      });

      return () => motion.revert();
    },
    { scope: root },
  );

  return (
    <section className="flight" id="top" ref={root} aria-labelledby="flight-title">
      <div className="flight-viewport">
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
          <PaperPlane />
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
