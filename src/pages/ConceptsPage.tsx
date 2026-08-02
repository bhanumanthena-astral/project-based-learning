import React, { useState, useMemo } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Search, ArrowLeft, Clock, BookOpen, CheckCircle, Star, Filter, SlidersHorizontal } from 'lucide-react';
import { detailedConcepts } from '../data/extendedCourseData';
import { ConceptCard } from '../components/courses/ConceptCard';
import { useBookmarks } from '../hooks/useBookmarks';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';

export const ConceptsPage: React.FC = () => {
  const navigate = useNavigate();
  const context = useOutletContext<{ onOpenConcept: (id?: string) => void }>();
  const { bookmarks, addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const { trackView } = useRecentlyViewed();

  const [search, setSearch] = useState('');
  const [technologyFilter, setTechnologyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  const technologies = useMemo(() => {
    const t = new Set(detailedConcepts.map(c => c.technology));
    return ['all', ...Array.from(t)];
  }, []);

  const filtered = useMemo(() => {
    return detailedConcepts.filter(c => {
      if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.overview.toLowerCase().includes(search.toLowerCase())) return false;
      if (technologyFilter !== 'all' && c.technology !== technologyFilter) return false;
      if (difficultyFilter !== 'all' && c.difficulty !== difficultyFilter) return false;
      if (statusFilter === 'mastered' && !c.mastered) return false;
      if (statusFilter === 'needs-review' && (c.mastered || c.masteryPercent >= 80)) return false;
      if (statusFilter === 'bookmarked' && !isBookmarked(c.id, 'concept')) return false;
      return true;
    });
  }, [search, technologyFilter, difficultyFilter, statusFilter, isBookmarked]);

  const masteredCount = detailedConcepts.filter(c => c.mastered).length;

  return (
    <div className="space-y-6 pb-12">
      <button onClick={() => navigate('/app/courses')} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition font-medium">
        <ArrowLeft size={14} /> Back to Courses
      </button>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-[#111827]">Concepts Library</h1>
          <p className="text-sm text-gray-500">{detailedConcepts.length} concepts · {masteredCount} mastered</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <CheckCircle size={14} className="text-green-500" />
          <span className="font-medium">{masteredCount}/{detailedConcepts.length} mastered</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search concepts by name, technology, keyword..."
            className="glass-input w-full pl-9 pr-3 py-2.5 text-xs" />
        </div>
        <select value={technologyFilter} onChange={e => setTechnologyFilter(e.target.value)}
          className="glass-input text-xs py-2.5 px-3">
          {technologies.map(t => (
            <option key={t} value={t}>{t === 'all' ? 'All Technologies' : t}</option>
          ))}
        </select>
        <select value={difficultyFilter} onChange={e => setDifficultyFilter(e.target.value)}
          className="glass-input text-xs py-2.5 px-3">
          <option value="all">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="glass-input text-xs py-2.5 px-3">
          <option value="all">All Status</option>
          <option value="mastered">Mastered</option>
          <option value="needs-review">Needs Review</option>
          <option value="bookmarked">Bookmarked</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map(c => (
          <ConceptCard
            key={c.id}
            concept={c}
            onClick={() => { trackView({ id: c.id, type: 'concept', title: c.name, courseId: c.courseId }); context.onOpenConcept?.(c.id); }}
            onBookmark={() => {
              if (isBookmarked(c.id, 'concept')) removeBookmark(c.id, 'concept');
              else addBookmark({ id: `bm-${c.id}`, type: 'concept', targetId: c.id, courseId: c.courseId, title: c.name, addedAt: new Date().toISOString() });
            }}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <BookOpen size={40} className="mx-auto text-gray-300 mb-3" />
          <p className="text-sm font-bold text-gray-500">No concepts match your filters</p>
          <p className="text-xs text-gray-400">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};
