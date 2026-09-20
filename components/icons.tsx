import type { ComponentProps } from "react";

type IconProps = ComponentProps<"svg">;

export function BrandIcon({
  icon,
  color,
  ...props
}: { icon: { path: string }; color?: string } & IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={color ?? "currentColor"}
      aria-hidden="true"
      {...props}
    >
      <path d={icon.path} />
    </svg>
  );
}

export function EnvelopeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.126 2.062 2.062 0 0 1 0 4.126zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}

export function JavaCupIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M17.5 8h2a2.25 2.25 0 0 1 0 4.5h-2" />
      <path d="M17.5 8v7.75a3.25 3.25 0 0 1-3.25 3.25h-6.5A3.25 3.25 0 0 1 4.5 15.75V8z" />
      <path d="M7.5 6c-.7-.8 0-1.6.8-2.6-.8.8 0 1.6-.8 2.6Z" />
      <path d="M4.6 6c-.7-.8 0-1.6.8-2.6-.8.8 0 1.6-.8 2.6Z" />
    </svg>
  );
}

export function TerminalGlyphIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="m6.5 9 3 3-3 3" />
      <path d="M12.5 15h5" />
    </svg>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.5M12 19v2.5M2.5 12h2.5M19 12h2.5M5 5l1.75 1.75M17.25 17.25 19 19M19 5l-1.75 1.75M6.75 17.25 5 19" />
    </svg>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M21.5 13.4A9 9 0 0 1 10.6 2.5a9 9 0 1 0 10.9 10.9Z" />
    </svg>
  );
}