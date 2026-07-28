import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useOutletContext } from 'react-router-dom';
import {
  Database,
  CheckCircle2,
  Lock,
  Zap,
  Code2,
  Sparkles,
  ArrowRight,
  HelpCircle,
  RefreshCw,
  Play,
  ChevronRight,
  ChevronDown,
  AlertCircle,
  Layers
} from 'lucide-react';
import { courseData } from '../data/courseData';
import { courses } from '../data/mockData';
import {
  getStudentProgress,
  markStepComplete,
  computeProgressMetrics,
} from '../services/progressService';
import { FrontendWorkspace } from '../components/FrontendWorkspace';

export const WorkspacePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const context = useOutletContext<{ activeCourseId?: string; onOpenConcept?: (id?: string) => void; setActiveCourseId?: (id: string) => void }>();
  const activeCourseId = context?.activeCourseId || courses[0].id;
  const onOpenConcept = context?.onOpenConcept;
  const setActiveCourseId = context?.setActiveCourseId;

  const activeCourse = courses.find((c) => c.id === activeCourseId) || courses[0];

  // Track mode: 'dbms' or 'frontend'
  const isFrontendByDefault = activeCourse.category === 'Frontend';
  const [workspaceMode, setWorkspaceMode] = useState<'dbms' | 'frontend'>(
    isFrontendByDefault ? 'frontend' : 'dbms'
  );

  // Sync mode if context course switches
  useEffect(() => {
    if (activeCourse.category === 'Frontend') {
      setWorkspaceMode('frontend');
    } else if (activeCourse.category === 'Backend') {
      setWorkspaceMode('dbms');
    }
  }, [activeCourseId, activeCourse.category]);

  // Progress state for SQL
  const [progress, setProgress] = useState(getStudentProgress());
  const metrics = computeProgressMetrics(progress, courseData);

  // Active step state for SQL
  const activeMilestone = activeCourse.milestones.find((m) => m.status === 'active') || activeCourse.milestones[0];
  const activeStep = {
    id: `step-${activeMilestone.id}`,
    stepNumber: activeMilestone.id,
    totalStepsInMilestone: activeCourse.totalMilestones,
    taskTitle: activeMilestone.title,
    taskDescription: `Complete this milestone to learn: ${activeMilestone.concepts.join(', ')}`,
    targetTable: activeMilestone.tableBuilt || 'unknown',
    starterCode: '-- Write your SQL here\n',
    expectedSqlKeywords: ['CREATE', 'TABLE'],
    sqlHint: `Focus on implementing: ${activeMilestone.concepts[0]}`,
    conceptIds: []
  };

  // SQL Editor state
  const [sqlCode, setSqlCode] = useState<string>('');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [validationResult, setValidationResult] = useState<{
    success?: boolean;
    message?: string;
    tableOutput?: { name: string; columns: string[]; rows: string[][] };
  } | null>(null);

  const [expandedTableId, setExpandedTableId] = useState<string | null>(activeStep.targetTable || null);

  // Initialize or reload code when activeStep changes
  useEffect(() => {
    const savedCode = progress.userSubmissions[activeStep.id];
    setSqlCode(savedCode || activeStep.starterCode);
    setValidationResult(null);
    setShowHint(false);
  }, [activeStep.id, progress.userSubmissions]);

  // Execute SQL simulation & Validation
  const handleRunSql = () => {
    const trimmed = sqlCode.trim().toUpperCase();
    const missingKeywords = activeStep.expectedSqlKeywords.filter(
      (kw) => !trimmed.includes(kw.toUpperCase())
    );

    if (missingKeywords.length > 0) {
      setValidationResult({
        success: false,
        message: `Your SQL statement is missing required keywords: ${missingKeywords.join(', ')}. Please review your syntax.`,
      });
      return;
    }

    const targetTbl = activeCourse.tables.find((t) => t.name === activeStep.targetTable);
    const columns = targetTbl ? targetTbl.columns.map((c) => c.split(' ')[0]) : ['id', 'name', 'status'];

    setValidationResult({
      success: true,
      message: 'SQL execution successful! Schema updated with constraints.',
      tableOutput: {
        name: activeStep.targetTable || 'table',
        columns,
        rows: [
          columns.map(() => 'sample_data'),
        ],
      },
    });
  };

  // Complete step and proceed
  const handleCompleteStep = () => {
    if (!validationResult || !validationResult.success) {
      handleRunSql();
    }

    setValidationResult({
      success: true,
      message: `Milestone ${activeMilestone.id} completed! Unlocked new concepts: ${activeMilestone.concepts.join(', ')}.`,
    });
  };

  const currentConcept = activeMilestone.concepts[0] ? {
    id: `concept-${activeMilestone.id}`,
    name: activeMilestone.concepts[0]
  } : null;

  return (
    <div className="space-y-6">
      {/* Course & Mode Switcher Bar */}
      <div className="glass-card p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-600 text-white flex items-center justify-center font-bold">
            {workspaceMode === 'frontend' ? <Code2 size={18} /> : <Database size={18} />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold text-[#1e1b4b]">
                {activeCourse.title}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-violet-100 text-violet-800">
                {activeCourse.category}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              {activeCourse.subject}
            </p>
          </div>
        </div>

        {/* Workspace Mode Switcher */}
        <div className="flex bg-slate-200/80 p-1 rounded-2xl border border-slate-300/60 self-stretch md:self-auto justify-center">
          <button
            onClick={() => setWorkspaceMode('dbms')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              workspaceMode === 'dbms'
                ? 'bg-white text-violet-800 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Database size={14} />
            <span>DBMS SQL Builder</span>
          </button>
          <button
            onClick={() => setWorkspaceMode('frontend')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              workspaceMode === 'frontend'
                ? 'bg-violet-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Code2 size={14} />
            <span>Frontend Component Builder</span>
          </button>
        </div>
      </div>

      {/* Render Frontend Workspace if in Frontend mode */}
      {workspaceMode === 'frontend' ? (
        <div className="rounded-3xl overflow-hidden border border-white/80 shadow-xl min-h-[720px] bg-white">
          <FrontendWorkspace />
        </div>
      ) : (
        /* Render DBMS SQL Workspace */
        <div className="space-y-6">
          {/* Top Header Breadcrumb & Progress Bar */}
          <div className="glass-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-[#1e1b4b]">
              <Database size={16} className="text-violet-600" />
              <span>{activeCourse.title}</span>
              <span className="text-gray-400">/</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-violet-600/10 text-violet-700 border border-violet-600/20">
                Milestone {activeMilestone.id}: {activeMilestone.title}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-gray-500">Progress:</span>
              <span className="text-xs font-bold text-amber-600 font-mono">{activeCourse.progressPercent}%</span>
              <div className="w-24 sm:w-32 bg-black/5 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${activeCourse.progressPercent}%`,
                    background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Main Workspace Grid (Left: Schema Stack, Right: Step & Code Editor) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT PANEL (5 cols) — Schema Explorer */}
            <div className="lg:col-span-5 glass-card p-5 space-y-5">
              <div className="flex items-center justify-between border-b border-white/80 pb-3">
                <h2 className="text-sm font-extrabold text-[#1e1b4b] flex items-center gap-2">
                  <Database size={16} className="text-violet-600" />
                  <span>Project Database Schema</span>
                </h2>
                <span className="text-xs font-mono font-bold text-gray-500">
                  {activeCourse.tables.filter(t => t.status === 'built').length}/{activeCourse.tables.length} Built
                </span>
              </div>

              <div className="space-y-2.5">
                {activeCourse.tables.map((tbl) => {
                  const isBuilt = tbl.status === 'built';
                  const isActiveTable = tbl.status === 'active';
                  const isExpanded = expandedTableId === tbl.name;

                  return (
                    <div
                      key={tbl.name}
                      className={`rounded-xl transition-all overflow-hidden border ${
                        isBuilt
                          ? 'bg-emerald-500/5 border-emerald-500/20'
                          : isActiveTable
                          ? 'bg-violet-600/5 border-violet-600/30 ring-2 ring-violet-500/20'
                          : 'bg-black/5 border-dashed border-gray-300 opacity-70'
                      }`}
                      style={isBuilt ? { borderLeft: '3px solid #16a34a' } : isActiveTable ? { borderLeft: '3px solid #7c3aed' } : {}}
                    >
                      <div
                        onClick={() => setExpandedTableId(isExpanded ? null : tbl.name)}
                        className="p-3.5 flex items-center justify-between cursor-pointer select-none"
                      >
                        <div className="flex items-center gap-3">
                          {isBuilt ? (
                            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs">
                              ✓
                            </div>
                          ) : isActiveTable ? (
                            <div className="w-7 h-7 rounded-lg bg-violet-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                              <Sparkles size={14} />
                            </div>
                          ) : (
                            <div className="w-7 h-7 rounded-lg bg-gray-200 text-gray-400 flex items-center justify-center font-bold text-xs">
                              <Lock size={12} />
                            </div>
                          )}

                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-mono font-bold text-xs text-[#1e1b4b]">
                                {tbl.name}
                              </h3>
                              {isBuilt && (
                                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                                  Built
                                </span>
                              )}
                              {isActiveTable && (
                                <span className="bg-violet-100 text-violet-800 text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                                  Active Build
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                              {tbl.status === 'built' ? 'Table schema completed' : tbl.status === 'active' ? 'Currently building' : 'Locked - complete previous tables first'}
                            </p>
                          </div>
                        </div>

                        {isExpanded ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-gray-400" />}
                      </div>

                      {isExpanded && tbl.columns.length > 0 && (
                        <div className="px-3.5 pb-3.5 pt-2 border-t border-white/60 bg-white/40 space-y-1.5">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 block">
                            Columns & Attributes
                          </span>
                          <div className="space-y-1 font-mono text-xs">
                            {tbl.columns.map((col, idx) => (
                              <div
                                key={idx}
                                className="p-1.5 rounded-lg border border-white/80 bg-white/70 flex items-center justify-between text-[#1e1b4b]"
                              >
                                <div className="flex items-center gap-1.5">
                                  <span>{col.split(' ')[0]}</span>
                                  {col.includes('PK') && (
                                    <span className="text-[8px] bg-indigo-600 text-white px-1 rounded font-bold">
                                      PK
                                    </span>
                                  )}
                                  {col.includes('FK') && (
                                    <span className="text-[8px] bg-amber-500 text-white px-1 rounded font-bold">
                                      FK
                                    </span>
                                  )}
                                </div>
                                <span className="text-[10px] text-gray-400">
                                  {col.split(' ').slice(1).join(' ')}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT PANEL (7 cols) — Step Task & Dark SQL Workbench */}
            <div className="lg:col-span-7 space-y-6">
              {/* Step Task Card */}
              <div className="glass-card p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-white/80 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-violet-600 block">
                      MILESTONE {activeMilestone.id} · STEP {activeStep.stepNumber}
                    </span>
                    <h2 className="text-lg font-extrabold text-[#1e1b4b] tracking-tight">
                      {activeStep.taskTitle}
                    </h2>
                  </div>

                  <div className="px-3 py-1 rounded-full border border-white/80 bg-white/60 text-xs font-mono font-semibold text-gray-600">
                    Step {activeStep.stepNumber} of {activeStep.totalStepsInMilestone}
                  </div>
                </div>

                <p className="text-xs md:text-sm leading-relaxed text-gray-700">
                  {activeStep.taskDescription}
                </p>

                {/* Concept Needed Banner */}
                {currentConcept && (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                        Concept Needed
                      </span>
                      <h3 className="font-bold text-sm text-[#1e1b4b]">
                        {currentConcept.name}
                      </h3>
                    </div>
                    <button
                      onClick={() => onOpenConcept?.(currentConcept.id)}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-violet-700 bg-white/80 border border-violet-200 hover:bg-white shadow-xs shrink-0"
                    >
                      Learn {currentConcept.name} →
                    </button>
                  </div>
                )}
              </div>

              {/* Dark SQL Editor Workbench */}
              <div className="glass-card p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-[#1e1b4b]">
                    <Code2 size={16} className="text-violet-600" />
                    <span>SQL Workbench Editor</span>
                  </label>

                  <div className="flex items-center gap-3 text-xs">
                    <button
                      onClick={() => setShowHint(!showHint)}
                      className="font-bold text-violet-600 flex items-center gap-1 hover:underline"
                    >
                      <HelpCircle size={14} />
                      <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
                    </button>
                    <button
                      onClick={() => setSqlCode(activeStep.starterCode)}
                      className="flex items-center gap-1 text-gray-400 hover:text-gray-600"
                    >
                      <RefreshCw size={13} />
                      <span>Reset</span>
                    </button>
                  </div>
                </div>

                {showHint && (
                  <div className="p-3 rounded-xl bg-violet-600/10 border border-violet-600/20 text-xs text-[#1e1b4b] leading-relaxed">
                    <strong>Hint:</strong> {activeStep.sqlHint}
                  </div>
                )}

                {/* Monospace Code Input in Dark Container */}
                <div className="rounded-2xl border border-slate-800 bg-[#0d1117] overflow-hidden shadow-2xl">
                  <div className="px-4 py-2 text-xs font-mono text-slate-400 bg-[#161b22] border-b border-slate-800 flex justify-between">
                    <span>milestone_{activeMilestone.id}_schema.sql</span>
                    <span>ANSI SQL</span>
                  </div>
                  <textarea
                    value={sqlCode}
                    onChange={(e) => setSqlCode(e.target.value)}
                    rows={7}
                    className="w-full bg-[#0d1117] text-[#7ee787] font-mono text-xs md:text-sm p-4 outline-none resize-y leading-relaxed border-none"
                    placeholder="-- Write SQL query..."
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between gap-3 pt-1">
                  <button
                    onClick={handleRunSql}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 bg-white/80 text-xs font-bold text-gray-700 hover:bg-white transition-all"
                  >
                    <Play size={14} className="text-violet-600 fill-violet-600" />
                    <span>Test SQL Syntax</span>
                  </button>

                  <button
                    onClick={handleCompleteStep}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-md transition-all hover:opacity-95"
                    style={{ background: '#7c3aed' }}
                  >
                    <span>Mark Step Complete →</span>
                  </button>
                </div>

                {/* Validation Feedback Box */}
                {validationResult && (
                  <div
                    className={`p-4 rounded-2xl border text-xs space-y-2 animate-in fade-in ${
                      validationResult.success
                        ? 'bg-emerald-950/80 border-emerald-800 text-emerald-200'
                        : 'bg-rose-950/80 border-rose-800 text-rose-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold">
                      {validationResult.success ? <CheckCircle2 size={16} className="text-emerald-400" /> : <AlertCircle size={16} className="text-rose-400" />}
                      <span>{validationResult.message}</span>
                    </div>

                    {validationResult.tableOutput && (
                      <div className="overflow-x-auto pt-2">
                        <table className="w-full text-left font-mono text-[11px]">
                          <thead>
                            <tr className="border-b border-emerald-800 text-emerald-400">
                              {validationResult.tableOutput.columns.map((col) => (
                                <th key={col} className="p-1.5">{col}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {validationResult.tableOutput.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="border-b border-emerald-900/50">
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className="p-1.5">{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

