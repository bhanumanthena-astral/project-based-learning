// ============================================================
// Shared badge art utilities - no circular dependencies
// ============================================================

import React from 'react';

// ---------- material helpers (content coords, centered on 32,32) ----------
const WHITE = '#FFFFFF';
const SHADOW = '#2E1060';

// soft contact shadow behind the glyph (emboss depth)
export const D = (props: React.SVGProps<SVGGElement>) => (
  <g fill={SHADOW} transform="translate(0,1.4)" opacity={0.4} {...props} />
);

// raised white enamel surface with a clear engraved outline
export const M = (props: React.SVGProps<SVGGElement>) => (
  <g fill={WHITE} stroke={SHADOW} strokeOpacity={0.38} strokeWidth={1.1} strokeLinejoin="round" {...props} />
);

// deep enamel (dark core) used to anchor white detail
export const E = (props: React.SVGProps<SVGGElement>) => (
  <g fill={SHADOW} opacity={0.82} {...props} />
);

export const shade = (props: React.SVGProps<SVGPathElement>) => (
  <path fill={SHADOW} opacity={0.2} {...props} />
);

export const hl = (props: React.SVGProps<SVGPathElement>) => (
  <path fill={WHITE} opacity={0.55} {...props} />
);

export const glint = (cx: number, cy: number, r = 1.4) => (
  <g fill={WHITE}>
    <circle cx={cx} cy={cy} r={r} opacity={0.95} />
    <path
      d={`M ${cx - r * 2.4} ${cy} H ${cx + r * 2.4} M ${cx} ${cy - r * 2.4} V ${cy + r * 2.4}`}
      stroke={WHITE}
      strokeWidth={r * 0.55}
      opacity={0.8}
      strokeLinecap="round"
    />
  </g>
);

// ---------- geometry helpers (userSpace 64, center 32) ----------
const C = 32; // emblem center

export const ring = (r: number, w: number, extra?: string) =>
  `M ${C} ${C - r} ` +
  `A ${r} ${r} 0 1 0 ${C - 0.02} ${C - r} Z` +
  (w > 0
    ? ` M ${C} ${C - (r - w)} A ${r - w} ${r - w} 0 1 1 ${C - 0.02} ${C - (r - w)} Z`
    : '') +
  (extra ?? '');

export const gear = (rOut: number, rIn: number, teeth: number, toothH: number) => {
  let d = '';
  const step = (Math.PI * 2) / teeth;
  const tw = step * 0.5;
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const a0 = a - tw / 2;
    const a1 = a + tw / 2;
    const ro = rOut + toothH;
    const pt = (ang: number, r: number) =>
      `${(C + Math.cos(ang) * r).toFixed(2)} ${(C + Math.sin(ang) * r).toFixed(2)}`;
    d += `${i === 0 ? 'M' : 'L'} ${pt(a0, rOut)} L ${pt(a0, ro)} L ${pt(a1, ro)} L ${pt(a1, rOut)} `;
  }
  return d + 'Z ' + ring(rIn, 0);
};

export const star = (cx: number, cy: number, rOut: number, rIn: number, n = 5, rot = -90) => {
  const pts: string[] = [];
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 === 0 ? rOut : rIn;
    const a = ((rot + (i * 180) / n) * Math.PI) / 180;
    pts.push(`${(cx + Math.cos(a) * r).toFixed(2)} ${(cy + Math.sin(a) * r).toFixed(2)}`);
  }
  return `M ${pts.join(' L ')} Z`;
};

export const shield = (cx: number, cy: number, w: number, h: number) => {
  const x = cx - w / 2;
  const y = cy - h / 2;
  return (
    `M ${x} ${y} H ${x + w} V ${y + h * 0.42} ` +
    `C ${x + w} ${y + h * 0.74} ${cx} ${y + h * 0.94} ${cx} ${y + h} ` +
    `C ${cx} ${y + h * 0.94} ${x} ${y + h * 0.74} ${x} ${y + h * 0.42} Z`
  );
};

export const flame = (cx: number, cy: number, s: number) =>
  `M ${cx} ${cy - s} ` +
  `C ${cx + s * 0.62} ${cy - s * 0.28} ${cx + s * 0.5} ${cy + s * 0.42} ${cx + s * 0.12} ${cy + s * 0.78} ` +
  `C ${cx + s * 0.5} ${cy + s * 0.9} ${cx + s * 0.5} ${cy + s * 1.06} ${cx} ${cy + s * 1.06} ` +
  `C ${cx - s * 0.5} ${cy + s * 1.06} ${cx - s * 0.5} ${cy + s * 0.9} ${cx - s * 0.12} ${cy + s * 0.78} ` +
  `C ${cx - s * 0.52} ${cy + s * 0.42} ${cx - s * 0.6} ${cy - s * 0.28} ${cx} ${cy - s} Z`;