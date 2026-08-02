import React from 'react';
import { Clock, BookOpen, FolderOpen, Flag, FileText } from 'lucide-react';
import { RecentlyViewedItem } from '../../types/courses';
import { EmptyState } from './EmptyState';

interface RecentlyViewedProps {
  items: RecentlyViewedItem[];
  onNavigate: (item: RecentlyViewedItem) => void;
}

const typeIcons: Record<string, React.ReactNode> = {
  concept: <BookOpen size={14} />,
  project: <FolderOpen size={14} />,
  milestone: <Flag size={14} />,
  resource: <FileText size={14} />,
};

export const RecentlyViewed: React.FC<RecentlyViewedProps> = ({ items, onNavigate }) => {
  if (items.length === 0) {
    return <EmptyState type="activity" title="No recent activity" description="Concepts and milestones you open will appear here." />;
  }

  return (
    <div className="space-y-1.5">
      {items.slice(0, 8).map(item => (
        <div key={`${item.type}-${item.id}`} onClick={() => onNavigate(item)}
          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-gray-50 text-gray-500 flex items-center justify-center border border-gray-200">
            {typeIcons[item.type] || <FileText size={14} />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-[#111827] truncate">{item.title}</p>
            <p className="text-[10px] text-gray-400 flex items-center gap-1">
              <Clock size={10} /> {new Date(item.viewedAt).toLocaleDateString()} · {item.type}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
