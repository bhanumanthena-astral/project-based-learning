import React, { useState } from 'react';
import {
  CheckCircle,
  Lock,
  ArrowRight,
  Clock,
  Database,
  Code2,
  GitBranch,
  FolderOpen,
  Eye,
  X,
  Layers,
  TrendingUp,
  ListChecks,
} from 'lucide-react';
import { courses } from '../data/mockData';

export const ProjectsPage: React.FC = () => {
  const [showSchema, setShowSchema] = useState(false);

  const dbmsCourse = courses.find((c) => c.id === 'dbms-001')!;
  const reactCourse = courses.find((c) => c.id === 'react-001')!;

  const builtCount = dbmsCourse.tables.filter((t) => t.status === 'built').length;
  const lockedCount = dbmsCourse.tables.filter((t) => t.status === 'locked').length;

  const buildEvents = [
    { date: 'Jul 25', desc: 'Completed appointments table', concepts: ['Foreign Keys', 'ON DELETE CASCADE'], milestone: 'Milestone 2 done', done: true },
    { date: 'Jul 20', desc: 'Completed doctors table', concepts: ['Primary key', 'Data types'], milestone: 'Milestone 1 done', done: true },
    { date: 'Jul 20', desc: 'Completed patients table', concepts: ['Primary key', 'NOT NULL'], milestone: 'First table built!', done: true },
    { date: 'Jul 28', desc: 'Currently: departments table', concepts: ['1NF', '2NF'], milestone: 'In progress', done: false },
  ];

  const reactComponents = ['LoginPage', 'JobsListing', 'SearchFilter', 'JobDetail', 'DeployedApp'];

  const circumference = 2 * Math.PI * 28;
  const dbmsDashOffset = circumference - (32 / 100) * circumference;

  return (
    <div className="space-y-8">
      {/* ========== Section 1 — Active Project Hero ========== */}
      <div className="glass-card-elevated p-6 md:p-8 flex flex-col lg:flex-row items-start justify-between gap-8">
        {/* Left Content */}
        <div className="space-y-5 max-w-xl w-full">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="bg-violet-100 text-violet-700 text-xs font-bold px-3 py-1 rounded-full">
              CURRENTLY BUILDING
            </span>
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded font-semibold">
              DBMS
            </span>
          </div>

          <h1 className="text-[22px] font-extrabold text-[#111827] leading-tight">
            {dbmsCourse.title}
          </h1>

          <p className="text-sm text-gray-700 leading-relaxed">
            A fully normalized relational database for a hospital — 6 tables, 3 relationships, complete with indexes and transactions.
          </p>

          <div className="space-y-1.5">
            <div className="w-full bg-amber-100 rounded-full h-3 overflow-hidden">
              <div className="h-full rounded-full bg-amber-500 transition-all" style={{ width: '32%' }} />
            </div>
            <p className="text-sm text-gray-500">
              32% complete · {builtCount} of 6 tables built · 4 concepts applied
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-green-50 text-green-700 border border-green-200 rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1">
              <TrendingUp size={12} />
              Built this session: Appointments table
            </span>
            <span className="bg-violet-50 text-violet-700 border border-violet-200 rounded-full px-3 py-1 text-xs font-semibold">
              Next up: Departments table
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button className="bg-violet-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-violet-700 transition flex items-center gap-2">
              Continue building <ArrowRight size={16} />
            </button>
            <button
              onClick={() => setShowSchema(true)}
              className="bg-white border border-gray-200 px-5 py-2.5 rounded-xl font-bold text-sm hover:border-gray-300 transition flex items-center gap-2"
            >
              <Eye size={16} />
              View full schema
            </button>
          </div>
        </div>

        {/* Right — Diagram SVG */}
        <div className="shrink-0 w-64 h-64 flex items-center justify-center">
          <svg viewBox="0 0 240 240" className="w-full h-full" fill="none">
            {/* Connection lines */}
            <g stroke="#d1d5db" strokeWidth="2">
              <line x1="80" y1="65" x2="160" y2="65" />
              <line x1="80" y1="65" x2="80" y2="135" />
              <line x1="160" y1="65" x2="160" y2="135" />
              <line x1="80" y1="135" x2="160" y2="135" />
              <line x1="80" y1="135" x2="45" y2="200" strokeDasharray="6 4" />
              <line x1="160" y1="135" x2="195" y2="200" strokeDasharray="6 4" />
              <line x1="45" y1="200" x2="195" y2="200" strokeDasharray="6 4" />
            </g>
            {/* Built: patients */}
            <g>
              <circle cx="80" cy="65" r="24" fill="#10b981" />
              <text x="80" y="62" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="monospace">patients</text>
              <text x="80" y="73" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="7" fontFamily="monospace">built</text>
            </g>
            {/* Built: doctors */}
            <g>
              <circle cx="160" cy="65" r="24" fill="#10b981" />
              <text x="160" y="62" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="monospace">doctors</text>
              <text x="160" y="73" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="7" fontFamily="monospace">built</text>
            </g>
            {/* Built: appointments */}
            <g>
              <circle cx="80" cy="135" r="24" fill="#10b981" />
              <text x="80" y="132" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="monospace">appts</text>
              <text x="80" y="143" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="7" fontFamily="monospace">built</text>
            </g>
            {/* Active: departments */}
            <g>
              <circle cx="160" cy="135" r="24" fill="#7c3aed" />
              <text x="160" y="132" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="monospace">depts</text>
              <text x="160" y="143" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="7" fontFamily="monospace">active</text>
            </g>
            {/* Locked: prescriptions */}
            <g>
              <circle cx="45" cy="200" r="24" stroke="#9ca3af" strokeWidth="2" strokeDasharray="4 3" />
              <text x="45" y="200" textAnchor="middle" fill="#9ca3af" fontSize="8" fontWeight="bold" fontFamily="monospace">rx</text>
            </g>
            {/* Locked: billing */}
            <g>
              <circle cx="195" cy="200" r="24" stroke="#9ca3af" strokeWidth="2" strokeDasharray="4 3" />
              <text x="195" y="200" textAnchor="middle" fill="#9ca3af" fontSize="8" fontWeight="bold" fontFamily="monospace">bill</text>
            </g>
          </svg>
        </div>
      </div>

      {/* ========== Schema Modal ========== */}
      {showSchema && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto relative">
            <button
              onClick={() => setShowSchema(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-gray-100 transition"
            >
              <X size={20} className="text-gray-500" />
            </button>

            <h2 className="text-lg font-extrabold text-[#111827] mb-6 flex items-center gap-2">
              <Database size={20} className="text-violet-600" />
              Hospital Management System — Full Schema
            </h2>

            <div className="grid grid-cols-3 gap-3">
              {dbmsCourse.tables.map((tbl) => {
                const isBuilt = tbl.status === 'built';
                const isActive = tbl.status === 'active';
                const isLocked = tbl.status === 'locked';

                return (
                  <div
                    key={tbl.name}
                    className={`rounded-xl border p-4 space-y-2 ${
                      isBuilt
                        ? 'bg-emerald-50/50 border-emerald-200'
                        : isActive
                        ? 'bg-violet-50/50 border-violet-200'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-mono font-bold text-sm text-[#111827]">
                        {tbl.name}
                      </h3>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isBuilt
                            ? 'bg-emerald-100 text-emerald-700'
                            : isActive
                            ? 'bg-violet-100 text-violet-700'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {tbl.status}
                      </span>
                    </div>

                    {isLocked ? (
                      <p className="text-xs text-gray-400 font-mono">🔒 Not yet</p>
                    ) : (
                      <div className="space-y-0.5">
                        {tbl.columns.map((col, idx) => (
                          <p key={idx} className="text-[10px] font-mono text-gray-600 leading-relaxed">
                            {col}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========== Section 2 — Build Timeline ========== */}
      <div className="glass-card p-5">
        <h3 className="text-base font-bold text-[#111827] mb-4 flex items-center gap-2">
          <ListChecks size={18} className="text-violet-500" />
          Build history
        </h3>

        <div className="space-y-4">
          {buildEvents.map((event, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="shrink-0 w-14">
                <span className="text-xs font-mono bg-gray-100 text-gray-500 px-2 py-1 rounded block text-center">
                  {event.date}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${event.done ? 'text-[#111827]' : 'text-violet-700'}`}>
                  {event.desc}
                </p>
                <div className="flex flex-wrap items-center gap-1.5 mt-1">
                  {event.concepts.map((concept, cIdx) => (
                    <span
                      key={cIdx}
                      className="text-[10px] font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                    >
                      {concept}
                    </span>
                  ))}
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      event.done
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-violet-100 text-violet-700'
                    }`}
                  >
                    {event.milestone}
                  </span>
                </div>
              </div>

              {event.done && (
                <CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ========== Section 3 — All Projects Grid ========== */}
      <div>
        <h2 className="text-lg font-extrabold text-[#111827] mb-4 flex items-center gap-2">
          <FolderOpen size={20} className="text-violet-500" />
          All Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* DBMS Card — Active */}
          <div className="glass-card p-5" style={{ borderLeft: '3px solid #6C63FF', borderRadius: '1rem' }}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-[#111827]">{dbmsCourse.title}</h3>
                <span className="text-xs text-gray-500">{dbmsCourse.subject}</span>
              </div>
              <span className="text-[10px] font-bold bg-violet-100 text-violet-700 px-2 py-0.5 rounded">
                ACTIVE
              </span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500">{builtCount} of 6 tables built</p>
              </div>
              <div className="w-[60px] h-[60px] shrink-0">
                <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
                  <circle cx="32" cy="32" r="28" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    fill="none"
                    stroke="#6C63FF"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dbmsDashOffset}
                  />
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-1.5 mb-4">
              {dbmsCourse.tables.map((tbl) => {
                const isBuilt = tbl.status === 'built';
                const isActive = tbl.status === 'active';
                const isLocked = tbl.status === 'locked';

                return (
                  <div
                    key={tbl.name}
                    className={`text-[10px] font-mono font-semibold text-center py-1.5 rounded-lg border ${
                      isBuilt
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : isActive
                        ? 'bg-violet-50 text-violet-700 border-violet-200'
                        : 'bg-gray-50 text-gray-400 border-dashed border-gray-200'
                    }`}
                  >
                    {tbl.name}
                  </div>
                );
              })}
            </div>

            <button className="bg-violet-600 text-white px-4 py-2 rounded-xl font-bold text-xs hover:bg-violet-700 transition w-full flex items-center justify-center gap-1.5">
              Continue <ArrowRight size={14} />
            </button>
          </div>

          {/* React Card — Not Started */}
          <div className="glass-card p-5" style={{ borderLeft: '3px solid #06B6D4', borderRadius: '1rem' }}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-[#111827]">{reactCourse.title}</h3>
                <span className="text-xs text-gray-500">{reactCourse.subject}</span>
              </div>
              <span className="text-[10px] font-bold bg-sky-100 text-sky-700 px-2 py-0.5 rounded">
                ENROLLED
              </span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500">0 of 5 components built</p>
              </div>
              <div className="w-[60px] h-[60px] shrink-0">
                <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
                  <circle cx="32" cy="32" r="28" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                  <text x="32" y="38" textAnchor="middle" fill="#9ca3af" fontSize="12" fontWeight="bold" fontFamily="monospace">0%</text>
                </svg>
              </div>
            </div>

            <div className="space-y-1 mb-4">
              {reactComponents.map((comp, idx) => (
                <div
                  key={idx}
                  className="text-[10px] font-mono text-gray-400 bg-gray-50 border border-dashed border-gray-200 rounded-lg py-1.5 px-2 text-center"
                >
                  {comp}
                </div>
              ))}
            </div>

            <button className="bg-[#0ea5e9] text-white px-4 py-2 rounded-xl font-bold text-xs hover:bg-sky-600 transition w-full flex items-center justify-center gap-1.5">
              Start building <ArrowRight size={14} />
            </button>
          </div>

          {/* Algorithms Card — Locked */}
          <div className="glass-card p-5" style={{ borderLeft: '3px solid #f59e0b', borderRadius: '1rem', opacity: 0.65 }}>
            <div className="flex flex-col items-center justify-center text-center py-6 space-y-3">
              <Lock size={32} className="text-gray-300" />
              <div>
                <h3 className="font-bold text-[#111827]">Algorithms & Data Structures</h3>
                <span className="text-xs text-gray-500">Core CS</span>
              </div>
              <p className="text-xs text-gray-400 max-w-[180px]">
                Complete 2 DBMS milestones to unlock
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
