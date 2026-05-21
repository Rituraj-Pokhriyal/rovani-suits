"use client";
import { MEASUREMENTS } from "@/lib/data/measurements";

interface Props {
  activeId: string | null;
  onHotspotClick: (id: string) => void;
  filledIds: string[];
}

export function BodyDiagram({ activeId, onHotspotClick, filledIds }: Props) {
  return (
    <div className="relative w-full max-w-[280px] mx-auto select-none">
      <svg
        viewBox="0 0 200 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-label="Body measurement diagram"
      >
        {/* ── Figure — simple line-art male silhouette ── */}
        {/* Head */}
        <ellipse cx="100" cy="22" rx="16" ry="20" stroke="#C9A96E" strokeWidth="1.5" fill="#F5F3F0" />
        {/* Neck */}
        <rect x="93" y="40" width="14" height="14" rx="2" fill="#F5F3F0" stroke="#C9A96E" strokeWidth="1.2" />
        {/* Torso */}
        <path
          d="M68 54 L58 84 L56 160 L144 160 L142 84 L132 54 Z"
          fill="#EDE9E4"
          stroke="#C9A96E"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Upper zone shading */}
        <path
          d="M68 54 L58 84 L56 120 L144 120 L142 84 L132 54 Z"
          fill="#E8E4DF"
          opacity="0.5"
        />
        {/* Hips */}
        <path
          d="M56 160 L50 200 L150 200 L144 160 Z"
          fill="#EDE9E4"
          stroke="#C9A96E"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Left leg */}
        <path
          d="M50 200 L46 290 L66 290 L70 200"
          fill="#EDE9E4"
          stroke="#C9A96E"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Right leg */}
        <path
          d="M150 200 L130 200 L134 290 L154 290"
          fill="#EDE9E4"
          stroke="#C9A96E"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Lower leg left */}
        <path
          d="M46 290 L44 380 L66 380 L66 290"
          fill="#EDE9E4"
          stroke="#C9A96E"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Lower leg right */}
        <path
          d="M134 290 L134 380 L156 380 L154 290"
          fill="#EDE9E4"
          stroke="#C9A96E"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Left arm */}
        <path
          d="M68 54 L38 80 L28 160 L44 162 L54 90 L68 70"
          fill="#EDE9E4"
          stroke="#C9A96E"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Right arm */}
        <path
          d="M132 54 L162 80 L172 160 L156 162 L146 90 L132 70"
          fill="#EDE9E4"
          stroke="#C9A96E"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Shoes */}
        <ellipse cx="55" cy="384" rx="14" ry="6" fill="#C9A96E" opacity="0.4" />
        <ellipse cx="145" cy="384" rx="14" ry="6" fill="#C9A96E" opacity="0.4" />

        {/* Shoulder line guide */}
        <line x1="68" y1="56" x2="132" y2="56" stroke="#C9A96E" strokeWidth="0.6" strokeDasharray="3,3" opacity="0.5" />
        {/* Chest line guide */}
        <line x1="58" y1="84" x2="142" y2="84" stroke="#C9A96E" strokeWidth="0.6" strokeDasharray="3,3" opacity="0.5" />
        {/* Waist line guide */}
        <line x1="60" y1="120" x2="140" y2="120" stroke="#C9A96E" strokeWidth="0.6" strokeDasharray="3,3" opacity="0.5" />

        {/* ── Measurement hotspots ── */}
        {MEASUREMENTS.map((m, i) => {
          const cx = (m.svgX / 100) * 200;
          const cy = (m.svgY / 100) * 420;
          const isActive = activeId === m.id;
          const isFilled = filledIds.includes(m.id);

          return (
            <g key={m.id} onClick={() => onHotspotClick(m.id)} style={{ cursor: "pointer" }}>
              {/* Outer ring pulse for active */}
              {isActive && (
                <circle
                  cx={cx}
                  cy={cy}
                  r="14"
                  fill="#C9A96E"
                  opacity="0.15"
                  className="animate-ping"
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                />
              )}
              {/* Hotspot circle */}
              <circle
                cx={cx}
                cy={cy}
                r="9"
                fill={isActive ? "#C9A96E" : isFilled ? "#2D2926" : "#FAFAF8"}
                stroke={isActive ? "#C9A96E" : isFilled ? "#2D2926" : "#C9A96E"}
                strokeWidth="1.5"
                opacity="0.95"
              />
              {/* Number label */}
              <text
                x={cx}
                y={cy + 3.5}
                textAnchor="middle"
                fontSize="7"
                fontFamily="sans-serif"
                fill={isActive || isFilled ? "#FAFAF8" : "#C9A96E"}
                fontWeight="600"
              >
                {i + 1}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border border-gold bg-cream" />
          <span className="font-sans text-[10px] tracking-wider text-text-muted uppercase">Not filled</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gold" />
          <span className="font-sans text-[10px] tracking-wider text-text-muted uppercase">Active</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-charcoal" />
          <span className="font-sans text-[10px] tracking-wider text-text-muted uppercase">Saved</span>
        </div>
      </div>
    </div>
  );
}
