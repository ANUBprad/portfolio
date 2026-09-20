import {
  siC,
  siCplusplus,
  siDocker,
  siFastapi,
  siGit,
  siGithub,
  siJavascript,
  siJupyter,
  siLangchain,
  siLanggraph,
  siMediapipe,
  siNextdotjs,
  siOllama,
  siOpencv,
  siPostgresql,
  siPytorch,
  siPython,
  siRedis,
  siRust,
  siStreamlit,
  siTemporal,
  siTensorflow,
  siTypescript,
} from "simple-icons";
import SectionCard from "./section-card";
import { BrandIcon, JavaCupIcon, TerminalGlyphIcon } from "./icons";

type Skill = {
  name: string;
  icon?: { path: string; hex: string };
  glyph?: "java" | "code";
};

const DATA: Skill[] = [
  { name: "Python", icon: siPython },
  { name: "Java", glyph: "java" },
  { name: "JavaScript", icon: siJavascript },
  { name: "TypeScript", icon: siTypescript },
  { name: "Rust", icon: siRust },
  { name: "C", icon: siC },
  { name: "C++", icon: siCplusplus },
  { name: "PyTorch", icon: siPytorch },
  { name: "TensorFlow", icon: siTensorflow },
  { name: "LangChain", icon: siLangchain },
  { name: "LangGraph", icon: siLanggraph },
  { name: "Next.js", icon: siNextdotjs },
  { name: "FastAPI", icon: siFastapi },
  { name: "Streamlit", icon: siStreamlit },
  { name: "OpenCV", icon: siOpencv },
  { name: "MediaPipe", icon: siMediapipe },
  { name: "PostgreSQL", icon: siPostgresql },
  { name: "Redis", icon: siRedis },
  { name: "Temporal", icon: siTemporal },
  { name: "Docker", icon: siDocker },
  { name: "Git", icon: siGit },
  { name: "GitHub", icon: siGithub },
  { name: "OpenCode", glyph: "code" },
  { name: "Ollama", icon: siOllama },
  { name: "Jupyter", icon: siJupyter },
];

const byName = (name: string) => DATA.find((s) => s.name === name)!;

const ROW_ONE = [
  "Python",
  "Java",
  "JavaScript",
  "TypeScript",
  "Rust",
  "C",
  "C++",
  "PyTorch",
  "TensorFlow",
  "LangChain",
  "LangGraph",
  "Next.js",
].map(byName);

const ROW_TWO = [
  "FastAPI",
  "Streamlit",
  "OpenCV",
  "MediaPipe",
  "PostgreSQL",
  "Redis",
  "Temporal",
  "Docker",
  "Git",
  "GitHub",
  "OpenCode",
  "Ollama",
  "Jupyter",
].map(byName);

function normalizeHex(hex: string): string {
  const n = parseInt(hex, 16);
  const lum =
    (0.2126 * ((n >> 16) & 255) +
      0.7152 * ((n >> 8) & 255) +
      0.0722 * (n & 255)) /
    255;
  return lum < 0.24 ? "var(--logo-neu)" : `#${hex}`;
}

function ChipIcon({ skill }: { skill: Skill }) {
  if (skill.icon)
    return (
      <BrandIcon
        icon={skill.icon}
        color={normalizeHex(skill.icon.hex)}
        className="size-3.5 shrink-0"
      />
    );
  if (skill.glyph === "java")
    return <JavaCupIcon className="size-3.5 shrink-0" />;
  return <TerminalGlyphIcon className="size-3.5 shrink-0" />;
}

function Chip({ skill }: { skill: Skill }) {
  return (
    <li className="flex shrink-0 items-center gap-1.5 rounded border border-dotted border-neutral-800 bg-neutral-900/40 px-2.5 py-1 font-mono text-[10px] text-neutral-300">
      <ChipIcon skill={skill} />
      <span className="whitespace-nowrap">{skill.name}</span>
    </li>
  );
}

function Row({ items, direction }: { items: Skill[]; direction: "left" | "right" }) {
  const track = (ariaHidden: boolean) => (
    <ul
      aria-hidden={ariaHidden}
      className="flex w-max shrink-0 items-center gap-2.5 pr-2.5"
    >
      {items.map((skill) => (
        <Chip key={`${skill.name}-${ariaHidden}`} skill={skill} />
      ))}
    </ul>
  );
  return (
    <div className="flex w-full overflow-hidden">
      <div
        className={`flex w-max shrink-0 ${
          direction === "right"
            ? "animate-[marquee-right_36s_linear_infinite]"
            : "animate-[marquee-left_44s_linear_infinite]"
        } hover:[animation-play-state:paused]`}
      >
        {track(false)}
        {track(true)}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <SectionCard className="overflow-hidden">
      <div
        className="flex flex-col gap-2.5 py-3"
        aria-label="Technologies and tools"
      >
        <Row items={ROW_ONE} direction="right" />
        <Row items={ROW_TWO} direction="left" />
      </div>
    </SectionCard>
  );
}