import React from 'react';
import { X, CheckCircle2, Flame, Star, BookOpen, Clock, Trophy, Code2, Zap } from 'lucide-react';

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const defaultNotifications = [
  { id: 1, type: 'milestone', title: 'Milestone 2 complete!', body: "You finished 'Build entity relationships' in DBMS.", time: '2 days ago', read: true, icon: 'CheckCircle2', color: 'green' },
  { id: 2, type: 'streak', title: '12-day streak!', body: "You've learned 12 days in a row. Keep it up!", time: 'Today', read: false, icon: 'Flame', color: 'amber' },
  { id: 3, type: 'xp', title: 'XP milestone reached', body: "You've earned 2,000+ XP. You're in the top 20%!", time: '3 days ago', read: false, icon: 'Star', color: 'violet' },
  { id: 4, type: 'concept', title: 'New concept available', body: '3NF is now unlocked in your DBMS course.', time: '2 days ago', read: true, icon: 'BookOpen', color: 'violet' },
  { id: 5, type: 'reminder', title: "Don't break your streak", body: "You haven't built today. Jump back in!", time: '5 hrs ago', read: false, icon: 'Clock', color: 'amber' },
  { id: 6, type: 'achievement', title: 'Achievement unlocked', body: "You earned 'Relationship Builder' badge.", time: '2 days ago', read: true, icon: 'Trophy', color: 'green' },
  { id: 7, type: 'course', title: 'React course is ready', body: 'Job Board Web App is ready to start.', time: '1 week ago', read: true, icon: 'Code2', color: 'sky' },
  { id: 8, type: 'system', title: 'Welcome to Nxtagent!', body: 'Start your first milestone to earn 50 XP.', time: '2 weeks ago', read: true, icon: 'Zap', color: 'violet' },
];

const iconMap: Record<string, React.ElementType> = {
  CheckCircle2, Flame, Star, BookOpen, Clock, Trophy, Code2, Zap,
};

export const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = React.useState(defaultNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 h-screen z-[150] flex" style={{ width: '340px' }}>
      <div className="w-full h-full overflow-y-auto" style={{
        background: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        borderLeft: '1px solid rgba(255,255,255,0.9)',
        boxShadow: '-8px 0 40px rgba(30,27,75,0.12)',
        padding: '20px',
      }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#111827]">Notifications</h2>
            {unreadCount > 0 && (
              <span className="bg-violet-100 text-violet-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">{unreadCount}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="text-xs font-bold text-violet-600 hover:text-violet-700 transition">Mark all read</button>
            )}
            <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="space-y-1">
          {notifications.map((n) => {
            const Icon = iconMap[n.icon] || Bell;
            const colorMap: Record<string, string> = { green: '#16a34a', amber: '#f59e0b', violet: '#7c3aed', sky: '#0ea5e9' };
            const bgMap: Record<string, string> = { green: 'rgba(22,163,74,0.1)', amber: 'rgba(245,158,11,0.1)', violet: 'rgba(124,58,237,0.1)', sky: 'rgba(14,165,233,0.1)' };
            const c = colorMap[n.color] || '#7c3aed';
            const bg = bgMap[n.color] || 'rgba(124,58,237,0.1)';

            return (
              <div key={n.id} className={`p-3 rounded-xl transition ${!n.read ? 'border' : ''}`} style={!n.read ? { background: 'rgba(124,58,237,0.04)', borderColor: 'rgba(124,58,237,0.1)' } : {}}>
                <div className="flex gap-3">
                  <div className="relative shrink-0">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: bg }}>
                      <Icon size={16} color={c} />
                    </div>
                    {!n.read && <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-semibold text-[#111827]">{n.title}</p>
                    <p className="text-[12px] text-gray-500 line-clamp-2 mt-0.5">{n.body}</p>
                    <p className="text-[11px] text-gray-400 mt-1">{n.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Click outside to close */}
      <div className="flex-1" onClick={onClose} />
    </div>
  );
};

const Bell: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = '#7c3aed' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);
