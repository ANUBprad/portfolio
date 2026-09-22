import type { CSSProperties } from "react";

// Fixed-seed PRNG so the star field is byte-identical on every build/render.
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Star = {
  left: string;
  top: string;
  size: string;
  delay: string;
  duration: string;
  peak: number;
  twinkle: boolean;
  glow: boolean;
  brightness: number;
  layer: "dust" | "faint" | "bright" | "very-bright";
};

export type BrightStar = {
  left: string;
  top: string;
  size: string;
  delay: string;
  duration: string;
  brightness: number;
  hasBloom: boolean;
};

export function makeField(seed: number, count: number): Star[] {
  const rnd = mulberry32(seed);
  return Array.from({ length: count }, () => {
    const rand = rnd();
    let layer: "dust" | "faint" | "bright" | "very-bright" = "dust";
    let brightness = 0.05;
    let size = "0.5px";
    let twinkle = false;
    let glow = false;

    if (rand < 0.4) {
      layer = "dust";
      brightness = 0.02 + rnd() * 0.08;
      size = "0.5px";
    } else if (rand < 0.75) {
      layer = "faint";
      brightness = 0.08 + rnd() * 0.2;
      size = rnd() < 0.5 ? "1px" : "1.5px";
      twinkle = rnd() < 0.15;
    } else if (rand < 0.92) {
      layer = "bright";
      brightness = 0.25 + rnd() * 0.4;
      size = rnd() < 0.3 ? "1.5px" : "2px";
      twinkle = rnd() < 0.3;
    } else {
      layer = "very-bright";
      brightness = 0.5 + rnd() * 0.5;
      size = "2.5px";
      glow = rnd() < 0.4;
      twinkle = rnd() < 0.4;
    }

    return {
      left: `${(2 + rnd() * 96).toFixed(1)}%`,
      top: `${(2 + rnd() * 96).toFixed(1)}%`,
      size,
      delay: `${(rnd() * 12).toFixed(2)}s`,
      duration: `${(5 + rnd() * 8).toFixed(2)}s`,
      peak: 0.4 + rnd() * 0.5,
      twinkle,
      glow,
      brightness,
      layer,
    };
  });
}

export function makeBrightStars(seed: number, count: number): BrightStar[] {
  const rnd = mulberry32(seed);
  return Array.from({ length: count }, () => ({
    left: `${(5 + rnd() * 90).toFixed(1)}%`,
    top: `${(5 + rnd() * 90).toFixed(1)}%`,
    size: `${(3 + rnd() * 3).toFixed(1)}px`,
    delay: `${(rnd() * 15).toFixed(2)}s`,
    duration: `${(6 + rnd() * 6).toFixed(2)}s`,
    brightness: 0.6 + rnd() * 0.4,
    hasBloom: rnd() < 0.6,
  }));
}

const LEFT_FIELD = makeField(20250525, 180);
const RIGHT_FIELD = makeField(987654321, 180);
const BRIGHT_STARS_LEFT = makeBrightStars(555555, 12);
const BRIGHT_STARS_RIGHT = makeBrightStars(666666, 12);

// Shooting star positions - diagonal trajectories, deterministic
const SHOOTING_STARS = [
  { id: "star-1", left: "15%", top: "-5%", angle: "55deg", delay: "3s", duration: "1s" },
  { id: "star-2", left: "85%", top: "-3%", angle: "235deg", delay: "14s", duration: "0.9s" },
  { id: "star-3", left: "12%", top: "-8%", angle: "45deg", delay: "28s", duration: "1.1s" },
  { id: "star-4", left: "88%", top: "-2%", angle: "235deg", delay: "42s", duration: "0.95s" },
  { id: "star-5", left: "10%", top: "-4%", angle: "60deg", delay: "58s", duration: "1.2s" },
  { id: "star-6", left: "90%", top: "-6%", angle: "240deg", delay: "76s", duration: "1.05s" },
];

function Field({ stars }: { stars: Star[] }) {
  return (
    <>
      {stars.map((star, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute rounded-full"
          style={
            {
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              background: `rgba(255, 255, 255, ${star.brightness})`,
              boxShadow: star.glow
                ? `0 0 3px rgba(255, 255, 255, ${star.brightness * 0.6}), 0 0 8px rgba(185, 14, 10, ${star.brightness * 0.3})`
                : "none",
              "--star-peak": star.peak,
              animation: star.twinkle
                ? `star-twinkle ${star.duration} ease-in-out ${star.delay} infinite both`
                : "none",
              opacity: star.twinkle ? undefined : star.brightness,
            } as CSSProperties
          }
        />
      ))}
    </>
  );
}

function BrightStarComponent({ star }: { star: BrightStar }) {
  return (
    <span
      aria-hidden="true"
      className="absolute rounded-full"
      style={
        {
          left: star.left,
          top: star.top,
          width: star.size,
          height: star.size,
          background: "rgba(255, 255, 255, 0.9)",
          boxShadow: star.hasBloom
            ? `0 0 2px rgba(255, 255, 255, 0.8), 0 0 6px rgba(185, 14, 10, 0.3), 0 0 12px rgba(185, 14, 10, 0.1)`
            : `0 0 2px rgba(255, 255, 255, 0.6)`,
          "--star-peak": 0.7,
          animation: `star-twinkle ${star.duration} ease-in-out ${star.delay} infinite both`,
        } as CSSProperties
      }
    />
  );
}

function ShootingStar({ id, left, top, angle, delay, duration }: {
  id: string;
  left: string;
  top: string;
  angle: string;
  delay: string;
  duration: string;
}) {
  return (
    <span
      aria-hidden="true"
      className="absolute"
      style={
        {
          left,
          top,
          width: "2px",
          height: "50px",
          pointerEvents: "none",
          transform: `rotate(${angle})`,
          animation: `shooting-star-move ${duration} ease-in ${delay} infinite`,
          background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.95) 0%, rgba(185, 14, 10, 0.5) 50%, transparent 100%)",
          opacity: 0,
          transformOrigin: "top center",
        } as CSSProperties
      }
      data-star={id}
    />
  );
}

// ponytail: "calc(50%+16rem)" keeps the side fields visible on laptop viewports.
// Upgrade path: use container queries or JS-measured offsets for exact column bounds.
const MARGIN_CLIP = "calc(50% + 16rem)";

export default function Stars() {
  return (
    <div
      aria-hidden="true"
      className="cinematic-bg pointer-events-none fixed inset-0 z-0"
    >
      {/* Deep space base with subtle tonal variation */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#050505] to-black opacity-100" />

      {/* Nebula layers */}
      <div className="cinematic-nebula absolute inset-0" />

      {/* Side nebula glow — deep crimson atmospheric margins */}
      <div
        className="absolute inset-y-0 left-0 hidden lg:block pointer-events-none"
        style={{ right: MARGIN_CLIP }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 90% 50% at 10% 25%, rgba(185, 14, 10, 0.16) 0%, transparent 55%),
              radial-gradient(ellipse 80% 60% at 5% 55%, rgba(185, 14, 10, 0.12) 0%, transparent 50%),
              radial-gradient(ellipse 70% 45% at 20% 80%, rgba(185, 14, 10, 0.09) 0%, transparent 50%),
              radial-gradient(ellipse 60% 35% at 30% 40%, rgba(185, 14, 10, 0.05) 0%, transparent 60%)
            `,
            animation: "nebula-drift 90s ease-in-out infinite alternate",
          }}
        />
      </div>
      <div
        className="absolute inset-y-0 right-0 hidden lg:block pointer-events-none"
        style={{ left: MARGIN_CLIP }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 90% 50% at 90% 30%, rgba(185, 14, 10, 0.14) 0%, transparent 55%),
              radial-gradient(ellipse 80% 60% at 95% 58%, rgba(185, 14, 10, 0.10) 0%, transparent 50%),
              radial-gradient(ellipse 70% 45% at 80% 82%, rgba(185, 14, 10, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse 60% 35% at 70% 45%, rgba(185, 14, 10, 0.04) 0%, transparent 60%)
            `,
            animation: "nebula-drift 95s ease-in-out infinite alternate 10s",
          }}
        />
      </div>

      {/* Cosmic dust and micro-particles layer — crimson */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 8% 30%, rgba(185, 14, 10, 0.12) 0%, transparent 40%),
                           radial-gradient(circle at 92% 60%, rgba(185, 14, 10, 0.10) 0%, transparent 35%)`,
        }} />
      </div>

      {/* Star fields - left and right */}
      <div className="absolute inset-y-0 left-0 overflow-hidden hidden lg:block" style={{ right: MARGIN_CLIP }}>
        <Field stars={LEFT_FIELD} />
      </div>
      <div className="absolute inset-y-0 right-0 overflow-hidden hidden lg:block" style={{ left: MARGIN_CLIP }}>
        <Field stars={RIGHT_FIELD} />
      </div>

      {/* Bright stars with bloom - left and right */}
      <div className="absolute inset-y-0 left-0 overflow-hidden hidden lg:block" style={{ right: MARGIN_CLIP }}>
        {BRIGHT_STARS_LEFT.map((star, i) => (
          <BrightStarComponent key={`bright-l-${i}`} star={star} />
        ))}
      </div>
      <div className="absolute inset-y-0 right-0 overflow-hidden hidden lg:block" style={{ left: MARGIN_CLIP }}>
        {BRIGHT_STARS_RIGHT.map((star, i) => (
          <BrightStarComponent key={`bright-r-${i}`} star={star} />
        ))}
      </div>

      {/* Mobile/tablet: subtle stars behind content */}
      <div className="absolute inset-0 lg:hidden overflow-hidden opacity-40">
        <Field stars={LEFT_FIELD} />
      </div>

      {/* Shooting stars with diagonal trajectories - desktop only */}
      <div className="absolute inset-0 hidden lg:block overflow-hidden">
        {SHOOTING_STARS.map((star) => (
          <ShootingStar
            key={star.id}
            id={star.id}
            left={star.left}
            top={star.top}
            angle={star.angle}
            delay={star.delay}
            duration={star.duration}
          />
        ))}
      </div>

      {/* Distant crescent planet - far upper left */}
      <div className="absolute hidden lg:block" style={{ left: "6%", top: "12%", opacity: 0.08 }}>
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "radial-gradient(circle at 30% 35%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)",
            boxShadow: "inset 15px -12px 8px 0 rgba(0, 0, 0, 0.98), 0 0 20px rgba(185, 14, 10, 0.06)",
            animation: "nebula-drift 90s ease-in-out infinite alternate",
          }}
        />
      </div>

      {/* Distant moon - far lower right */}
      <div className="absolute hidden lg:block" style={{ right: "8%", bottom: "10%", opacity: 0.09 }}>
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "radial-gradient(circle at 28% 32%, rgba(255, 255, 255, 0.1) 0%, transparent 55%)",
            boxShadow: "inset 12px -9px 6px 0 rgba(0, 0, 0, 0.97), 0 0 15px rgba(185, 14, 10, 0.04)",
            animation: "nebula-drift 100s ease-in-out infinite alternate 5s",
          }}
        />
      </div>

      {/* Distant asteroid — small, irregular, barely visible in deep space */}
      <div className="absolute hidden lg:block" style={{ left: "22%", top: "68%", opacity: 0.06 }}>
        <div
          style={{
            width: "12px",
            height: "9px",
            borderRadius: "40% 60% 55% 45% / 50% 40% 60% 50%",
            background: "radial-gradient(circle at 35% 40%, rgba(200, 200, 200, 0.25) 0%, rgba(80, 80, 80, 0.1) 70%, transparent 100%)",
            boxShadow: "0 0 4px rgba(185, 14, 10, 0.04)",
            animation: "celestial-drift 120s ease-in-out infinite alternate",
          }}
        />
      </div>

      {/* Dust terrain silhouettes - bottom corners */}
      <div className="absolute bottom-0 left-0 hidden lg:block" style={{
        width: "35%",
        height: "180px",
        background: "linear-gradient(to top, rgba(0,0,0,0.3), transparent)",
        opacity: 0.15,
        clipPath: "polygon(0 100%, 0 60%, 15% 50%, 35% 70%, 50% 55%, 65% 75%, 100% 65%, 100% 100%)",
      }} />
      <div className="absolute bottom-0 right-0 hidden lg:block" style={{
        width: "35%",
        height: "180px",
        background: "linear-gradient(to top, rgba(0,0,0,0.3), transparent)",
        opacity: 0.15,
        clipPath: "polygon(0 65%, 35% 75%, 50% 55%, 65% 70%, 85% 50%, 100% 60%, 100% 100%, 0 100%)",
      }} />

      {/* Center vignette — darkens only the central column, edges stay visible */}
      <div className="absolute inset-0 hidden lg:block pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 35% 50% at 50% 50%,
                        rgba(0,0,0,0) 0%,
                        rgba(0,0,0,0.2) 55%,
                        rgba(0,0,0,0.45) 80%,
                        rgba(0,0,0,0.55) 100%)`,
        }}
      />
    </div>
  );
}
