import React from 'react';
import { Bookmark, X, BookOpen, Flag, FileText, BrainCircuit } from 'lucide-react';
import { CourseBookmark } from '../../types/courses';
import { EmptyState } from './EmptyState';

interface BookmarkedItemsProps {
  bookmarks: CourseBookmark[];
  onRemove: (targetId: string, type: string) => void;
  onNavigate: (bookmark: CourseBookmark) => void;
}

const typeIcons: Record<string, React.ReactNode> = {
  concept: <BookOpen size={14} />,
  milestone: <Flag size={14} />,
  resource: <FileText size={14} />,
  capsule: <BrainCircuit size={14} />,
};

export const BookmarkedItems: React.FC<BookmarkedItemsProps> = ({ bookmarks, onRemove, onNavigate }) => {
  if (bookmarks.length === 0) {
    return <EmptyState type="bookmarks" title="No bookmarks yet" description="Bookmark concepts, milestones, and resources to find them quickly later." />;
  }

  return (
    <div className="space-y-1.5">
      {bookmarks.map(b => (
        <div key={`${b.type}-${b.targetId}`} onClick={() => onNavigate(b)}
          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition cursor-pointer group">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
            {typeIcons[b.type] || <Bookmark size={14} />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-[#111827] truncate">{b.title}</p>
            <p className="text-[10px] text-gray-400 capitalize">{b.type} · {new Date(b.addedAt).toLocaleDateString()}</p>
          </div>
          <button onClick={(e) => { e.stopPropagation(); onRemove(b.targetId, b.type); }}
            className="p-1 rounded opacity-0 group-hover:opacity-100 transition hover:bg-gray-100 text-gray-400">
            <X size={12} />
          </button>
        </div>
      ))}
    </div>
  );
};
