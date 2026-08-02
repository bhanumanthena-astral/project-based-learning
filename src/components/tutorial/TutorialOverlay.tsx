import React, { useCallback, useEffect, useMemo, useRef, useState, Dispatch, SetStateAction } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Trophy, Sparkles } from 'lucide-react';
import { UserSession } from '../../data/mockData';

type Placement = 'below' | 'above' | 'right' | 'left' | 'inside';

interface TutorialStepConfig {
  target: string;
  placement: Placement;
  title: string;
  body: string;
  instruction: string;
  requiresClick?: string;
  nextLabel?: string;
  autoAdvanceMs?: number;
  onInteract?: () => void;
  transientMsg?: string;
}

const STEPS: TutorialStepConfig[] = [
  {
    target: '[data-tut="hero-card"]',
    placement: 'below',
    title: 'This is your daily task',
    body: 'Every time you open BuildFirst, this card tells you exactly what to work on next. No hunting around.',
    instruction: 'Read the task above, then click Next →',
  },
  {
    target: '[data-tut="nav-dashboard"]',
    placement: 'right',
    title: 'Your home base',
    body: 'Dashboard shows your progress and what to do next. Always start here.',
    instruction: "Click 'Dashboard' in the sidebar",
    requiresClick: '[data-tut="nav-dashboard"]',
  },
  {
    target: '[data-tut="nav-projects"]',
    placement: 'right',
    title: "Track what you're building",
    body: "What I'm Building shows your Hospital Management System — every table you've built and what's coming next.",
    instruction: "Click 'What I'm Building' to see your project",
    requiresClick: '[data-tut="nav-projects"]',
    transientMsg: "Great! Let's continue the tour",
    onInteract: () => {},
  },
  {
    target: '[data-tut="hero-cta"]',
    placement: 'above',
    title: 'This is how you learn',
    body: 'Clicking here takes you to your current task. Each task teaches you exactly one concept — the one your project needs right now.',
    instruction: "Click 'Continue building →'",
    requiresClick: '[data-tut="hero-cta"]',
    transientMsg: 'Taking you to your workspace...',
    onInteract: () => {},
  },
  {
    target: '[data-tut="task-card"]',
    placement: 'below',
    title: 'Your current task',
    body: "This tells you what to build. It's always a small, specific step — not a vague chapter. Right now: normalize the Departments table.",
    instruction: 'Read the task, then click Next →',
  },
  {
    target: '[data-tut="concept-callout"]',
    placement: 'left',
    title: 'Learn it when you need it',
    body: "See this box? It only appears because YOUR PROJECT needs this concept right now. Click 'Learn it →' to open a 2-minute explanation.",
    instruction: "Click 'Learn it →' inside the box",
    requiresClick: '[data-tut="concept-learn-btn"]',
    transientMsg: 'Opening the concept...',
    autoAdvanceMs: 3000,
    onInteract: () => {},
  },
  {
    target: '[data-tut="drawer-panel"]',
    placement: 'inside',
    title: 'This is how you learn concepts',
    body: 'Every concept has: what it is (plain English), a small example, and exactly how it applies to YOUR project. No textbook. No fluff.',
    instruction: 'Close this drawer using the × button when you\u2019re ready',
    requiresClick: '[data-tut="drawer-close"]',
    nextLabel: "I'm ready to build!",
  },
];

const CONFETTI_COLORS = ['#7c3aed', '#8b5cf6', '#f59e0b', '#10b981', '#3b82f6', '#fbbf24'];

const holePolygon = (r: DOMRect): string => {
  const p = 10;
  const x = Math.max(0, r.left - p);
  const y = Math.max(0, r.top - p);
  const w = r.width + p * 2;
  const h = r.height + p * 2;
  return `polygon(evenodd,
    0% 0%, 100% 0%, 100% 100%, 0% 100%,
    ${x}px ${y}px, ${x + w}px ${y}px, ${x + w}px ${y + h}px, ${x}px ${y + h}px, ${x}px ${y}px)`;
};

const Confetti: React.FC = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 90 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 1.6 + Math.random() * 1.4,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        width: 6 + Math.random() * 5,
        height: 9 + Math.random() * 7,
        tx: (Math.random() - 0.5) * 160,
        spin: Math.random() * 720 - 360,
        radius: Math.random() > 0.5 ? '9999px' : '2px',
      })),
    []
  );

  return (
    <div className="fixed inset-0 z-[1200] pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute top-[-20px] bf-confetti"
          style={{
            left: `${p.left}%`,
            width: p.width,
            height: p.height,
            background: p.color,
            borderRadius: p.radius,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            ['--bf-tx' as string]: `${p.tx}px`,
            ['--bf-spin' as string]: `${p.spin}deg`,
          }}
        />
      ))}
    </div>
  );
};

interface TutorialOverlayProps {
  userSession: UserSession;
  setUserSession: Dispatch<SetStateAction<UserSession>>;
  onComplete: () => void;
}

export const TutorialOverlay: React.FC<TutorialOverlayProps> = ({ userSession, setUserSession, onComplete }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [stepIndex, setStepIndex] = useState(0);
  const [interactionDone, setInteractionDone] = useState(false);
  const [transient, setTransient] = useState<string | null>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [celebration, setCelebration] = useState(false);
  const [missingTarget, setMissingTarget] = useState(false);
  const rafRef = useRef<number | null>(null);
  const navDoneRef = useRef(false);

  const step = STEPS[stepIndex];
  const isLast = stepIndex === STEPS.length - 1;

  const computeRect = useCallback((selector: string) => {
    const el = document.querySelector(selector) as HTMLElement | null;
    if (!el) return null;
    return el.getBoundingClientRect();
  }, []);

  const refreshRect = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      setRect(computeRect(step.target));
    });
  }, [computeRect, step]);

  // Step lifecycle: locate target, scroll into view, set interaction state
  useEffect(() => {
    setInteractionDone(false);
    setTransient(null);
    setMissingTarget(false);
    navDoneRef.current = false;

    let attempts = 0;
    let cancelled = false;

    const locate = () => {
      const el = document.querySelector(step.target) as HTMLElement | null;
      if (el) {
        el.scrollIntoView({ block: 'center', behavior: 'smooth' });
        setTimeout(() => {
          if (!cancelled) setRect(el.getBoundingClientRect());
        }, 350);
        return;
      }
      if (attempts < 10) {
        attempts += 1;
        setTimeout(locate, 150);
      } else {
        setMissingTarget(true);
      }
    };

    const t = setTimeout(locate, 120);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [stepIndex, step.target]);

  // Auto-advance (e.g. step 6 -> 7 after drawer opens)
  useEffect(() => {
    if (!step.autoAdvanceMs || !interactionDone) return;
    const t = setTimeout(() => setStepIndex((i) => i + 1), step.autoAdvanceMs);
    return () => clearTimeout(t);
  }, [step.autoAdvanceMs, interactionDone]);

  // Recompute spotlight on scroll/resize
  useEffect(() => {
    const handler = () => refreshRect();
    window.addEventListener('scroll', handler, { capture: true, passive: true });
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('scroll', handler, { capture: true });
      window.removeEventListener('resize', handler);
    };
  }, [refreshRect]);

  // Lock body scroll while tutorial is active
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Global click watcher for interaction-required steps
  useEffect(() => {
    if (!step.requiresClick) return;

    const onClick = (e: MouseEvent) => {
      if (interactionDone) return;
      const target = e.target as HTMLElement | null;
      if (!target || !target.closest(step.requiresClick as string)) return;

      if (step.transientMsg) setTransient(step.transientMsg);
      step.onInteract?.();

      if (stepIndex === 2) {
        // Step 3: visit My Projects, then come back to dashboard
        if (!navDoneRef.current) {
          navDoneRef.current = true;
          navigate('/app/projects');
          setTimeout(() => navigate('/app/dashboard'), 2000);
          setTimeout(() => setInteractionDone(true), 2400);
        }
      } else if (stepIndex === 3) {
        // Step 4: go to workspace, tutorial continues there
        if (!navDoneRef.current) {
          navDoneRef.current = true;
          setInteractionDone(true);
          setTimeout(() => navigate('/app/workspace'), 350);
        }
      } else if (stepIndex === 5) {
        if (!navDoneRef.current) {
          navDoneRef.current = true;
          setInteractionDone(true);
        }
      } else {
        setInteractionDone(true);
      }
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [step, interactionDone, stepIndex, navigate]);

  // After navigating to workspace, step 5+ targets need re-anchoring
  useEffect(() => {
    if (location.pathname.startsWith('/app/workspace')) {
      refreshRect();
    }
  }, [location.pathname, stepIndex, refreshRect]);

  const handleNext = () => {
    if (isLast) {
      completeTutorial();
    } else {
      setStepIndex((i) => i + 1);
    }
  };

  const markSessionComplete = () => {
    setUserSession((prev) => ({
      ...prev,
      isFirstLogin: false,
      tutorialCompleted: true,
      tutorialCompletedAt: new Date().toISOString(),
    }));
  };

  const completeTutorial = () => {
    markSessionComplete();
    setCelebration(true);
    setTimeout(() => onComplete(), 2600);
  };

  // Skip = permanent completion (no celebration), then dismiss immediately
  const skipTutorial = () => {
    markSessionComplete();
    onComplete();
  };

  const tooltipStyle = (): React.CSSProperties => {
    if (!rect) return { display: 'none' };
    const W = 300;
    const M = 14;
    switch (step.placement) {
      case 'below':
        return {
          left: Math.min(Math.max(rect.left + rect.width / 2 - W / 2, M), window.innerWidth - W - M),
          top: rect.bottom + 16,
        };
      case 'above':
        return {
          left: Math.min(Math.max(rect.left + rect.width / 2 - W / 2, M), window.innerWidth - W - M),
          top: Math.max(rect.top - 220, M),
        };
      case 'right':
        return {
          left: Math.min(rect.right + 18, window.innerWidth - W - M),
          top: Math.min(Math.max(rect.top + rect.height / 2 - 120, M), window.innerHeight - 280),
        };
      case 'left':
        return {
          left: Math.max(rect.left - W - 18, M),
          top: Math.min(Math.max(rect.top + rect.height / 2 - 120, M), window.innerHeight - 280),
        };
      case 'inside':
        return {
          left: rect.left + 28,
          top: Math.min(rect.top + rect.height - 340, window.innerHeight - 360),
        };
    }
  };

  // Arrow is positioned relative to the tooltip card (which is offset from the target)
  const arrowStyle = (): React.CSSProperties => {
    if (!rect) return {};
    const ts = tooltipStyle();
    if (!ts.left || !ts.top) return {};
    const targetCenterX = rect.left + rect.width / 2;
    switch (step.placement) {
      case 'below':
        return { left: targetCenterX - (ts.left as number) - 8, top: -9 };
      case 'above':
        return { left: targetCenterX - (ts.left as number) - 8, bottom: -9 };
      case 'right':
        return { left: -9, top: rect.top + rect.height / 2 - (ts.top as number) - 8 };
      case 'left':
        return { right: -9, top: rect.top + rect.height / 2 - (ts.top as number) - 8 };
      case 'inside':
        return { display: 'none' };
    }
  };

  if (celebration) {
    return (
      <div
        className="fixed inset-0 z-[1100] flex flex-col items-center justify-center animate-bf-fade-in"
        style={{
          background: 'rgba(8,6,26,0.88)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <Confetti />
        <div style={{ position: 'relative', width: 88, height: 88 }}>
          <div
            style={{
              position: 'absolute',
              inset: -10,
              borderRadius: '50%',
              border: '1px solid rgba(245,158,11,0.3)',
              animation: 'bf-pulse-ring 2.5s ease-out infinite',
            }}
          />
          <div
            className="animate-bf-bounce flex items-center justify-center"
            style={{
              width: 88,
              height: 88,
              borderRadius: '50%',
              background: 'rgba(245,158,11,0.12)',
              border: '1px solid rgba(245,158,11,0.25)',
              boxShadow: '0 0 48px rgba(245,158,11,0.22)',
            }}
          >
            <Trophy size={44} color="#fbbf24" strokeWidth={1.25} />
          </div>
        </div>
        <h2
          className="mt-6 text-2xl font-extrabold"
          style={{ color: 'rgba(255,255,255,0.95)', letterSpacing: '-0.5px' }}
        >
          You're ready to build!
        </h2>
        <p className="mt-2 text-sm font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Your first real task is waiting.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Blocking dark backdrop with spotlight hole */}
      <div
        className="fixed inset-0 z-[1000]"
        style={{
          background: 'rgba(8,6,26,0.80)',
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
          clipPath: rect ? holePolygon(rect) : undefined,
          transition: 'clip-path 0.25s ease',
        }}
      />

      {/* Fallback when the step's target cannot be found — never trap the user */}
      {missingTarget && (
        <div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[1001] rounded-2xl px-5 py-3.5 flex items-center gap-4"
          style={{
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.14)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.14)',
          }}
        >
          <p className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>
            We couldn't find that element on this screen.
          </p>
          <button
            onClick={skipTutorial}
            className="px-4 py-2 rounded-xl text-xs font-extrabold text-white cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 60%, #4f46e5 100%)' }}
          >
            Skip tour →
          </button>
        </div>
      )}

      {/* Tooltip card — glassmorphic */}
      {!missingTarget && (
        <div
          className="fixed z-[1001] animate-bf-pop"
          style={{
            ...tooltipStyle(),
            width: 300,
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border: '1px solid rgba(255,255,255,0.14)',
            borderRadius: 20,
            padding: '20px 22px',
            boxShadow: '0 16px 48px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.14)',
            overflow: 'hidden',
          }}
        >
          {/* Inner top shimmer line */}
          <span
            style={{
              position: 'absolute',
              top: 0,
              left: '20%',
              right: '20%',
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
              pointerEvents: 'none',
            }}
          />
          <span
            className="absolute w-4 h-4 rotate-45 rounded-[3px]"
            style={{
              ...arrowStyle(),
              background: 'rgba(255,255,255,0.09)',
              border: '1px solid rgba(255,255,255,0.14)',
            }}
          />
          <div className="relative">
            <div className="flex items-center justify-between">
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: 'rgba(255,255,255,0.35)',
                }}
              >
                STEP {stepIndex + 1} OF {STEPS.length}
              </span>
              {transient && (
                <span className="flex items-center gap-1" style={{ fontSize: 11, fontWeight: 700, color: '#4ade80' }}>
                  <Sparkles size={11} />
                  {transient}
                </span>
              )}
            </div>

            <h3
              className="mt-2.5"
              style={{
                fontSize: 15,
                fontWeight: 800,
                color: 'rgba(255,255,255,0.95)',
                letterSpacing: '-0.3px',
              }}
            >
              {step.title}
            </h3>
            <p className="mt-1.5" style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
              {step.body}
            </p>
            <p className="mt-2.5" style={{ fontSize: 12, fontWeight: 700, color: '#fbbf24' }}>
              {step.instruction}
            </p>

            <div className="mt-4 flex items-center justify-between gap-2">
              <button
                onClick={skipTutorial}
                className="cursor-pointer"
                style={{
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.28)',
                  textDecoration: 'underline',
                  background: 'none',
                  border: 'none',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.28)')}
              >
                Skip tour
              </button>
              <button
                onClick={handleNext}
                disabled={!!step.requiresClick && !interactionDone}
                className="cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed"
                style={{
                  padding: '10px 20px',
                  borderRadius: 12,
                  border: 'none',
                  fontSize: 12,
                  fontWeight: 700,
                  color: 'white',
                  background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 60%, #4f46e5 100%)',
                  boxShadow: '0 4px 20px rgba(124,58,237,0.45)',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 26px rgba(124,58,237,0.55)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,58,237,0.45)';
                }}
              >
                {isLast ? (step.nextLabel ?? 'Finish') : 'Next →'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
