import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Hammer,
  Lock,
  CheckCircle,
  Sparkles,
  Trophy,
  ArrowRight,
  Clock,
  Zap,
  Database,
} from 'lucide-react';
import { UserSession } from '../data/mockData';

const TABLES = ['patients', 'doctors', 'appointments', 'departments', 'prescriptions', 'billing'];

/* ================= BACKGROUND LAYERS ================= */

const OrbBackground: React.FC = () => (
  <>
    <div
      style={{
        position: 'fixed',
        width: 600,
        height: 600,
        top: -180,
        left: -150,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(124,58,237,0.35) 0%, rgba(99,102,241,0.12) 50%, transparent 70%)',
        filter: 'blur(80px)',
        animation: 'bf-orb-float 8s ease-in-out infinite',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
    <div
      style={{
        position: 'fixed',
        width: 500,
        height: 500,
        bottom: -120,
        right: -100,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(79,70,229,0.30) 0%, rgba(139,92,246,0.10) 50%, transparent 70%)',
        filter: 'blur(70px)',
        animation: 'bf-orb-float-reverse 10s ease-in-out infinite',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
    <div
      style={{
        position: 'fixed',
        width: 300,
        height: 300,
        top: '35%',
        right: '8%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(236,72,153,0.18) 0%, transparent 65%)',
        filter: 'blur(60px)',
        animation: 'bf-orb-float 12s ease-in-out infinite 2s',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
    <div
      style={{
        position: 'fixed',
        width: 220,
        height: 220,
        top: '5%',
        right: '18%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 65%)',
        filter: 'blur(50px)',
        animation: 'bf-orb-float-reverse 7s ease-in-out infinite 1s',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  </>
);

const GridBackground: React.FC = () => (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 0,
      backgroundImage:
        'linear-gradient(rgba(124,58,237,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px)',
      backgroundSize: '48px 48px',
      animation: 'bf-grid-scroll 20s linear infinite',
      WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
      maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
    }}
  />
);

const FloatingObjects: React.FC = () => (
  <>
    {/* Object 1 — rotating outer ring */}
    <svg
      style={{
        position: 'fixed',
        top: '8%',
        left: '4%',
        width: 120,
        height: 120,
        pointerEvents: 'none',
        zIndex: 1,
        animation: 'bf-rotate-slow 25s linear infinite',
        opacity: 0.18,
      }}
      viewBox="0 0 120 120"
    >
      <circle cx="60" cy="60" r="55" fill="none" stroke="rgba(139,92,246,1)" strokeWidth="1" strokeDasharray="8 6" />
      <circle cx="60" cy="60" r="40" fill="none" stroke="rgba(99,102,241,0.6)" strokeWidth="0.5" strokeDasharray="4 8" />
    </svg>

    {/* Object 2 — counter-rotating hexagon */}
    <svg
      style={{
        position: 'fixed',
        bottom: '12%',
        left: '6%',
        width: 90,
        height: 90,
        pointerEvents: 'none',
        zIndex: 1,
        animation: 'bf-counter-rotate 20s linear infinite',
        opacity: 0.15,
      }}
      viewBox="0 0 90 90"
    >
      <polygon points="45,5 82,25 82,65 45,85 8,65 8,25" fill="none" stroke="rgba(236,72,153,1)" strokeWidth="1" />
      <polygon points="45,18 70,32 70,58 45,72 20,58 20,32" fill="none" stroke="rgba(236,72,153,0.4)" strokeWidth="0.5" />
    </svg>

    {/* Object 3 — floating diamond */}
    <svg
      style={{
        position: 'fixed',
        top: '15%',
        right: '5%',
        width: 70,
        height: 70,
        pointerEvents: 'none',
        zIndex: 1,
        animation: 'bf-orb-float 9s ease-in-out infinite 1.5s',
        opacity: 0.2,
      }}
      viewBox="0 0 70 70"
    >
      <rect x="15" y="15" width="40" height="40" fill="none" stroke="rgba(6,182,212,1)" strokeWidth="1" transform="rotate(45 35 35)" />
      <rect x="23" y="23" width="24" height="24" fill="none" stroke="rgba(6,182,212,0.5)" strokeWidth="0.5" transform="rotate(45 35 35)" />
    </svg>

    {/* Object 4 — grid dot cluster */}
    <svg
      style={{
        position: 'fixed',
        top: '40%',
        right: '3%',
        width: 80,
        height: 80,
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.12,
        animation: 'bf-shimmer 5s ease-in-out infinite',
      }}
      viewBox="0 0 80 80"
    >
      <circle cx="10" cy="10" r="2.5" fill="rgba(139,92,246,1)" />
      <circle cx="30" cy="10" r="2.5" fill="rgba(139,92,246,1)" />
      <circle cx="50" cy="10" r="2.5" fill="rgba(139,92,246,1)" />
      <circle cx="70" cy="10" r="2.5" fill="rgba(139,92,246,1)" />
      <circle cx="10" cy="30" r="2.5" fill="rgba(139,92,246,0.7)" />
      <circle cx="30" cy="30" r="2.5" fill="rgba(139,92,246,0.7)" />
      <circle cx="50" cy="30" r="2.5" fill="rgba(139,92,246,0.7)" />
      <circle cx="70" cy="30" r="2.5" fill="rgba(139,92,246,0.7)" />
      <circle cx="10" cy="50" r="2.5" fill="rgba(139,92,246,0.4)" />
      <circle cx="30" cy="50" r="2.5" fill="rgba(139,92,246,0.4)" />
      <circle cx="50" cy="50" r="2.5" fill="rgba(139,92,246,0.4)" />
      <circle cx="70" cy="50" r="2.5" fill="rgba(139,92,246,0.4)" />
      <circle cx="10" cy="70" r="2.5" fill="rgba(139,92,246,0.15)" />
      <circle cx="30" cy="70" r="2.5" fill="rgba(139,92,246,0.15)" />
      <circle cx="50" cy="70" r="2.5" fill="rgba(139,92,246,0.15)" />
      <circle cx="70" cy="70" r="2.5" fill="rgba(139,92,246,0.15)" />
    </svg>

    {/* Object 5 — orbit rings around center top */}
    <svg
      style={{
        position: 'fixed',
        top: -60,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 400,
        height: 200,
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.08,
      }}
      viewBox="0 0 400 200"
    >
      <ellipse cx="200" cy="0" rx="190" ry="80" fill="none" stroke="rgba(139,92,246,1)" strokeWidth="0.8" />
      <ellipse cx="200" cy="0" rx="150" ry="60" fill="none" stroke="rgba(99,102,241,1)" strokeWidth="0.5" strokeDasharray="6 4" />
      <ellipse cx="200" cy="0" rx="110" ry="45" fill="none" stroke="rgba(124,58,237,1)" strokeWidth="0.4" />
    </svg>
  </>
);

/* ================= SHARED UI PRIMITIVES ================= */

const StepDots: React.FC<{ current: number; total: number }> = ({ current, total }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
      paddingTop: 32,
      position: 'relative',
      zIndex: 10,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {Array.from({ length: total }).map((_, i) => {
        const idx = i + 1;
        const done = idx < current;
        const active = idx === current;
        return (
          <div
            key={i}
            style={{
              width: active ? 32 : 8,
              height: 8,
              borderRadius: 99,
              background:
                done || active ? 'linear-gradient(90deg, #7c3aed, #6366f1)' : 'rgba(255,255,255,0.12)',
              border: active || done ? 'none' : '1px solid rgba(255,255,255,0.15)',
              transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
              boxShadow: active ? '0 0 12px rgba(124,58,237,0.6)' : 'none',
            }}
          />
        );
      })}
    </div>
    <span
      style={{
        fontSize: 12,
        fontWeight: 600,
        color: 'rgba(255,255,255,0.35)',
        letterSpacing: '0.08em',
      }}
    >
      STEP {current} OF {total}
    </span>
  </div>
);

const GlassCard: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
  <div
    style={{
      background: 'rgba(255,255,255,0.06)',
      backdropFilter: 'blur(32px)',
      WebkitBackdropFilter: 'blur(32px)',
      border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: 24,
      boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)',
      padding: '40px 44px',
      position: 'relative',
      overflow: 'hidden',
      ...style,
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: '20%',
        right: '20%',
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
        pointerEvents: 'none',
      }}
    />
    {children}
  </div>
);

const InnerGlass: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
  <div
    style={{
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.10)',
      borderRadius: 16,
      padding: '16px 20px',
      ...style,
    }}
  >
    {children}
  </div>
);

const PrimaryCta: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
  fullWidth?: boolean;
  style?: React.CSSProperties;
}> = ({ onClick, children, fullWidth, style }) => (
  <button
    onClick={onClick}
    style={{
      width: fullWidth ? '100%' : 'auto',
      marginTop: 32,
      padding: '14px 32px',
      borderRadius: 14,
      border: 'none',
      background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 60%, #4f46e5 100%)',
      color: 'white',
      fontSize: 15,
      fontWeight: 700,
      letterSpacing: '-0.2px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      boxShadow: '0 4px 24px rgba(124,58,237,0.5), 0 1px 0 rgba(255,255,255,0.15) inset',
      transition: 'transform 0.15s, box-shadow 0.15s',
      ...style,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow =
        '0 8px 32px rgba(124,58,237,0.6), 0 1px 0 rgba(255,255,255,0.15) inset';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow =
        '0 4px 24px rgba(124,58,237,0.5), 0 1px 0 rgba(255,255,255,0.15) inset';
    }}
    onMouseDown={(e) => {
      e.currentTarget.style.transform = 'scale(0.98)';
    }}
    onMouseUp={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
  >
    {children}
  </button>
);

/* ================= PAGE ================= */

interface OnboardingPageProps {
  userSession: UserSession;
  setUserSession: Dispatch<SetStateAction<UserSession>>;
}

export const OnboardingPage: React.FC<OnboardingPageProps> = ({ userSession, setUserSession }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [animKey, setAnimKey] = useState(0);
  const [patientsUnlocked, setPatientsUnlocked] = useState(false);
  const [skipConfirm, setSkipConfirm] = useState(false);

  const finish = () => {
    // Only mark onboarding as seen — isFirstLogin stays true until the tutorial completes
    setUserSession((prev) => ({ ...prev, onboardingSeen: true }));
    navigate('/app/dashboard', { replace: true });
  };

  const goTo = (next: number) => {
    setAnimKey((k) => k + 1);
    setStep(next);
  };

  // Step 2: unlock animation for patients table
  useEffect(() => {
    if (step === 2) {
      const t = setTimeout(() => setPatientsUnlocked(true), 1000);
      return () => clearTimeout(t);
    }
  }, [step]);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: '#08061A',
      }}
    >
      <OrbBackground />
      <GridBackground />
      <FloatingObjects />

      {/* Scrollable content */}
      <div style={{ position: 'relative', zIndex: 10, paddingBottom: 80 }}>
        <StepDots current={step} total={4} />

        <div style={{ maxWidth: 680, margin: '24px auto 0', padding: '0 20px' }}>
          <div key={animKey} style={{ animation: 'bf-fade-up 0.45s ease-out forwards', opacity: 0 }}>
            {/* ============ STEP 1 — WHAT IS BUILD FIRST ============ */}
            {step === 1 && (
              <GlassCard style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
                {/* Logo mark */}
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 20,
                    background:
                      'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(99,102,241,0.15))',
                    border: '1px solid rgba(124,58,237,0.4)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    boxShadow:
                      '0 0 0 8px rgba(124,58,237,0.08), 0 0 0 16px rgba(124,58,237,0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 28px',
                  }}
                >
                  <Hammer size={32} color="#a78bfa" strokeWidth={1.75} />
                </div>

                <h1
                  style={{
                    fontSize: 26,
                    textAlign: 'center',
                    color: 'rgba(255,255,255,0.95)',
                    letterSpacing: '-0.6px',
                    fontWeight: 800,
                    margin: 0,
                    lineHeight: 1.3,
                  }}
                >
                  You don't learn to code by reading about it
                </h1>

                <p
                  style={{
                    color: 'rgba(255,255,255,0.50)',
                    textAlign: 'center',
                    maxWidth: 400,
                    margin: '12px auto 0',
                    lineHeight: 1.7,
                    fontSize: 15,
                  }}
                >
                  BuildFirst works differently. Instead of watching lectures or reading theory,
                  you build a real project from day one. Concepts appear only when your project
                  actually needs them.
                </p>

                {/* Comparison cards */}
                <div className="bf-compare-grid" style={{ marginTop: 28, textAlign: 'left' }}>
                  {/* Traditional */}
                  <InnerGlass
                    style={{
                      border: '1px solid rgba(239,68,68,0.25)',
                      background: 'rgba(239,68,68,0.06)',
                    }}
                  >
                    <p
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: 'rgba(239,68,68,0.8)',
                        margin: '0 0 10px',
                      }}
                    >
                      ❌ Traditional learning
                    </p>
                    <ul
                      style={{
                        margin: 0,
                        padding: 0,
                        listStyle: 'none',
                        color: 'rgba(255,255,255,0.45)',
                        fontSize: 13,
                        lineHeight: 1.9,
                      }}
                    >
                      <li>Week 1: Read about databases</li>
                      <li>Week 2: Watch normalization videos</li>
                      <li>Week 3: Do practice problems</li>
                      <li>Week 8: Finally build something</li>
                    </ul>
                    <p
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: 'rgba(239,68,68,0.6)',
                        margin: '12px 0 0',
                        paddingTop: 12,
                        borderTop: '1px solid rgba(239,68,68,0.15)',
                      }}
                    >
                      Forget 80% before you use it
                    </p>
                  </InnerGlass>

                  {/* BuildFirst */}
                  <div
                    style={{
                      position: 'relative',
                      border: '1px solid rgba(124,58,237,0.35)',
                      background: 'rgba(124,58,237,0.08)',
                      boxShadow: '0 0 24px rgba(124,58,237,0.10)',
                      borderRadius: 16,
                      padding: '16px 20px',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        top: -10,
                        left: 14,
                        background: 'rgba(124,58,237,0.3)',
                        border: '1px solid rgba(124,58,237,0.4)',
                        color: '#c4b5fd',
                        borderRadius: 99,
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        padding: '3px 10px',
                      }}
                    >
                      RECOMMENDED
                    </span>
                    <p
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: '#a78bfa',
                        margin: '0 0 10px',
                      }}
                    >
                      ✅ BuildFirst way
                    </p>
                    <ul
                      style={{
                        margin: 0,
                        padding: 0,
                        listStyle: 'none',
                        color: 'rgba(255,255,255,0.80)',
                        fontSize: 13,
                        lineHeight: 1.9,
                      }}
                    >
                      <li>Day 1: See the project you'll build</li>
                      <li>Day 2: Build your first table</li>
                      <li>Day 3: Learn only what you need</li>
                      <li>Day 8: 3 tables already working</li>
                    </ul>
                    <p
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: '#a78bfa',
                        margin: '12px 0 0',
                        paddingTop: 12,
                        borderTop: '1px solid rgba(124,58,237,0.25)',
                      }}
                    >
                      Build it first. Understand it as you go.
                    </p>
                  </div>
                </div>

                <PrimaryCta onClick={() => goTo(2)}>
                  <span>Got it — show me what I'll build</span>
                  <ArrowRight size={16} />
                </PrimaryCta>
              </GlassCard>
            )}

            {/* ============ STEP 2 — PROJECT REVEAL ============ */}
            {step === 2 && (
              <GlassCard style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
                <span
                  style={{
                    background: 'rgba(245,158,11,0.15)',
                    border: '1px solid rgba(245,158,11,0.30)',
                    color: '#fbbf24',
                    borderRadius: 99,
                    padding: '5px 16px',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    display: 'inline-block',
                    boxShadow: '0 0 16px rgba(245,158,11,0.15)',
                  }}
                >
                  YOUR FIRST PROJECT
                </span>

                <h1
                  style={{
                    fontSize: 26,
                    color: 'rgba(255,255,255,0.95)',
                    textAlign: 'center',
                    margin: '16px 0 0',
                    fontWeight: 800,
                    letterSpacing: '-0.5px',
                    lineHeight: 1.3,
                  }}
                >
                  You're going to build a Hospital Management System
                </h1>

                <p
                  style={{
                    color: 'rgba(255,255,255,0.50)',
                    maxWidth: 520,
                    margin: '12px auto 0',
                    lineHeight: 1.7,
                    fontSize: 15,
                  }}
                >
                  A real relational database — the kind hospitals actually use. By the time
                  you're done, you'll have designed 6 tables, written JOIN queries, and applied
                  database normalization. Most CS graduates struggle with this. You'll have
                  actually built one.
                </p>

                {/* Table grid */}
                <div className="bf-table-grid" style={{ marginTop: 28 }}>
                  {TABLES.map((name) => {
                    const unlocked = patientsUnlocked && name === 'patients';
                    return (
                      <div
                        key={name}
                        style={{
                          padding: '14px 16px',
                          borderRadius: 14,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontFamily: 'monospace',
                          fontSize: 13,
                          fontWeight: 700,
                          transition: 'all 0.6s cubic-bezier(0.34,1.56,0.64,1)',
                          ...(unlocked
                            ? {
                                background: 'rgba(34,197,94,0.12)',
                                border: '1px solid rgba(34,197,94,0.35)',
                                color: '#4ade80',
                                boxShadow: '0 0 20px rgba(34,197,94,0.15)',
                              }
                            : {
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px dashed rgba(255,255,255,0.12)',
                                color: 'rgba(255,255,255,0.25)',
                              }),
                        }}
                      >
                        <span>{name}</span>
                        {unlocked ? (
                          <CheckCircle
                            size={15}
                            color="#4ade80"
                            style={{ animation: 'bf-scale-in 0.4s ease-out forwards' }}
                          />
                        ) : (
                          <Lock size={13} color="rgba(255,255,255,0.15)" />
                        )}
                      </div>
                    );
                  })}
                </div>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', margin: '14px 0 0' }}>
                  These all get unlocked as you build. One milestone at a time.
                </p>

                <p
                  style={{
                    color: '#a78bfa',
                    fontSize: 13,
                    fontWeight: 600,
                    margin: '8px 0 0',
                  }}
                >
                  That's what it feels like to complete a step →
                </p>

                <PrimaryCta onClick={() => goTo(3)}>
                  <span>I want to build this</span>
                  <ArrowRight size={16} />
                </PrimaryCta>
              </GlassCard>
            )}

            {/* ============ STEP 3 — HOW IT WORKS ============ */}
            {step === 3 && (
              <GlassCard style={{ maxWidth: 600, margin: '0 auto' }}>
                <h1
                  style={{
                    textAlign: 'center',
                    color: 'rgba(255,255,255,0.94)',
                    fontSize: 24,
                    fontWeight: 800,
                    margin: 0,
                    letterSpacing: '-0.4px',
                  }}
                >
                  Here's how every lesson works
                </h1>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 28 }}>
                  {/* Card 1 — violet */}
                  <div
                    style={{
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderLeft: '3px solid #7c3aed',
                      borderRadius: '0 14px 14px 0',
                      padding: '18px 20px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 16,
                      background: 'rgba(255,255,255,0.05)',
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                        color: 'white',
                        fontSize: 14,
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 0 12px rgba(124,58,237,0.4)',
                      }}
                    >
                      1
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <h3 style={{ color: 'rgba(255,255,255,0.90)', fontSize: 15, fontWeight: 700, margin: 0 }}>
                        See what you need to build
                      </h3>
                      <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, lineHeight: 1.7, margin: '6px 0 0' }}>
                        Each session starts with a specific task — like "Add the Appointments
                        table." You always know what you're working toward.
                      </p>
                      <div
                        style={{
                          background: 'rgba(124,58,237,0.15)',
                          border: '1px solid rgba(124,58,237,0.30)',
                          borderRadius: 10,
                          padding: '10px 14px',
                          marginTop: 12,
                        }}
                      >
                        <span
                          style={{
                            display: 'block',
                            fontSize: 9,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            fontWeight: 800,
                            color: '#a78bfa',
                          }}
                        >
                          Your Task
                        </span>
                        <span
                          style={{
                            display: 'block',
                            fontSize: 12,
                            fontWeight: 700,
                            color: 'white',
                            marginTop: 4,
                          }}
                        >
                          Normalize the Departments table
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card 2 — amber */}
                  <div
                    style={{
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderLeft: '3px solid #f59e0b',
                      borderRadius: '0 14px 14px 0',
                      padding: '18px 20px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 16,
                      background: 'rgba(255,255,255,0.05)',
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                        color: 'white',
                        fontSize: 14,
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 0 12px rgba(245,158,11,0.4)',
                      }}
                    >
                      2
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <h3 style={{ color: 'rgba(255,255,255,0.90)', fontSize: 15, fontWeight: 700, margin: 0 }}>
                        Learn only what's needed
                      </h3>
                      <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, lineHeight: 1.7, margin: '6px 0 0' }}>
                        When a task needs a concept you don't know — like Foreign Keys — it
                        surfaces right then. Read it, see an example, apply it immediately.
                        No 2-hour lectures.
                      </p>
                      <div
                        style={{
                          background: 'rgba(245,158,11,0.10)',
                          border: '1px solid rgba(245,158,11,0.25)',
                          borderRadius: 10,
                          padding: '10px 14px',
                          marginTop: 12,
                        }}
                      >
                        <span
                          style={{
                            display: 'block',
                            fontSize: 9,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            fontWeight: 800,
                            color: '#fbbf24',
                          }}
                        >
                          ⚡ Concept needed
                        </span>
                        <span
                          style={{
                            display: 'block',
                            fontSize: 12,
                            fontWeight: 700,
                            color: 'white',
                            marginTop: 4,
                          }}
                        >
                          3NF Normalization — Learn it →
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card 3 — green */}
                  <div
                    style={{
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderLeft: '3px solid #22c55e',
                      borderRadius: '0 14px 14px 0',
                      padding: '18px 20px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 16,
                      background: 'rgba(255,255,255,0.05)',
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                        color: 'white',
                        fontSize: 14,
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 0 12px rgba(34,197,94,0.4)',
                      }}
                    >
                      3
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <h3 style={{ color: 'rgba(255,255,255,0.90)', fontSize: 15, fontWeight: 700, margin: 0 }}>
                        Watch your project grow
                      </h3>
                      <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, lineHeight: 1.7, margin: '6px 0 0' }}>
                        Every step adds something real to your project. At the end, you don't
                        have notes or certificates — you have a working database you built yourself.
                      </p>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          fontFamily: 'monospace',
                          fontSize: 11,
                          marginTop: 12,
                          flexWrap: 'wrap',
                        }}
                      >
                        <span
                          style={{
                            background: 'rgba(34,197,94,0.15)',
                            border: '1px solid rgba(34,197,94,0.3)',
                            color: '#4ade80',
                            borderRadius: 8,
                            padding: '6px 10px',
                            fontWeight: 700,
                          }}
                        >
                          ✓ patients
                        </span>
                        <span
                          style={{
                            background: 'rgba(124,58,237,0.2)',
                            border: '1px solid rgba(124,58,237,0.4)',
                            color: '#c4b5fd',
                            borderRadius: 8,
                            padding: '6px 10px',
                            fontWeight: 700,
                            animation: 'bf-pulse 1.6s ease-in-out infinite',
                          }}
                        >
                          doctors
                        </span>
                        <span
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px dashed rgba(255,255,255,0.1)',
                            color: 'rgba(255,255,255,0.25)',
                            borderRadius: 8,
                            padding: '6px 10px',
                          }}
                        >
                          🔒 appointments
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <PrimaryCta onClick={() => goTo(4)}>
                  <span>Makes sense — let's start</span>
                  <ArrowRight size={16} />
                </PrimaryCta>
              </GlassCard>
            )}

            {/* ============ STEP 4 — YOU'RE READY ============ */}
            {step === 4 && (
              <GlassCard
                style={{
                  maxWidth: 480,
                  margin: '0 auto',
                  textAlign: 'center',
                }}
              >
                {/* Trophy + pulse ring */}
                <div style={{ position: 'relative', width: 80, height: 80, margin: '0 auto 24px' }}>
                  <div
                    style={{
                      position: 'absolute',
                      inset: -8,
                      borderRadius: '50%',
                      border: '1px solid rgba(245,158,11,0.3)',
                      animation: 'bf-pulse-ring 2.5s ease-out infinite',
                    }}
                  />
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: 'rgba(245,158,11,0.12)',
                      border: '1px solid rgba(245,158,11,0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 40px rgba(245,158,11,0.20)',
                      animation: 'bf-orb-float 3s ease-in-out infinite',
                    }}
                  >
                    <Trophy size={36} color="#fbbf24" strokeWidth={1.5} />
                  </div>
                </div>

                <h1
                  style={{
                    fontSize: 26,
                    color: 'rgba(255,255,255,0.95)',
                    fontWeight: 800,
                    margin: 0,
                    letterSpacing: '-0.5px',
                  }}
                >
                  Your first task is waiting
                </h1>

                <p
                  style={{
                    color: 'rgba(255,255,255,0.48)',
                    fontSize: 15,
                    lineHeight: 1.7,
                    margin: '12px 0 0',
                  }}
                >
                  We've set up your Hospital Management System project. Your first task: design
                  the Patients table. It takes about 15 minutes and you'll learn Primary Keys
                  along the way.
                </p>

                {/* Preview card */}
                <InnerGlass
                  style={{
                    marginTop: 24,
                    textAlign: 'left',
                    border: '1px solid rgba(124,58,237,0.28)',
                    background: 'rgba(124,58,237,0.08)',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      background: 'rgba(124,58,237,0.2)',
                      border: '1px solid rgba(124,58,237,0.35)',
                      color: '#c4b5fd',
                      borderRadius: 99,
                      padding: '4px 10px',
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                    }}
                  >
                    FIRST TASK
                  </span>
                  <h3 style={{ color: 'rgba(255,255,255,0.90)', fontSize: 15, fontWeight: 700, margin: '10px 0 0' }}>
                    Create the Patients table
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: 12, lineHeight: 1.6, margin: '4px 0 0' }}>
                    You'll define what columns a patient record needs and why each one matters.
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
                    <span
                      style={{
                        background: 'rgba(245,158,11,0.12)',
                        border: '1px solid rgba(245,158,11,0.25)',
                        color: '#fbbf24',
                        borderRadius: 99,
                        padding: '5px 10px',
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    >
                      Primary Key
                    </span>
                    <span
                      style={{
                        background: 'rgba(245,158,11,0.12)',
                        border: '1px solid rgba(245,158,11,0.25)',
                        color: '#fbbf24',
                        borderRadius: 99,
                        padding: '5px 10px',
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    >
                      Data Types
                    </span>
                  </div>
                  <p
                    style={{
                      margin: '12px 0 0',
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.28)',
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <Clock size={12} color="rgba(255,255,255,0.25)" />
                    Estimated time: 15 minutes
                  </p>
                </InnerGlass>

                {/* Start button */}
                <PrimaryCta
                  onClick={finish}
                  fullWidth
                  style={{ marginTop: 28, filter: 'drop-shadow(0 4px 16px rgba(124,58,237,0.4))' }}
                >
                  <Sparkles size={16} />
                  <span>Start building</span>
                </PrimaryCta>

                {/* Skip */}
                {!skipConfirm ? (
                  <button
                    onClick={() => setSkipConfirm(true)}
                    style={{
                      marginTop: 20,
                      color: 'rgba(255,255,255,0.22)',
                      fontSize: 12,
                      textDecoration: 'underline',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'color 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.22)')}
                  >
                    Skip intro — I know what I'm doing
                  </button>
                ) : (
                  <InnerGlass
                    style={{
                      marginTop: 12,
                      textAlign: 'left',
                      animation: 'bf-fade-up 0.45s ease-out forwards',
                    }}
                  >
                    <p
                      style={{
                        color: 'rgba(255,255,255,0.70)',
                        fontSize: 12,
                        fontWeight: 600,
                        margin: 0,
                      }}
                    >
                      Are you sure? The intro takes 2 minutes.
                    </p>
                    <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                      <button
                        onClick={finish}
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          borderRadius: 10,
                          fontSize: 12,
                          fontWeight: 700,
                          color: '#c4b5fd',
                          background: 'rgba(124,58,237,0.3)',
                          border: '1px solid rgba(124,58,237,0.5)',
                          cursor: 'pointer',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = 'rgba(124,58,237,0.45)')
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = 'rgba(124,58,237,0.3)')
                        }
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setSkipConfirm(false)}
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          borderRadius: 10,
                          fontSize: 12,
                          fontWeight: 700,
                          color: 'rgba(255,255,255,0.55)',
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.12)',
                          cursor: 'pointer',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')
                        }
                      >
                        Cancel
                      </button>
                    </div>
                  </InnerGlass>
                )}
              </GlassCard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
