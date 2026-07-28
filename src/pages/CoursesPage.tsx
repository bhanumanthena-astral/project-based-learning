import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle, Lock, Clock, ArrowRight, Database, Code2, Layers } from 'lucide-react';
import { courses, concepts as mockConcepts } from '../data/mockData';

export const CoursesPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('All');

  const extendedConcepts = [
    ...mockConcepts,
    { id: '2nf', name: 'Second Normal Form', category: 'Normalization', mastered: false, courseId: 'dbms-001', explanation: 'Unlocks in Milestone 3', miniExample: '', projectApplication: '' },
    { id: 'indexes', name: 'Database Indexes', category: 'Performance', mastered: false, courseId: 'dbms-001', explanation: 'Unlocks in Milestone 5', miniExample: '', projectApplication: '' },
  ];

  const tabs = ['All', 'Mastered', 'In Progress'];
  const filteredConcepts = activeTab === 'All' ? extendedConcepts : activeTab === 'Mastered' ? extendedConcepts.filter(c => c.mastered) : extendedConcepts.filter(c => !c.mastered);

  const dbms = courses[0];
  const react = courses[1];

  return (
    <div className="space-y-8">
      {/* Section 1 — Active Course Hero */}
      <div className="glass-card-elevated p-6 md:p-8 flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-4">
          <span className="inline-block bg-violet-100 text-violet-700 text-xs font-bold px-3 py-1 rounded-full">CONTINUE BUILDING</span>
          <h1 className="text-[22px] font-extrabold text-[#111827]">{dbms.title}</h1>
          <p className="text-sm text-gray-500 font-medium">{dbms.subject}</p>
          <p className="text-sm text-gray-600">You're on Milestone 3 of 6. Next: Normalize your data using 3NF.</p>
          <div className="space-y-2">
            <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full rounded-full bg-amber-500" style={{ width: '32%' }} />
            </div>
            <div className="flex justify-between text-xs text-gray-500 font-medium">
              <span>{dbms.progressPercent}% of project built</span>
              <span>Milestone 3 of 6</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1.5 font-medium">Coming up next</p>
            <div className="flex gap-2">
              {['1NF', '2NF'].map((c) => (
                <span key={c} className="bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-3 py-1 text-xs font-medium">{c}</span>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-1">
            <button className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition">Continue →</button>
            <button className="bg-white border border-gray-200 hover:border-gray-300 px-5 py-2.5 rounded-xl font-bold text-sm transition">View project</button>
          </div>
        </div>
        <div className="w-full md:w-56 shrink-0">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Project Tables</p>
          <div className="grid grid-cols-2 gap-2">
            {dbms.tables.map((t) => (
              <div key={t.name} className={`text-xs font-mono font-bold px-2.5 py-1.5 rounded-lg border ${
                t.status === 'built' ? 'bg-green-50 border-green-200 text-green-700' :
                t.status === 'active' ? 'bg-violet-50 border-violet-200 text-violet-700' :
                'bg-gray-50 border-gray-200 text-gray-400 border-dashed'
              }`}>
                {t.status === 'locked' && '🔒 '}{t.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 2 — Enrolled Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* DBMS Card */}
        <div className="glass-card p-5 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(124,58,237,0.12)' }}>
              <Database size={20} color="#7c3aed" />
            </div>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">ACTIVE</span>
          </div>
          <div>
            <p className="text-sm font-bold text-[#111827]">{dbms.title}</p>
            <p className="text-xs text-gray-500 font-medium">{dbms.subject}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1.5">Milestone 3 of 6</p>
            <div className="flex gap-0.5">
              {dbms.milestones.map((m) => (
                <div key={m.id} className={`h-2 flex-1 rounded-full ${
                  m.status === 'completed' ? 'bg-violet-500' :
                  m.status === 'active' ? 'bg-violet-400' :
                  'bg-gray-200'
                }`} style={m.status === 'active' ? { width: '40%' } : {}} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">4 of 18 concepts</p>
            <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full rounded-full bg-amber-400" style={{ width: '22%' }} />
            </div>
          </div>
          <p className="text-xs text-gray-400">Last accessed: 2 days ago</p>
          <button className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2.5 rounded-xl font-bold text-sm transition mt-auto">Continue building →</button>
        </div>

        {/* React Card */}
        <div className="glass-card p-5 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(14,165,233,0.12)' }}>
              <Code2 size={20} color="#0ea5e9" />
            </div>
            <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">START</span>
          </div>
          <div>
            <p className="text-sm font-bold text-[#111827]">{react.title}</p>
            <p className="text-xs text-gray-500 font-medium">{react.subject}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1.5">Not started yet</p>
            <div className="flex gap-0.5">
              {react.milestones.map((m) => (
                <div key={m.id} className="h-2 flex-1 rounded-full bg-gray-200" />
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-400">{react.totalMilestones} milestones · {react.concepts} concepts · ~{react.estimatedHours} hrs</p>
          <button className="w-full text-white py-2.5 rounded-xl font-bold text-sm transition mt-auto" style={{ background: '#0ea5e9' }}>Start building →</button>
        </div>

        {/* Locked Card */}
        <div className="glass-card p-5 flex flex-col gap-3 relative" style={{ opacity: 0.65 }}>
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.12)' }}>
              <Layers size={20} color="#f59e0b" />
            </div>
            <span className="bg-gray-100 text-gray-500 text-xs font-bold px-2 py-0.5 rounded-full">LOCKED</span>
          </div>
          <div>
            <p className="text-sm font-bold text-[#111827]">Pathfinder Visualizer</p>
            <p className="text-xs text-gray-500 font-medium">Data Structures and Algorithms</p>
          </div>
          <div className="flex-1 flex items-center justify-center py-4">
            <Lock size={24} className="text-gray-300" />
          </div>
          <p className="text-xs text-gray-400 text-center">Prerequisite: Complete 2 milestones in DBMS first</p>
          <button className="w-full bg-gray-100 text-gray-400 py-2.5 rounded-xl font-bold text-sm cursor-not-allowed mt-auto" disabled>Coming soon</button>
        </div>
      </div>

      {/* Section 3 — Concept Library */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-[#111827]">Concepts you've encountered</h2>
          <span className="bg-violet-100 text-violet-700 text-xs font-bold px-2 py-0.5 rounded-full">{mockConcepts.filter(c => c.mastered).length} mastered</span>
        </div>
        <div className="flex gap-2 mb-4">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
              activeTab === tab ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}>{tab}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {filteredConcepts.map((c) => (
            <div key={c.id} className="bg-white border border-gray-100 rounded-xl p-3.5 hover:border-gray-200 transition cursor-pointer">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-[13px] font-bold text-[#111827]">{c.name}</p>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] bg-gray-100 text-gray-600 font-medium px-2 py-0.5 rounded-full">{c.category}</span>
                  {c.mastered && <CheckCircle size={14} className="text-green-500" />}
                </div>
              </div>
              <p className="text-[11px] text-gray-500 line-clamp-2 mb-2">{c.explanation}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded">{c.courseId}</span>
                <span className="text-[11px] text-violet-600 font-medium cursor-pointer">View concept →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
