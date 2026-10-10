/**
 * The chariot wheel from the app's Report screen, as an SVG.
 * Seven spokes scored 0–10; petals grow from the hub to the score.
 * With `onSelect`, each sector becomes a tap target and `active` is highlighted.
 */
const RIM = 112;
const RIM_IN = 105;
const BASE = 34;
const TIP = 100;
const VIEW = 340;
const HIT = 168;

/* Rounded so the server and the browser serialise identical coordinates (no hydration mismatch). */
const cos = (a: number) => Math.round(Math.cos(a) * 1000) / 1000;
const sin = (a: number) => Math.round(Math.sin(a) * 1000) / 1000;

export type Spoke = { name: string; score: number; care?: boolean; note: string; sankalp: string };

export const SAMPLE_SPOKES: Spoke[] = [
  { name: "Rhythm", score: 6, note: "Slept at ten past twelve; the day started late and hurried.", sankalp: "Lights out by eleven." },
  { name: "Sadhana", score: 8, note: "Morning prayer and ten quiet minutes before the phone.", sankalp: "Keep the ten minutes; add one verse." },
  { name: "Food & body", score: 7, note: "A 25-minute walk; dinner was late and heavy.", sankalp: "Dinner by eight, something light." },
  { name: "Senses", score: 4, care: true, note: "Three hours of screens, most of them after ten at night.", sankalp: "Phone stays outside the bedroom after nine." },
  { name: "Mind", score: 5, care: true, note: "A flash of anger at work, and the mind kept replaying it.", sankalp: "Three slow breaths before replying when irritated." },
  { name: "Karma", score: 8, note: "Finished what you set out to do, without rushing.", sankalp: "Start tomorrow with the hardest task." },
  { name: "Seva", score: 7, note: "Helped at home without being asked.", sankalp: "One small act of help, unmentioned." },
];

function petal(r0: number, r1: number, w = 12) {
  const mid = r0 + (r1 - r0) * 0.5;
  return `M ${r0} ${-w * 0.45} Q ${mid} ${-w * 1.25} ${r1} 0 Q ${mid} ${w * 1.25} ${r0} ${w * 0.45} Z`;
}

/** A pie slice centred on +x, used as the tap target for one spoke. */
function wedge(halfAngle: number) {
  const a = (halfAngle * Math.PI) / 180;
  return `M 0 0 L ${HIT * cos(-a)} ${HIT * sin(-a)} A ${HIT} ${HIT} 0 0 1 ${HIT * cos(a)} ${HIT * sin(a)} Z`;
}

export function Wheel({
  spokes = SAMPLE_SPOKES,
  night = false,
  animate = true,
  active = null,
  onSelect,
  className = "",
}: {
  spokes?: Spoke[];
  night?: boolean;
  animate?: boolean;
  active?: string | null;
  onSelect?: (name: string) => void;
  className?: string;
}) {
  const brass = night ? "var(--night-brass)" : "var(--brass)";
  const peacock = night ? "var(--night-peacock)" : "var(--peacock)";
  const peacockSoft = night ? "var(--night-peacock-soft)" : "var(--peacock-soft)";
  const kumkum = night ? "var(--night-kumkum)" : "var(--kumkum)";
  const line = night ? "var(--night-line)" : "var(--line-strong)";
  const ink = night ? "var(--sandal-2)" : "var(--ink-2)";
  const hub = night ? "var(--night)" : "var(--paper)";
  const label = spokes.map((s) => `${s.name} ${s.score}/10`).join(", ");
  const step = 360 / spokes.length;

  return (
    <svg viewBox={`${-VIEW / 2} ${-VIEW / 2} ${VIEW} ${VIEW}`} className={`overflow-visible ${className}`} role={onSelect ? "group" : "img"} aria-label={`Chariot wheel: ${label}`}>
      <g className={animate ? "wheel-roll" : undefined}>
        <circle r={RIM} fill="none" stroke={brass} strokeWidth={2.5} />
        <circle r={RIM_IN} fill="none" stroke={line} strokeWidth={1} />
        {Array.from({ length: 24 }, (_, i) => {
          const a = (i * 15 * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={cos(a) * (RIM_IN + 1.5)}
              y1={sin(a) * (RIM_IN + 1.5)}
              x2={cos(a) * (RIM - 1.5)}
              y2={sin(a) * (RIM - 1.5)}
              stroke={brass}
              strokeWidth={i % 2 ? 1 : 1.8}
              strokeLinecap="round"
            />
          );
        })}
        {spokes.map((s, i) => {
          const tip = BASE + (Math.max(0.6, s.score) / 10) * (TIP - BASE);
          const isActive = active === s.name;
          const dim = active && !isActive ? 0.4 : 1;
          return (
            <g key={s.name} transform={`rotate(${-90 + step * i})`} opacity={dim} style={{ transition: "opacity 200ms ease" }}>
              <path d={petal(BASE, TIP)} fill={peacockSoft} />
              <path
                d={petal(BASE, tip)}
                fill={s.care ? kumkum : peacock}
                stroke={isActive ? brass : "none"}
                strokeWidth={2}
                className={animate ? "petal" : undefined}
                style={animate ? { animationDelay: `${600 + i * 90}ms` } : undefined}
              />
            </g>
          );
        })}
      </g>
      <circle r={28} fill={hub} stroke={brass} strokeWidth={3} />
      {spokes.map((s, i) => {
        const a = ((-90 + step * i) * Math.PI) / 180;
        const isActive = active === s.name;
        return (
          <text
            key={s.name}
            x={cos(a) * 146}
            y={sin(a) * 146}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={12.5}
            fontWeight={isActive ? 700 : 500}
            fill={s.care ? kumkum : isActive ? brass : ink}
            fontFamily="var(--font-body)"
          >
            {s.name}
          </text>
        );
      })}
      {onSelect &&
        spokes.map((s, i) => (
          <path
            key={s.name}
            d={wedge(step / 2)}
            transform={`rotate(${-90 + step * i})`}
            fill="transparent"
            className="cursor-pointer outline-none"
            role="button"
            tabIndex={0}
            aria-pressed={active === s.name}
            aria-label={`${s.name}, ${s.score} out of 10`}
            onClick={() => onSelect(s.name)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(s.name);
              }
            }}
          />
        ))}
    </svg>
  );
}
