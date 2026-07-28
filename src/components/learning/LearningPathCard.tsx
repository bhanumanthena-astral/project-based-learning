import React from 'react';
import { ArrowRight, Database, Code2, FileCode, GitBranch, Server, Zap } from 'lucide-react';
import { LearningPath } from '../../types/learning';

const iconMap: Record<string, React.ReactNode> = {
  Database: <Database size={20} />,
  Code2: <Code2 size={20} />,
  FileCode: <FileCode size={20} />,
  GitBranch: <GitBranch size={20} />,
  Server: <Server size={20} />,
};

interface LearningPathCardProps {
  path: LearningPath & { completedCount: number };
  onClick: () => void;
}

export const LearningPathCard: React.FC<LearningPathCardProps> = ({ path, onClick }) => {
  const pct = path.capsuleCount > 0 ? Math.round((path.completedCount / path.capsuleCount) * 100) : 0;

  return (
    <button
      onClick={onClick}
      className="relative overflow-hidden rounded-2xl p-5 text-left transition-all duration-300 cursor-pointer border w-[220px] shrink-0"
      style={{
        background: 'var(--bg-card)',
        borderColor: 'var(--border-light)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)';
        e.currentTarget.style.borderColor = path.color + '30';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = '';
        e.currentTarget.style.borderColor = 'var(--border-light)';
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: path.color + '15', color: path.color }}
        >
          {iconMap[path.icon] || <Zap size={20} />}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-[var(--text-primary)] truncate">{path.title}</h3>
          <p className="text-[11px] text-[var(--text-muted)] font-medium">{path.capsuleCount} capsules</p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-[var(--text-secondary)] font-medium line-clamp-2 leading-relaxed">{path.description}</p>

        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border-light)' }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: pct + '%', background: `linear-gradient(90deg, ${path.color}, ${path.color}88)` }}
            />
          </div>
          <span className="text-[10px] font-bold shrink-0" style={{ color: path.color }}>{pct}%</span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-[var(--text-muted)] font-medium">
            {path.completedCount}/{path.capsuleCount} done
          </span>
          <span className="flex items-center gap-1 text-[11px] font-bold transition-all duration-300 group-hover/btn:gap-2" style={{ color: path.color }}>
            {pct === 100 ? 'Review' : 'Continue'} <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </button>
  );
};
