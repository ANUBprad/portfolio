import {
  siC,
  siCplusplus,
  siDocker,
  siFastapi,
  siGit,
  siGithub,
  siGithubactions,
  siHuggingface,
  siJavascript,
  siJupyter,
  siLangchain,
  siLanggraph,
  siLinux,
  siMlflow,
  siNextdotjs,
  siNumpy,
  siOllama,
  siOpencv,
  siOpencode,
  siOpenjdk,
  siPandas,
  siPostgresql,
  siPytest,
  siPytorch,
  siPython,
  siRedis,
  siRust,
  siScikitlearn,
  siStreamlit,
  siTemporal,
  siTensorflow,
  siTypescript,
} from "simple-icons";
import SectionCard from "./section-card";
import { AWSMarkIcon, BrandIcon, DatabaseGlyphIcon, TerminalGlyphIcon } from "./icons";

type Skill = {
  name: string;
  icon?: { path: string; hex: string };
  glyph?: "code" | "aws" | "database";
};

const DATA: Skill[] = [
  { name: "Python", icon: siPython },
  { name: "Java", icon: siOpenjdk },
  { name: "JavaScript", icon: siJavascript },
  { name: "TypeScript", icon: siTypescript },
  { name: "Rust", icon: siRust },
  { name: "C", icon: siC },
  { name: "C++", icon: siCplusplus },
  { name: "PyTorch", icon: siPytorch },
  { name: "TensorFlow", icon: siTensorflow },
  { name: "scikit-learn", icon: siScikitlearn },
  { name: "NumPy", icon: siNumpy },
  { name: "Pandas", icon: siPandas },
  { name: "LangChain", icon: siLangchain },
  { name: "LangGraph", icon: siLanggraph },
  { name: "Transformers", icon: siHuggingface },
  { name: "Hugging Face", icon: siHuggingface },
  { name: "MLflow", icon: siMlflow },
  { name: "OpenCV", icon: siOpencv },
  { name: "FastAPI", icon: siFastapi },
  { name: "Next.js", icon: siNextdotjs },
  { name: "Streamlit", icon: siStreamlit },
  { name: "PostgreSQL", icon: siPostgresql },
  { name: "SQL", glyph: "database" },
  { name: "Redis", icon: siRedis },
  { name: "Temporal", icon: siTemporal },
  { name: "Docker", icon: siDocker },
  { name: "AWS", glyph: "aws" },
  { name: "Git", icon: siGit },
  { name: "GitHub", icon: siGithub },
  { name: "GitHub Actions", icon: siGithubactions },
  { name: "Linux", icon: siLinux },
  { name: "REST APIs", glyph: "code" },
  { name: "pytest", icon: siPytest },
  { name: "Ollama", icon: siOllama },
  { name: "Jupyter", icon: siJupyter },
  { name: "OpenCode", icon: siOpencode },
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
].map(byName);

const ROW_TWO = [
  "PyTorch",
  "TensorFlow",
  "scikit-learn",
  "NumPy",
  "Pandas",
  "LangChain",
  "LangGraph",
].map(byName);

const ROW_THREE = [
  "Transformers",
  "Hugging Face",
  "MLflow",
  "OpenCV",
  "FastAPI",
  "Next.js",
  "Streamlit",
].map(byName);

const ROW_FOUR = [
  "PostgreSQL",
  "SQL",
  "Redis",
  "Temporal",
  "Docker",
  "AWS",
  "Git",
  "GitHub",
  "GitHub Actions",
  "Linux",
  "REST APIs",
  "pytest",
  "Ollama",
  "Jupyter",
  "OpenCode",
].map(byName);

function ChipIcon({ skill }: { skill: Skill }) {
  if (skill.icon) return <BrandIcon icon={skill.icon} className="size-5 shrink-0" />;
  if (skill.glyph === "aws") return <AWSMarkIcon className="h-5 w-auto shrink-0" />;
  if (skill.glyph === "database")
    return <DatabaseGlyphIcon className="size-5 shrink-0" />;
  return <TerminalGlyphIcon className="size-5 shrink-0" />;
}

function Chip({ skill }: { skill: Skill }) {
  return (
    <li className="group flex shrink-0 flex-col items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.015] px-3 py-2.5 font-mono text-[10px] transition duration-300 hover:-translate-y-0.5 hover:border-white/25">
      <div className="flex size-9 items-center justify-center text-neutral-300 [filter:drop-shadow(0_0_1px_rgba(255,255,255,0.55))] transition duration-300 group-hover:text-neutral-100 group-hover:[filter:drop-shadow(0_0_2px_rgba(255,255,255,0.85))]">
        <ChipIcon skill={skill} />
      </div>
      <span className="whitespace-nowrap text-neutral-400 transition-colors duration-300 group-hover:text-neutral-200">
        {skill.name}
      </span>
    </li>
  );
}

function Row({ items, direction }: { items: Skill[]; direction: "left" | "right" }) {
  const track = (key: string, className = "") => (
    <ul
      key={key}
      className={`flex w-max shrink-0 items-center gap-3 pr-3 ${className}`}
    >
      {items.map((skill) => (
        <Chip key={`${skill.name}-${key}`} skill={skill} />
      ))}
    </ul>
  );
  return (
    <div className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:overflow-x-auto motion-reduce:[mask-image:none]">
      <div
        className={`flex w-max shrink-0 ${
          direction === "right"
            ? "animate-[marquee-right_36s_linear_infinite]"
            : "animate-[marquee-left_44s_linear_infinite]"
        } hover:[animation-play-state:paused] motion-reduce:[animation:none]`}
      >
        {track("a")}
        {track("b", "motion-reduce:hidden")}
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
        <Row items={ROW_THREE} direction="right" />
        <Row items={ROW_FOUR} direction="left" />
      </div>
    </SectionCard>
  );
}
