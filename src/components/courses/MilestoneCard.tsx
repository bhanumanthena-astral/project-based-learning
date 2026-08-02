import React from 'react';
import { CheckCircle, Clock, Lock, Star, ArrowRight, BookOpen } from 'lucide-react';
import { MilestoneDetail } from '../../types/courses';

interface MilestoneCardProps {
  milestone: MilestoneDetail;
  onClick: () => void;
}

export const MilestoneCard: React.FC<MilestoneCardProps> = ({ milestone, onClick }) => (
  <div onClick={onClick} className={`glass-card-interactive p-4 cursor-pointer relative ${milestone.status === 'locked' ? 'opacity-60' : ''}`}>
    <div className="flex items-start justify-between mb-2">
      <div className="flex items-center gap-2">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          milestone.status === 'completed' ? 'bg-green-100 text-green-600' :
          milestone.status === 'active' ? 'bg-violet-100 text-violet-600' :
          'bg-gray-100 text-gray-400'
        }`}>
          {milestone.status === 'completed' ? <CheckCircle size={16} /> :
           milestone.status === 'active' ? <BookOpen size={16} /> :
           <Lock size={16} />}
        </div>
        <div>
          <p className="text-sm font-bold text-[#111827]">Milestone {milestone.id}</p>
          <p className="text-xs text-gray-500">{milestone.title}</p>
        </div>
      </div>
      {milestone.status === 'active' && (
        <span className="bg-violet-100 text-violet-700 text-[10px] font-bold px-2 py-0.5 rounded-full">IN PROGRESS</span>
      )}
    </div>
    <div className="flex items-center gap-3 text-[10px] text-gray-400 mb-2">
      <span className="flex items-center gap-1"><Clock size={11} /> {milestone.estimatedHours}h</span>
      <span className="flex items-center gap-1"><Star size={11} /> {milestone.xpReward} XP</span>
      <span className="flex items-center gap-1"><BookOpen size={11} /> {milestone.concepts.length} concepts</span>
    </div>
    <div className="space-y-1.5">
      <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <div className={`h-full rounded-full ${
          milestone.status === 'completed' ? 'bg-green-400' :
          milestone.status === 'active' ? 'bg-violet-400' : 'bg-gray-200'
        }`} style={{ width: `${milestone.completionPercent}%` }} />
      </div>
      <div className="flex justify-between text-[10px]">
        <span className="font-medium text-gray-500">{milestone.completionPercent}% complete</span>
        <span className="text-violet-600 font-medium flex items-center gap-0.5">
          {milestone.status === 'locked' ? 'Locked' : milestone.status === 'completed' ? 'Completed' : 'Continue'} <ArrowRight size={10} />
        </span>
      </div>
    </div>
  </div>
);
