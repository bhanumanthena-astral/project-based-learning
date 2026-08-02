import React, { useEffect } from 'react';
import { useNavigate, useOutletContext, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  Database,
  Clock,
  Trophy,
  Zap,
  Star,
  Sparkles,
  Check,
} from 'lucide-react';
import { courses, currentUser, activityFeed, UserSession } from '../data/mockData';
import { courseData } from '../data/courseData';
import { WhatToDoNowCard } from '../components/dashboard/WhatToDoNowCard';
import { hasSeenFirstTask } from '../lib/onboardingStorage';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const context = useOutletContext<{ activeCourseId: string; onOpenConcept: (id?: string) => void; setActiveCourseId: (id: string) => void; userSession: UserSession }>();
  const activeCourseId = context?.activeCourseId || courses[0].id;
  const onOpenConcept = context?.onOpenConcept;
  const setActiveCourseId = context?.setActiveCourseId;

  const activeCourse = courses.find((c) => c.id === activeCourseId) || courses[0];
  const location = useLocation();

  // First visit right after onboarding: simplified dashboard (no stats / activity yet)
  const isFirstVisit = context?.userSession?.isFirstLogin === true && !hasSeenFirstTask();

  useEffect(() => {
    if (location.hash === '#courses') {
      setTimeout(() => {
        document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  }, [location.hash]);

  // ============ FIRST-VISIT SIMPLIFIED DASHBOARD ============
  if (isFirstVisit) {
    return (
      <div className="space-y-8">
        <WhatToDoNowCard activeCourseId={activeCourseId} />

        <div className="glass-card-elevated p-8">
          <h2 className="text-xl font-extrabold text-[#111827] text-center">
            Here's how every lesson works
          </h2>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                num: '1',
                color: '#7c3aed',
                title: 'See what you need to build',
                body: 'Each session starts with a specific task. You always know what you\u2019re working toward.',
              },
              {
                num: '2',
                color: '#f59e0b',
                title: 'Learn only what\u2019s needed',
                body: 'When a task needs a concept you don\u2019t know, it surfaces right then — no 2-hour lectures.',
              },
              {
                num: '3',
                color: '#10b981',
                title: 'Watch your project grow',
                body: 'Every step adds something real. At the end you have a working database you built yourself.',
              },
            ].map((item) => (
              <div key={item.num} className="glass-card p-6 text-center">
                <div
                  className="mx-auto w-9 h-9 rounded-full text-white text-sm font-extrabold flex items-center justify-center"
                  style={{ background: item.color }}
                >
                  {item.num}
                </div>
                <h3 className="mt-3 text-sm font-extrabold text-[#111827]">{item.title}</h3>
                <p className="mt-1.5 text-xs text-gray-500 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/app/workspace')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-extrabold text-white shadow-lg transition-all hover:opacity-95 hover:-translate-y-0.5 cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)' }}
            >
              <span>Jump into your first task</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* What to do now — the dominant answer to "what should I do right now?" */}
      <WhatToDoNowCard activeCourseId={activeCourseId} />

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Project Built */}
        <div className="glass-card-interactive p-5 space-y-2.5">
          <span className="block text-[11px] font-extrabold uppercase tracking-wider text-gray-400">
            PROJECT BUILT SO FAR
          </span>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-extrabold font-mono text-[#111827]">
              {activeCourse.progressPercent}%
            </p>
            <div className="icon-badge icon-badge-light">
              <Trophy size={18} className="text-violet-600" strokeWidth={1.5} />
            </div>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 bg-violet-600"
              style={{ width: `${activeCourse.progressPercent}%` }}
            />
          </div>
          <p className="text-[10px] text-gray-500 font-bold">
            2 of 6 steps completed
          </p>
        </div>

        {/* Stat 2: Concepts Learned */}
        <div className="glass-card-interactive p-5 space-y-2.5">
          <span className="block text-[11px] font-extrabold uppercase tracking-wider text-gray-400">
            CONCEPTS MASTERED
          </span>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-extrabold font-mono text-[#111827]">
              4
            </p>
            <div className="icon-badge icon-badge-light">
              <Zap size={18} className="text-violet-600" strokeWidth={1.5} />
            </div>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 bg-gray-400"
              style={{ width: '60%' }}
            />
          </div>
          <p className="text-[10px] text-gray-500 font-bold">
            Primary Keys, Foreign Keys, 1NF
          </p>
        </div>

        {/* Stat 3: Total XP */}
        <div className="glass-card-interactive p-5 space-y-2.5">
          <span className="block text-[11px] font-extrabold uppercase tracking-wider text-gray-400">
            EARNED XP
          </span>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-extrabold font-mono text-[#111827]">
              2,340
            </p>
            <div className="icon-badge icon-badge-light">
              <Star size={18} className="text-violet-600" strokeWidth={1.5} />
            </div>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 bg-gray-400"
              style={{ width: '78%' }}
            />
          </div>
          <p className="text-[10px] text-gray-500 font-bold">
            Level 5 Scholar Status
          </p>
        </div>

        {/* Stat 4: Active Milestones */}
        <div className="glass-card-interactive p-5 space-y-2.5">
          <span className="block text-[11px] font-extrabold uppercase tracking-wider text-gray-400">
            STEPS DONE
          </span>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-extrabold font-mono text-[#111827]">
              2 <span className="text-base font-normal text-gray-400">/ 6</span>
            </p>
            <div className="icon-badge icon-badge-light">
              <Sparkles size={18} className="text-violet-600" strokeWidth={1.5} />
            </div>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 bg-gray-400"
              style={{ width: '33%' }}
            />
          </div>
          <p className="text-[10px] text-gray-500 font-bold">
            Step 3 active build
          </p>
        </div>
      </div>

      {/* Active Course & Database Tables Section */}
      <div className="glass-card-elevated p-6 md:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left 55%: Course Info */}
          <div className="lg:w-[55%] space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-violet-50 text-violet-700 border border-violet-200">
                ACTIVE
              </span>
              <span className="text-xs font-semibold text-gray-500">{activeCourse.subject}</span>
            </div>

            <h2 className="text-2xl font-extrabold text-[#111827]">
              {activeCourse.title}
            </h2>

            <p className="text-xs md:text-sm text-gray-600 font-medium leading-relaxed">
              Construct a production hospital database system by completing SQL schema definition tasks, foreign key links, and normalization rules.
            </p>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono font-bold">
                <span className="text-gray-500">Step Progress</span>
                <span className="text-violet-600">{activeCourse.progressPercent}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 bg-violet-600"
                  style={{ width: `${activeCourse.progressPercent}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => {
                setActiveCourseId?.(activeCourse.id);
                navigate('/app/workspace');
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-extrabold text-white shadow-sm transition-all hover:opacity-95 bg-violet-600 hover:bg-violet-700"
            >
              <span>Continue Building →</span>
            </button>
          </div>

          {/* Right 45%: Project Tables Mini-Grid */}
          <div className="lg:w-[45%] space-y-3 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-gray-200 lg:pl-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                <Database size={15} className="text-violet-600" />
                <span>Project Database Tables</span>
              </h3>
              <span className="text-[10px] font-mono font-extrabold text-gray-600 px-2 py-0.5 rounded-full bg-gray-100 border border-gray-200">
                3/6 Built
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {activeCourse.tables.map((tbl) => {
                const isBuilt = tbl.status === 'built';
                const isActive = tbl.status === 'active';

                return (
                  <div
                    key={tbl.name}
                    className={`p-3.5 rounded-xl font-mono text-xs transition-all flex flex-col justify-between space-y-1.5 border ${
                      isBuilt
                        ? 'bg-emerald-50 text-emerald-900 font-bold border-emerald-200'
                        : isActive
                        ? 'bg-violet-50 text-violet-900 font-extrabold border-violet-200'
                        : 'bg-gray-50 text-gray-500 border-dashed border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="truncate">{tbl.name}</span>
                      {isBuilt ? (
                        <div className="icon-badge-sm icon-badge-light">
                          <Check size={14} className="text-emerald-600" strokeWidth={1.5} />
                        </div>
                      ) : isActive ? (
                        <span className="w-2.5 h-2.5 rounded-full bg-violet-600 shrink-0 animate-ping" />
                      ) : (
                        <div className="icon-badge-sm" style={{ background: 'rgba(0, 0, 0, 0.04)' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                          </svg>
                        </div>
                      )}
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-wider opacity-80">
                      {tbl.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ========== PREMIUM ENROLLED COURSES & ACTIVITY ========== */}
      <div className="pm-dark-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
          {/* Left: Title + Subtitle */}
          <div className="flex items-start gap-3">
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: 'var(--pm-purple-soft)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: 2
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="grad-cap" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#B47CFF" />
                    <stop offset="100%" stopColor="#7C4DFF" />
                  </linearGradient>
                </defs>
                <path d="M22 10l-10-5L2 10l10 5 10-5z" fill="url(#grad-cap)" opacity="0.9" />
                <path d="M6 12v5c0 1 2 3 6 3s6-2 6-3v-5" stroke="url(#grad-cap)" strokeWidth="1.5" fill="none" />
                <line x1="22" y1="10" x2="22" y2="16" stroke="#B47CFF" strokeWidth="1.5" />
              </svg>
            </div>
            <div>
              <h2 id="courses" className="pm-section-title" style={{ marginBottom: 4 }}>
                Enrolled Project Courses
              </h2>
              <p style={{
                fontSize: '13px',
                color: 'var(--pm-text-muted)',
                fontWeight: 500
              }}>
                Continue building. Keep shipping.
              </p>
            </div>
          </div>

          {/* Right: View All Courses */}
          <button className="pm-view-all-btn" onClick={() => {
            setActiveCourseId?.(courses[0].id);
            navigate('/app/workspace');
          }}>
            View All Courses
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Main Grid: Courses + Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Enrolled Courses */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {courses.map((course) => {
                const accent =
                  course.category === 'Backend' ? 'purple' :
                  course.category === 'Frontend' ? 'blue' : 'orange';
                const pillClass =
                  course.category === 'Backend' ? 'pm-pill-purple' :
                  course.category === 'Frontend' ? 'pm-pill-blue' : 'pm-pill-orange';
                const progressClass =
                  course.category === 'Backend' ? 'pm-progress-purple' :
                  course.category === 'Frontend' ? 'pm-progress-blue' : 'pm-progress-orange';
                const ringColor =
                  course.category === 'Backend' ? '#7C4DFF' :
                  course.category === 'Frontend' ? '#3B82F6' : '#F59E0B';
                const ringColorEnd =
                  course.category === 'Backend' ? '#B47CFF' :
                  course.category === 'Frontend' ? '#60A5FA' : '#FBBF24';

                const circumference = 2 * Math.PI * 24;
                const dashOffset = circumference - (course.progressPercent / 100) * circumference;
                const hoursCompleted = Math.round((course.progressPercent / 100) * course.estimatedHours);

                return (
                  <div
                    key={course.id}
                    onClick={() => {
                      setActiveCourseId?.(course.id);
                      navigate('/app/workspace');
                    }}
                    className="pm-course-card"
                    data-accent={accent}
                  >
                    {/* Ambient glow */}
                    <div className="pm-card-glow" />

                    {/* Content layer */}
                    <div className="relative z-[1] flex flex-col h-full">
                      {/* Top Row: Badge + Clock */}
                      <div className="flex items-center justify-between mb-5">
                        <span className={`pm-pill ${pillClass}`}>
                          {course.category}
                        </span>
                        <span className="pm-clock">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          {course.estimatedHours}h
                        </span>
                      </div>

                      {/* Illustration + Info */}
                      <div className="flex items-start gap-4 mb-5">
                        {/* 3D-style SVG Illustration */}
                        <div className="pm-illustration" style={{ width: 80, height: 80 }}>
                          {course.category === 'Backend' && (
                            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <defs>
                                <linearGradient id={`srv-grad-${course.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#9C7CFF" />
                                  <stop offset="100%" stopColor="#5B2EE0" />
                                </linearGradient>
                                <linearGradient id={`cyl-grad-${course.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                  <stop offset="0%" stopColor="#B47CFF" />
                                  <stop offset="100%" stopColor="#7C4DFF" />
                                </linearGradient>
                                <filter id={`srv-glow-${course.id}`}>
                                  <feGaussianBlur stdDeviation="2" result="blur" />
                                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                                </filter>
                                <radialGradient id={`srv-ambient-${course.id}`} cx="50%" cy="30%" r="60%">
                                  <stop offset="0%" stopColor="#B47CFF" stopOpacity="0.35" />
                                  <stop offset="100%" stopColor="#7C4DFF" stopOpacity="0" />
                                </radialGradient>
                              </defs>
                              <ellipse cx="40" cy="40" rx="36" ry="32" fill={`url(#srv-ambient-${course.id})`} />
                              {/* Server rack body - isometric */}
                              <path d="M20 22L40 12L60 22V58L40 68L20 58V22Z" fill={`url(#srv-grad-${course.id})`} opacity="0.85" />
                              <path d="M40 12L60 22V58L40 68V32" fill="rgba(0,0,0,0.15)" />
                              {/* Server slots */}
                              <rect x="25" y="26" width="28" height="8" rx="2" fill="rgba(255,255,255,0.1)" />
                              <rect x="25" y="38" width="28" height="8" rx="2" fill="rgba(255,255,255,0.1)" />
                              <rect x="25" y="50" width="28" height="8" rx="2" fill="rgba(255,255,255,0.1)" />
                              {/* Database cylinders */}
                              <ellipse cx="35" cy="29" rx="8" ry="2.5" fill={`url(#cyl-grad-${course.id})`} filter={`url(#srv-glow-${course.id})`} />
                              <rect x="27" y="29" width="16" height="5" fill={`url(#cyl-grad-${course.id})`} opacity="0.6" />
                              <ellipse cx="35" cy="34" rx="8" ry="2.5" fill={`url(#cyl-grad-${course.id})`} opacity="0.7" />
                              {/* LED dots */}
                              <circle cx="49" cy="30" r="1.5" fill="#10B981" filter={`url(#srv-glow-${course.id})`} />
                              <circle cx="49" cy="42" r="1.5" fill="#10B981" filter={`url(#srv-glow-${course.id})`} />
                              <circle cx="49" cy="54" r="1.5" fill="#F59E0B" filter={`url(#srv-glow-${course.id})`} />
                              {/* Edge highlight */}
                              <path d="M20 22L40 12L60 22V58L40 68L20 58V22Z" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
                            </svg>
                          )}
                          {course.category === 'Frontend' && (
                            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <defs>
                                <linearGradient id={`brw-grad-${course.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#60A5FA" />
                                  <stop offset="100%" stopColor="#2563EB" />
                                </linearGradient>
                                <filter id={`brw-glow-${course.id}`}>
                                  <feGaussianBlur stdDeviation="2" result="blur" />
                                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                                </filter>
                                <radialGradient id={`brw-ambient-${course.id}`} cx="50%" cy="30%" r="60%">
                                  <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.3" />
                                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                                </radialGradient>
                              </defs>
                              <ellipse cx="40" cy="40" rx="36" ry="32" fill={`url(#brw-ambient-${course.id})`} />
                              {/* Browser window - perspective */}
                              <path d="M12 18L40 10L68 18V58L40 66L12 58V18Z" fill={`url(#brw-grad-${course.id})`} opacity="0.85" />
                              <path d="M40 10L68 18V58L40 66V26" fill="rgba(0,0,0,0.12)" />
                              {/* Title bar */}
                              <rect x="16" y="20" width="46" height="10" rx="2" fill="rgba(255,255,255,0.1)" />
                              {/* Window dots */}
                              <circle cx="22" cy="25" r="2" fill="#FF5F57" />
                              <circle cx="29" cy="25" r="2" fill="#FFBD2E" />
                              <circle cx="36" cy="25" r="2" fill="#28CA41" />
                              {/* URL bar */}
                              <rect x="42" y="23" width="16" height="4" rx="2" fill="rgba(255,255,255,0.12)" />
                              {/* Code content */}
                              <text x="20" y="45" fontFamily="monospace" fontSize="16" fill="rgba(255,255,255,0.65)" filter={`url(#brw-glow-${course.id})`}>{'</>'}</text>
                              {/* UI panels */}
                              <rect x="18" y="50" width="16" height="7" rx="2" fill="rgba(255,255,255,0.08)" />
                              <rect x="38" y="50" width="22" height="7" rx="2" fill="rgba(96,165,250,0.25)" filter={`url(#brw-glow-${course.id})`} />
                              {/* Edge */}
                              <path d="M12 18L40 10L68 18V58L40 66L12 58V18Z" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
                            </svg>
                          )}
                          {course.category === 'Core CS' && (
                            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <defs>
                                <linearGradient id={`net-grad-${course.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#FBBF24" />
                                  <stop offset="100%" stopColor="#D97706" />
                                </linearGradient>
                                <filter id={`net-glow-${course.id}`}>
                                  <feGaussianBlur stdDeviation="3" result="blur" />
                                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                                </filter>
                                <radialGradient id={`net-ambient-${course.id}`} cx="50%" cy="50%" r="55%">
                                  <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.2" />
                                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                                </radialGradient>
                              </defs>
                              <ellipse cx="40" cy="40" rx="36" ry="32" fill={`url(#net-ambient-${course.id})`} />
                              {/* Connecting lines */}
                              <line x1="24" y1="24" x2="56" y2="24" stroke="#FBBF24" strokeWidth="1.5" opacity="0.35" filter={`url(#net-glow-${course.id})`} />
                              <line x1="24" y1="24" x2="40" y2="56" stroke="#FBBF24" strokeWidth="1.5" opacity="0.35" filter={`url(#net-glow-${course.id})`} />
                              <line x1="56" y1="24" x2="40" y2="56" stroke="#FBBF24" strokeWidth="1.5" opacity="0.35" filter={`url(#net-glow-${course.id})`} />
                              <line x1="56" y1="24" x2="64" y2="44" stroke="#FBBF24" strokeWidth="1.5" opacity="0.25" filter={`url(#net-glow-${course.id})`} />
                              <line x1="24" y1="24" x2="16" y2="44" stroke="#FBBF24" strokeWidth="1.5" opacity="0.25" filter={`url(#net-glow-${course.id})`} />
                              <line x1="40" y1="56" x2="16" y2="44" stroke="#FBBF24" strokeWidth="1" opacity="0.2" />
                              <line x1="40" y1="56" x2="64" y2="44" stroke="#FBBF24" strokeWidth="1" opacity="0.2" />
                              {/* Nodes */}
                              <circle cx="24" cy="24" r="8" fill={`url(#net-grad-${course.id})`} filter={`url(#net-glow-${course.id})`} />
                              <circle cx="56" cy="24" r="8" fill={`url(#net-grad-${course.id})`} filter={`url(#net-glow-${course.id})`} />
                              <circle cx="40" cy="56" r="9" fill={`url(#net-grad-${course.id})`} filter={`url(#net-glow-${course.id})`} />
                              <circle cx="16" cy="44" r="5.5" fill={`url(#net-grad-${course.id})`} opacity="0.65" filter={`url(#net-glow-${course.id})`} />
                              <circle cx="64" cy="44" r="5.5" fill={`url(#net-grad-${course.id})`} opacity="0.65" filter={`url(#net-glow-${course.id})`} />
                              {/* Inner highlights */}
                              <circle cx="22" cy="22" r="3" fill="rgba(255,255,255,0.3)" />
                              <circle cx="54" cy="22" r="3" fill="rgba(255,255,255,0.3)" />
                              <circle cx="38" cy="54" r="3.5" fill="rgba(255,255,255,0.25)" />
                            </svg>
                          )}
                        </div>

                        {/* Title + Subtitle */}
                        <div className="flex-1 min-w-0">
                          <h3 style={{
                            fontWeight: 800,
                            fontSize: '1.05rem',
                            lineHeight: 1.3,
                            color: 'var(--pm-text)',
                            letterSpacing: '-0.01em',
                            marginBottom: 6
                          }}>
                            {course.title}
                          </h3>
                          <p style={{
                            fontSize: '12px',
                            color: 'var(--pm-text-muted)',
                            fontWeight: 500,
                            lineHeight: 1.4
                          }}>
                            {course.subject}
                          </p>
                        </div>
                      </div>

                      {/* Bottom: Progress */}
                      <div className="mt-auto" style={{ borderTop: '1px solid var(--pm-divider)', paddingTop: 16 }}>
                        <div className="flex items-end justify-between mb-3">
                          <div>
                            <span style={{
                              fontSize: '11px',
                              fontWeight: 600,
                              color: 'var(--pm-text-muted)',
                              letterSpacing: '0.04em',
                              textTransform: 'uppercase' as const,
                              display: 'block',
                              marginBottom: 4
                            }}>
                              Completion
                            </span>
                            <p style={{
                              fontSize: '26px',
                              fontWeight: 800,
                              color: 'var(--pm-text)',
                              fontFamily: 'var(--font-display)',
                              letterSpacing: '-0.03em',
                              lineHeight: 1
                            }}>
                              {course.progressPercent}%
                            </p>
                          </div>

                          {/* Circular Progress Ring */}
                          <div className="pm-ring-container">
                            <svg className="pm-ring-svg" viewBox="0 0 56 56">
                              <defs>
                                <linearGradient id={`ring-grad-${course.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor={ringColor} />
                                  <stop offset="100%" stopColor={ringColorEnd} />
                                </linearGradient>
                              </defs>
                              <circle className="pm-ring-bg" cx="28" cy="28" r="24" />
                              <circle
                                className="pm-ring-progress"
                                cx="28"
                                cy="28"
                                r="24"
                                stroke={`url(#ring-grad-${course.id})`}
                                strokeDasharray={circumference}
                                strokeDashoffset={dashOffset}
                              />
                            </svg>
                            <span className="pm-ring-label">
                              {course.progressPercent}%
                            </span>
                          </div>
                        </div>

                        {/* Animated progress bar */}
                        <div className="pm-progress-track">
                          <div
                            className={`pm-progress-fill ${progressClass}`}
                            style={{ width: `${course.progressPercent}%` }}
                          />
                        </div>

                        <p style={{
                          fontSize: '11px',
                          color: 'var(--pm-text-muted)',
                          fontWeight: 500,
                          marginTop: 8
                        }}>
                          {hoursCompleted}h of {course.estimatedHours}h completed
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Activity Feed */}
          <div className="lg:col-span-4">
            <div className="pm-activity-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* Header */}
              <div style={{ marginBottom: 20 }}>
                <div className="flex items-center gap-2.5" style={{ marginBottom: 4 }}>
                  {/* Lightning bolt icon */}
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: 'var(--pm-purple-soft)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <defs>
                        <linearGradient id="lightning-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#B47CFF" />
                          <stop offset="100%" stopColor="#7C4DFF" />
                        </linearGradient>
                      </defs>
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="url(#lightning-grad)" />
                    </svg>
                  </div>
                  <div>
                    <h3 style={{
                      fontWeight: 800,
                      fontSize: '16px',
                      color: 'var(--pm-text)',
                      letterSpacing: '-0.01em'
                    }}>
                      Recent Activity
                    </h3>
                    <p style={{
                      fontSize: '11px',
                      color: 'var(--pm-text-muted)',
                      fontWeight: 500
                    }}>
                      Your latest achievements
                    </p>
                  </div>
                </div>
              </div>

              {/* Activity Items */}
              <div className="flex-1">
                {activityFeed.map((act, index) => {
                  const iconConfigs: Record<string, { bg: string; icon: React.ReactNode }> = {
                    milestone_complete: {
                      bg: 'var(--pm-emerald-soft)',
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <defs><linearGradient id="check-g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#34D399" /><stop offset="100%" stopColor="#10B981" /></linearGradient></defs>
                          <path d="M20 6L9 17l-5-5" stroke="url(#check-g)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ),
                    },
                    concept_learned: {
                      bg: 'var(--pm-blue-soft)',
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <defs><linearGradient id="book-g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#60A5FA" /><stop offset="100%" stopColor="#3B82F6" /></linearGradient></defs>
                          <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" fill="url(#book-g)" opacity="0.8" />
                          <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" fill="url(#book-g)" opacity="0.6" />
                        </svg>
                      ),
                    },
                    streak: {
                      bg: 'var(--pm-amber-soft)',
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <defs><linearGradient id="flame-g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FBBF24" /><stop offset="100%" stopColor="#F59E0B" /></linearGradient></defs>
                          <path d="M12 2c.5 4-2 6-2 10a4 4 0 008 0c0-4-2.5-6-2-10" fill="url(#flame-g)" opacity="0.85" />
                          <path d="M12 14c-.5 2 .5 4 2 4s2.5-2 2-4c-.5-2-2-3-2-3s-1.5 1-2 3z" fill="rgba(255,255,255,0.4)" />
                        </svg>
                      ),
                    },
                    xp: {
                      bg: 'var(--pm-purple-soft)',
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <defs><linearGradient id="star-g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#B47CFF" /><stop offset="100%" stopColor="#7C4DFF" /></linearGradient></defs>
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#star-g)" />
                        </svg>
                      ),
                    },
                  };

                  const config = iconConfigs[act.type] || iconConfigs.xp;

                  return (
                    <React.Fragment key={act.id}>
                      {index > 0 && <div className="pm-divider" />}
                      <div className="pm-activity-item">
                        <div
                          className="pm-activity-icon"
                          style={{ background: config.bg }}
                        >
                          {config.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p style={{
                            fontSize: '13px',
                            fontWeight: 600,
                            color: 'var(--pm-text)',
                            lineHeight: 1.4,
                            marginBottom: 2
                          }}>
                            {act.text}
                          </p>
                          <p style={{
                            fontSize: '11px',
                            color: 'var(--pm-text-muted)',
                            fontWeight: 500
                          }}>
                            {act.time}
                          </p>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Motivational Card */}
              <div className="pm-motivational" style={{ marginTop: 20 }}>
                {/* Trophy SVG */}
                <div style={{ flexShrink: 0 }}>
                  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                    <defs>
                      <linearGradient id="trophy-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FBBF24" />
                        <stop offset="100%" stopColor="#F59E0B" />
                      </linearGradient>
                      <filter id="trophy-glow">
                        <feGaussianBlur stdDeviation="1.5" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                      </filter>
                    </defs>
                    <circle cx="22" cy="22" r="20" fill="rgba(124, 77, 255, 0.15)" />
                    <path d="M14 10h16v4c0 5-2.5 9-8 11-5.5-2-8-6-8-11V10z" fill="url(#trophy-grad)" filter="url(#trophy-glow)" />
                    <path d="M14 14h-3c0 3.5 1.5 5.5 3 6.5" stroke="#FBBF24" strokeWidth="1.2" fill="none" opacity="0.5" />
                    <path d="M30 14h3c0 3.5-1.5 5.5-3 6.5" stroke="#FBBF24" strokeWidth="1.2" fill="none" opacity="0.5" />
                    <rect x="18" y="26" width="8" height="2.5" rx="1" fill="#FBBF24" opacity="0.6" />
                    <rect x="16" y="29" width="12" height="2.5" rx="1.2" fill="#FBBF24" opacity="0.4" />
                    <path d="M22 14l1.2 2.5 2.8.4-2 2 .5 2.8L22 20.5l-2.5 1.2.5-2.8-2-2 2.8-.4L22 14z" fill="rgba(255,255,255,0.45)" />
                  </svg>
                </div>

                <div className="flex-1 min-w-0">
                  <p style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    marginBottom: 3,
                    letterSpacing: '-0.01em'
                  }}>
                    Keep it up!
                  </p>
                  <p style={{
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.65)',
                    fontWeight: 500,
                    lineHeight: 1.5
                  }}>
                    You're making great progress on your learning journey.
                  </p>
                </div>

                <div className="pm-motivational-arrow">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* CS Concepts Quick Drawer Row */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <div>
            <h2 className="text-base font-extrabold text-[#111827] flex items-center gap-2">
              <div className="icon-badge icon-badge-light">
                <Zap size={18} className="text-violet-600" strokeWidth={1.5} />
              </div>
              <span>Embedded CS Concepts</span>
            </h2>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              Click any concept to open its drawer, explanation & code pattern.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {courseData.concepts.map((concept) => (
            <button
              key={concept.id}
              onClick={() => onOpenConcept?.(concept.id)}
              className="px-4 py-2.5 rounded-xl text-xs font-extrabold bg-white border border-gray-200 text-[#111827] hover:border-gray-300 transition-all flex items-center gap-2"
            >
              <div className="icon-badge-sm icon-badge-light">
                <Check size={14} className="text-emerald-600" strokeWidth={1.5} />
              </div>
              <span>{concept.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
