import React from 'react';
import {
  GraduationCap,
  Award,
  Sparkles,
  Flame,
  Zap,
  Download,
  Share2,
} from 'lucide-react';
import { currentUser } from '../data/mockData';
import { BadgeCollection } from '../components/badges/BadgeCollection';

export const ProfilePage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Banner Card */}
      <div className="glass-card p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-500 text-white flex items-center justify-center font-extrabold text-2xl shadow-lg border-2 border-white/80">
            {currentUser.avatar}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-[#1e1b4b]">
                {currentUser.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-violet-600/10 text-violet-700 border border-violet-600/20">
                LEVEL 5 SCHOLAR
              </span>
            </div>

            <p className="text-xs text-gray-500 flex items-center gap-2">
              <GraduationCap size={14} className="text-violet-600" />
              <span>{currentUser.college}</span>
              <span>·</span>
              <span>{currentUser.email}</span>
            </p>

            <div className="flex items-center gap-3 pt-1 text-xs font-bold font-mono">
              <span className="flex items-center gap-1 text-amber-600">
                <Flame size={14} className="fill-amber-500 text-amber-500" />
                {currentUser.streak} Day Streak
              </span>
              <span className="text-gray-300">|</span>
              <span className="flex items-center gap-1 text-violet-600">
                <Zap size={14} className="fill-violet-600 text-violet-600" />
                {currentUser.xp.toLocaleString()} Total XP
              </span>
            </div>
          </div>
        </div>

        <button className="px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-md transition-all hover:opacity-95 flex items-center gap-2 shrink-0" style={{ background: '#7c3aed' }}>
          <Share2 size={14} />
          <span>Share Student Profile</span>
        </button>
      </div>

      {/* Grid: Academic & Skills (5 cols) | Achievements & Certificate (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Academic Details Card */}
          <div className="glass-card p-6 space-y-4">
            <h2 className="text-sm font-extrabold text-[#1e1b4b] uppercase tracking-wider flex items-center gap-2 border-b border-white/80 pb-3">
              <GraduationCap size={16} className="text-violet-600" />
              <span>Academic Details</span>
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-white/60">
                <span className="text-gray-500">College / University</span>
                <span className="font-bold text-[#1e1b4b]">{currentUser.college}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/60">
                <span className="text-gray-500">Major</span>
                <span className="font-bold text-[#1e1b4b]">Computer Science & Engineering</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/60">
                <span className="text-gray-500">Term / Semester</span>
                <span className="font-bold text-[#1e1b4b]">Semester 5 (3rd Year)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Student ID</span>
                <span className="font-mono font-bold text-violet-700">CS-2025-8841</span>
              </div>
            </div>
          </div>

          {/* Skill Mastery Progress */}
          <div className="glass-card p-6 space-y-4">
            <h2 className="text-sm font-extrabold text-[#1e1b4b] uppercase tracking-wider flex items-center gap-2 border-b border-white/80 pb-3">
              <Sparkles size={16} className="text-violet-600" />
              <span>Core Subject Mastery</span>
            </h2>

            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono font-bold">
                  <span className="text-[#1e1b4b]">Database Systems (DBMS)</span>
                  <span className="text-violet-600">68%</span>
                </div>
                <div className="w-full bg-black/5 rounded-full h-2 overflow-hidden">
                  <div className="h-full rounded-full bg-violet-600" style={{ width: '68%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono font-bold">
                  <span className="text-[#1e1b4b]">SQL Syntax & Querying</span>
                  <span className="text-emerald-600">82%</span>
                </div>
                <div className="w-full bg-black/5 rounded-full h-2 overflow-hidden">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: '82%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono font-bold">
                  <span className="text-[#1e1b4b]">React Frontend Development</span>
                  <span className="text-amber-600">45%</span>
                </div>
                <div className="w-full bg-black/5 rounded-full h-2 overflow-hidden">
                  <div className="h-full rounded-full bg-amber-500" style={{ width: '45%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Certificate Download Card */}
          <div className="glass-card p-6 space-y-3 relative overflow-hidden bg-gradient-to-br from-violet-600/10 via-indigo-600/5 to-white/60">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-violet-600 block">
                  BUILD FIRST VERIFIED CERTIFICATE
                </span>
                <h3 className="font-extrabold text-base text-[#1e1b4b]">
                  Hospital DBMS Project Certificate
                </h3>
              </div>
              <Award size={28} className="text-violet-600" />
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              Earn your official certificate of completion upon building all 6 milestones of the Hospital DBMS project course.
            </p>

            <button className="px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-md transition-all hover:opacity-95 flex items-center gap-2" style={{ background: '#7c3aed' }}>
              <Download size={14} />
              <span>Download Progress Statement</span>
            </button>
          </div>
        </div>
      </div>

      {/* Achievement & Badge Collection */}
      <BadgeCollection />
    </div>
  );
};
