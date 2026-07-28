import React from 'react';
import { X, BookOpen, PlayCircle, MessageCircle, Mail, ChevronDown, ChevronUp } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  const [showShortcuts, setShowShortcuts] = React.useState(false);

  if (!isOpen) return null;

  const links = [
    { icon: BookOpen, color: '#7c3aed', title: 'How it works', desc: 'Learn the concept-on-demand method' },
    { icon: PlayCircle, color: '#0ea5e9', title: 'Video walkthrough', desc: 'Watch a full course demo' },
    { icon: MessageCircle, color: '#16a34a', title: 'Community', desc: 'Ask questions, share projects' },
    { icon: Mail, color: '#f59e0b', title: 'Contact support', desc: 'Get help from the team' },
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center" style={{ background: 'rgba(30,27,75,0.4)', backdropFilter: 'blur(6px)' }}>
      <div style={{ width: '420px', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(24px)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.95)', boxShadow: '0 16px 48px rgba(30,27,75,0.2)' }}>
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-bold text-[#111827]">Help & resources</h2>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition">
            <X size={18} />
          </button>
        </div>
        <p className="text-sm text-gray-500 mb-5">Everything you need to build confidently.</p>
        <div className="grid grid-cols-2 gap-3">
          {links.map((link) => (
            <div key={link.title} className="bg-white/60 border border-gray-100 rounded-xl p-3.5 cursor-pointer hover:-translate-y-0.5 transition-all">
              <link.icon size={20} color={link.color} />
              <p className="text-sm font-bold text-[#111827] mt-2">{link.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{link.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 border-t border-gray-100 pt-4">
          <button onClick={() => setShowShortcuts(!showShortcuts)} className="flex items-center justify-between w-full text-sm font-bold text-[#111827]">
            <span>Keyboard shortcuts</span>
            {showShortcuts ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
          </button>
          {showShortcuts && (
            <div className="mt-3 space-y-2">
              {[['⌘K / Ctrl+K', 'Open search'], ['⌘B / Ctrl+B', 'Toggle sidebar'], ['Esc', 'Close modals']].map(([key, desc]) => (
                <div key={key} className="flex items-center justify-between text-xs">
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-200 rounded text-[10px] font-mono font-bold text-gray-600">{key}</kbd>
                  <span className="text-gray-500">{desc}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
