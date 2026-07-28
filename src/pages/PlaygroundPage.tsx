import React, { useState, useEffect } from 'react';
import {
  Terminal,
  Play,
  RotateCcw,
  Code2,
  Database,
  CheckCircle2,
  Table as TableIcon,
  Copy,
  Sparkles,
  ChevronDown,
  ChevronRight,
  FileCode,
  Laptop,
  Smartphone,
  Check,
  Circle,
  X,
  AlertCircle,
} from 'lucide-react';
import { courses } from '../data/mockData';

declare global {
  interface Window {
    confetti?: (options?: any) => void;
    Babel?: any;
  }
}

export const PlaygroundPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sql' | 'react'>('sql');

  // --- SQL PLAYGROUND STATE ---
  const defaultSqlQuery = `-- Hospital Management System Database
-- Available: patients, doctors, appointments, departments

SELECT 
  p.name AS patient_name,
  d.name AS doctor_name,
  a.appt_date,
  a.status
FROM appointments a
JOIN patients p ON a.patient_id = p.id
JOIN doctors d ON a.doctor_id = d.id
WHERE a.status = 'confirmed'
ORDER BY a.appt_date DESC;`;

  const [sqlQuery, setSqlQuery] = useState(defaultSqlQuery);
  const [executionTime, setExecutionTime] = useState<string>('0.003s');
  const [copied, setCopied] = useState(false);
  const [expandedTable, setExpandedTable] = useState<string | null>('patients');

  // Sample data sets based on query content
  const appointmentsResult = {
    columns: ['patient_name', 'doctor_name', 'appt_date', 'status'],
    rows: [
      ['Ravi Sharma', 'Dr. Priya K', '2025-07-28 10:00:00', 'confirmed'],
      ['Anjali Reddy', 'Dr. Suresh M', '2025-07-28 11:30:00', 'confirmed'],
      ['Kiran Mehta', 'Dr. Priya K', '2025-07-29 09:00:00', 'confirmed'],
      ['Pooja Nair', 'Dr. Venkat R', '2025-07-29 14:00:00', 'confirmed'],
      ['Arjun Singh', 'Dr. Suresh M', '2025-07-30 16:00:00', 'confirmed'],
    ],
  };

  const patientsResult = {
    columns: ['id', 'name', 'dob', 'contact', 'blood_group'],
    rows: [
      ['1', 'Ravi Sharma', '1992-05-14', '+91 9876543210', 'O+'],
      ['2', 'Anjali Reddy', '1988-11-20', '+91 9876543211', 'A+'],
      ['3', 'Kiran Mehta', '1995-02-08', '+91 9876543212', 'B+'],
      ['4', 'Pooja Nair', '2000-08-19', '+91 9876543213', 'AB+'],
      ['5', 'Arjun Singh', '1985-12-03', '+91 9876543214', 'O-'],
    ],
  };

  const countResult = {
    columns: ['dept_id', 'department_name', 'doctor_count'],
    rows: [
      ['1', 'Cardiology', '4'],
      ['2', 'Neurology', '3'],
      ['3', 'Orthopedics', '5'],
    ],
  };

  const describeResult = {
    columns: ['Field', 'Type', 'Null', 'Key', 'Default'],
    rows: [
      ['id', 'INT', 'NO', 'PRI', 'NULL'],
      ['name', 'VARCHAR(100)', 'NO', '', 'NULL'],
      ['dob', 'DATE', 'YES', '', 'NULL'],
      ['contact', 'VARCHAR(15)', 'YES', '', 'NULL'],
      ['blood_group', 'CHAR(3)', 'YES', '', 'NULL'],
    ],
  };

  const getActiveResult = () => {
    const q = sqlQuery.toLowerCase();
    if (q.includes('describe') || q.includes('show')) return describeResult;
    if (q.includes('count') || q.includes('group by')) return countResult;
    if (q.includes('select * from patients')) return patientsResult;
    return appointmentsResult;
  };

  const currentResult = getActiveResult();

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlQuery);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- REACT PLAYGROUND STATE ---
  const [selectedFile, setSelectedFile] = useState<'App.jsx' | 'LoginPage.jsx' | 'styles.css'>('LoginPage.jsx');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  const defaultReactCode = `import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    alert('Welcome ' + email + '!');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e0e7ff, #fdf4ff)',
      padding: '1rem',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.9)',
        borderRadius: '20px',
        padding: '2rem',
        width: '100%',
        maxWidth: '340px',
        boxShadow: '0 8px 32px rgba(124,58,237,0.12)'
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#1e1b4b', marginBottom: '4px' }}>
          Sign in
        </h2>
        <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '20px' }}>
          Welcome back to BuildFirst
        </p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              width: '100%', padding: '10px 12px',
              border: '1px solid rgba(124,58,237,0.2)',
              borderRadius: '10px', marginBottom: '10px',
              fontSize: '13px', boxSizing: 'border-box',
              background: 'rgba(255,255,255,0.8)', outline: 'none'
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              width: '100%', padding: '10px 12px',
              border: '1px solid rgba(124,58,237,0.2)',
              borderRadius: '10px', marginBottom: '16px',
              fontSize: '13px', boxSizing: 'border-box',
              background: 'rgba(255,255,255,0.8)', outline: 'none'
            }}
          />
          <button type="submit" style={{
            width: '100%', padding: '10px',
            background: '#7c3aed', color: 'white',
            border: 'none', borderRadius: '10px',
            fontSize: '14px', fontWeight: 600, cursor: 'pointer'
          }}>
            Sign in →
          </button>
        </form>
      </div>
    </div>
  );
}`;

  const [reactCode, setReactCode] = useState(defaultReactCode);
  const [milestoneCompleted, setMilestoneCompleted] = useState(false);

  // Checker evaluation logic
  const checkEmailInput = reactCode.includes('type="email"') || reactCode.includes("type='email'");
  const checkPasswordInput = reactCode.includes('type="password"') || reactCode.includes("type='password'");
  const checkForm = reactCode.includes('<form') && reactCode.includes('</form>');
  const checkSubmitButton = reactCode.includes('type="submit"') || reactCode.includes("type='submit'");

  const allChecksPass = checkEmailInput && checkPasswordInput && checkForm && checkSubmitButton;

  const handleCheckWork = () => {
    if (allChecksPass) {
      setMilestoneCompleted(true);
      if (typeof window !== 'undefined' && window.confetti) {
        window.confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Tab Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#1e1b4b] flex items-center gap-2">
            <Terminal size={20} className="text-violet-600" />
            <span>Interactive Playground Hub</span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Real-time interactive sandboxes for SQL database queries and React component builds.
          </p>
        </div>

        {/* Glass Tab Switcher */}
        <div className="glass-card p-1 flex items-center gap-1 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('sql')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'sql'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-gray-600 hover:text-indigo-950'
            }`}
          >
            <Database size={15} />
            <span>SQL Workbench</span>
          </button>
          <button
            onClick={() => setActiveTab('react')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'react'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-gray-600 hover:text-indigo-950'
            }`}
          >
            <Code2 size={15} />
            <span>React Sandbox</span>
          </button>
        </div>
      </div>

      {/* --- TAB 1: SQL PLAYGROUND --- */}
      {activeTab === 'sql' && (
        <div className="space-y-6">
          {/* Top Bar Header */}
          <div className="glass-card p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-sm font-extrabold text-[#1e1b4b]">
                Hospital Management System DB
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-violet-600/10 text-violet-700 border border-violet-600/20">
                ANSI SQL 2026
              </span>
            </div>

            <button
              onClick={() => {
                setExecutionTime(`${(Math.random() * 0.005 + 0.002).toFixed(3)}s`);
              }}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white shadow-md transition-all hover:opacity-95 flex items-center gap-2"
              style={{ background: '#7c3aed' }}
            >
              <Play size={14} className="fill-white" />
              <span>Run Query (Ctrl+Enter)</span>
            </button>
          </div>

          {/* Split Pane: Editor (60%) & Results (40%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT: Editor (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              <div className="rounded-2xl border border-slate-800 bg-[#0d1117] overflow-hidden shadow-2xl">
                {/* macOS Toolbar */}
                <div className="bg-[#161b22] px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                  </div>
                  <span className="font-mono text-xs text-[#8b949e]">query.sql</span>
                </div>

                {/* Textarea Code Input */}
                <textarea
                  value={sqlQuery}
                  onChange={(e) => setSqlQuery(e.target.value)}
                  rows={10}
                  className="w-full bg-[#0d1117] text-[#7ee787] font-mono text-xs md:text-sm p-4 outline-none leading-relaxed border-none resize-y"
                />
              </div>

              {/* Quick Query Preset Buttons */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                  Quick Query Presets
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSqlQuery('SELECT * FROM patients LIMIT 10;')}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium glass-card border border-white/90 text-gray-700 hover:text-violet-700 transition-all"
                  >
                    SELECT all patients
                  </button>
                  <button
                    onClick={() => setSqlQuery(defaultSqlQuery)}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium glass-card border border-white/90 text-gray-700 hover:text-violet-700 transition-all"
                  >
                    JOIN appointments
                  </button>
                  <button
                    onClick={() => setSqlQuery('SELECT dept_id, COUNT(*) FROM doctors GROUP BY dept_id;')}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium glass-card border border-white/90 text-gray-700 hover:text-violet-700 transition-all"
                  >
                    Count by department
                  </button>
                  <button
                    onClick={() => setSqlQuery('DESCRIBE patients;')}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium glass-card border border-white/90 text-gray-700 hover:text-violet-700 transition-all"
                  >
                    Show table schema
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT: Results Panel (5 cols) */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-800 bg-[#0d1117] overflow-hidden shadow-2xl h-full flex flex-col">
                {/* Header */}
                <div className="bg-[#161b22] px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-300 font-bold">Query Results</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {currentResult.rows.length} rows · {executionTime}
                  </span>
                </div>

                {/* Results Table */}
                <div className="p-3 overflow-x-auto flex-1">
                  <table className="w-full text-left font-mono text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#161b22] text-[#8b949e]">
                        {currentResult.columns.map((col) => (
                          <th key={col} className="p-2 border-b border-slate-800 uppercase text-[10px] tracking-wider">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {currentResult.rows.map((row, rIdx) => (
                        <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-[#0d1117]' : 'bg-slate-900/40'}>
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-2 text-[#c9d1d9]">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Schema Reference Accordion */}
          <div className="glass-card p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1e1b4b] flex items-center gap-2">
              <Database size={14} className="text-violet-600" />
              <span>Database Schema Reference</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {courses[0].tables.map((tbl) => (
                <div
                  key={tbl.name}
                  onClick={() => setExpandedTable(expandedTable === tbl.name ? null : tbl.name)}
                  className="p-3 rounded-xl border border-white/90 bg-white/60 cursor-pointer space-y-2 hover:border-violet-300 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs text-violet-700">
                      {tbl.name}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {tbl.columns.length} cols
                    </span>
                  </div>

                  {expandedTable === tbl.name && (
                    <div className="bg-[#0d1117] p-2 rounded-lg font-mono text-[10px] text-slate-300 space-y-1">
                      {tbl.columns.map((col, cIdx) => (
                        <div key={cIdx} className="truncate">{col}</div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 2: REACT PLAYGROUND --- */}
      {activeTab === 'react' && (
        <div className="space-y-6">
          {/* Three Pane Layout: File Tree (180px) | Editor (flex-1) | Preview (320px) */}
          <div className="flex flex-col lg:flex-row gap-4 items-stretch">
            {/* File Tree Panel (180px) */}
            <div className="w-full lg:w-[180px] glass-card p-4 space-y-3 shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                PROJECT FILES
              </span>

              <div className="space-y-1 font-mono text-xs">
                <button
                  onClick={() => setSelectedFile('App.jsx')}
                  className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-left transition-all ${
                    selectedFile === 'App.jsx'
                      ? 'bg-violet-600/10 text-violet-700 font-bold border border-violet-600/20'
                      : 'text-gray-600 hover:bg-white/60'
                  }`}
                >
                  <FileCode size={14} />
                  <span>App.jsx</span>
                </button>

                <button
                  onClick={() => setSelectedFile('LoginPage.jsx')}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left transition-all ${
                    selectedFile === 'LoginPage.jsx'
                      ? 'bg-violet-600/10 text-violet-700 font-bold border border-violet-600/20'
                      : 'text-gray-600 hover:bg-white/60'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FileCode size={14} className="text-amber-500" />
                    <span>LoginPage.jsx</span>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" title="In progress" />
                </button>

                <button
                  onClick={() => setSelectedFile('styles.css')}
                  className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-left transition-all ${
                    selectedFile === 'styles.css'
                      ? 'bg-violet-600/10 text-violet-700 font-bold border border-violet-600/20'
                      : 'text-gray-600 hover:bg-white/60'
                  }`}
                >
                  <FileCode size={14} />
                  <span>styles.css</span>
                </button>
              </div>
            </div>

            {/* Center Editor (flex-1) */}
            <div className="flex-1 space-y-2">
              <div className="rounded-2xl border border-slate-800 bg-[#0d1117] overflow-hidden shadow-2xl flex flex-col h-full">
                {/* Editor Toolbar */}
                <div className="bg-[#161b22] px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-300 font-bold">
                    {selectedFile}
                  </span>
                  <button
                    onClick={() => setReactCode(defaultReactCode)}
                    className="text-[10px] text-slate-400 hover:text-white font-mono flex items-center gap-1"
                  >
                    <RotateCcw size={12} /> Reset
                  </button>
                </div>

                {/* Textarea Code Input */}
                <textarea
                  value={reactCode}
                  onChange={(e) => setReactCode(e.target.value)}
                  rows={14}
                  className="w-full bg-[#0d1117] text-[#7ee787] font-mono text-xs p-4 outline-none resize-none leading-relaxed border-none flex-1"
                />
              </div>
            </div>

            {/* Right Live Preview (320px) */}
            <div className="w-full lg:w-[340px] glass-card p-4 space-y-3 shrink-0 flex flex-col">
              <div className="flex items-center justify-between border-b border-white/80 pb-2">
                <span className="text-xs font-bold text-[#1e1b4b]">Live Preview</span>
                <div className="flex items-center gap-1 bg-white/80 rounded-lg p-0.5 border border-white">
                  <button
                    onClick={() => setPreviewDevice('desktop')}
                    className={`p-1 rounded ${previewDevice === 'desktop' ? 'bg-violet-600 text-white' : 'text-gray-400'}`}
                  >
                    <Laptop size={12} />
                  </button>
                  <button
                    onClick={() => setPreviewDevice('mobile')}
                    className={`p-1 rounded ${previewDevice === 'mobile' ? 'bg-violet-600 text-white' : 'text-gray-400'}`}
                  >
                    <Smartphone size={12} />
                  </button>
                </div>
              </div>

              {/* Rendered Preview Card */}
              <div
                className={`rounded-xl border border-white/90 overflow-hidden bg-white/90 shadow-md p-4 transition-all ${
                  previewDevice === 'mobile' ? 'max-w-[260px] mx-auto' : 'w-full'
                }`}
              >
                <div className="space-y-3 font-sans">
                  <h3 className="font-extrabold text-lg text-[#1e1b4b]">Sign in</h3>
                  <p className="text-xs text-gray-500">Welcome back to BuildFirst</p>

                  <div className="space-y-2">
                    <input
                      type="email"
                      placeholder="Email address"
                      className="w-full px-3 py-2 rounded-lg border border-violet-200 text-xs outline-none bg-white/80"
                      readOnly
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full px-3 py-2 rounded-lg border border-violet-200 text-xs outline-none bg-white/80"
                      readOnly
                    />
                    <button
                      className="w-full py-2 rounded-lg text-xs font-bold text-white shadow-sm"
                      style={{ background: '#7c3aed' }}
                    >
                      Sign in →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Milestone Checker Panel */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/80 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-violet-600 block">
                  REACT MILESTONE 1 CHECKER
                </span>
                <h3 className="font-extrabold text-base text-[#1e1b4b]">
                  Build the Login Page Component
                </h3>
              </div>

              <button
                onClick={handleCheckWork}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-md transition-all hover:opacity-95 self-start sm:self-auto"
                style={{ background: '#7c3aed' }}
              >
                Check My Work →
              </button>
            </div>

            {/* Checklist items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl border border-white/90 bg-white/60 flex items-center gap-2 text-xs">
                {checkEmailInput ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Circle size={16} className="text-gray-300" />}
                <span className={checkEmailInput ? 'font-bold text-[#1e1b4b]' : 'text-gray-500'}>
                  Has &lt;input type="email"&gt; element
                </span>
              </div>

              <div className="p-3 rounded-xl border border-white/90 bg-white/60 flex items-center gap-2 text-xs">
                {checkPasswordInput ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Circle size={16} className="text-gray-300" />}
                <span className={checkPasswordInput ? 'font-bold text-[#1e1b4b]' : 'text-gray-500'}>
                  Has &lt;input type="password"&gt; element
                </span>
              </div>

              <div className="p-3 rounded-xl border border-white/90 bg-white/60 flex items-center gap-2 text-xs">
                {checkForm ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Circle size={16} className="text-gray-300" />}
                <span className={checkForm ? 'font-bold text-[#1e1b4b]' : 'text-gray-500'}>
                  Wrapped in a &lt;form&gt; tag
                </span>
              </div>

              <div className="p-3 rounded-xl border border-white/90 bg-white/60 flex items-center gap-2 text-xs">
                {checkSubmitButton ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Circle size={16} className="text-gray-300" />}
                <span className={checkSubmitButton ? 'font-bold text-[#1e1b4b]' : 'text-gray-500'}>
                  Has &lt;button type="submit"&gt; button
                </span>
              </div>
            </div>

            {/* Completion Banner */}
            {milestoneCompleted && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 flex items-center gap-3 animate-in fade-in">
                <Sparkles size={20} className="text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold text-sm">Milestone 1 Complete! 🎉</p>
                  <p className="text-xs">You successfully built and verified the Login Page component!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
