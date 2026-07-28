// ============================================================
// BuildFirst — Achievement & Badge Collection data model
// ============================================================

export type Rarity =
  | 'common'
  | 'uncommon'
  | 'rare'
  | 'epic'
  | 'legendary'
  | 'mythic';

export type CategoryId =
  | 'foundation'
  | 'programming'
  | 'database'
  | 'frontend'
  | 'backend'
  | 'devops'
  | 'ai'
  | 'legendary';

export interface Badge {
  id: string;
  name: string;
  tagline: string;
  category: CategoryId;
  rarity: Rarity;
  xp: number;
  unlocked: boolean;
  unlockedOn?: string;
}

export interface RarityMeta {
  id: Rarity;
  label: string;
  // accent used for labels, glows, sparkles
  accent: string;
  // radial enamel palette (bright center -> edge)
  coreLight: string;
  core: string;
  coreDeep: string;
  // metal frame palette (bright -> dark)
  frameBright: string;
  frame: string;
  frameDark: string;
  glow: string; // rgba glow color
  sparkle: boolean;
}

export const RARITY: Record<Rarity, RarityMeta> = {
  common: {
    id: 'common',
    label: 'Common',
    accent: '#64748B',
    coreLight: '#F8FAFC',
    core: '#CBD5E1',
    coreDeep: '#94A3B8',
    frameBright: '#FFFFFF',
    frame: '#E2E8F0',
    frameDark: '#94A3B8',
    glow: 'rgba(100,116,139,0.28)',
    sparkle: false,
  },
  uncommon: {
    id: 'uncommon',
    label: 'Uncommon',
    accent: '#10B981',
    coreLight: '#A7F3D0',
    core: '#34D399',
    coreDeep: '#047857',
    frameBright: '#6EE7B7',
    frame: '#10B981',
    frameDark: '#065F46',
    glow: 'rgba(16,185,129,0.38)',
    sparkle: false,
  },
  rare: {
    id: 'rare',
    label: 'Rare',
    accent: '#2563EB',
    coreLight: '#93C5FD',
    core: '#3B82F6',
    coreDeep: '#1D4ED8',
    frameBright: '#BFDBFE',
    frame: '#3B82F6',
    frameDark: '#1E3A8A',
    glow: 'rgba(59,130,246,0.40)',
    sparkle: false,
  },
  epic: {
    id: 'epic',
    label: 'Epic',
    accent: '#7C3AED',
    coreLight: '#C4B5FD',
    core: '#8B5CF6',
    coreDeep: '#5B21B6',
    frameBright: '#DDD6FE',
    frame: '#7C3AED',
    frameDark: '#4C1D95',
    glow: 'rgba(139,92,246,0.45)',
    sparkle: false,
  },
  legendary: {
    id: 'legendary',
    label: 'Legendary',
    accent: '#F59E0B',
    coreLight: '#FDE68A',
    core: '#F59E0B',
    coreDeep: '#B45309',
    frameBright: '#FEF3C7',
    frame: '#F59E0B',
    frameDark: '#92400E',
    glow: 'rgba(245,158,11,0.50)',
    sparkle: true,
  },
  mythic: {
    id: 'mythic',
    label: 'Mythic',
    accent: '#DC2626',
    coreLight: '#FDA4AF',
    core: '#E11D48',
    coreDeep: '#9F1239',
    frameBright: '#FECDD3',
    frame: '#DC2626',
    frameDark: '#7F1D1D',
    glow: 'rgba(225,29,72,0.50)',
    sparkle: true,
  },
};

export interface CategoryMeta {
  id: CategoryId;
  label: string;
  blurb: string;
}

export const CATEGORIES: CategoryMeta[] = [
  { id: 'foundation', label: 'Foundation', blurb: 'Your first steps building real projects' },
  { id: 'programming', label: 'Programming', blurb: 'Core software engineering craft' },
  { id: 'database', label: 'Database', blurb: 'Data modeling, SQL & integrity' },
  { id: 'frontend', label: 'Frontend', blurb: 'Interfaces, motion & pixel craft' },
  { id: 'backend', label: 'Backend', blurb: 'APIs, services & system security' },
  { id: 'devops', label: 'DevOps', blurb: 'Ship, deploy & scale infrastructure' },
  { id: 'ai', label: 'Artificial Intelligence', blurb: 'Models, prompts & automation' },
  { id: 'legendary', label: 'Legendary', blurb: 'The rarest honors on BuildFirst' },
];

// Deterministic pseudo-random helper so unlock data is stable across renders.
const pick = (seed: number, arr: string[]) => arr[seed % arr.length];
const DATES = [
  'Jan 12, 2026', 'Feb 03, 2026', 'Feb 18, 2026', 'Mar 07, 2026',
  'Mar 22, 2026', 'Apr 09, 2026', 'Apr 27, 2026', 'May 14, 2026',
  'Jun 02, 2026', 'Jun 20, 2026', 'Jul 05, 2026', 'Jul 18, 2026',
];

interface BadgeSeed {
  name: string;
  tagline: string;
  rarity: Rarity;
  xp: number;
  unlocked?: boolean;
}

const make = (cat: CategoryId, seed: BadgeSeed, i: number): Badge => ({
  id: `${cat}-${i}`,
  name: seed.name,
  tagline: seed.tagline,
  category: cat,
  rarity: seed.rarity,
  xp: seed.xp,
  unlocked: seed.unlocked ?? false,
  unlockedOn: seed.unlocked ? pick(i + cat.length, DATES) : undefined,
});

export const BADGES: Badge[] = [
  // ------------------------------ FOUNDATION
  make('foundation', { name: 'First Commit', tagline: 'Shipped your first change', rarity: 'common', xp: 100, unlocked: true }, 0),
  make('foundation', { name: 'Knowledge Seeker', tagline: 'Opened 25 lessons', rarity: 'common', xp: 150, unlocked: true }, 1),
  make('foundation', { name: 'Launch Ready', tagline: 'Deployed your first app', rarity: 'uncommon', xp: 300, unlocked: true }, 2),
  make('foundation', { name: 'Goal Crusher', tagline: 'Hit a 30-day goal', rarity: 'rare', xp: 450, unlocked: false }, 3),
  make('foundation', { name: 'Speed Learner', tagline: 'Finished a track in 3 days', rarity: 'epic', xp: 600, unlocked: false }, 4),
  make('foundation', { name: 'Streak Master', tagline: 'Held a 60-day streak', rarity: 'legendary', xp: 900, unlocked: false }, 5),

  // ------------------------------ PROGRAMMING
  make('programming', { name: 'Code Crafter', tagline: 'Wrote 1,000 lines', rarity: 'common', xp: 150, unlocked: true }, 0),
  make('programming', { name: 'Logic Wizard', tagline: 'Solved 50 algorithm drills', rarity: 'uncommon', xp: 300, unlocked: true }, 1),
  make('programming', { name: 'Bug Hunter', tagline: 'Squashed 25 bugs', rarity: 'rare', xp: 450, unlocked: false }, 2),
  make('programming', { name: 'Full Stack Hero', tagline: 'Built a full-stack app', rarity: 'epic', xp: 700, unlocked: false }, 3),
  make('programming', { name: 'API Builder', tagline: 'Designed 5 REST APIs', rarity: 'rare', xp: 500, unlocked: false }, 4),
  make('programming', { name: 'Problem Solver', tagline: 'Cracked 100 challenges', rarity: 'legendary', xp: 950, unlocked: false }, 5),

  // ------------------------------ DATABASE
  make('database', { name: 'Schema Creator', tagline: 'Modeled your first schema', rarity: 'common', xp: 150, unlocked: true }, 0),
  make('database', { name: 'Relationship Builder', tagline: 'Linked tables with keys', rarity: 'uncommon', xp: 300, unlocked: true }, 1),
  make('database', { name: 'ACID Guardian', tagline: 'Ran an atomic transaction', rarity: 'rare', xp: 500, unlocked: true }, 2),
  make('database', { name: 'Query Master', tagline: 'Wrote a 4-table JOIN', rarity: 'epic', xp: 650, unlocked: false }, 3),
  make('database', { name: 'Index Architect', tagline: 'Optimized with B-Tree indexes', rarity: 'rare', xp: 500, unlocked: false }, 4),
  make('database', { name: 'Normalization Guru', tagline: 'Refactored to 3NF', rarity: 'epic', xp: 700, unlocked: false }, 5),

  // ------------------------------ FRONTEND
  make('frontend', { name: 'Pixel Perfect', tagline: 'Matched a design 1:1', rarity: 'common', xp: 200, unlocked: true }, 0),
  make('frontend', { name: 'React Pioneer', tagline: 'Built your first component', rarity: 'uncommon', xp: 350, unlocked: true }, 1),
  make('frontend', { name: 'CSS Artist', tagline: 'Crafted 20 styled views', rarity: 'rare', xp: 450, unlocked: false }, 2),
  make('frontend', { name: 'Animation Master', tagline: 'Shipped 10 interactions', rarity: 'epic', xp: 650, unlocked: false }, 3),
  make('frontend', { name: 'Component Craftsman', tagline: 'Built a UI library', rarity: 'rare', xp: 500, unlocked: false }, 4),
  make('frontend', { name: 'Responsive Wizard', tagline: 'Perfect on every screen', rarity: 'epic', xp: 600, unlocked: false }, 5),

  // ------------------------------ BACKEND
  make('backend', { name: 'API Samurai', tagline: 'Sliced clean endpoints', rarity: 'rare', xp: 500, unlocked: true }, 0),
  make('backend', { name: 'Microservice Builder', tagline: 'Split a monolith cleanly', rarity: 'epic', xp: 700, unlocked: false }, 1),
  make('backend', { name: 'Socket Master', tagline: 'Real-time channels live', rarity: 'rare', xp: 500, unlocked: false }, 2),
  make('backend', { name: 'Backend Fortress', tagline: 'Hardened a production API', rarity: 'epic', xp: 750, unlocked: false }, 3),
  make('backend', { name: 'Security Sentinel', tagline: 'Locked down auth & data', rarity: 'legendary', xp: 900, unlocked: false }, 4),

  // ------------------------------ DEVOPS
  make('devops', { name: 'Cloud Navigator', tagline: 'Deployed to the cloud', rarity: 'uncommon', xp: 350, unlocked: true }, 0),
  make('devops', { name: 'Docker Captain', tagline: 'Containerized an app', rarity: 'rare', xp: 500, unlocked: false }, 1),
  make('devops', { name: 'CI/CD Champion', tagline: 'Automated the pipeline', rarity: 'epic', xp: 700, unlocked: false }, 2),
  make('devops', { name: 'Kubernetes Commander', tagline: 'Orchestrated a cluster', rarity: 'legendary', xp: 950, unlocked: false }, 3),
  make('devops', { name: 'Infrastructure Engineer', tagline: 'Provisioned with code', rarity: 'epic', xp: 750, unlocked: false }, 4),

  // ------------------------------ AI
  make('ai', { name: 'AI Explorer', tagline: 'Ran your first model', rarity: 'uncommon', xp: 300, unlocked: true }, 0),
  make('ai', { name: 'Prompt Engineer', tagline: 'Mastered prompt craft', rarity: 'rare', xp: 500, unlocked: true }, 1),
  make('ai', { name: 'LLM Architect', tagline: 'Designed a model pipeline', rarity: 'epic', xp: 750, unlocked: false }, 2),
  make('ai', { name: 'Vector Pioneer', tagline: 'Built a vector search', rarity: 'rare', xp: 550, unlocked: false }, 3),
  make('ai', { name: 'Automation Expert', tagline: 'Automated 10 workflows', rarity: 'legendary', xp: 900, unlocked: false }, 4),

  // ------------------------------ LEGENDARY
  make('legendary', { name: 'BuildFirst Legend', tagline: 'Crowned a platform legend', rarity: 'mythic', xp: 2500, unlocked: false }, 0),
  make('legendary', { name: 'The Architect', tagline: 'Designed a grand system', rarity: 'mythic', xp: 2200, unlocked: false }, 1),
  make('legendary', { name: 'Code Oracle', tagline: 'Saw solutions others missed', rarity: 'legendary', xp: 1800, unlocked: false }, 2),
  make('legendary', { name: 'Master Builder', tagline: 'Completed every track', rarity: 'mythic', xp: 2400, unlocked: false }, 3),
  make('legendary', { name: 'Zero Bug Release', tagline: 'Shipped a flawless release', rarity: 'legendary', xp: 2000, unlocked: false }, 4),
];

export const badgesByCategory = (cat: CategoryId): Badge[] =>
  BADGES.filter((b) => b.category === cat);

export const totalXP = BADGES.filter((b) => b.unlocked).reduce((s, b) => s + b.xp, 0);
export const unlockedCount = BADGES.filter((b) => b.unlocked).length;
export const completionPct = Math.round((unlockedCount / BADGES.length) * 100);
