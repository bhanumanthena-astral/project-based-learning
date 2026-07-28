// ============================================================
// BadgeCollection — header, rarity legend & category grid
// ============================================================
import React, { useMemo, useState } from 'react';
import { Award, Flame, Sparkles, Trophy, Zap } from 'lucide-react';
import {
  BADGES,
  CATEGORIES,
  RARITY,
  badgesByCategory,
  completionPct,
  totalXP,
  unlockedCount,
  type Rarity,
} from '../../data/badges';
import { BadgeCard } from './BadgeCard';

const RARITY_ORDER: Rarity[] = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic'];

const StatPill: React.FC<{ icon: React.ReactNode; value: string; label: string; tint: string }> = ({
  icon,
  value,
  label,
  tint,
}) => (
  <div className="flex items-center gap-3 rounded-2xl border border-[var(--border-light)] bg-white/70 px-4 py-3 shadow-sm dark:bg-white/5">
    <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: `${tint}14`, color: tint }}>
      {icon}
    </div>
    <div className="leading-tight">
      <div className="text-[15px] font-extrabold text-[#1e1b4b] dark:text-slate-100 tracking-tight">{value}</div>
      <div className="text-[10px] font-medium text-gray-400 dark:text-slate-500">{label}</div>
    </div>
  </div>
);

export const BadgeCollection: React.FC = () => {
  const [activeRarity, setActiveRarity] = useState<Rarity | 'all'>('all');

  const rarityCounts = useMemo(() => {
    const map = new Map<Rarity, number>();
    RARITY_ORDER.forEach((rk) => map.set(rk, 0));
    BADGES.forEach((b) => map.set(b.rarity, (map.get(b.rarity) ?? 0) + 1));
    return map;
  }, []);

  const filter = (cat: Parameters<typeof badgesByCategory>[0]) =>
    badgesByCategory(cat).filter((b) => activeRarity === 'all' || b.rarity === activeRarity);

  return (
    <div className="space-y-8">
      {/* ---------- Header ---------- */}
      <div className="glass-card relative overflow-hidden p-6 md:p-8">
        {/* soft accent washes */}
        <div className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full opacity-40 blur-3xl" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.18), transparent 70%)' }} />
        <div className="pointer-events-none absolute -bottom-28 -left-10 h-64 w-64 rounded-full opacity-40 blur-3xl" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.16), transparent 70%)' }} />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-600/20 bg-violet-600/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-700">
              <Trophy size={11} />
              Achievement Vault
            </span>
            <h1 className="mt-3 text-2xl md:text-[28px] font-extrabold leading-tight tracking-tight text-[#1e1b4b] dark:text-slate-100">
              Badge Collection
            </h1>
            <p className="mt-1.5 text-[13px] leading-relaxed text-gray-500 dark:text-slate-400">
              Real collectible medals earned as you build. Unlock every rarity from Common silver to Mythic ruby.
            </p>

            {/* progress */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="text-gray-500 dark:text-slate-400">Collection progress</span>
                <span className="font-mono text-violet-600">{unlockedCount}/{BADGES.length} · {completionPct}%</span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-black/5 dark:bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-400 transition-[width] duration-700"
                  style={{ width: `${completionPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* stats */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <StatPill icon={<Award size={16} />} value={`${unlockedCount}`} label="Badges earned" tint="#7C3AED" />
            <StatPill icon={<Zap size={16} />} value={totalXP.toLocaleString()} label="XP from badges" tint="#F59E0B" />
            <StatPill icon={<Flame size={16} />} value={`${BADGES.length - unlockedCount}`} label="Still locked" tint="#DC2626" />
          </div>
        </div>
      </div>

      {/* ---------- Rarity legend / filter ---------- */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveRarity('all')}
          className={`rounded-full border px-3.5 py-1.5 text-[11px] font-bold transition-all ${
            activeRarity === 'all'
              ? 'border-violet-600 bg-violet-600 text-white shadow-md'
              : 'border-[var(--border-light)] bg-white/70 text-gray-500 hover:border-violet-600/30 dark:bg-white/5 dark:text-slate-400'
          }`}
        >
          All rarities
        </button>
        {RARITY_ORDER.map((rk) => {
          const m = RARITY[rk];
          const active = activeRarity === rk;
          return (
            <button
              key={rk}
              onClick={() => setActiveRarity(active ? 'all' : rk)}
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-bold transition-all ${
                active ? 'text-white shadow-md' : 'bg-white/70 hover:shadow-sm dark:bg-white/5'
              }`}
              style={
                active
                  ? { background: m.accent, borderColor: m.accent, color: '#fff' }
                  : { borderColor: `${m.accent}35`, color: m.accent }
              }
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: active ? '#fff' : m.accent }} />
              {m.label}
              <span className={`text-[10px] font-semibold ${active ? 'opacity-80' : 'opacity-50'}`}>
                {rarityCounts.get(rk)}
              </span>
            </button>
          );
        })}
        <span className="ml-auto hidden items-center gap-1.5 text-[10px] font-medium text-gray-400 sm:flex">
          <Sparkles size={11} className="text-amber-500" />
          Hover a medal to inspect · click an unlocked one to celebrate
        </span>
      </div>

      {/* ---------- Category sections ---------- */}
      {CATEGORIES.map((cat) => {
        const list = filter(cat.id);
        if (list.length === 0) return null;
        const earned = list.filter((b) => b.unlocked).length;
        return (
          <section key={cat.id}>
            <div className="mb-4 flex items-baseline justify-between gap-4 border-b border-[var(--border-light)] pb-3">
              <div>
                <h2 className="text-[13px] font-extrabold uppercase tracking-wider text-[#1e1b4b] dark:text-slate-100">
                  {cat.label}
                </h2>
                <p className="mt-0.5 text-[11px] text-gray-400 dark:text-slate-500">{cat.blurb}</p>
              </div>
              <span className="shrink-0 font-mono text-[11px] font-bold text-gray-400">
                {earned}/{list.length}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4 xl:grid-cols-6">
              {list.map((b, i) => (
                <BadgeCard key={b.id} badge={b} index={i} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};
