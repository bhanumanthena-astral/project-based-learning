import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Lock } from 'lucide-react';
import { getCurrentTask } from '../../lib/currentTask';

const MINI_TABLE_ORDER = ['patients', 'doctors', 'appointments', 'departments', 'prescriptions', 'billing'];

interface WhatToDoNowCardProps {
  activeCourseId?: string;
}

export const WhatToDoNowCard: React.FC<WhatToDoNowCardProps> = ({ activeCourseId }) => {
  const navigate = useNavigate();
  const task = getCurrentTask(activeCourseId);

  const builtTables = ['patients', 'doctors', 'appointments'];
  const activeTable = task.activeTable || 'departments';

  return (
    <div
      data-tut="hero-card"
      className="rounded-[20px] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
      style={{
        background: 'linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(99,102,241,0.05) 100%)',
        border: '1.5px solid rgba(124,58,237,0.18)',
        padding: '24px 28px',
        marginBottom: '20px',
      }}
    >
      {/* Left: task copy */}
      <div className="flex-1 min-w-0">
        <p className="text-[10px] uppercase font-bold tracking-widest text-violet-600">
          Pick up where you left off
        </p>

        <h2
          className="mt-2 text-[20px] font-extrabold"
          style={{ color: '#1e1b4b', letterSpacing: '-0.4px' }}
        >
          {task.title}
        </h2>

        <p className="mt-1 text-[13px] text-gray-500 font-medium" style={{ lineHeight: 1.6 }}>
          Step {task.milestoneNumber} of {task.totalMilestones} · ~{task.minutes} min
          {task.conceptNeeded ? ` · Before this step, learn: ${task.conceptNeeded}` : ''}
        </p>

        <div className="mt-3 flex items-center gap-3">
          <div className="w-48 h-2 rounded-full bg-black/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${task.projectPercent}%`, background: 'linear-gradient(90deg, #f59e0b, #fbbf24)' }}
            />
          </div>
          <span className="text-[11px] text-gray-500 font-semibold">
            {task.projectPercent}% of your project built
          </span>
        </div>

        <button
          data-tut="hero-cta"
          onClick={() => navigate('/app/workspace')}
          className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-extrabold text-white shadow-sm transition-all hover:opacity-95 hover:-translate-y-0.5 cursor-pointer"
          style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)' }}
        >
          <span>Continue building</span>
          <ArrowRight size={15} />
        </button>
      </div>

      {/* Right: mini project state */}
      <div className="shrink-0 w-full lg:w-[130px]">
        <p className="text-[10px] font-semibold text-gray-400 mb-2">Your project</p>
        <div className="grid grid-cols-3 gap-1.5">
          {MINI_TABLE_ORDER.map((name) => {
            const built = builtTables.includes(name);
            const active = name === activeTable;
            return (
              <div
                key={name}
                className={`rounded-md py-1.5 px-1 flex items-center justify-center gap-1 border ${
                  built
                    ? 'bg-emerald-500/10 border-emerald-500/25'
                    : active
                    ? 'bg-violet-500/10 border-violet-500/40'
                    : 'bg-gray-50 border-dashed border-gray-200'
                }`}
              >
                {built ? (
                  <CheckCircle size={9} className="text-emerald-600" strokeWidth={2.5} />
                ) : active ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-pulse" />
                ) : (
                  <Lock size={8} className="text-gray-300" />
                )}
                <span
                  className={`font-mono text-[8px] font-bold truncate ${
                    built ? 'text-emerald-800' : active ? 'text-violet-800' : 'text-gray-400'
                  }`}
                >
                  {name.slice(0, 6)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
