import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X, BookOpen, Zap, ArrowRight, Check, Code2, Database } from 'lucide-react';
import { courseData } from '../data/courseData';
import { concepts as mockConcepts } from '../data/mockData';

interface ConceptDrawerProps {
  conceptId?: string | null;
  onClose?: () => void;
}

export const ConceptDrawer: React.FC<ConceptDrawerProps> = ({ conceptId: propConceptId, onClose }) => {
  const navigate = useNavigate();
  const { conceptId: routeConceptId } = useParams<{ conceptId: string }>();

  const activeId = propConceptId || routeConceptId || 'primary-key';

  const conceptItem =
    courseData.concepts.find((c) => c.id === activeId) ||
    mockConcepts.find((c) => c.id === activeId) ||
    courseData.concepts[0];

  const conceptAny: any = conceptItem || courseData.concepts[0];

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate('/app/workspace');
    }
  };

  if (!conceptItem) return null;

  return (
    <div data-tut="drawer" className="fixed inset-0 z-50 bg-indigo-950/20 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      {/* Backdrop click listener */}
      <div className="absolute inset-0" onClick={handleClose} />

      {/* Slide-Over Drawer Container */}
      <div
        data-tut="drawer-panel"
        className="relative z-10 w-full max-w-md h-full flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300 border-l border-white/80 shadow-2xl"
        style={{
          background: 'rgba(255, 255, 255, 0.38)',
          backdropFilter: 'blur(40px) saturate(200%)',
          WebkitBackdropFilter: 'blur(40px) saturate(200%)',
          boxShadow: '-10px 0 40px rgba(31, 38, 135, 0.12), inset 1px 0 1px rgba(255,255,255,0.7)',
        }}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-violet-600/15 text-violet-800 border border-violet-500/20 flex items-center justify-center font-extrabold shadow-2xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="inline-block rounded-full px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-violet-600/15 text-violet-900 border border-white/80 mb-1">
                {conceptAny.category || 'CS Concept'}
              </span>
              <h2 className="text-xl font-extrabold text-[#1e1b4b] leading-tight">
                {conceptAny.name}
              </h2>
            </div>
          </div>

          <button
            data-tut="drawer-close"
            onClick={handleClose}
            className="p-2 rounded-2xl text-gray-500 hover:text-gray-900 hover:bg-white/50 transition-all border border-transparent hover:border-white/60"
            aria-label="Close concept drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Section 1: The Idea */}
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-violet-600 block">
              SECTION 1 · THE IDEA
            </span>
            <p className="text-sm leading-relaxed text-[#111827] glass-card p-5 font-medium">
              {conceptAny.explanation || conceptAny.description || ''}
            </p>
          </div>

          {/* Section 2: Quick Example */}
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-violet-600 block">
              SECTION 2 · QUICK EXAMPLE
            </span>
            <div className="glass-dark text-emerald-400 rounded-xl p-4 font-mono text-xs overflow-x-auto leading-relaxed">
              <pre>{conceptAny.miniExample || conceptAny.example || ''}</pre>
            </div>
          </div>

          {/* Section 3: Project Application */}
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-violet-600 block">
              SECTION 3 · USE IT IN YOUR PROJECT
            </span>
            <div className="rounded-xl p-4 glass-card bg-violet-50 border border-violet-200 space-y-2">
              <h4 className="font-extrabold text-xs text-[#111827] flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Project Application</span>
              </h4>
              <p className="text-xs leading-relaxed text-gray-800 font-medium">
                {conceptAny.projectApplication || conceptAny.projectUse || conceptAny.explanation || ''}
              </p>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-5 border-t border-white/60 bg-white/20 backdrop-blur-md">
          <button
            onClick={handleClose}
            className="w-full text-white font-extrabold rounded-2xl py-3.5 px-6 shadow-md transition-all duration-150 flex items-center justify-center gap-2 group cursor-pointer hover:opacity-95 border border-violet-400/50"
            style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)' }}
          >
            <span>Got it, back to building →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
