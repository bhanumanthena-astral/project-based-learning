import React from 'react';
import { Award, Lock, CheckCircle, BookOpen, Database, Code2, Flame, Zap, Trophy, Bookmark, Terminal } from 'lucide-react';
import { AchievementData } from '../../types/courses';

interface AchievementListProps {
  achievements: AchievementData[];
}

const iconMap: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen size={22} />,
  Database: <Database size={22} />,
  Code2: <Code2 size={22} />,
  Flame: <Flame size={22} />,
  Zap: <Zap size={22} />,
  Trophy: <Trophy size={22} />,
  Bookmark: <Bookmark size={22} />,
  Terminal: <Terminal size={22} />,
  Flag: <Award size={22} />,
};

export const AchievementList: React.FC<AchievementListProps> = ({ achievements }) => (
  <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5">
    {achievements.map(a => {
      const unlocked = a.unlocked;
      const progress = Math.min(a.progress / a.progressMax * 100, 100);
      return (
        <div key={a.id} className={`relative rounded-xl p-3 border text-center transition ${
          unlocked ? 'bg-white border-amber-200' : 'bg-gray-50 border-gray-200 opacity-65'
        }`}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 ${
            unlocked ? 'bg-amber-50 text-amber-600' : 'bg-gray-100 text-gray-400'
          }`}>
            {unlocked ? (iconMap[a.icon] || <Award size={22} />) : <Lock size={18} />}
          </div>
          <p className={`text-[11px] font-bold truncate ${unlocked ? 'text-[#111827]' : 'text-gray-400'}`}>{a.title}</p>
          <p className="text-[9px] text-gray-400 line-clamp-1 mb-1.5">{a.description}</p>
          <div className="h-1 rounded-full bg-gray-100 overflow-hidden">
            <div className={`h-full rounded-full ${unlocked ? 'bg-amber-400' : 'bg-gray-200'}`} style={{ width: `${progress}%` }} />
          </div>
          <p className="text-[9px] text-gray-400 mt-0.5">{a.progress}/{a.progressMax}</p>
          {unlocked && <CheckCircle size={12} className="text-green-500 absolute top-1.5 right-1.5" />}
        </div>
      );
    })}
  </div>
);
