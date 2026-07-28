import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Brain, Database, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { concepts, courses } from '../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectConcept: (conceptId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectConcept }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger handled in parent or we toggle
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredConcepts = concepts.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase()) ||
      c.explanation.toLowerCase().includes(query.toLowerCase())
  );

  const filteredMilestones = courses.flatMap((course) =>
    course.milestones
      .filter((m) => m.title.toLowerCase().includes(query.toLowerCase()))
      .map((m) => ({ ...m, courseTitle: course.title, courseId: course.id }))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/30 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-2xl glass-modal overflow-hidden flex flex-col max-h-[80vh] transition-all">
        {/* Search Header */}
        <div className="p-4 border-b border-gray-200 flex items-center gap-3 bg-white">
          <Search size={20} className="text-violet-600" />
          <input
            type="text"
            autoFocus
            placeholder="Search concepts, SQL terms, milestones, schema design..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm font-semibold outline-none text-[#111827] placeholder-gray-400"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {/* Concepts Section */}
          {filteredConcepts.length > 0 && (
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-wider mb-2 flex items-center gap-1.5 text-gray-600">
                <Brain size={13} className="text-violet-600" /> CS Concepts ({filteredConcepts.length})
              </p>
              <div className="space-y-1.5">
                {filteredConcepts.map((concept) => (
                  <div
                    key={concept.id}
                    onClick={() => {
                      onSelectConcept(concept.id);
                      onClose();
                    }}
                    className="p-3.5 rounded-xl glass-card-interactive flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-xs text-[#111827]">
                          {concept.name}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-violet-50 text-violet-700 border border-violet-200">
                          {concept.category}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 font-medium line-clamp-1 mt-1">
                        {concept.explanation}
                      </p>
                    </div>
                    <ArrowRight size={14} className="text-violet-600 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Milestones Section */}
          {filteredMilestones.length > 0 && (
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-wider mb-2 flex items-center gap-1.5 text-gray-600">
                <BookOpen size={13} className="text-amber-500 fill-amber-500" /> Milestones ({filteredMilestones.length})
              </p>
              <div className="space-y-1.5">
                {filteredMilestones.map((milestone) => (
                  <div
                    key={`${milestone.courseId}-${milestone.id}`}
                    onClick={() => {
                      navigate('/app/workspace');
                      onClose();
                    }}
                    className="p-3.5 rounded-xl glass-card-interactive flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-xs text-[#111827]">
                          Milestone {milestone.id}: {milestone.title}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold bg-gray-100 text-gray-600 border border-gray-200">
                          {milestone.courseTitle}
                        </span>
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-violet-600 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredConcepts.length === 0 && filteredMilestones.length === 0 && (
            <div className="text-center py-12">
              <Sparkles size={32} className="mx-auto mb-2 text-violet-400 opacity-80" />
              <p className="text-sm font-bold text-[#111827]">
                No matching results found
              </p>
              <p className="text-xs font-medium text-gray-600 mt-1">
                Try searching for "Primary Key", "Foreign Key", "1NF", or "Schema"
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/60 bg-white/20 backdrop-blur-md text-xs flex items-center justify-between text-gray-600">
          <span>Press <kbd className="px-1.5 py-0.5 border border-white/80 rounded bg-white/60 text-[10px] font-mono font-bold">ESC</kbd> to exit search</span>
          <span className="flex items-center gap-1 text-[11px] font-extrabold text-violet-700">
            Nxtagent CS Search Engine
          </span>
        </div>
      </div>
    </div>
  );
};
