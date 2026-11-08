"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { reasons } from "../lib/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const captions = [
  "Learn to see opportunities beyond borders.",
  "Your ambitions deserve room to explore.",
  "Confidence grows outside the familiar.",
  "A new place becomes another classroom.",
  "Some connections stay long after graduation.",
];

const mobileChapters = [
  {
    label: "Opportunity",
    statement: "Beyond borders.",
    title: "A career without borders",
    text: "Your future doesn't have to fit within one country's borders. Discover new perspectives, learn alongside different cultures, and build skills for a world that's more connected than ever.",
  },
  {
    label: "Discovery",
    statement: "Follow your curiosity.",
    title: "Study what actually excites you",
    text: "Maybe the course you've been searching for is somewhere you haven't looked yet. Explore new subjects, different ways of learning, and opportunities that match what genuinely interests you.",
  },
  {
    label: "Independence",
    statement: "Find your own way.",
    title: "Grow into your own person",
    text: "Your first solo grocery run. Finding your way through a new city. Solving problems on your own. It's often these little experiences that show you just how capable you can be.",
  },
  {
    label: "Culture",
    statement: "Live the difference.",
    title: "A whole new way of seeing things",
    text: "New languages, unfamiliar traditions, and everyday conversations become part of your education. Slowly, you begin to see the world through perspectives you never had before.",
  },
  {
    label: "Connection",
    statement: "Meet your world.",
    title: "People who change your perspective",
    text: "You arrive knowing almost no one. Then classmates become friends, conversations become memories, and people from different corners of the world become part of your story.",
  },
];

const desktopChapters = [
  {
    label: "Opportunity",
    statement: ["Beyond borders."],
    title: "A career without borders",
    text: "Your future doesn't have to fit within one country's borders. Learn alongside different cultures, discover new perspectives, and build the confidence to work in a world that's more connected than ever.",
  },
  {
    label: "Discovery",
    statement: ["Follow your", "curiosity."],
    title: "Study what actually excites you",
    text: "Sometimes the course you've been looking for is somewhere you haven't looked yet. Explore new specialisations, different ways of learning, and opportunities that bring your interests into sharper focus.",
  },
  {
    label: "Independence",
    statement: ["Find your own way."],
    title: "Grow into your own person",
    text: "Your first solo grocery run. Finding your way through an unfamiliar city. Figuring things out without someone showing you how. It's often the smallest experiences that teach you just how capable you are.",
  },
  {
    label: "Culture",
    statement: ["Live the difference."],
    title: "A whole new way of seeing things",
    text: "Life outside the classroom becomes its own education. New languages, everyday traditions, and unfamiliar perspectives slowly change how you understand the world — and your place in it.",
  },
  {
    label: "Connection",
    statement: ["Meet your world."],
    title: "People who change your perspective",
    text: "You arrive as strangers from different corners of the world. Somewhere between shared classes, long conversations, and new experiences, those strangers can become friendships and connections that stay with you for years.",
  },
];

function pad(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function WhyBand() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;

      const motion = gsap.matchMedia();

      const bindDesktop = (reduced: boolean) => {
        const entries = Array.from(section.querySelectorAll<HTMLElement>(".why-entry"));
        const accents = entries.map((entry) => entry.querySelector<HTMLElement>(".why-accent"));
        const statements = Array.from(section.querySelectorAll<HTMLElement>(".why-statement"));
        const labels = Array.from(section.querySelectorAll<HTMLElement>(".why-label"));
        const numbers = Array.from(section.querySelectorAll<HTMLElement>(".why-num"));
        const statementTrack = section.querySelector<HTMLElement>(".why-statement-track");
        const labelTrack = section.querySelector<HTMLElement>(".why-label-track");
        const numTrack = section.querySelector<HTMLElement>(".why-num-track");
        const bar = section.querySelector<HTMLElement>(".why-track-bar");
        const progressTrack = section.querySelector<HTMLElement>(".why-track");
        let last = -1;
        let slot = 0;
        let labelSlot = 0;
        let numSlot = 0;

        const measure = () => {
          slot = statements[0]?.offsetHeight || 0;
          labelSlot = labels[0]?.offsetHeight || 0;
          numSlot = numbers[0]?.offsetHeight || 0;
        };

        const sync = () => {
          const line = window.innerHeight * 0.42;
          const anchors = entries.map((entry) => {
            const rect = entry.getBoundingClientRect();
            return rect.top + rect.height * 0.34;
          });
          let t = 0;
          if (anchors.length > 1 && line > anchors[0]) {
            if (line >= anchors[anchors.length - 1]) t = anchors.length - 1;
            else {
              for (let index = 0; index < anchors.length - 1; index += 1) {
                const next = anchors[index + 1];
                if (line < next) {
                  const span = next - anchors[index];
                  t = index + (span ? (line - anchors[index]) / span : 0);
                  break;
                }
              }
            }
          }
          const active = Math.round(gsap.utils.clamp(0, entries.length - 1, t));
          if (active !== last) {
            entries.forEach((entry, index) => {
              entry.classList.toggle("is-current", index === active);
              entry.classList.toggle("is-quiet", index !== active);
            });
            statements.forEach((node, index) => {
              const on = index === active;
              node.classList.toggle("is-on", on);
              node.setAttribute("aria-hidden", on ? "false" : "true");
            });
            labels.forEach((node, index) => node.classList.toggle("is-on", index === active));
            numbers.forEach((node, index) => node.classList.toggle("is-on", index === active));
            last = active;
          }
          const amount = gsap.utils.clamp(0.12, 1, gsap.utils.mapRange(0, Math.max(entries.length - 1, 1), 0.12, 1, t));
          progressTrack?.style.setProperty("--why-progress", amount.toFixed(4));
          if (reduced) return;
          if (statementTrack) statementTrack.style.transform = `translateY(${-t * slot}px)`;
          if (labelTrack) labelTrack.style.transform = `translateY(${-t * labelSlot}px)`;
          if (numTrack) numTrack.style.transform = `translateY(${-t * numSlot}px)`;
          accents.forEach((accent, index) => {
            if (!accent) return;
            const presence = gsap.utils.clamp(0, 1, 1 - Math.abs(t - index));
            accent.style.transform = `scaleY(${presence})`;
          });
          statements.forEach((node, index) => {
            const presence = gsap.utils.clamp(0.55, 1, 1 - Math.abs(t - index) * 0.45);
            node.style.opacity = String(presence);
          });
        };

        measure();
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger === section) trigger.kill();
        });
        ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          onUpdate: sync,
          onRefresh: () => {
            measure();
            sync();
          },
        });
        sync();
        return () => {
          if (statementTrack) statementTrack.style.transform = "";
          if (labelTrack) labelTrack.style.transform = "";
          if (numTrack) numTrack.style.transform = "";
          progressTrack?.style.removeProperty("--why-progress");
          if (bar) bar.style.transform = "";
          accents.forEach((accent) => {
            if (accent) accent.style.transform = "";
          });
          statements.forEach((node) => {
            node.style.opacity = "";
          });
        };
      };

      motion.add("(min-width: 1200px) and (prefers-reduced-motion: no-preference)", () => {
        const lines = section.querySelectorAll(".why-line");
        const reveals = section.querySelectorAll(".why-reveal");
        const ease = "power2.inOut";
        gsap
          .timeline({
            scrollTrigger: {
              trigger: section.querySelector(".why-intro"),
              start: "top 86%",
              end: "top 46%",
              scrub: 0.4,
              invalidateOnRefresh: true,
            },
          })
          .fromTo(
            section.querySelector(".why-kicker"),
            { y: 14, autoAlpha: 0.15 },
            { y: 0, autoAlpha: 1, duration: 0.28, ease, force3D: false },
            0,
          )
          .fromTo(lines[0], { "--why-line": "100%" }, { "--why-line": "0%", duration: 0.44, ease }, 0.06)
          .fromTo(
            reveals[0],
            { y: 24, autoAlpha: 0.28 },
            { y: 0, autoAlpha: 1, duration: 0.44, ease, force3D: false },
            0.06,
          )
          .fromTo(lines[1], { "--why-line": "100%" }, { "--why-line": "0%", duration: 0.44, ease }, 0.18)
          .fromTo(
            reveals[1],
            { y: 24, autoAlpha: 0.28 },
            { y: 0, autoAlpha: 1, duration: 0.44, ease, force3D: false },
            0.18,
          )
          .fromTo(
            section.querySelector(".why-lede-desk"),
            { y: 16, autoAlpha: 0.2 },
            { y: 0, autoAlpha: 1, duration: 0.34, ease, force3D: false },
            0.34,
          )
          .fromTo(
            section.querySelector(".why-entry"),
            { y: 18 },
            { y: 0, duration: 0.36, ease, force3D: false },
            0.44,
          )
          .fromTo(
            section.querySelector(".why-stage"),
            { y: 22, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.4, ease, force3D: false },
            0.5,
          )
          .fromTo(
            section.querySelector(".why-meter-foot"),
            { y: 12, autoAlpha: 0.12 },
            { y: 0, autoAlpha: 1, duration: 0.3, ease, force3D: false },
            0.62,
          );

        return bindDesktop(false);
      });

      motion.add("(min-width: 1200px) and (prefers-reduced-motion: reduce)", () => {
        return bindDesktop(true);
      });

      motion.add("(max-width: 1199px) and (prefers-reduced-motion: no-preference)", () => {
        const hold = section.querySelector<HTMLElement>(".why-hold");
        const story = section.querySelector<HTMLElement>(".why-kinetic");
        const pin = section.querySelector<HTMLElement>(".why-k-pin");
        const viewport = section.querySelector<HTMLElement>(".why-k-viewport");
        const slides = Array.from(section.querySelectorAll<HTMLElement>(".why-k-slide"));
        const groups = slides.map((slide) => slide.querySelector<HTMLElement>(".why-k-story"));
        const statements = slides.map((slide) => slide.querySelector<HTMLElement>(".why-k-statement"));
        const supports = slides.map((slide) => slide.querySelector<HTMLElement>(".why-k-support"));
        const copies = slides.map((slide) => slide.querySelector<HTMLElement>(".why-k-copy"));
        const identities = Array.from(section.querySelectorAll<HTMLElement>(".why-k-top .why-k-identity"));
        const teasers = Array.from(section.querySelectorAll<HTMLElement>(".why-k-foot .why-k-teaser"));
        const fills = Array.from(section.querySelectorAll<HTMLElement>(".why-k-fill"));
        if (
          !hold ||
          !story ||
          !pin ||
          !viewport ||
          slides.length !== 5 ||
          groups.some((group) => !group) ||
          statements.some((node) => !node) ||
          supports.some((node) => !node) ||
          copies.some((node) => !node) ||
          identities.length !== 5 ||
          teasers.length !== 5 ||
          fills.length !== 5
        ) {
          return;
        }
        const statementNodes = statements as HTMLElement[];
        const supportNodes = supports as HTMLElement[];
        const copyNodes = copies as HTMLElement[];

        // Toolbar show/hide changes viewport height but not width. Ignore those
        // resizes so the pinned stage does not jump. Width and orientation still rebuild.
        ScrollTrigger.config({ ignoreMobileResize: true });

        let timeline: gsap.core.Timeline | null = null;
        let lastWidth = -1;
        let resizeTimer = 0;
        let shown = 0;

        const markChapter = (active: number) => {
          if (active === shown) return;
          shown = active;
          identities.forEach((node, index) => {
            node.setAttribute("aria-hidden", index === active ? "false" : "true");
          });
          teasers.forEach((node, index) => {
            node.setAttribute("aria-hidden", index === active ? "false" : "true");
          });
        };

        const clearMotion = () => {
          timeline?.scrollTrigger?.kill();
          timeline?.kill();
          timeline = null;
          gsap.set(slides, { clearProps: "transform,opacity,visibility" });
          gsap.set(section.querySelectorAll(".why-k-statement, .why-k-support, .why-k-copy"), {
            clearProps: "transform,opacity",
          });
          gsap.set(fills, { clearProps: "transform" });
          gsap.set(identities, { clearProps: "opacity,visibility" });
          gsap.set(teasers, { clearProps: "opacity,visibility" });
          story.classList.remove("is-live", "is-measuring");
          hold.classList.remove("is-live");
          pin.classList.remove("is-tight");
          hold.style.removeProperty("--why-pin-top");
          pin.style.removeProperty("--why-pin-top");
          pin.style.removeProperty("--why-story-min");
          pin.style.height = "";
          viewport.style.height = "";
          shown = -1;
          markChapter(0);
        };

        const storyNeeded = () => {
          pin.style.removeProperty("--why-story-min");
          return groups.reduce((max, group) => Math.max(max, group?.offsetHeight || 0), 0);
        };

        const storyFits = () => {
          const needed = storyNeeded();
          return needed > 0 && needed <= viewport.clientHeight - 8;
        };

        const build = () => {
          clearMotion();
          if (!story.isConnected) return;
          const tablet = window.matchMedia("(min-width: 768px)").matches;
          const header = document.querySelector<HTMLElement>(".site-header");
          const headerTop = header ? parseFloat(getComputedStyle(header).top) || 0 : 0;
          const pinTop = header ? Math.round(header.offsetHeight + headerTop + 12) : 72;
          hold.style.setProperty("--why-pin-top", `${pinTop}px`);
          pin.style.setProperty("--why-pin-top", `${pinTop}px`);
          pin.classList.remove("is-stack");
          story.classList.add("is-live");
          hold.classList.add("is-live");

          if (!storyFits()) {
            pin.classList.add("is-tight");
            if (!storyFits()) {
              story.classList.remove("is-live");
              hold.classList.remove("is-live");
              pin.classList.remove("is-tight");
              pin.classList.add("is-stack");
              pin.style.removeProperty("--why-pin-top");
              pin.style.removeProperty("--why-story-min");
              return;
            }
          }

          pin.style.setProperty("--why-story-min", `${storyNeeded()}px`);

          const holdPx = tablet ? 150 : 130;
          const movePx = tablet ? 240 : 210;
          const distance = holdPx * 5 + movePx * 4;

          const lead = tablet ? 16 : 12;
          const supportLag = tablet ? 12 : 8;
          const copyLag = tablet ? 6 : 4;
          gsap.set(slides, {
            xPercent: (index) => (index === 0 ? 0 : 100),
            autoAlpha: (index) => (index === 0 ? 1 : 0.82),
            force3D: false,
          });
          gsap.set(statementNodes, {
            x: (index) => (index === 0 ? 0 : -lead),
            force3D: false,
          });
          gsap.set(supportNodes, {
            x: (index) => (index === 0 ? 0 : supportLag),
            force3D: false,
          });
          gsap.set(copyNodes, {
            x: (index) => (index === 0 ? 0 : copyLag),
            opacity: (index) => (index === 0 ? 1 : 0.72),
            force3D: false,
          });
          gsap.set(fills, { scaleX: 0, transformOrigin: "left center", force3D: false });
          gsap.set(identities, {
            autoAlpha: (index) => (index === 0 ? 1 : 0),
            force3D: false,
          });
          gsap.set(teasers, {
            autoAlpha: (index) => (index === 0 ? 1 : 0),
            force3D: false,
          });

          const tl = gsap.timeline({
            defaults: { ease: "none", force3D: false },
            onUpdate(this: gsap.core.Timeline) {
              const time = this.time();
              let active = 0;
              for (let index = 0; index < slides.length - 1; index += 1) {
                const mid = (index + 1) * holdPx + (index + 0.5) * movePx;
                if (time + 0.001 >= mid) active = index + 1;
              }
              markChapter(active);
            },
            scrollTrigger: {
              trigger: hold,
              pin: true,
              pinSpacing: true,
              anticipatePin: 0,
              scrub: true,
              invalidateOnRefresh: false,
              start: `top ${pinTop}px`,
              end: `+=${distance}`,
            },
          });

          let cursor = 0;
          for (let index = 0; index < slides.length - 1; index += 1) {
            cursor += holdPx;
            const supportDelay = Math.round(movePx * 0.14);
            const copyDelay = Math.round(movePx * 0.28);
            tl.to(slides[index], { xPercent: -100, autoAlpha: 0.82, duration: movePx }, cursor);
            tl.to(statementNodes[index], { x: -lead, duration: movePx }, cursor);
            tl.to(supportNodes[index], { x: supportLag, duration: movePx }, cursor);
            tl.to(
              copyNodes[index],
              { x: copyLag, opacity: 0.72, duration: movePx - copyDelay },
              cursor + copyDelay,
            );
            tl.to(slides[index + 1], { xPercent: 0, autoAlpha: 1, duration: movePx }, cursor);
            tl.to(statementNodes[index + 1], { x: 0, duration: movePx }, cursor);
            tl.to(
              supportNodes[index + 1],
              { x: 0, duration: movePx - supportDelay },
              cursor + supportDelay,
            );
            tl.to(
              copyNodes[index + 1],
              { x: 0, opacity: 1, duration: movePx - copyDelay },
              cursor + copyDelay,
            );
            const fade = Math.min(28, Math.round(movePx * 0.12));
            const swap = cursor + movePx / 2 - fade;
            tl.fromTo(
              identities[index],
              { autoAlpha: 1 },
              { autoAlpha: 0, duration: fade, immediateRender: false },
              swap,
            );
            tl.fromTo(
              identities[index + 1],
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: fade, immediateRender: false },
              swap,
            );
            tl.fromTo(
              teasers[index],
              { autoAlpha: 1 },
              { autoAlpha: 0, duration: fade, immediateRender: false },
              swap,
            );
            tl.fromTo(
              teasers[index + 1],
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: fade, immediateRender: false },
              swap,
            );
            cursor += movePx;
          }

          fills.forEach((fill, index) => {
            const at = index * (holdPx + movePx);
            const span = index === fills.length - 1 ? holdPx : holdPx + movePx;
            tl.fromTo(
              fill,
              { scaleX: 0 },
              { scaleX: 1, duration: span, ease: "none", force3D: false },
              at,
            );
          });

          timeline = tl;
        };

        const rebuild = () => {
          const width = Math.round(pin.getBoundingClientRect().width);
          if (Math.abs(width - lastWidth) < 2) return;
          const progress = timeline?.progress() ?? 0;
          lastWidth = width;
          build();
          if (progress > 0 && timeline?.scrollTrigger) {
            const next = timeline.scrollTrigger;
            window.scrollTo(0, next.start + (next.end - next.start) * progress);
          }
        };

        const fontsWereReady = document.fonts?.status === "loaded";
        lastWidth = Math.round(pin.getBoundingClientRect().width);
        build();

        const onResize = () => {
          window.clearTimeout(resizeTimer);
          resizeTimer = window.setTimeout(rebuild, 180);
        };
        window.addEventListener("resize", onResize);
        if (!fontsWereReady) {
          document.fonts?.ready.then(() => {
            if (!story.isConnected) return;
            lastWidth = -1;
            rebuild();
          });
        }

        return () => {
          window.clearTimeout(resizeTimer);
          window.removeEventListener("resize", onResize);
          clearMotion();
          pin.classList.remove("is-stack");
        };
      });

      return () => motion.revert();
    },
    { scope: root },
  );

  return (
    <section className="why section" id="why" aria-labelledby="why-title" ref={root}>
      <div className="why-hold">
      <div className="shell why-grid">
        <div className="why-col">
          <div className="why-sticky">
            <div className="why-intro">
              <p className="eyebrow why-kicker">Why study abroad</p>
              <h2 className="why-title" id="why-title">
                <span className="why-line">
                  <span className="why-reveal">The degree is only</span>
                </span>
                <span className="why-line">
                  <span className="why-reveal">the beginning.</span>
                </span>
              </h2>
              <p className="why-lede">
                There&apos;s what you learn at university. And then there&apos;s everything you discover by
                stepping into a world that&apos;s different from your own.
              </p>
              <p className="why-lede why-lede-desk">
                Some of the most important things you&apos;ll learn won&apos;t happen in a classroom.
              </p>
            </div>
            <div className="why-meter">
              <div className="why-stage">
                <div className="why-statement-window">
                  <div className="why-statement-track">
                    {desktopChapters.map((chapter, index) => (
                      <p
                        className={index === 0 ? "why-statement is-on" : "why-statement"}
                        key={chapter.statement[0]}
                        aria-hidden={index === 0 ? undefined : true}
                      >
                        {chapter.statement.map((line) => (
                          <span className="why-statement-line" key={line}>
                            {line}
                          </span>
                        ))}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="why-meter-foot">
                <div className="why-progress-row">
                  <p className="why-fraction" aria-hidden="true">
                    <span className="why-num-stack">
                      <span className="why-num-track">
                        {desktopChapters.map((chapter, index) => (
                          <span className={index === 0 ? "why-num is-on" : "why-num"} key={chapter.label}>
                            {pad(index)}
                          </span>
                        ))}
                      </span>
                    </span>
                    <span className="why-of">/ 05</span>
                  </p>
                  <div className="why-label-window" aria-hidden="true">
                    <div className="why-label-track">
                      {desktopChapters.map((chapter, index) => (
                        <p className={index === 0 ? "why-label is-on" : "why-label"} key={chapter.label}>
                          {chapter.label}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="why-track" aria-hidden="true">
                  <span className="why-track-bar" />
                  <span className="why-track-mark" />
                </div>
              </div>
              <div className="why-sentences" aria-hidden="true">
                {captions.map((caption, index) => (
                  <p className={index === 0 ? "why-sentence is-on" : "why-sentence"} key={caption}>
                    {caption}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <ol className="why-list">
          {reasons.map((reason, index) => {
            const chapter = desktopChapters[index];
            return (
              <li className={index === 0 ? "why-entry is-current" : "why-entry"} key={reason.title}>
                <span className="why-accent" aria-hidden="true" />
                <span className="why-index">{pad(index)}</span>
                <div className="why-copy">
                  <p className="why-theme">{chapter.label}</p>
                  <h3>
                    <span className="why-title-compact">{reason.title}</span>
                    <span className="why-title-desk">{chapter.title}</span>
                  </h3>
                  <p className="why-body">
                    <span className="why-text-compact">{reason.text}</span>
                    <span className="why-text-desk">{chapter.text}</span>
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
      <div className="shell why-kinetic">
        <div className="why-k-pin">
          <div className="why-k-spine" aria-hidden="true" />
          <div className="why-k-top">
            <p className="why-k-eyebrow">Why study abroad</p>
            <div className="why-k-identities">
              {mobileChapters.map((chapter, chapterIndex) => (
                <div
                  className="why-k-identity"
                  key={chapter.label}
                  aria-hidden={chapterIndex === 0 ? undefined : true}
                >
                  <span className="why-k-tick" aria-hidden="true" />
                  <p className="why-k-meta-index">
                    Chapter {pad(chapterIndex)}
                    <span className="why-k-meta-total"> / 05</span>
                  </p>
                  <p className="why-k-meta-label">{chapter.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="why-k-viewport">
            {mobileChapters.map((chapter, chapterIndex) => {
              const last = chapterIndex === mobileChapters.length - 1;
              const next = mobileChapters[chapterIndex + 1];
              return (
                <article className="why-k-slide" key={chapter.label}>
                  <header className="why-k-inline">
                    <p className="why-k-eyebrow">Why study abroad</p>
                    <span className="why-k-tick" aria-hidden="true" />
                    <p className="why-k-meta-index">
                      Chapter {pad(chapterIndex)}
                      <span className="why-k-meta-total"> / 05</span>
                    </p>
                    <p className="why-k-meta-label">{chapter.label}</p>
                  </header>
                  <div className="why-k-story">
                    <p className="why-k-statement">{chapter.statement}</p>
                    <div className="why-k-support">
                      <span className="why-k-rule" aria-hidden="true" />
                      <div>
                        <h3 className="why-k-heading">{chapter.title}</h3>
                        <p className="why-k-copy">{chapter.text}</p>
                      </div>
                    </div>
                  </div>
                  <footer className="why-k-inline why-k-next">
                    <p className="why-k-next-kicker">
                      {last ? "End" : `Up next — ${pad(chapterIndex + 1)} / 05`}
                    </p>
                    <p className="why-k-next-title">
                      {last ? "The degree is only the beginning." : next.statement}
                    </p>
                  </footer>
                </article>
              );
            })}
          </div>
          <div className="why-k-foot">
            <div className="why-k-teasers">
              {mobileChapters.map((chapter, chapterIndex) => {
                const last = chapterIndex === mobileChapters.length - 1;
                const next = mobileChapters[chapterIndex + 1];
                return (
                  <div
                    className="why-k-teaser why-k-next"
                    key={chapter.label}
                    aria-hidden={chapterIndex === 0 ? undefined : true}
                  >
                    <p className="why-k-next-kicker">
                      {last ? "End" : `Up next — ${pad(chapterIndex + 1)} / 05`}
                    </p>
                    <p className="why-k-next-title">
                      {last ? "The degree is only the beginning." : next.statement}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="why-k-meter" aria-hidden="true">
              {mobileChapters.map((chapter) => (
                <span className="why-k-seg" key={chapter.label}>
                  <span className="why-k-fill" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
