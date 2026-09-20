"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.32, 0.72, 0, 1] as const;
const STAGGER = 0.035;

const column = {
  rest: { y: "0%" },
  hover: { y: "-50%" },
};

export default function Name({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const text = "Anubhab Pradhan";
  const letters = text.split("");

  if (reduced) {
    return <h1 className={className}>Anubhab Pradhan</h1>;
  }

  return (
    <h1 className={className} aria-label="Anubhab Pradhan">
      <motion.span
        className="inline-block"
        variants={{ rest: {}, hover: {} }}
        initial="rest"
        whileHover="hover"
        whileTap="hover"
      >
        <span aria-hidden="true">
          {letters.map((ch, i) => (
            <span
              key={`${ch}-${i}`}
              className="relative inline-block overflow-hidden align-middle"
              style={{ height: "1em", lineHeight: 1 }}
            >
              <motion.span
                className="block"
                style={{ lineHeight: 1 }}
                variants={column}
                transition={{ duration: 0.4, ease: EASE, delay: i * STAGGER }}
              >
                <span className="block" style={{ lineHeight: 1 }}>
                  {ch === " " ? "\u00A0" : ch}
                </span>
                <span
                  className="block"
                  style={{ lineHeight: 1 }}
                  aria-hidden="true"
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              </motion.span>
            </span>
          ))}
        </span>
      </motion.span>
    </h1>
  );
}
