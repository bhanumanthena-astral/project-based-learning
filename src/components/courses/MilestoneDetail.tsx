import React from 'react';
import { X, CheckCircle, BookOpen, Star, Clock, ArrowRight, Target, List, FileText, Award } from 'lucide-react';
import { MilestoneDetail } from '../../types/courses';

interface MilestoneDetailProps {
  milestone: MilestoneDetail;
  onClose: () => void;
  onOpenConcept?: (id: string) => void;
}

export const MilestoneDetailPanel: React.FC<MilestoneDetailProps> = ({ milestone, onClose, onOpenConcept }) => (
  <div className="fixed inset-0 z-50 bg-indigo-950/20 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
    <div className="absolute inset-0" onClick={onClose} />
    <div className="relative z-10 w-full max-w-md h-full flex flex-col overflow-hidden border-l border-white/80 shadow-2xl"
      style={{ background: 'rgba(255,255,255,0.38)', backdropFilter: 'blur(40px) saturate(200%)' }}>
      <div className="px-6 py-5 border-b border-white/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
            milestone.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-violet-100 text-violet-600'
          }`}>
            <Target size={20} />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-violet-600">Milestone {milestone.id}</span>
            <h2 className="text-lg font-extrabold text-[#1e1b4b]">{milestone.title}</h2>
          </div>
        </div>
        <button onClick={onClose} className="p-2 rounded-2xl text-gray-500 hover:text-gray-900 hover:bg-white/50 transition">
          <X size={20} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
        <div className="flex gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1"><Clock size={14} /> {milestone.estimatedHours} hours</span>
          <span className="flex items-center gap-1"><Star size={14} /> {milestone.xpReward} XP</span>
          <span className="flex items-center gap-1"><BookOpen size={14} /> {milestone.concepts.length} concepts</span>
        </div>
        <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
          <div className={`h-full rounded-full ${milestone.status === 'completed' ? 'bg-green-400' : 'bg-violet-400'}`}
            style={{ width: `${milestone.completionPercent}%` }} />
        </div>
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-violet-600 flex items-center gap-1 mb-2">
            <Target size={12} /> Learning Objectives
          </span>
          <ul className="space-y-1.5">
            {milestone.learningObjectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1 shrink-0" />
                {obj}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-violet-600 flex items-center gap-1 mb-2">
            <List size={12} /> Deliverables Checklist
          </span>
          <ul className="space-y-1.5">
            {milestone.deliverables.map((d, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-gray-700">
                <div className="w-4 h-4 rounded border border-gray-300 flex items-center justify-center">
                  {milestone.status === 'completed' && <CheckCircle size={12} className="text-green-500" />}
                </div>
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-violet-600 flex items-center gap-1 mb-2">
            <BookOpen size={12} /> Required Concepts
          </span>
          <div className="flex flex-wrap gap-1.5">
            {milestone.concepts.map((c, i) => (
              <span key={i} onClick={() => onOpenConcept?.(c.toLowerCase().replace(/\s+/g, '-'))}
                className="text-[11px] bg-violet-50 text-violet-700 font-medium px-2.5 py-1 rounded-full border border-violet-200 cursor-pointer hover:bg-violet-100 transition">
                {c}
              </span>
            ))}
          </div>
        </div>
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-violet-600 flex items-center gap-1 mb-2">
            <FileText size={12} /> Resources
          </span>
          <ul className="space-y-1">
            {milestone.resources.map((r, i) => (
              <li key={i} className="text-xs text-violet-600 font-medium flex items-center gap-1.5 cursor-pointer hover:text-violet-800">
                <FileText size={12} /> {r}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-2">
          <Award size={16} className="text-amber-600 shrink-0" />
          <div>
            <p className="text-xs font-bold text-amber-800">Completion Reward</p>
            <p className="text-[11px] text-amber-700">{milestone.xpReward} XP · Unlocks next milestone</p>
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-white/60 bg-white/20 backdrop-blur-md">
        <button onClick={onClose}
          className="w-full text-white font-extrabold rounded-2xl py-3 px-6 transition flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)' }}>
          {milestone.status === 'completed' ? 'View completed work →' : 'Continue milestone →'} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  </div>
);
