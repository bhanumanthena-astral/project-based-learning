import React from 'react';
import { CheckCircle, Circle, ArrowRight, BrainCircuit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PrerequisiteCapsulesProps {
  requiredConcepts: string[];
  completedConcepts: string[];
  courseId?: string;
}

export const PrerequisiteCapsules: React.FC<PrerequisiteCapsulesProps> = ({ requiredConcepts, completedConcepts, courseId }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-2">
      <p className="text-[11px] font-bold text-gray-500 flex items-center gap-1.5">
        <BrainCircuit size={14} /> Recommended Before Continuing
      </p>
      {requiredConcepts.map(concept => {
        const completed = completedConcepts.includes(concept);
        return (
          <div key={concept} className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-white border border-gray-100 hover:border-violet-200 transition group">
            <div className="flex items-center gap-2">
              {completed ? <CheckCircle size={14} className="text-green-500" /> : <Circle size={14} className="text-gray-300" />}
              <span className={`text-xs ${completed ? 'text-gray-500 line-through' : 'text-gray-700 font-medium'}`}>{concept}</span>
            </div>
            {!completed && (
              <button onClick={() => navigate('/app/learning')}
                className="text-[10px] text-violet-600 font-bold flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition">
                Start Capsule <ArrowRight size={10} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};
