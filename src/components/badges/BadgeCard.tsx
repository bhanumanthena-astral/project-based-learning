// ============================================================
// BadgeCard — glass card wrapping one collectible medal
// ============================================================
import React, { useRef, useState } from 'react';
import { Lock, Zap } from 'lucide-react';
import { RARITY, type Badge } from '../../data/badges';
import { BadgeArt } from './BadgeArt';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    confetti?: (options?: any) => void;
  }
}

interface Props {
  badge: Badge;
  index: number;
}

export const BadgeCard: React.FC<Props> = ({ badge, index }) => {
  const r = RARITY[badge.rarity];
  const ref = useRef<HTMLDivElement>(null);
  const [justUnlocked, setJustUnlocked] = useState(false);
  const topTier = badge.rarity === 'legendary' || badge.rarity === 'mythic';

  const celebrate = () => {
    if (!badge.unlocked || !ref.current || typeof window.confetti !== 'function') return;
    const rect = ref.current.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    const colors = ['#F59E0B', '#FDE68A', r.accent, '#FFFFFF'];
    window.confetti({ particleCount: 26, spread: 60, startVelocity: 22, scalar: 0.7, ticks: 120, origin: { x, y }, colors, disableForReducedMotion: true });
    window.confetti({ particleCount: 14, spread: 100, startVelocity: 14, scalar: 0.55, ticks: 140, origin: { x, y }, colors: ['#FFD700', '#FFF3C4', r.accent], disableForReducedMotion: true });
    setJustUnlocked(true);
    window.setTimeout(() => setJustUnlocked(false), 900);
  };

  return (
    <div
      ref={ref}
      onClick={celebrate}
      style={{ animationDelay: `${Math.min(index * 40, 400)}ms` }}
      className={`badge-card badge-enter ${badge.unlocked ? '' : 'locked'} ${topTier && badge.unlocked ? 'always-orbit' : ''}`}
      title={badge.unlocked ? `${badge.name} — ${r.label}` : `${badge.name} — Locked`}
    >
      {justUnlocked && <div className="badge-unlock-ring" />}

      {/* medal */}
      <div className="w-full max-w-[96px] -mt-1">
        <BadgeArt badgeId={badge.id} category={badge.category} rarity={badge.rarity} className="badge-art" />
      </div>

      {/* name */}
      <h3 className="mt-1.5 text-[12.5px] font-extrabold leading-tight text-[#1e1b4b] dark:text-slate-100 tracking-tight">
        {badge.name}
      </h3>

      {/* category */}
      <p className="mt-0.5 text-[10px] font-medium text-gray-400 dark:text-slate-500 capitalize">
        {badge.category === 'ai' ? 'Artificial Intelligence' : badge.category}
      </p>

      {/* rarity chip */}
      <span
        className="rarity-chip mt-2"
        style={{
          color: r.accent,
          background: `${r.accent}14`,
          border: `1px solid ${r.accent}30`,
        }}
      >
        {!badge.unlocked && <Lock size={8} strokeWidth={3} />}
        {r.label}
      </span>

      {/* XP + date */}
      <div className="mt-2 flex items-center gap-1 text-[11px] font-extrabold font-mono" style={{ color: badge.unlocked ? '#F59E0B' : 'var(--text-muted)' }}>
        <Zap size={11} className={badge.unlocked ? 'fill-amber-500 text-amber-500' : ''} />
        <span>+{badge.xp.toLocaleString()} XP</span>
      </div>
      <p className="mt-0.5 text-[9.5px] font-medium text-gray-400 dark:text-slate-500">
        {badge.unlocked && badge.unlockedOn ? badge.unlockedOn : 'Not unlocked yet'}
      </p>
    </div>
  );
};
