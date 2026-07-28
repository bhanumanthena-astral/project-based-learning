// ============================================================
// Nxtagent — Realistic 3D collectible badge engine
// Framework: defs, medal shell (metal frame, enamel, occlusion,
// reflections, sparkles) + material/geometry helpers.
// ============================================================
import React from 'react';
import { RARITY, type Rarity, type CategoryId } from '../../data/badges';
import { EMBLEM } from './emblems';

export const UB = 64;         // userSpace for emblem content
export const C = 32;          // emblem center
export const DX = 70;         // emblem center x in 140 viewBox
export const DY = 70;

// ---------- defs (gradients / filters), unique per uid ----------
const Defs: React.FC<{ uid: string; rarity: Rarity }> = ({ uid, rarity }) => {
  const r = RARITY[rarity];
  const leg = rarity === 'legendary';
  const my = rarity === 'mythic';
  const com = rarity === 'common';
  const un = rarity === 'uncommon';

  const f0 = leg ? '#FFF6DC' : my ? '#FFE2E6' : r.frameBright;
  const f1 = leg ? '#FFDD84' : my ? '#FF8C9E' : un ? '#6EE7B7' : com ? '#F1F5F9' : r.frame;
  const f2 = leg ? '#E9A23B' : my ? '#E0245E' : r.frame;
  const f3 = leg ? '#8A5A13' : my ? '#7F0F2E' : r.frameDark;

  const c0 = leg ? '#FFE08A' : my ? '#FF9FB2' : r.coreLight;
  const c1 = leg ? '#F6B73C' : my ? '#EF2A5B' : r.core;
  const c2 = leg ? '#B4761A' : my ? '#8E1030' : r.coreDeep;
  // inner field: light rarities get a tinted disc so white glyphs stay legible
  const inner = com ? '#8DA2C0' : un ? '#0E9F73' : r.coreDeep;
  const innerTop = com ? '#C2D0E4' : un ? '#7CE7C0' : inner;

  return (
    <defs>
      <linearGradient id={`${uid}-frame`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={f0} />
        <stop offset="0.28" stopColor={f1} />
        <stop offset="0.55" stopColor={f2} />
        <stop offset="0.8" stopColor={f3} />
        <stop offset="1" stopColor={f2} />
      </linearGradient>
      <radialGradient id={`${uid}-core`} cx="0.5" cy="0.34" r="0.74">
        <stop offset="0" stopColor={c0} />
        <stop offset="0.5" stopColor={c1} />
        <stop offset="1" stopColor={c2} />
      </radialGradient>
      <linearGradient id={`${uid}-inner`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={innerTop} />
        <stop offset="1" stopColor={inner} />
      </linearGradient>
      <linearGradient id={`${uid}-gloss`} x1="0" y1="0" x2="0.4" y2="1">
        <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.6" />
        <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.12" />
        <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
      <radialGradient id={`${uid}-ao`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0.62" stopColor="#000000" stopOpacity="0" />
        <stop offset="0.88" stopColor="#2A0E45" stopOpacity="0.14" />
        <stop offset="1" stopColor="#2A0E45" stopOpacity="0.3" />
      </radialGradient>
      <radialGradient id={`${uid}-ground`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#1E1033" stopOpacity="0.4" />
        <stop offset="0.7" stopColor="#1E1033" stopOpacity="0.16" />
        <stop offset="1" stopColor="#1E1033" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${uid}-glow`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor={r.accent} stopOpacity="0.55" />
        <stop offset="1" stopColor={r.accent} stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${uid}-vign`} cx="0.5" cy="0.42" r="0.75">
        <stop offset="0" stopColor={r.accent} stopOpacity="0.1" />
        <stop offset="0.6" stopColor={r.accent} stopOpacity="0.04" />
        <stop offset="1" stopColor={r.accent} stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`${uid}-sheen`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
        <stop offset="0.45" stopColor="#FFFFFF" stopOpacity="0.14" />
        <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.45" />
        <stop offset="0.55" stopColor="#FFFFFF" stopOpacity="0.14" />
        <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
      <clipPath id={`${uid}-clip`}>
        <circle cx={DX} cy={DY} r="44" />
      </clipPath>
    </defs>
  );
};

// ---------- medal shell ----------
export const Medal: React.FC<{ uid: string; rarity: Rarity }> = ({ uid, rarity }) => {
  const r = RARITY[rarity];
  const com = rarity === 'common';
  const sp = r.sparkle;
  return (
    <g>
      {/* ground shadow */}
      <ellipse cx={DX} cy="124" rx="42" ry="9" fill={`url(#${uid}-ground)`} />
      {/* outer bevel rim */}
      <circle cx={DX} cy={DY} r="54" fill={`url(#${uid}-frame)`} />
      {/* metal frame */}
      <circle cx={DX} cy={DY} r="51" fill={`url(#${uid}-frame)`} stroke="#2A0E45" strokeOpacity="0.14" strokeWidth="0.75" />
      {/* top metal highlight + bottom shade */}
      <path d={`M ${DX - 44} ${DY - 26} A 50 50 0 0 1 ${DX + 44} ${DY - 26}`} stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d={`M ${DX - 44} ${DY + 26} A 50 50 0 0 0 ${DX + 44} ${DY + 26}`} stroke="#2A0E45" strokeOpacity="0.2" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* enamel core */}
      <circle cx={DX} cy={DY} r="44" fill={`url(#${uid}-core)`} />
      {/* inner recessed field — tonal disc so white emblems separate */}
      <circle cx={DX} cy={DY} r="37.5" fill={`url(#${uid}-inner)`} opacity={com ? 1 : 0.5} />
      {/* extra contrast inset behind emblem on light medals */}
      {com && <circle cx={DX} cy={DY} r="33" fill="#3B4A6B" opacity="0.32" />}
      <circle cx={DX} cy={DY} r="37.5" fill="none" stroke="#2A0E45" strokeOpacity="0.22" strokeWidth="1" />
      {/* soft inner top-down shading for depth */}
      <ellipse cx={DX} cy={DY + 14} rx="30" ry="18" fill="#2A0E45" opacity="0.1" />
      {/* emblem content (clipped to enamel) */}
      <g clipPath={`url(#${uid}-clip)`}>
        <g transform={`translate(${DX - C} ${DY - C})`}>{EMBLEM[uid]}</g>
      </g>
      {/* ambient occlusion around enamel edge */}
      <circle cx={DX} cy={DY} r="44" fill={`url(#${uid}-ao)`} />
      {/* inner top edge light */}
      <path d={`M ${DX - 30} ${DY - 31} A 43 43 0 0 1 ${DX + 30} ${DY - 31}`} stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* glass dome sweep */}
      <ellipse cx={DX - 14} cy={DY - 20} rx="26" ry="15" fill={`url(#${uid}-gloss)`} transform={`rotate(-18 ${DX - 14} ${DY - 20})`} />
      {/* moving reflection */}
      <rect x="-40" y="0" width="70" height="140" fill={`url(#${uid}-sheen)`} className="badge-sheen" clipPath={`url(#${uid}-clip)`} />
      {/* sparkles */}
      {sp && (
        <g className="badge-sparkles" fill="#FFFFFF">
          <g className="sp sp1"><path d={`M ${DX - 34} ${DY - 34} l2.2 5 5 2.2 -5 2.2 -2.2 5 -2.2 -5 -5 -2.2 5 -2.2 Z`} /></g>
          <g className="sp sp2"><path d={`M ${DX + 36} ${DY - 18} l1.8 4 4 1.8 -4 1.8 -1.8 4 -1.8 -4 -4 -1.8 4 -1.8 Z`} /></g>
          <g className="sp sp3"><path d={`M ${DX + 20} ${DY + 36} l2 4.6 4.6 2 -4.6 2 -2 4.6 -2 -4.6 -4.6 -2 4.6 -2 Z`} /></g>
        </g>
      )}
    </g>
  );
};

// ---------- the badge art (per badge id) ----------
export const BadgeArt: React.FC<{ badgeId: string; category: CategoryId; rarity: Rarity; className?: string }> = ({
  badgeId,
  category,
  rarity,
  className,
}) => {
  const r = RARITY[rarity];
  return (
    <svg viewBox="0 0 140 140" className={className} role="img" aria-hidden="true">
      <Defs uid={badgeId} rarity={rarity} />
      <circle cx={DX} cy={DY} r="62" fill={`url(#${badgeId}-glow)`} className="badge-glow" />
      <circle cx={DX} cy={DY} r="60" fill={`url(#${badgeId}-vign)`} />
      {/* orbiting rarity ring for top tiers */}
      {(rarity === 'legendary' || rarity === 'mythic') && (
        <g className="badge-orbit">
          <circle cx={DX} cy={DY} r="57.5" fill="none" stroke={r.accent} strokeOpacity="0.5" strokeWidth="1" strokeDasharray="2 6" strokeLinecap="round" />
        </g>
      )}
      <Medal uid={badgeId} rarity={rarity} />
    </svg>
  );
};
