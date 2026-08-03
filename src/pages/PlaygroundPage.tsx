import React, { useState, useEffect } from 'react';
import {
  Terminal,
  Play,
  RotateCcw,
  Code2,
  Database,
  CheckCircle2,
  Sparkles,
  Laptop,
  Smartphone,
  Check,
  Circle,
  AlertCircle,
  Lock,
  Timer,
  Palette,
  Eye,
  HelpCircle,
  Gift,
  Pause,
} from 'lucide-react';
import { courses } from '../data/mockData';
import {
  reactComponents,
  cssComponents,
  challengeComponents,
  CheckerRule,
  Difficulty,
  ComponentStatus,
} from '../data/playgroundData';

declare global {
  interface Window {
    confetti?: (options?: any) => void;
    Babel?: any;
  }
}

/* ================= COMPILER / PREVIEW HELPERS ================= */

let babelPromise: Promise<any> | null = null;

const getBabel = (): Promise<any> => {
  if (!babelPromise) {
    babelPromise = new Promise((resolve, reject) => {
      if (window.Babel) return resolve(window.Babel);
      const s = document.createElement('script');
      s.src = 'https://unpkg.com/@babel/standalone/babel.min.js';
      s.onload = () => resolve(window.Babel);
      s.onerror = () => {
        babelPromise = null;
        reject(new Error('Could not load the Babel compiler. Check your internet connection.'));
      };
      document.body.appendChild(s);
    });
  }
  return babelPromise;
};

const transformCode = async (code: string): Promise<string> => {
  try {
    const Babel = await getBabel();
    const prep = code.replace(
      /^import\s*\{([^}]*)\}\s*from\s*['"]react['"];\s*$/gm,
      'const { $1 } = React;'
    );
    const transformed = Babel.transform(prep, { presets: ['react'] }).code;
    const componentCode = (transformed as string).replace('export default', 'const __Component =');
    return `<!DOCTYPE html><html><head>
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
<style>* { box-sizing: border-box; } body { margin: 0; font-family: Inter, system-ui, sans-serif; }</style>
</head><body>
<div id="root"></div>
<script>${componentCode}
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(__Component));
</script>
</body></html>`;
  } catch (e: any) {
    const msg = String(e?.message ?? 'Unknown error').replace(/</g, '&lt;');
    return `<html><body style="padding:20px;font-family:monospace;color:#ef4444;font-size:13px"><strong>Compile error</strong><br/>${msg}</body></html>`;
  }
};

const cssPreviewHTML = (styles: string, baseHTML: string): string => {
  const bodyMatch = baseHTML.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyContent = bodyMatch ? bodyMatch[1] : baseHTML;
  return `<!DOCTYPE html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
<style>${styles}</style>
</head><body style="margin:0">${bodyContent}</body></html>`;
};

const fireConfetti = () => {
  if (typeof window !== 'undefined' && window.confetti) {
    window.confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
  }
};

const formatTime = (total: number): string => {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

/* ================= SHARED UI PRIMITIVES ================= */

const DIFFICULTY_STYLES: Record<Difficulty, { bg: string; color: string }> = {
  Beginner: { bg: 'rgba(22,163,74,0.1)', color: '#16a34a' },
  Intermediate: { bg: 'rgba(245,158,11,0.1)', color: '#d97706' },
  Advanced: { bg: 'rgba(124,58,237,0.1)', color: '#7c3aed' },
};

const DifficultyBadge: React.FC<{ difficulty: Difficulty }> = ({ difficulty }) => (
  <span
    className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wide"
    style={{ background: DIFFICULTY_STYLES[difficulty].bg, color: DIFFICULTY_STYLES[difficulty].color }}
  >
    {difficulty}
  </span>
);

const DarkEditor: React.FC<{
  filename: string;
  code: string;
  onChange: (v: string) => void;
  onRun: () => void;
  onReset: () => void;
  runLabel?: string;
  hint?: string;
  rows?: number;
  disabled?: boolean;
  languageTag?: string;
}> = ({
  filename,
  code,
  onChange,
  onRun,
  onReset,
  runLabel = 'Run ▶',
  hint = '⌘+Enter',
  rows = 14,
  disabled,
  languageTag = 'JSX Syntax',
}) => {
  const handleKey = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      onRun();
    }
  };
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0d1117] overflow-hidden shadow-2xl">
      {/* Editor Toolbar */}
      <div className="bg-[#161b22] px-4 py-2.5 border-b border-slate-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: '#ff5f57' }} />
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: '#febc2e' }} />
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: '#28c840' }} />
          </div>
          <span className="font-mono text-xs text-[#8b949e] truncate">{filename}</span>
          <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full hidden md:inline-block">
            {languageTag}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onReset}
            className="text-[10px] text-slate-400 hover:text-white font-mono flex items-center gap-1 border border-[#30363d] rounded-lg px-2.5 py-1.5 cursor-pointer transition-colors"
          >
            <RotateCcw size={11} /> Reset
          </button>
          <button
            onClick={onRun}
            className="text-[10px] font-mono font-bold rounded-lg px-3 py-1.5 border flex items-center gap-1.5 cursor-pointer transition-all hover:brightness-125"
            style={{ background: 'rgba(124,58,237,0.25)', color: '#c4b5fd', borderColor: 'rgba(124,58,237,0.3)' }}
          >
            <Play size={10} className="fill-current" /> {runLabel}
          </button>
          <span className="hidden xl:inline-block text-[10px] font-mono text-[#484f58]">{hint}</span>
        </div>
      </div>

      {/* Textarea Code Input */}
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKey}
        rows={rows}
        disabled={disabled}
        spellCheck={false}
        className="w-full bg-[#0d1117] text-[#7ee787] font-mono text-xs p-4 outline-none resize-y leading-relaxed border-none disabled:opacity-50"
      />
    </div>
  );
};

interface CheckResult extends CheckerRule {
  passing: boolean;
}

const CheckerPanel: React.FC<{
  kicker: string;
  title: string;
  statusLabel?: string;
  statusTone?: 'green' | 'violet';
  rules: CheckerRule[];
  results: CheckResult[] | null;
  onCheck: () => void;
  checkLabel?: string;
  successTitle: string;
  successBody: string;
  showSuccess: boolean;
}> = ({
  kicker,
  title,
  statusLabel,
  statusTone = 'violet',
  rules,
  results,
  onCheck,
  checkLabel = 'Check My Work →',
  successTitle,
  successBody,
  showSuccess,
}) => {
  const requiredTotal = rules.filter((r) => r.required).length;
  const requiredPass = results?.filter((r) => r.required && r.passing).length ?? 0;

  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/80 pb-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-violet-600 block">
            {kicker}
          </span>
          <h3 className="font-extrabold text-base text-[#1e1b4b] flex items-center gap-2 flex-wrap">
            {title}
            {statusLabel && (
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  statusTone === 'green'
                    ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/20'
                    : 'bg-violet-600/10 text-violet-700 border border-violet-600/20'
                }`}
              >
                {statusLabel}
              </span>
            )}
          </h3>
        </div>

        <button
          onClick={onCheck}
          className="px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-md transition-all hover:opacity-95 self-start sm:self-auto cursor-pointer"
          style={{ background: '#7c3aed' }}
        >
          {checkLabel}
        </button>
      </div>

      {/* Checklist */}
      {results && (
        <div className="space-y-2">
          {results.map((r) => (
            <div
              key={r.id}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-white/90 bg-white/60"
            >
              {r.passing ? (
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
              ) : (
                <Circle size={16} className="text-gray-300 shrink-0" />
              )}
              <span className={`text-xs ${r.passing ? 'font-bold text-[#1e1b4b]' : 'text-gray-500'}`}>
                {r.label}
              </span>
              {r.required ? (
                <span className="ml-auto px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-violet-600/10 text-violet-700 border border-violet-600/20 shrink-0">
                  required
                </span>
              ) : (
                <span className="ml-auto px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-gray-500/10 text-gray-500 border border-gray-200 shrink-0">
                  bonus
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Success Banner */}
      {showSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 flex items-center gap-3 animate-bf-pop">
          <Sparkles size={20} className="text-emerald-600 shrink-0" />
          <div>
            <p className="font-bold text-sm">{successTitle}</p>
            <p className="text-xs mt-0.5">{successBody}</p>
          </div>
        </div>
      )}

      {/* Fail Banner */}
      {results && !showSuccess && requiredPass < requiredTotal && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 flex items-center gap-3">
          <AlertCircle size={18} className="text-amber-600 shrink-0" />
          <p className="text-xs font-bold">
            Not yet — {requiredTotal - requiredPass} required check(s) still failing. Review the hints and try again.
          </p>
        </div>
      )}
    </div>
  );
};

/* ================= PAGE ================= */

type PlaygroundTab = 'sql' | 'react' | 'css' | 'challenges';

export const PlaygroundPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PlaygroundTab>('sql');

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
  const buildInitialStatus = (): Record<string, ComponentStatus> => {
    const initial: Record<string, ComponentStatus> = {};
    reactComponents.forEach((c) => {
      initial[c.id] = c.status;
    });
    try {
      const saved = localStorage.getItem('bf_playground_completed_v1');
      if (saved) {
        const ids = JSON.parse(saved) as string[];
        ids.forEach((id) => {
          if (initial[id] !== undefined) initial[id] = 'completed';
        });
        for (let i = 0; i < reactComponents.length; i++) {
          const s = initial[reactComponents[i].id];
          if (s === 'completed') continue;
          if (s === 'locked') initial[reactComponents[i].id] = 'active';
          break;
        }
      }
    } catch {
      // ignore storage failures
    }
    return initial;
  };

  const [compStatus, setCompStatus] = useState<Record<string, ComponentStatus>>(buildInitialStatus);
  const defaultActiveId =
    reactComponents.find((c) => c.status === 'active')?.id ?? reactComponents[0].id;
  const [activeCompId, setActiveCompId] = useState<string>(defaultActiveId);
  const [reactCode, setReactCode] = useState<string>(
    () => reactComponents.find((c) => c.id === defaultActiveId)?.starterCode ?? ''
  );
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [reactResults, setReactResults] = useState<CheckResult[] | null>(null);
  const [reactBanner, setReactBanner] = useState<'success' | 'fail' | null>(null);
  const [showHints, setShowHints] = useState(false);

  const activeComp = reactComponents.find((c) => c.id === activeCompId) ?? reactComponents[0];

  const runCode = async (code: string) => {
    setPreviewLoading(true);
    const src = await transformCode(code);
    setPreviewSrc(src);
    setPreviewLoading(false);
  };

  // Auto-run the starter code on mount
  useEffect(() => {
    runCode(reactComponents.find((c) => c.id === defaultActiveId)?.starterCode ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectComponent = (comp: (typeof reactComponents)[number]) => {
    if (compStatus[comp.id] === 'locked') return;
    setActiveCompId(comp.id);
    setReactCode(comp.starterCode);
    setReactResults(null);
    setReactBanner(null);
    runCode(comp.starterCode);
  };

  const handleReactCheck = () => {
    const results = activeComp.checkerRules.map((rule) => ({
      ...rule,
      passing: reactCode.includes(rule.check),
    }));
    setReactResults(results);
    const requiredFail = results.filter((r) => r.required && !r.passing).length;
    if (requiredFail === 0) {
      fireConfetti();
      setReactBanner('success');
      const completedIds = [
        ...Object.entries(compStatus)
          .filter(([, s]) => s === 'completed')
          .map(([id]) => id),
        activeComp.id,
      ];
      try {
        localStorage.setItem(
          'bf_playground_completed_v1',
          JSON.stringify(Array.from(new Set(completedIds)))
        );
      } catch {
        // ignore storage failures
      }
      setCompStatus((prev) => {
        const next = { ...prev, [activeComp.id]: 'completed' as ComponentStatus };
        const idx = reactComponents.findIndex((c) => c.id === activeComp.id);
        const nxt = reactComponents[idx + 1];
        if (nxt && next[nxt.id] === 'locked') next[nxt.id] = 'active';
        return next;
      });
    } else {
      setReactBanner('fail');
    }
  };

  // --- CSS PLAYGROUND STATE ---
  const [activeCssId, setActiveCssId] = useState<string>(cssComponents[0].id);
  const [cssCode, setCssCode] = useState<string>(cssComponents[0].starterCode);
  const [cssPreviewSrc, setCssPreviewSrc] = useState<string>(() =>
    cssPreviewHTML(cssComponents[0].starterCode, cssComponents[0].solutionPreviewHTML)
  );

  const activeCss = cssComponents.find((c) => c.id === activeCssId) ?? cssComponents[0];

  const applyCss = (code: string, baseHTML: string) => {
    setCssPreviewSrc(cssPreviewHTML(code, baseHTML));
  };

  const selectCssComponent = (comp: (typeof cssComponents)[number]) => {
    setActiveCssId(comp.id);
    setCssCode(comp.starterCode);
    applyCss(comp.starterCode, comp.solutionPreviewHTML);
  };

  // --- CHALLENGES STATE ---
  const [challengeId, setChallengeId] = useState<string>(challengeComponents[0].id);
  const [challengeCode, setChallengeCode] = useState<string>(challengeComponents[0].starterCode);
  const [challengeResults, setChallengeResults] = useState<CheckResult[] | null>(null);
  const [challengeBanner, setChallengeBanner] = useState<'success' | 'fail' | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(challengeComponents[0].timeLimit * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bf_playground_challenges_completed_v1');
      return saved ? (JSON.parse(saved) as string[]) : [];
    } catch {
      return [];
    }
  });

  const activeChallenge =
    challengeComponents.find((c) => c.id === challengeId) ?? challengeComponents[0];

  // Countdown timer
  useEffect(() => {
    if (!timerRunning) return;
    const t = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          setTimeUp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [timerRunning]);

  const selectChallenge = (comp: (typeof challengeComponents)[number]) => {
    setChallengeId(comp.id);
    setChallengeCode(comp.starterCode);
    setChallengeResults(null);
    setChallengeBanner(null);
    setTimeLeft(comp.timeLimit * 60);
    setTimerRunning(false);
    setTimeUp(false);
  };

  const handleChallengeSubmit = () => {
    const results = activeChallenge.checkerRules.map((rule) => ({
      ...rule,
      passing: challengeCode.includes(rule.check),
    }));
    setChallengeResults(results);
    const requiredFail = results.filter((r) => r.required && !r.passing).length;
    if (requiredFail === 0) {
      fireConfetti();
      setChallengeBanner('success');
      setTimerRunning(false);
      const next = Array.from(new Set([...completedChallenges, activeChallenge.id]));
      setCompletedChallenges(next);
      try {
        localStorage.setItem('bf_playground_challenges_completed_v1', JSON.stringify(next));
      } catch {
        // ignore storage failures
      }
    } else {
      setChallengeBanner('fail');
    }
  };

  const timerPct = timeLeft / (activeChallenge.timeLimit * 60);
  const timerColor = timerPct > 0.5 ? '#16a34a' : timerPct > 0.1 ? '#d97706' : '#dc2626';

  const tabButton = (id: PlaygroundTab, label: string, icon: React.ReactNode) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
        activeTab === id
          ? 'bg-violet-600 text-white shadow-md'
          : 'text-gray-600 hover:text-indigo-950'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

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
            Real-time sandboxes for SQL queries, React component builds, CSS experiments, and timed challenges.
          </p>
        </div>

        {/* Glass Tab Switcher */}
        <div className="glass-card p-1 flex items-center gap-1 self-start sm:self-auto flex-wrap">
          {tabButton('sql', 'SQL Workbench', <Database size={15} />, activeTab)}
          {tabButton('react', 'React Sandbox', <Code2 size={15} />, activeTab)}
          {tabButton('css', 'CSS Playground', <Palette size={15} />, activeTab)}
          {tabButton('challenges', 'Challenges', <Timer size={15} />, activeTab)}
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
              className="px-5 py-2 rounded-xl text-xs font-bold text-white shadow-md transition-all hover:opacity-95 flex items-center gap-2 cursor-pointer"
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
                    className="px-3 py-1.5 rounded-xl text-xs font-medium glass-card border border-white/90 text-gray-700 hover:text-violet-700 transition-all cursor-pointer"
                  >
                    SELECT all patients
                  </button>
                  <button
                    onClick={() => setSqlQuery(defaultSqlQuery)}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium glass-card border border-white/90 text-gray-700 hover:text-violet-700 transition-all cursor-pointer"
                  >
                    JOIN appointments
                  </button>
                  <button
                    onClick={() => setSqlQuery('SELECT dept_id, COUNT(*) FROM doctors GROUP BY dept_id;')}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium glass-card border border-white/90 text-gray-700 hover:text-violet-700 transition-all cursor-pointer"
                  >
                    Count by department
                  </button>
                  <button
                    onClick={() => setSqlQuery('DESCRIBE patients;')}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium glass-card border border-white/90 text-gray-700 hover:text-violet-700 transition-all cursor-pointer"
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
          {/* Three Pane Layout: Component Browser | Editor | Preview */}
          <div className="flex flex-col lg:flex-row gap-4 items-stretch">
            {/* Left: Component Browser (220px) */}
            <div className="w-full lg:w-[220px] glass-card p-3 space-y-2 shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-violet-600 block px-1 pt-1">
                Milestone components
              </span>

              <div className="space-y-2">
                {reactComponents.map((comp) => {
                  const status = compStatus[comp.id];
                  const isActive = comp.id === activeCompId;
                  const locked = status === 'locked';
                  return (
                    <button
                      key={comp.id}
                      onClick={() => selectComponent(comp)}
                      disabled={locked}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer disabled:cursor-not-allowed ${
                        isActive
                          ? 'bg-violet-600/10 border-violet-600/20'
                          : locked
                          ? 'opacity-50 border-transparent'
                          : 'border-transparent hover:bg-white/70'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-[13px] font-bold truncate ${
                            isActive
                              ? 'text-violet-700'
                              : locked
                              ? 'text-gray-400'
                              : 'text-[#1e1b4b]'
                          }`}
                        >
                          {comp.title}
                        </span>
                        {status === 'completed' && (
                          <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                        )}
                        {status === 'active' && (
                          <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse shrink-0" />
                        )}
                        {locked && <Lock size={13} className="text-gray-400 shrink-0" />}
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <DifficultyBadge difficulty={comp.difficulty} />
                        <span className="text-[11px] text-gray-400">{comp.estimatedMinutes}m</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Center: Editor (flex-1) */}
            <div className="flex-1 space-y-3 min-w-0">
              <DarkEditor
                filename={activeComp.filename}
                code={reactCode}
                onChange={(v) => setReactCode(v)}
                onRun={() => runCode(reactCode)}
                onReset={() => {
                  setReactCode(activeComp.starterCode);
                  setReactResults(null);
                  setReactBanner(null);
                  runCode(activeComp.starterCode);
                }}
              />

              {/* Concept tags row */}
              <div className="glass-card px-4 py-2.5 flex items-center flex-wrap gap-2">
                <span className="text-[11px] text-gray-500 font-bold">Concepts in this component:</span>
                {activeComp.conceptTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-violet-600/10 text-violet-700 border border-violet-600/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Live Preview + Target Preview */}
            <div className="w-full lg:w-[380px] space-y-4 shrink-0">
              {/* Live preview */}
              <div className="glass-card p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-white/80 pb-2">
                  <span className="text-xs font-bold text-[#1e1b4b]">Live preview</span>
                  <div className="flex items-center gap-1 bg-white/80 rounded-lg p-0.5 border border-white">
                    <button
                      onClick={() => setPreviewDevice('desktop')}
                      className={`p-1.5 rounded cursor-pointer ${previewDevice === 'desktop' ? 'bg-violet-600 text-white' : 'text-gray-400'}`}
                      title="Desktop"
                    >
                      <Laptop size={12} />
                    </button>
                    <button
                      onClick={() => setPreviewDevice('mobile')}
                      className={`p-1.5 rounded cursor-pointer ${previewDevice === 'mobile' ? 'bg-violet-600 text-white' : 'text-gray-400'}`}
                      title="Mobile"
                    >
                      <Smartphone size={12} />
                    </button>
                  </div>
                </div>

                <div className={previewDevice === 'mobile' ? 'flex justify-center' : ''}>
                  {previewDevice === 'mobile' ? (
                    <div
                      className="border-[3px] border-slate-800 rounded-2xl overflow-hidden shadow-lg"
                      style={{ width: 375 }}
                    >
                      <iframe
                        srcDoc={previewSrc ?? undefined}
                        className="w-full h-[340px] bg-white border-0"
                        title="live-preview"
                      />
                    </div>
                  ) : (
                    <iframe
                      srcDoc={previewSrc ?? undefined}
                      className="w-full h-[340px] bg-white border border-white/90 rounded-xl"
                      title="live-preview"
                    />
                  )}
                </div>

                {previewLoading && (
                  <p className="text-[11px] font-mono text-violet-600 flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full border-2 border-violet-600 border-t-transparent animate-spin inline-block" />
                    Compiling with Babel…
                  </p>
                )}
              </div>

              {/* Target preview */}
              <div className="glass-card p-4 space-y-2">
                <div className="flex items-center gap-2 border-b border-white/80 pb-2">
                  <Eye size={14} className="text-violet-600" />
                  <span className="text-xs font-bold text-[#1e1b4b]">What it should look like</span>
                </div>
                <iframe
                  srcDoc={activeComp.solutionPreviewHTML}
                  className="w-full h-[200px] bg-white border border-white/90 rounded-xl"
                  title="target-preview"
                />
                <p className="text-[11px] text-gray-400 font-medium">Your goal — try to match this</p>
              </div>
            </div>
          </div>

          {/* Milestone Checker */}
          <CheckerPanel
            kicker={`React Milestone ${activeComp.milestoneId} Checker`}
            title={`Milestone checker — ${activeComp.title}`}
            statusLabel={compStatus[activeComp.id] === 'completed' ? 'Completed' : 'Active'}
            statusTone={compStatus[activeComp.id] === 'completed' ? 'green' : 'violet'}
            rules={activeComp.checkerRules}
            results={reactResults}
            onCheck={handleReactCheck}
            successTitle={`Milestone ${activeComp.milestoneId} Complete! +150 XP earned`}
            successBody="All required checks pass. The next milestone is now unlocked in the sidebar."
            showSuccess={reactBanner === 'success'}
          />

          {/* Hints */}
          <div className="glass-card p-4">
            <button
              onClick={() => setShowHints(!showHints)}
              className="flex items-center gap-2 text-xs font-bold text-violet-700 cursor-pointer"
            >
              <HelpCircle size={14} />
              {showHints ? 'Hide hints' : `Show hints (${activeComp.hints.length})`}
            </button>
            {showHints && (
              <ul className="mt-3 space-y-1.5 text-xs text-gray-600">
                {activeComp.hints.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-violet-600 font-bold shrink-0">→</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* --- TAB 3: CSS PLAYGROUND --- */}
      {activeTab === 'css' && (
        <div className="flex flex-col lg:flex-row gap-4 items-stretch">
          {/* Left: Component List (180px) */}
          <div className="w-full lg:w-[180px] glass-card p-3 space-y-2 shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-violet-600 block px-1 pt-1">
              CSS experiments
            </span>

            <div className="space-y-2">
              {cssComponents.map((comp) => {
                const isActive = comp.id === activeCssId;
                return (
                  <button
                    key={comp.id}
                    onClick={() => selectCssComponent(comp)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-violet-600/10 border-violet-600/20'
                        : 'border-transparent hover:bg-white/70'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[13px] font-bold truncate ${
                          isActive ? 'text-violet-700' : 'text-[#1e1b4b]'
                        }`}
                      >
                        {comp.title}
                      </span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <DifficultyBadge difficulty={comp.difficulty} />
                      <span className="text-[11px] text-gray-400">{comp.estimatedMinutes}m</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center: CSS Editor */}
          <div className="flex-1 space-y-3 min-w-0">
            <DarkEditor
              filename={activeCss.filename}
              code={cssCode}
              onChange={(v) => setCssCode(v)}
              onRun={() => applyCss(cssCode, activeCss.solutionPreviewHTML)}
              onReset={() => {
                setCssCode(activeCss.starterCode);
                applyCss(activeCss.starterCode, activeCss.solutionPreviewHTML);
              }}
              runLabel="Apply Styles ▶"
              hint="⌘+Enter"
              languageTag="CSS"
            />

            {/* Concept tags row */}
            <div className="glass-card px-4 py-2.5 flex items-center flex-wrap gap-2">
              <span className="text-[11px] text-gray-500 font-bold">Concepts in this experiment:</span>
              {activeCss.conceptTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-violet-600/10 text-violet-700 border border-violet-600/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: CSS Live Preview */}
          <div className="w-full lg:w-[380px] glass-card p-4 space-y-3 shrink-0">
            <div className="flex items-center justify-between border-b border-white/80 pb-2">
              <span className="text-xs font-bold text-[#1e1b4b]">Live preview</span>
              <span className="text-[10px] font-mono text-gray-400">your styles applied</span>
            </div>
            <iframe
              srcDoc={cssPreviewSrc}
              className="w-full h-[420px] bg-white border border-white/90 rounded-xl"
              title="css-preview"
            />
            <p className="text-[11px] text-gray-400 font-medium">
              Edit the CSS and press <span className="font-mono font-bold text-violet-600">Apply Styles</span> to see your changes.
            </p>
          </div>
        </div>
      )}

      {/* --- TAB 4: CHALLENGES --- */}
      {activeTab === 'challenges' && (
        <div className="flex flex-col lg:flex-row gap-4 items-stretch">
          {/* Left: Challenge List (240px) */}
          <div className="w-full lg:w-[240px] glass-card p-3 space-y-2 shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-violet-600 block px-1 pt-1">
              Timed challenges
            </span>

            <div className="space-y-2">
              {challengeComponents.map((comp) => {
                const isActive = comp.id === challengeId;
                const isCompleted = completedChallenges.includes(comp.id);
                return (
                  <button
                    key={comp.id}
                    onClick={() => selectChallenge(comp)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-violet-600/10 border-violet-600/20'
                        : 'border-transparent hover:bg-white/70'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[13px] font-bold truncate ${
                          isActive ? 'text-violet-700' : 'text-[#1e1b4b]'
                        }`}
                      >
                        {comp.title}
                      </span>
                      {isCompleted && <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />}
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <DifficultyBadge difficulty={comp.difficulty} />
                      <span className="text-[11px] text-amber-600 font-bold">⏱ {comp.timeLimit} min</span>
                      <span className="text-[11px] text-emerald-600 font-bold">⭐ +{comp.xpReward} XP</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center: Editor */}
          <div className="flex-1 space-y-3 min-w-0">
            <DarkEditor
              filename={activeChallenge.filename}
              code={challengeCode}
              onChange={(v) => setChallengeCode(v)}
              onRun={() => handleChallengeSubmit()}
              onReset={() => {
                setChallengeCode(activeChallenge.starterCode);
                setChallengeResults(null);
                setChallengeBanner(null);
              }}
              runLabel="Run ▶"
              hint="⌘+Enter"
              disabled={timeUp}
            />

            {/* Concept tags row */}
            <div className="glass-card px-4 py-2.5 flex items-center flex-wrap gap-2">
              <span className="text-[11px] text-gray-500 font-bold">Concepts in this challenge:</span>
              {activeChallenge.conceptTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-violet-600/10 text-violet-700 border border-violet-600/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Timer + Checker */}
          <div className="w-full lg:w-[340px] space-y-4 shrink-0">
            {/* Countdown timer */}
            <div className="glass-card p-5 text-center space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                Countdown
              </span>
              <p
                className="font-mono text-5xl font-extrabold"
                style={{ color: timerColor, fontVariantNumeric: 'tabular-nums', textShadow: timerColor !== '#16a34a' ? `0 0 20px ${timerColor}33` : 'none' }}
              >
                {formatTime(timeLeft)}
              </p>
              <div className="flex gap-2 justify-center">
                {!timeUp && (
                  <button
                    onClick={() => setTimerRunning((r) => !r)}
                    className="px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5"
                    style={
                      timerRunning
                        ? { background: 'rgba(245,158,11,0.1)', color: '#d97706', border: '1px solid rgba(245,158,11,0.35)' }
                        : { background: '#7c3aed', color: 'white', border: '1px solid #7c3aed', boxShadow: '0 4px 16px rgba(124,58,237,0.35)' }
                    }
                  >
                    {timerRunning ? <Pause size={13} /> : <Play size={13} className="fill-current" />}
                    {timerRunning ? 'Pause' : 'Start timer'}
                  </button>
                )}
                <button
                  onClick={() => {
                    setTimerRunning(false);
                    setTimeUp(false);
                    setTimeLeft(activeChallenge.timeLimit * 60);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-500 bg-white/60 border border-white/90 hover:bg-white cursor-pointer transition-all"
                >
                  Reset
                </button>
              </div>
              <p className="text-[11px] text-amber-600 font-bold flex items-center justify-center gap-1">
                <Gift size={12} />
                +{activeChallenge.xpReward} XP if completed in time
              </p>
            </div>

            {timeUp && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-700 flex items-center gap-3 animate-bf-pop">
                <AlertCircle size={18} className="text-rose-600 shrink-0" />
                <p className="text-xs font-bold">Time's up! The editor is locked — hit Reset and try again.</p>
              </div>
            )}

            {/* Challenge checker */}
            <CheckerPanel
              kicker="Challenge submission"
              title={activeChallenge.title}
              statusLabel={completedChallenges.includes(activeChallenge.id) ? 'Completed' : 'In progress'}
              statusTone={completedChallenges.includes(activeChallenge.id) ? 'green' : 'violet'}
              rules={activeChallenge.checkerRules}
              results={challengeResults}
              onCheck={handleChallengeSubmit}
              checkLabel="Submit Solution →"
              successTitle={`Challenge Complete! +${activeChallenge.xpReward} XP earned`}
              successBody="All required checks pass. Great speed and precision!"
              showSuccess={challengeBanner === 'success'}
            />
          </div>
        </div>
      )}
    </div>
  );
};
