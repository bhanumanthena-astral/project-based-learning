import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Trophy,
  CheckCircle2,
  ArrowRight,
  Database,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { courseData } from '../data/courseData';

export const RecapPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const milestoneIdParam = parseInt(searchParams.get('milestone') || '2', 10);

  const milestone = courseData.milestones.find((m) => m.id === milestoneIdParam) || courseData.milestones[1];
  const nextMilestone = courseData.milestones.find((m) => m.id === milestone.id + 1);

  const milestoneConcepts = courseData.concepts.filter((c) =>
    milestone.unlockedConcepts.includes(c.id) ||
    milestone.steps.some((s) => s.conceptIds.includes(c.id))
  );

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Celebration Card */}
      <div
        className="text-center p-8 md:p-10 rounded-3xl border relative overflow-hidden transition-theme shadow-sm space-y-4"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border)',
        }}
      >
        <div className="w-16 h-16 rounded-2xl bg-amber-500 text-white flex items-center justify-center mx-auto shadow-lg animate-bounce">
          <Trophy size={32} />
        </div>

        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border"
          style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)', borderColor: 'var(--border)' }}
        >
          <CheckCircle2 size={14} className="text-emerald-500" />
          Milestone Complete
        </span>

        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
          Milestone {milestone.id} Complete! 🎉
        </h1>

        <p className="text-xs md:text-sm max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>
          {milestone.summary}
        </p>
      </div>

      {/* Added to your project */}
      <div
        className="p-6 rounded-3xl border space-y-4 transition-theme shadow-sm"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
      >
        <div className="flex items-center gap-2 border-b pb-3" style={{ borderColor: 'var(--border)' }}>
          <Database size={18} style={{ color: 'var(--accent)' }} />
          <h2 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>
            Unlocked Schema & Tables
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {milestone.steps.map((step) => {
            const tbl = courseData.initialTables.find((t) => t.id === step.targetTable);
            return (
              <div
                key={step.id}
                className="p-4 rounded-2xl border space-y-2"
                style={{ backgroundColor: 'var(--bg-card-alt)', borderColor: 'var(--border)' }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs" style={{ color: 'var(--text-primary)' }}>
                    {tbl ? tbl.name : step.targetTable}
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Just Built
                  </span>
                </div>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {step.taskTitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Concepts learned */}
      <div
        className="p-6 rounded-3xl border space-y-4 transition-theme shadow-sm"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
      >
        <div className="flex items-center gap-2 border-b pb-3" style={{ borderColor: 'var(--border)' }}>
          <BookOpen size={18} className="text-amber-500" />
          <h2 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>
            Concepts Embedded in Your Database
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {milestoneConcepts.map((concept) => (
            <div
              key={concept.id}
              className="p-4 rounded-2xl border space-y-1.5"
              style={{ backgroundColor: 'var(--bg-card-alt)', borderColor: 'var(--border)' }}
            >
              <h3 className="font-bold text-xs" style={{ color: 'var(--text-primary)' }}>
                {concept.name}
              </h3>
              <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {concept.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Next Milestone Teaser */}
      {nextMilestone && (
        <div
          className="p-6 rounded-3xl border space-y-2"
          style={{ backgroundColor: 'var(--accent-light)', borderColor: 'var(--border)' }}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
            Up Next: Milestone {nextMilestone.id}
          </span>
          <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
            {nextMilestone.title}
          </h3>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            {nextMilestone.summary}
          </p>
        </div>
      )}

      {/* Navigation CTA */}
      <div className="text-center">
        <button
          onClick={() => navigate('/app/workspace')}
          className="w-full sm:w-auto px-10 py-4 rounded-xl font-bold text-white shadow-md transition-all hover:opacity-90 active:scale-95 flex items-center justify-center gap-2 mx-auto text-sm"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          <span>Continue Building →</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
