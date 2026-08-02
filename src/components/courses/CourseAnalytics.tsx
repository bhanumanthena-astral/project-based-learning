import React from 'react';
import { Clock, BookOpen, Star, Award, Zap, TrendingUp, Flame, BarChart3 } from 'lucide-react';
import { CourseAnalyticsData } from '../../types/courses';

interface CourseAnalyticsProps {
  analytics: CourseAnalyticsData;
}

export const CourseAnalytics: React.FC<CourseAnalyticsProps> = ({ analytics }) => {
  const statCards = [
    { label: 'Time Spent', value: `${Math.floor(analytics.timeSpent / 60)}h ${analytics.timeSpent % 60}m`, icon: <Clock size={18} />, color: 'bg-violet-50 text-violet-600 border-violet-200' },
    { label: 'Concepts Mastered', value: `${analytics.conceptsMastered}`, icon: <BookOpen size={18} />, color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
    { label: 'Avg Quiz Score', value: `${analytics.averageQuizScore}%`, icon: <Star size={18} />, color: 'bg-amber-50 text-amber-600 border-amber-200' },
    { label: 'Longest Streak', value: `${analytics.longestStreak}d`, icon: <Flame size={18} />, color: 'bg-rose-50 text-rose-600 border-rose-200' },
    { label: 'Practice Hours', value: `${analytics.practiceHours}h`, icon: <Zap size={18} />, color: 'bg-blue-50 text-blue-600 border-blue-200' },
    { label: 'Completion', value: `${analytics.completionPercent}%`, icon: <TrendingUp size={18} />, color: 'bg-violet-50 text-violet-600 border-violet-200' },
    { label: 'Learning Velocity', value: `${analytics.learningVelocity}`, icon: <BarChart3 size={18} />, color: 'bg-cyan-50 text-cyan-600 border-cyan-200' },
    { label: 'Projects Done', value: `${analytics.projectsCompleted}`, icon: <Award size={18} />, color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
      {statCards.map(s => (
        <div key={s.label} className={`rounded-xl p-3 border ${s.color} flex items-center gap-2.5`}>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/60 border border-inherit">
            {s.icon}
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider opacity-70">{s.label}</p>
            <p className="text-sm font-extrabold">{s.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
