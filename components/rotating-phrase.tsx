"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const PHRASES = [
  "Interested in Hiring",
  "Interested in Chatting",
  "Interested in Friendship",
] as const;

const ROTATE_MS = 2500;

export default function RotatingPhrase() {
  const reduced = useReducedMotion();
  const [phrase, setPhrase] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(
      () => setPhrase((index) => (index + 1) % PHRASES.length),
      ROTATE_MS,
    );
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <span aria-live="polite" className="inline-block">
      <span
        key={phrase}
        className="inline-block animate-[contact-rotate_0.35s_ease-out_both]"
      >
        {PHRASES[phrase]}
      </span>
    </span>
  );
}
