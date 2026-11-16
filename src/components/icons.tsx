import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h16" />
      <path d="m14 6 6 6-6 6" />
    </svg>
  );
}

export function ArrowLeft(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 12H4" />
      <path d="m10 18-6-6 6-6" />
    </svg>
  );
}

export function Menu(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 7h18M3 12h18M3 17h18" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function Search(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m5 12 4.5 4.5L19 7" />
    </svg>
  );
}

export function Plus(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function Minus(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function Phone(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16.5 16.5 0 0 1 4.5 5.5a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export function Mail(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

export function MapPin(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function Clock(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function WhatsApp(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2a9.9 9.9 0 0 0-8.5 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.1a8.1 8.1 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.1 8.1 0 1 1 12 20.1Zm4.5-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1s-.6.8-.8 1c-.1.1-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.7-1.7c-.2-.5-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.3 5.3 0 0 0 1.1 2.8 12 12 0 0 0 4.6 4c2 .8 2 .6 2.5.6a2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .2-1.2c-.1-.1-.2-.2-.5-.3Z" />
    </svg>
  );
}

export function ChevronDown(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function Lock(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      <path d="M12 14v3" />
    </svg>
  );
}

export function Boxes(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 20 7v6l-8 4-8-4V7l8-4Z" />
      <path d="m4 7 8 4 8-4M12 11v6" />
      <path d="m6 16-2 1v3l4 2 4-2v-3l-2-1" />
    </svg>
  );
}

export function Star(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.5c.3 0 .6.2.7.5l2 6.1 6.4.1c.7 0 1 1 .4 1.4l-5.2 3.7 2 6.1c.2.7-.6 1.2-1.1.8L12 17.4l-5.2 3.8c-.5.4-1.3-.1-1.1-.8l2-6.1-5.2-3.7c-.6-.4-.3-1.4.4-1.4l6.4-.1 2-6.1c.1-.3.4-.5.7-.5Z" />
    </svg>
  );
}

/* ── Category / product line icons ───────────────────────────── */

function DoorIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 20V5.5L14 3v17L4 20Z" />
      <path d="M14 5h6v15h-6" />
      <circle cx="11" cy="12" r="1" />
    </svg>
  );
}

function ScrewIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 3h6l-1 3H10L9 3Z" />
      <path d="M10.5 6h3v4h-3z" />
      <path d="M10.5 10 13 12l-2.5 2 2.5 2-2.5 2 2.5 2" />
      <path d="M12 20v1.5" />
    </svg>
  );
}

function TubeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 4h8v12l-1.2 4.5H9.2L8 16V4Z" />
      <path d="M8 8h8" />
      <path d="M12 2v2" />
      <path d="M10 12h4" />
    </svg>
  );
}

function DrillIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 9h7v4H4z" />
      <path d="M11 9h4l2 2v2h-2" />
      <path d="M13 13v3H9v-3" />
      <path d="M4 11H2.5V13H4" />
      <path d="M17 10h5v2h-5z" />
    </svg>
  );
}

function RailingIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 9h18" />
      <path d="M5 9v11M19 9v11" />
      <path d="M5 14h14" />
      <path d="M8 9v5M12 9v5M16 9v5" />
      <path d="M3 20h18" />
    </svg>
  );
}

function HelmetIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 15a8 8 0 0 1 16 0" />
      <path d="M3 15h18v2H3z" />
      <path d="M9 15V7.5A3 3 0 0 1 15 7.5V15" />
      <path d="M12 4v3" />
    </svg>
  );
}

const categoryIcons: Record<string, (props: IconProps) => React.ReactElement> = {
  door: DoorIcon,
  screw: ScrewIcon,
  tube: TubeIcon,
  drill: DrillIcon,
  railing: RailingIcon,
  helmet: HelmetIcon,
};

export function CategoryIcon({
  name,
  ...props
}: IconProps & { name: string }) {
  const Icon = categoryIcons[name] ?? ScrewIcon;
  return <Icon {...props} />;
}

export function LogoMark(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" {...props}>
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <path
        d="M9.5 23 16 9l6.5 14M12 18.5h8"
        stroke="var(--color-accent)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
