import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  PanelLeft, TrendingUp, LayoutDashboard, FolderOpen, BookOpen,
  Terminal, User, Settings, LogOut, ChevronUp, Search, HelpCircle, Bell, BrainCircuit,
} from 'lucide-react';
import { currentUser } from '../data/mockData';

interface SidebarProps {
  onOpenConcepts?: () => void;
  onCollapseChange?: (collapsed: boolean) => void;
  onOpenSearch?: () => void;
  onToggleNotifications?: () => void;
  onOpenHelp?: () => void;
  unreadNotifications?: number;
}

interface NavItem {
  label: string;
  route?: string;
  action?: () => void;
  icon: React.ReactNode;
  dimmed?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCollapseChange, onOpenSearch, onToggleNotifications, onOpenHelp, unreadNotifications = 3 }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu]);

  const toggle = () => {
    setCollapsed((prev) => {
      const next = !prev;
      onCollapseChange?.(next);
      return next;
    });
  };

  const isActive = (route: string) => location.pathname === route;

  const navItems: NavItem[] = [
    { label: 'Dashboard', route: '/app/dashboard', icon: <LayoutDashboard size={18} /> },
    { label: "What I'm Building", route: '/app/projects', icon: <FolderOpen size={18} /> },
    { label: "How Far I've Come", route: '/app/progress', icon: <TrendingUp size={18} /> },
  ];

  const courseNavs: NavItem[] = [
    { label: 'My Courses', route: '/app/courses', icon: <BookOpen size={18} /> },
    { label: 'Learning Capsules', route: '/app/learning', icon: <BrainCircuit size={18} /> },
    { label: 'Concepts Library', route: '/app/courses/concepts', icon: <BookOpen size={18} /> },
    { label: 'Practice Zone', route: '/app/playground', icon: <Terminal size={18} /> },
  ];

  const accountNavs: NavItem[] = [
    { label: 'Profile', route: '/app/profile', icon: <User size={18} /> },
    { label: 'Settings', route: '/app/settings', icon: <Settings size={18} /> },
  ];

  const renderNavItem = (item: NavItem) => {
    const active = item.route ? isActive(item.route) : false;
    const tutTarget =
      item.route === '/app/dashboard' ? 'nav-dashboard' :
      item.route === '/app/projects' ? 'nav-projects' : undefined;

    return (
      <a
        key={item.label}
        href={item.route || '#'}
        data-tut={tutTarget}
        onClick={(e) => {
          e.preventDefault();
          if (item.action) { item.action(); return; }
          if (item.route) navigate(item.route);
        }}
        title={collapsed ? item.label : undefined}
        className={`
          flex items-center gap-[11px] px-[14px] py-[10px] rounded-[12px] text-[14px] font-medium no-underline
          cursor-pointer transition-[background,color] duration-150 mb-[2px]
          ${collapsed ? 'justify-center px-[10px]' : ''}
          ${active
            ? 'bg-white text-[#1E1B4B] font-bold'
            : item.dimmed
              ? 'text-[rgba(255,255,255,0.45)] hover:bg-[rgba(255,255,255,0.08)] hover:text-white'
              : 'text-[rgba(255,255,255,0.82)] hover:bg-[rgba(255,255,255,0.08)] hover:text-white'
          }
        `}
      >
        <span className="shrink-0">{item.icon}</span>
        <span className={`truncate transition-all duration-[250ms] ${collapsed ? 'opacity-0 w-0 overflow-hidden' : ''}`}>
          {item.label}
        </span>
      </a>
    );
  };

  const sectionLabel = (label: string) => (
    <div className={`
      text-[11px] font-bold text-[rgba(255,255,255,0.35)] uppercase tracking-[0.1em] px-[14px]
      mt-[20px] mb-[6px]
      transition-all duration-[250ms]
      ${collapsed ? 'opacity-0 h-0 overflow-hidden mt-0 mb-0' : ''}
    `}>
      {label}
    </div>
  );

  const initials = currentUser.avatar || 'AK';

  return (
    <SidebarInner>
      <aside
        className="fixed left-0 top-0 h-screen z-[60] flex flex-col overflow-y-auto"
        style={{
          width: collapsed ? '64px' : '260px',
          background: 'linear-gradient(180deg, #2D2A6E 0%, #1E1B4B 40%, #1A1040 100%)',
          borderRight: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '4px 0 24px rgba(0,0,0,0.25)',
          transition: 'width 250ms ease',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style>{`
          .sidebar-inner::-webkit-scrollbar { width: 0px; }
          .sidebar-inner { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>

        {/* Top bar: collapse toggle + logo */}
        <div
          className="flex items-center gap-[12px] mb-[24px] px-[6px] py-[4px] shrink-0"
          style={{ padding: '4px 6px', marginBottom: '24px' }}
        >
          <button
            onClick={toggle}
            className="flex items-center justify-center w-[28px] h-[28px] rounded-[8px] bg-transparent border-none cursor-pointer text-[rgba(255,255,255,0.6)] hover:bg-[rgba(255,255,255,0.08)] transition-colors shrink-0"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            <PanelLeft size={20} />
          </button>

          <div className={`flex items-center gap-[10px] overflow-hidden transition-all duration-[250ms] ${collapsed ? 'opacity-0 w-0' : ''}`}>
            <div className="w-[38px] h-[38px] shrink-0 flex items-center justify-center">
              <img src="/icons/3d/Nxtagent logo 2.png" alt="Nxtagent" className="w-full h-full object-contain" />
            </div>
            <span className="text-[17px] font-extrabold text-white tracking-[-0.4px] whitespace-nowrap">
              Nxtagent
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-[12px] mb-[16px]" onClick={onOpenSearch}>
          <div className="flex items-center gap-2 rounded-[11px] px-3 py-[9px] cursor-pointer transition-colors duration-150" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.10)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.13)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
          >
            <Search size={15} color="rgba(255,255,255,0.45)" />
            <span className={`text-[13px] flex-1 truncate transition-all duration-[250ms] ${collapsed ? 'opacity-0 w-0' : ''}`} style={{ color: 'rgba(255,255,255,0.35)' }}>Search courses, concepts...</span>
            <span className="shrink-0 px-[6px] py-[2px] rounded-[6px] text-[10px] font-mono font-bold" style={{ background: 'rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.4)' }}>⌘K</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-[12px] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
          {navItems.map(renderNavItem)}

          {sectionLabel('COURSES')}
          {courseNavs.map(renderNavItem)}

          {sectionLabel('ACCOUNT')}
          {accountNavs.map(renderNavItem)}

          <div className="mt-[12px]">
            {renderNavItem({ label: 'Help & docs', action: onOpenHelp, icon: <HelpCircle size={18} />, dimmed: true })}
          </div>
        </div>

        {/* Bottom User Card */}
        <div className="relative mt-auto pt-[12px] border-t border-[rgba(255,255,255,0.10)] px-[12px] pb-[16px] shrink-0">
          {/* User Menu Popover */}
          {showUserMenu && (
            <div
              ref={menuRef}
              className="absolute z-[70]"
              style={{
                bottom: '80px',
                left: '12px',
                right: '12px',
                background: 'rgba(45,42,110,0.95)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '14px',
                padding: '8px',
                boxShadow: '0 -8px 24px rgba(0,0,0,0.3)',
              }}
            >
              <button
                onClick={() => { navigate('/app/profile'); setShowUserMenu(false); }}
                className="w-full flex items-center gap-[11px] px-[12px] py-[9px] rounded-[10px] text-[14px] font-medium text-white bg-transparent border-none cursor-pointer hover:bg-[rgba(255,255,255,0.08)] transition-colors"
              >
                <User size={18} />
                <span>View Profile</span>
              </button>
              <button
                onClick={() => { navigate('/'); setShowUserMenu(false); }}
                className="w-full flex items-center gap-[11px] px-[12px] py-[9px] rounded-[10px] text-[14px] font-medium text-white bg-transparent border-none cursor-pointer hover:bg-[rgba(255,255,255,0.08)] transition-colors"
              >
                <LogOut size={18} />
                <span>Sign out</span>
              </button>
            </div>
          )}

          <div className="flex items-center gap-1">
            {/* Notification Bell */}
            <button
              onClick={(e) => { e.stopPropagation(); onToggleNotifications?.(); }}
              className="relative w-[32px] h-[32px] rounded-lg flex items-center justify-center shrink-0 bg-transparent border-none cursor-pointer"
              style={{ color: 'rgba(255,255,255,0.5)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              <Bell size={16} />
              {unreadNotifications > 0 && (
                <span className="absolute top-[2px] right-[2px] w-[6px] h-[6px] rounded-full" style={{ background: '#ef4444' }} />
              )}
            </button>

            <div
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center justify-between flex-1 px-[12px] py-[10px] rounded-[14px] cursor-pointer transition-colors duration-150"
              style={{ background: 'rgba(255,255,255,0.08)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.13)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
            >
              <div className="flex items-center gap-[10px] min-w-0">
                <div
                  className="w-[36px] h-[36px] rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #7C3AED, #6366F1)',
                  }}
                >
                  <span className="text-[13px] font-extrabold text-white">{initials}</span>
                </div>
                <div className={`min-w-0 transition-all duration-[250ms] ${collapsed ? 'opacity-0 w-0 overflow-hidden' : ''}`}>
                  <p className="text-[13px] font-bold text-white truncate leading-[1.2]">{currentUser.name}</p>
                  <p className="text-[11px] text-[rgba(255,255,255,0.45)] truncate">{currentUser.college}</p>
                </div>
              </div>
              <ChevronUp
                size={16}
                color="rgba(255,255,255,0.45)"
                className={`shrink-0 transition-all duration-[250ms] ${collapsed ? 'opacity-0 w-0' : ''}`}
              />
            </div>
          </div>
        </div>
      </aside>
    </SidebarInner>
  );
};

// Wrapper to avoid exposing context to consumers
const SidebarInner: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};
