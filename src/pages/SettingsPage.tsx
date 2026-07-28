import React, { useState, useEffect } from 'react';
import {
  Settings,
  Moon,
  Sun,
  Bell,
  Sliders,
  RotateCcw,
  Check,
  Shield,
  Database,
  Terminal,
} from 'lucide-react';
import { resetStudentProgress } from '../services/progressService';
import { useTheme } from '../context/ThemeContext';

export const SettingsPage: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(isDarkMode ? 'dark' : 'light');
  const [streakReminders, setStreakReminders] = useState(true);
  const [autoFormatSql, setAutoFormatSql] = useState(true);
  const [fontSize, setFontSize] = useState('13px');
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Sync local theme state with actual theme context
  useEffect(() => {
    setTheme(isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    if (newTheme === 'light') {
      // Force light mode
      document.documentElement.classList.remove('dark');
      localStorage.setItem('buildfirst_theme', 'light');
    } else if (newTheme === 'dark') {
      // Force dark mode
      document.documentElement.classList.add('dark');
      localStorage.setItem('buildfirst_theme', 'dark');
    } else {
      // System theme - check preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('buildfirst_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('buildfirst_theme', 'light');
      }
    }
  };

  const handleResetData = () => {
    resetStudentProgress();
    setResetSuccess(true);
    setResetConfirmOpen(false);
    setTimeout(() => {
      window.location.href = '#/app/workspace';
      window.location.reload();
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="glass-card p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-violet-600/10 text-violet-700 flex items-center justify-center font-bold">
          <Settings size={20} />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-[#1e1b4b]">
            Platform Preferences & Settings
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Configure your workspace appearance, code editor behavior, and student profile data.
          </p>
        </div>
      </div>

      {/* Theme & Display Options */}
      <div className="glass-card p-6 space-y-4">
        <h2 className="text-sm font-extrabold text-[#1e1b4b] uppercase tracking-wider flex items-center gap-2 border-b border-white/80 pb-3">
          <Sun size={16} className="text-amber-500" />
          <span>Appearance & Glass Theme</span>
        </h2>

        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => handleThemeChange('light')}
            className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 ${
              theme === 'light'
                ? 'bg-violet-600/10 border-violet-600 text-violet-700 font-bold ring-2 ring-violet-500/20'
                : 'glass-card border-white/90 text-gray-600'
            }`}
          >
            <Sun size={20} className="text-amber-500" />
            <div>
              <p className="text-xs font-bold">Light Glass</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Default frost canvas</p>
            </div>
          </button>

          <button
            onClick={() => handleThemeChange('dark')}
            className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 ${
              theme === 'dark'
                ? 'bg-violet-600/10 border-violet-600 text-violet-700 font-bold ring-2 ring-violet-500/20'
                : 'glass-card border-white/90 text-gray-600'
            }`}
          >
            <Moon size={20} className="text-indigo-600" />
            <div>
              <p className="text-xs font-bold">Dark Glass</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Deep space twilight</p>
            </div>
          </button>

          <button
            onClick={() => handleThemeChange('system')}
            className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 ${
              theme === 'system'
                ? 'bg-violet-600/10 border-violet-600 text-violet-700 font-bold ring-2 ring-violet-500/20'
                : 'glass-card border-white/90 text-gray-600'
            }`}
          >
            <Sliders size={20} className="text-violet-600" />
            <div>
              <p className="text-xs font-bold">System Theme</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Match OS setting</p>
            </div>
          </button>
        </div>
      </div>

      {/* Editor Preferences */}
      <div className="glass-card p-6 space-y-4">
        <h2 className="text-sm font-extrabold text-[#1e1b4b] uppercase tracking-wider flex items-center gap-2 border-b border-white/80 pb-3">
          <Terminal size={16} className="text-violet-600" />
          <span>SQL & Code Workbench Options</span>
        </h2>

        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between py-2 border-b border-white/60">
            <div>
              <p className="font-bold text-[#1e1b4b]">Auto-Format SQL Syntax</p>
              <p className="text-gray-500 mt-0.5">Format keywords in uppercase automatically on test run</p>
            </div>
            <input
              type="checkbox"
              checked={autoFormatSql}
              onChange={(e) => setAutoFormatSql(e.target.checked)}
              className="w-4 h-4 accent-violet-600 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between py-2 border-b border-white/60">
            <div>
              <p className="font-bold text-[#1e1b4b]">Daily Streak Reminders</p>
              <p className="text-gray-500 mt-0.5">Keep your coding streak active with subtle notifications</p>
            </div>
            <input
              type="checkbox"
              checked={streakReminders}
              onChange={(e) => setStreakReminders(e.target.checked)}
              className="w-4 h-4 accent-violet-600 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-bold text-[#1e1b4b]">Editor Font Size</p>
              <p className="text-gray-500 mt-0.5">JetBrains Mono size in workspace textareas</p>
            </div>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-white/90 bg-white/80 text-xs font-mono font-bold text-violet-700 outline-none"
            >
              <option value="12px">12px Small</option>
              <option value="13px">13px Medium</option>
              <option value="14px">14px Large</option>
            </select>
          </div>
        </div>
      </div>

      {/* Danger Zone / Reset Progress */}
      <div className="glass-card p-6 space-y-4 border-rose-500/20 bg-rose-500/5">
        <h2 className="text-sm font-extrabold text-rose-700 uppercase tracking-wider flex items-center gap-2 border-b border-rose-200 pb-3">
          <RotateCcw size={16} className="text-rose-600" />
          <span>Student Progress & Data Management</span>
        </h2>

        <p className="text-xs text-gray-600 leading-relaxed">
          Reset all local milestone completions, table unlocks, and SQL code submissions to start fresh from Milestone 1.
        </p>

        {!resetConfirmOpen ? (
          <button
            onClick={() => setResetConfirmOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold text-rose-700 bg-rose-100 hover:bg-rose-200 border border-rose-300 transition-all"
          >
            Reset Course Progress
          </button>
        ) : (
          <div className="p-4 rounded-2xl bg-white border border-rose-300 space-y-3">
            <p className="text-xs font-bold text-rose-800">
              Are you sure? This will wipe your saved SQL submissions and unlock state.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleResetData}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-xs"
              >
                Yes, Reset All Data
              </button>
              <button
                onClick={() => setResetConfirmOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {resetSuccess && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs font-bold">
            Progress reset successfully! Reloading workspace...
          </div>
        )}
      </div>
    </div>
  );
};
