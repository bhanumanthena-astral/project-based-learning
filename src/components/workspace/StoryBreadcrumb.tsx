import React from 'react';
import { Clock } from 'lucide-react';
import { getCurrentTask } from '../../lib/currentTask';

export const StoryBreadcrumb: React.FC<{ activeCourseId?: string }> = ({ activeCourseId }) => {
  const task = getCurrentTask(activeCourseId);

  return (
    <div
      className="flex items-center justify-between gap-4 px-6 py-[10px] text-[13px] text-gray-500"
      style={{
        background: 'rgba(124,58,237,0.05)',
        borderBottom: '1px solid rgba(124,58,237,0.10)',
      }}
    >
      <div className="flex items-center gap-2 min-w-0 flex-wrap">
        <span className="font-semibold text-violet-600 truncate">Hospital Management System</span>
        <span className="text-gray-300">›</span>
        <span className="font-medium truncate">
          Step {task.milestoneNumber}: {task.milestoneTitle}
        </span>
        <span className="text-gray-300">›</span>
        <span className="text-gray-400 font-medium">Step {task.stepNumber} of {task.totalSteps}</span>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold text-amber-700 bg-amber-100 border border-amber-200">
          {task.projectPercent}% of project built
        </span>
        <span className="hidden sm:flex items-center gap-1.5 text-[12px] text-gray-400 font-medium">
          <Clock size={13} />
          ~{task.minutes} min left in this step
        </span>
      </div>
    </div>
  );
};
