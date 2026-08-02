import React from 'react';
import { CheckCircle, Clock, BookOpen, Bookmark, Star } from 'lucide-react';
import { CourseConceptDetail } from '../../types/courses';

interface ConceptCardProps {
  concept: CourseConceptDetail;
  onClick: () => void;
  onBookmark?: () => void;
}

const difficultyColors: Record<string, string> = {
  beginner: 'bg-emerald-100 text-emerald-700',
  intermediate: 'bg-amber-100 text-amber-700',
  advanced: 'bg-rose-100 text-rose-700',
};

const techIcons: Record<string, React.ReactNode> = {
  SQL: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7l16-4v14l-16 4V7z"/><path d="M4 7l16-4"/><path d="M4 11l16-4"/><path d="M4 15l16-4"/></svg>,
  React: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="2.5"/><path d="M12 2.5c5 0 9.5 4.3 9.5 9.5s-4.5 9.5-9.5 9.5S2.5 17 2.5 12 7 2.5 12 2.5z"/><path d="M12 2.5c-2.5 0-5 2-5 5 0 1.5.5 3 1.5 4.5M12 2.5c2.5 0 5 2 5 5 0 1.5-.5 3-1.5 4.5M12 21.5c-2.5 0-5-2-5-5 0-1.5.5-3 1.5-4.5M12 21.5c2.5 0 5-2 5-5 0-1.5-.5-3-1.5-4.5"/></svg>,
};

export const ConceptCard: React.FC<ConceptCardProps> = ({ concept, onClick, onBookmark }) => (
  <div onClick={onClick} className="glass-card-interactive p-4 cursor-pointer relative group">
    <div className="flex items-start justify-between mb-2">
      <div className="flex items-center gap-2">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${difficultyColors[concept.difficulty]} bg-opacity-50`}>
          {techIcons[concept.technology] || <BookOpen size={16} />}
        </div>
        <div>
          <p className="text-sm font-bold text-[#111827]">{concept.name}</p>
          <p className="text-[10px] text-gray-400 font-medium">{concept.category}</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        {concept.mastered && <CheckCircle size={14} className="text-green-500" />}
        {concept.bookmarked && <Bookmark size={12} className="text-amber-500 fill-amber-500" />}
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${difficultyColors[concept.difficulty]}`}>
          {concept.difficulty}
        </span>
      </div>
    </div>
    <p className="text-[11px] text-gray-500 line-clamp-2 mb-3">{concept.overview}</p>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-[10px] text-gray-400">
        <Clock size={12} /> {concept.readingTime} min
        {concept.lastReviewed && <span>· Reviewed {concept.lastReviewed}</span>}
      </div>
      <div className="flex items-center gap-1.5">
        <div className="h-1.5 w-16 rounded-full bg-gray-100 overflow-hidden">
          <div className={`h-full rounded-full ${concept.masteryPercent >= 80 ? 'bg-green-400' : concept.masteryPercent >= 40 ? 'bg-amber-400' : 'bg-gray-300'}`}
            style={{ width: `${concept.masteryPercent}%` }} />
        </div>
        <span className="text-[10px] font-bold text-gray-500">{concept.masteryPercent}%</span>
      </div>
    </div>
    {onBookmark && (
      <button onClick={(e) => { e.stopPropagation(); onBookmark(); }}
        className="absolute top-2 right-2 p-1 rounded-lg opacity-0 group-hover:opacity-100 transition bg-white border border-gray-200 hover:bg-gray-50">
        <Bookmark size={12} className={concept.bookmarked ? 'fill-amber-500 text-amber-500' : 'text-gray-400'} />
      </button>
    )}
  </div>
);
