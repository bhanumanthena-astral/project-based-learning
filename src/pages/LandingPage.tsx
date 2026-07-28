import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Database,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Check,
  X,
  Code2,
  Terminal,
  Brain,
  ShieldCheck,
} from 'lucide-react';
import { courseData, initialTables } from '../data/courseData';
import { getStudentProgress } from '../services/progressService';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const progress = getStudentProgress();
  const [openMilestone, setOpenMilestone] = useState<number>(1);
  const [selectedTableModal, setSelectedTableModal] = useState<string | null>(null);

  const selectedTable = initialTables.find((t) => t.id === selectedTableModal);

  return (
    <div className="min-h-screen transition-theme bg-[var(--bg-page)] text-[var(--text-primary)] pb-20">
      {/* Landing Top Header Navigation */}
      <header className="h-16 glass-nav px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-sm" style={{ backgroundColor: 'var(--accent)' }}>
            <Sparkles size={18} />
          </div>
          <span className="font-bold text-base tracking-tight flex items-center gap-1.5 text-[#1e1b4b]">
            BuildFirst
            <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold uppercase bg-violet-600/10 text-violet-700 border border-violet-600/20">
              CS
            </span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/app/playground')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold glass-card border border-white/80 transition-all text-[#1e1b4b]"
          >
            <Terminal size={14} style={{ color: 'var(--accent)' }} />
            <span>Playground</span>
          </button>
          <button
            onClick={() => navigate('/app/dashboard')}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white shadow-md transition-all hover:opacity-90"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            Launch Application →
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border shadow-xs" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)', borderColor: 'var(--border)' }}>
          <Sparkles size={14} />
          <span>Project-Based CS Curriculum · DBMS & React Workspaces</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15]" style={{ color: 'var(--text-primary)' }}>
          By the end of this course, you'll build a{' '}
          <span className="underline decoration-indigo-400 decoration-4 underline-offset-4" style={{ color: 'var(--accent)' }}>
            Hospital Management System
          </span>{' '}
          from scratch
        </h1>

        <p className="text-sm md:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          No static lectures. No artificial mock setups. You learn computer science concepts strictly <strong className="font-semibold" style={{ color: 'var(--text-primary)' }}>on-demand</strong> as your project needs them.
        </p>

        {/* CTA Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate('/app/workspace')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm md:text-base font-bold text-white shadow-lg transition-all hover:opacity-90 active:scale-95 flex items-center justify-center gap-2"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            <span>Start Building Workspace</span>
            <ArrowRight size={18} />
          </button>

          <button
            onClick={() => navigate('/app/dashboard')}
            className="w-full sm:w-auto px-6 py-4 rounded-xl text-sm font-semibold border transition-all"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          >
            Explore Dashboard
          </button>
        </div>

        {/* Features Row */}
        <div className="pt-10 border-t flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs md:text-sm font-medium" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-500" />
            <span>On-Demand Concept Drawers</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-500" />
            <span>Interactive SQL & React Sandboxes</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-500" />
            <span>Production Database Schemas</span>
          </div>
        </div>
      </section>

      {/* PROJECT PREVIEW SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div
          className="rounded-3xl p-6 sm:p-10 border shadow-sm transition-theme space-y-6"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)', borderColor: 'var(--border)' }}>
              Project Artifacts
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-3" style={{ color: 'var(--text-primary)' }}>
              Hospital Management System — 6 Database Tables
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {initialTables.map((tbl) => (
              <div
                key={tbl.id}
                onClick={() => setSelectedTableModal(tbl.id)}
                className="p-5 rounded-2xl border transition-all cursor-pointer hover:scale-102 space-y-3"
                style={{ backgroundColor: 'var(--bg-card-alt)', borderColor: 'var(--border)' }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database size={16} style={{ color: 'var(--accent)' }} />
                    <h3 className="font-mono font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                      {tbl.name}
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Milestone {tbl.unlockedAtMilestone}
                  </span>
                </div>

                <p className="text-xs line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                  {tbl.description}
                </p>

                <div className="flex flex-wrap gap-1 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
                  {tbl.columns.slice(0, 3).map((col) => (
                    <span key={col.name} className="text-[10px] font-mono px-1.5 py-0.5 rounded border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
                      {col.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Table Detail Modal */}
      {selectedTable && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="rounded-2xl max-w-lg w-full p-6 border shadow-2xl space-y-4 transition-theme" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-2">
                <Database size={18} style={{ color: 'var(--accent)' }} />
                <h3 className="font-mono font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                  {selectedTable.name}
                </h3>
              </div>
              <button onClick={() => setSelectedTableModal(null)} className="p-1 rounded-lg" style={{ color: 'var(--text-secondary)' }}>
                <X size={18} />
              </button>
            </div>

            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {selectedTable.description}
            </p>

            <div className="space-y-1.5 font-mono text-xs max-h-48 overflow-y-auto">
              {selectedTable.columns.map((col) => (
                <div key={col.name} className="p-2 rounded-lg border flex justify-between" style={{ backgroundColor: 'var(--bg-card-alt)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
                  <span>{col.name}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{col.type}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setSelectedTableModal(null);
                navigate('/app/workspace');
              }}
              className="w-full py-3 rounded-xl text-xs font-bold text-white shadow-sm"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              Open in Workspace →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
