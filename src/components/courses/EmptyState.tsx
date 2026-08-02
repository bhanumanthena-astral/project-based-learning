import React from 'react';
import { BookOpen, Bookmark, FileText, Activity, FolderOpen } from 'lucide-react';

const icons: Record<string, React.ReactNode> = {
  bookmarks: <Bookmark size={40} className="text-gray-300" />,
  notes: <FileText size={40} className="text-gray-300" />,
  concepts: <BookOpen size={40} className="text-gray-300" />,
  activity: <Activity size={40} className="text-gray-300" />,
  projects: <FolderOpen size={40} className="text-gray-300" />,
};

interface EmptyStateProps {
  type?: keyof typeof icons;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
}

export const EmptyState: React.FC<EmptyStateProps> = ({ type = 'concepts', title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
    <div className="w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
      {icons[type] || icons.concepts}
    </div>
    <h3 className="text-base font-bold text-[#111827] mb-1">{title}</h3>
    <p className="text-sm text-gray-500 max-w-xs mb-4">{description}</p>
    {action && (
      <button onClick={action.onClick} className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-xl font-bold text-sm transition">
        {action.label}
      </button>
    )}
  </div>
);
