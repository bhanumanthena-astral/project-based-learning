import React from 'react';
import { Clock, CheckCircle2, Lock, Play, ChevronRight, Zap, FileCode, Database, GitBranch, Server } from 'lucide-react';
import { LearningCapsule } from '../../types/learning';

const topicIcons: Record<string, React.ReactNode> = {
  sql: <Database size={16} />,
  react: <FileCode size={16} />,
  javascript: <Zap size={16} />,
  git: <GitBranch size={16} />,
  api: <Server size={16} />,
};

const topicColors: Record<string, string> = {
  sql: '#7C3AED',
  react: '#0EA5E9',
  javascript: '#F59E0B',
  git: '#10B981',
  api: '#EC4899',
};

interface CapsuleCardProps {
  capsule: LearningCapsule;
  completed: boolean;
  locked: boolean;
  onClick: () => void;
}

export const CapsuleCard: React.FC<CapsuleCardProps> = ({ capsule, completed, locked, onClick }) => {
  const color = topicColors[capsule.topic] || '#7C3AED';

  return (
    <button
      onClick={onClick}
      className="group relative w-full text-left rounded-2xl p-4 transition-all duration-300 overflow-hidden cursor-pointer border"
      style={{
        background: completed
          ? 'linear-gradient(135deg, rgba(16,185,129,0.06), rgba(16,185,129,0.02))'
          : 'var(--bg-card)',
        borderColor: completed ? 'rgba(16,185,129,0.2)' : 'var(--border-light)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
        e.currentTarget.style.borderColor = color + '40';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = '';
        e.currentTarget.style.borderColor = completed ? 'rgba(16,185,129,0.2)' : 'var(--border-light)';
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{ background: color + '18', color }}
        >
          {topicIcons[capsule.topic]}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="text-sm font-bold text-[var(--text-primary)] truncate">
              {capsule.title}
            </h3>
            {completed && (
              <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
            )}
            {locked && (
              <Lock size={12} className="text-gray-300 shrink-0" />
            )}
          </div>

          <div className="flex items-center gap-2.5 mt-1">
            <span className="flex items-center gap-1 text-[11px] font-medium text-[var(--text-muted)]">
              <Clock size={11} />
              {capsule.duration} min
            </span>
            <span
              className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
              style={{
                background: capsule.difficulty === 'beginner' ? 'rgba(16,185,129,0.1)' :
                  capsule.difficulty === 'intermediate' ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)',
                color: capsule.difficulty === 'beginner' ? '#059669' :
                  capsule.difficulty === 'intermediate' ? '#D97706' : '#DC2626',
              }}
            >
              {capsule.difficulty}
            </span>
          </div>
        </div>

        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
          style={{
            background: completed ? 'rgba(16,185,129,0.12)' : locked ? 'rgba(0,0,0,0.03)' : color + '12',
            color: completed ? '#10B981' : locked ? '#D1D5DB' : color,
          }}
        >
          {completed ? (
            <CheckCircle2 size={14} />
          ) : locked ? (
            <Lock size={12} />
          ) : (
            <Play size={12} className="ml-0.5" />
          )}
        </div>
      </div>

      <div className="mt-2.5 flex items-center justify-between">
        <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'var(--border-light)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: completed ? '100%' : '0%',
              background: completed ? 'linear-gradient(90deg, #10B981, #34D399)' : 'transparent',
            }}
          />
        </div>
        {!completed && !locked && (
          <span className="flex items-center gap-0.5 text-[10px] font-bold ml-2" style={{ color: color + 'cc' }}>
            Start <ChevronRight size={10} />
          </span>
        )}
      </div>
    </button>
  );
};
