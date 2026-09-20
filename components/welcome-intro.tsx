"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const GREETINGS = [
  "Hello",
  "Hola",
  "Bonjour",
  "Hallo",
  "Ciao",
  "Olá",
  "こんにちは",
  "안녕하세요",
  "नमस्ते",
  "নমস্কার",
  "வணக்கம்",
  "నమస్కారం",
  "नमस्कार",
  "مرحباً",
  "नमः",
] as const;

const HALF_TICK = 175;
const FINAL_STEP = (GREETINGS.length - 1) * 2;
const FINAL_HOLD = 560;
const FADE = 520;
const REDUCED_HOLD = 600;
// How long a fully animated intro takes to finish (reaches its last step,
// holds, then fades out) with a small buffer. The CSS release keyframe below
// uses this as a backstop: if JS never runs, the overlay still dismisses
// itself so the page is never permanently blocked.
const RELEASE_DELAY = FINAL_STEP * HALF_TICK + FINAL_HOLD + FADE + 400;

export default function WelcomeIntro() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [fading, setFading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced) {
      const t1 = setTimeout(() => setFading(true), REDUCED_HOLD);
      const t2 = setTimeout(() => setDone(true), REDUCED_HOLD + FADE);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
    const id = setInterval(() => {
      setStep((s) => (s >= FINAL_STEP ? s : s + 1));
    }, HALF_TICK);
    return () => clearInterval(id);
  }, [reduced]);

  useEffect(() => {
    if (reduced || step < FINAL_STEP) return;
    const t1 = setTimeout(() => setFading(true), FINAL_HOLD);
    const t2 = setTimeout(() => setDone(true), FINAL_HOLD + FADE);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [step, reduced]);

  useEffect(() => {
    if (done) {
      document.documentElement.style.overflow = "";
      return;
    }
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [done]);

  if (done) return null;

  const greeting = reduced
    ? GREETINGS[GREETINGS.length - 1]
    : GREETINGS[Math.min(Math.floor(step / 2), GREETINGS.length - 1)];
  const visible = reduced ? true : step % 2 === 0;

  const motion = {
    transition: "opacity 175ms ease, filter 175ms ease, transform 175ms ease",
    opacity: visible ? 1 : 0,
    filter: visible ? "blur(0px)" : "blur(8px)",
    transform: visible ? "translateY(0px)" : "translateY(-8px)",
  };

  return (
    <div
      aria-hidden="true"
      className="bg-background fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 transition-opacity duration-500 ease-out"
      style={{
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? "none" : "auto",
        // No-JS/JS-failure backstop: with forwards fill the overlay dissolves
        // on its own after RELEASE_DELAY and stops capturing pointers, so it
        // can never leave the page permanently blocked.
        animation: `welcome-release ${FADE}ms ease-out ${RELEASE_DELAY}ms forwards`,
      }}
    >
      <span
        className="font-sans text-[2.5rem] leading-none font-extrabold tracking-tight text-heading sm:text-[3.5rem] md:text-[4.5rem]"
        style={motion}
      >
        {greeting}
      </span>
      <span className="rule-x h-px" style={{ ...motion, width: 68 }} />
    </div>
  );
}