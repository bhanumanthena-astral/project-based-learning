import React, { useState } from 'react';
import { FileText, Bookmark, Search, ChevronDown, ExternalLink, BookOpen, Download } from 'lucide-react';
import { ProjectResource } from '../../types/courses';

interface ResourceCenterProps {
  resources: ProjectResource[];
  onBookmark?: (resourceId: string) => void;
  isBookmarked?: (id: string) => boolean;
}

const typeIcons: Record<string, React.ReactNode> = {
  documentation: <FileText size={14} />,
  cheatsheet: <BookOpen size={14} />,
  diagram: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  pdf: <Download size={14} />,
  'best-practices': <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 15l-2-2m0 0l-2 2m2-2V3m6 6v10a2 2 0 01-2 2H8a2 2 0 01-2-2V9"/></svg>,
};

const typeColors: Record<string, string> = {
  documentation: 'bg-blue-50 text-blue-600 border-blue-200',
  cheatsheet: 'bg-amber-50 text-amber-600 border-amber-200',
  diagram: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  pdf: 'bg-rose-50 text-rose-600 border-rose-200',
  'best-practices': 'bg-violet-50 text-violet-600 border-violet-200',
};

export const ResourceCenter: React.FC<ResourceCenterProps> = ({ resources, onBookmark, isBookmarked }) => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filtered = resources.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesType = typeFilter === 'all' || r.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search resources..."
            className="glass-input w-full pl-9 pr-3 py-2 text-xs" />
        </div>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
          className="glass-input text-xs py-2 px-3">
          <option value="all">All types</option>
          <option value="documentation">Docs</option>
          <option value="cheatsheet">Cheatsheets</option>
          <option value="diagram">Diagrams</option>
          <option value="pdf">PDFs</option>
          <option value="best-practices">Best Practices</option>
        </select>
      </div>
      <div className="space-y-1.5 max-h-80 overflow-y-auto">
        {filtered.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-6">No resources match your search.</p>
        ) : filtered.map(r => (
          <div key={r.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition group">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${typeColors[r.type] || 'bg-gray-50 text-gray-500'}`}>
              {typeIcons[r.type] || <FileText size={14} />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#111827] truncate">{r.title}</p>
              <p className="text-[10px] text-gray-400 truncate">{r.description}</p>
              <div className="flex gap-1 mt-0.5">
                {r.tags.slice(0, 3).map((t, i) => (
                  <span key={i} className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{t}</span>
                ))}
              </div>
            </div>
            <button onClick={() => onBookmark?.(r.id)}
              className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition hover:bg-gray-100">
              <Bookmark size={12} className={isBookmarked?.(r.id) ? 'fill-amber-500 text-amber-500' : 'text-gray-400'} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
