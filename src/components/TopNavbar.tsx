import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ChevronDown,
  Check,
  BookOpen,
  Flame,
  Zap,
  Brain,
  Terminal,
  Moon,
  Sun,
} from 'lucide-react';
import { currentUser, courses } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

interface TopNavbarProps {
  onOpenConcepts: () => void;
  activeCourseId: string;
  onSelectCourse: (courseId: string) => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  onOpenConcepts,
  activeCourseId,
  onSelectCourse,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isCourseDropdownOpen, setIsCourseDropdownOpen] = useState(false);

  const activeCourse = courses.find((c) => c.id === activeCourseId) || courses[0];

  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return { title: 'Dashboard', sub: activeCourse.title };
    if (path.includes('/workspace')) return { title: 'My Projects Workspace', sub: activeCourse.title };
    if (path.includes('/playground')) return { title: 'Interactive Playground', sub: 'SQL & React Sandboxes' };
    if (path.includes('/profile')) return { title: 'Student Profile', sub: currentUser.college };
    if (path.includes('/settings')) return { title: 'Settings', sub: 'Preferences & Configuration' };
    if (path.includes('/recap')) return { title: 'Milestone Recap', sub: activeCourse.title };
    return { title: 'Nxtagent CS', sub: 'Project-Based Workspace' };
  };

  const breadcrumb = getBreadcrumb();

  return (
    <header className="h-16 glass-nav px-6 flex items-center justify-between gap-4 sticky top-0 z-20">
      {/* Left: Title & Subtitle */}
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-lg font-extrabold tracking-tight text-[#111827] leading-tight">
            {breadcrumb.title}
          </h1>
          <p className="text-xs font-bold text-gray-500 flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
            {breadcrumb.sub}
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5">
        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:border-gray-300 transition-all"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          <div className="icon-badge icon-badge-light">
            {isDarkMode ? <Sun size={18} className="text-amber-500" strokeWidth={1.5} /> : <Moon size={18} className="text-indigo-600" strokeWidth={1.5} />}
          </div>
        </button>

        {/* Course Dropdown Selector */}
        <div className="relative">
          <button
            onClick={() => setIsCourseDropdownOpen(!isCourseDropdownOpen)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-white border border-gray-200 text-[#111827] hover:border-gray-300"
          >
            <div className="icon-badge icon-badge-light">
              <BookOpen size={16} className="text-violet-600" strokeWidth={1.5} />
            </div>
            <span className="max-w-[130px] truncate hidden sm:inline">{activeCourse.title}</span>
            <ChevronDown size={14} className="text-gray-400" />
          </button>

          {isCourseDropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 p-2 z-50 shadow-lg rounded-xl">
              <p className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 text-gray-400">
                Active Project Course
              </p>
              <div className="space-y-1">
                {courses.map((course) => (
                  <button
                    key={course.id}
                    onClick={() => {
                      onSelectCourse(course.id);
                      setIsCourseDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-medium text-left transition-all ${
                      course.id === activeCourseId
                        ? 'bg-violet-50 text-violet-900 font-extrabold border border-violet-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: course.accentColor || '#7c3aed' }}
                      />
                      <div className="truncate">
                        <p className="font-bold truncate">{course.title}</p>
                        <p className="text-[10px] text-gray-400 truncate">{course.subject}</p>
                      </div>
                    </div>
                    {course.id === activeCourseId && <Check size={14} className="shrink-0 text-violet-600" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Streak Capsule */}
        <div className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-extrabold bg-white border border-gray-200 text-gray-700">
          <div className="icon-badge-sm icon-badge-light">
            <Flame size={14} className="text-orange-500" strokeWidth={1.5} />
          </div>
          <span>{currentUser.streak} days</span>
        </div>

        {/* XP Capsule */}
        <div className="hidden lg:flex items-center gap-1 px-3.5 py-2 rounded-full text-xs font-extrabold font-mono bg-white border border-gray-200 text-gray-700">
          <div className="icon-badge-sm icon-badge-light">
            <Zap size={14} className="text-violet-600" strokeWidth={1.5} />
          </div>
          <span>{currentUser.xp.toLocaleString()} XP</span>
        </div>

        {/* Quick Concept Drawer */}
        <button
          onClick={onOpenConcepts}
          className="p-2 rounded-xl bg-white border border-gray-200 text-violet-600 hover:border-gray-300 transition-all"
          title="Open Concept Drawer"
        >
          <div className="icon-badge icon-badge-light">
            <Brain size={18} className="text-violet-600" strokeWidth={1.5} />
          </div>
        </button>

        {/* Playground Action */}
        <button
          onClick={() => navigate('/app/playground')}
          className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold text-white shadow-sm transition-all hover:opacity-95 bg-violet-600 hover:bg-violet-700"
        >
          <div className="icon-badge-sm" style={{ background: 'rgba(255, 255, 255, 0.2)' }}>
            <Terminal size={14} className="text-white" strokeWidth={1.5} />
          </div>
          <span>Playground</span>
        </button>
      </div>
    </header>
  );
};
