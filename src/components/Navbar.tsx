import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Database, LayoutDashboard, Home, BookOpen, Layers, Sparkles, Trophy } from 'lucide-react';
import { getStudentProgress, computeProgressMetrics } from '../services/progressService';
import { courseData } from '../data/courseData';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const progress = getStudentProgress();
  const metrics = computeProgressMetrics(progress, courseData);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Top Desktop & Mobile Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1"
            id="nav-logo-link"
          >
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center overflow-hidden shadow-sm group-hover:bg-indigo-700 transition-colors">
              <img 
                src="/icons/3d/Nxtagent logo 2.png" 
                alt="Nxtagent Logo" 
                className="w-full h-full object-contain p-1"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 text-lg tracking-tight leading-none">
                Nxtagent
              </span>
              <span className="text-[10px] font-medium text-amber-600 tracking-wide uppercase mt-0.5">
                Project-Based Learning
              </span>
            </div>
          </Link>

          {/* Desktop Nav Actions */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-1 bg-gray-100/80 p-1 rounded-xl border border-gray-200/60">
              <Link
                to="/"
                id="nav-link-home"
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-1.5 ${
                  isActive('/') && location.pathname === '/'
                    ? 'bg-white text-indigo-600 shadow-xs font-semibold'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                <Home className="w-4 h-4" />
                Course Landing
              </Link>

              <Link
                to="/workspace"
                id="nav-link-workspace"
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-1.5 ${
                  isActive('/workspace')
                    ? 'bg-white text-indigo-600 shadow-xs font-semibold'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                <Database className="w-4 h-4" />
                Project Workspace
              </Link>

              <Link
                to="/dashboard"
                id="nav-link-dashboard"
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-1.5 ${
                  isActive('/dashboard')
                    ? 'bg-white text-indigo-600 shadow-xs font-semibold'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
            </nav>

            {/* Progress Pill Indicator */}
            <Link
              to="/workspace"
              id="nav-progress-pill"
              className="flex items-center gap-2.5 bg-amber-50 hover:bg-amber-100/80 border border-amber-200/80 rounded-full px-3.5 py-1.5 transition-colors group cursor-pointer"
            >
              <Trophy className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-amber-900">
                    {metrics.percentageComplete}% Complete
                  </span>
                  <span className="text-[10px] text-amber-700 font-medium">
                    ({metrics.builtTablesCount}/{metrics.totalTablesCount} tables)
                  </span>
                </div>
                <div className="w-20 bg-gray-200/80 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-amber-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${metrics.percentageComplete}%` }}
                  />
                </div>
              </div>
            </Link>

            {/* Avatar */}
            <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
              <div className="w-9 h-9 rounded-full bg-indigo-100 border-2 border-indigo-200 flex items-center justify-center text-indigo-700 font-semibold text-xs shadow-xs">
                JD
              </div>
            </div>
          </div>

          {/* Mobile Header Badge */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/workspace"
              className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-full"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              {metrics.percentageComplete}% Project Built
            </Link>
            <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-semibold text-xs">
              JD
            </div>
          </div>

        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-3 py-2 flex items-center justify-around shadow-lg">
        <Link
          to="/"
          id="mobile-nav-home"
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-xs font-medium transition-colors ${
            isActive('/') && location.pathname === '/' ? 'text-indigo-600 font-bold' : 'text-gray-500'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>

        <Link
          to="/workspace"
          id="mobile-nav-workspace"
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-xs font-medium transition-colors ${
            isActive('/workspace') ? 'text-indigo-600 font-bold' : 'text-gray-500'
          }`}
        >
          <Database className="w-5 h-5" />
          <span>Workspace</span>
        </Link>

        <Link
          to="/dashboard"
          id="mobile-nav-dashboard"
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-xs font-medium transition-colors ${
            isActive('/dashboard') ? 'text-indigo-600 font-bold' : 'text-gray-500'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>
      </nav>
    </>
  );
};
