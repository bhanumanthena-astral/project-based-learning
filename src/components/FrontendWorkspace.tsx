import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  Play, 
  RotateCcw, 
  HelpCircle, 
  Check, 
  ArrowRight, 
  Laptop, 
  Flame, 
  Trophy, 
  Clock, 
  Layers,
  ChevronRight,
  Eye,
  Terminal,
  Zap,
  Lock
} from 'lucide-react';
import { frontendModules, FrontendComponentModule, FrontendConceptItem } from '../data/frontendData';
import { ConceptDrawer } from './ConceptDrawer';

interface FrontendWorkspaceProps {
  onModuleComplete?: (moduleId: string) => void;
}

export const FrontendWorkspace: React.FC<FrontendWorkspaceProps> = ({ onModuleComplete }) => {
  const [completedModules, setCompletedModules] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('buildfirst_frontend_completed_v1');
      return saved ? JSON.parse(saved) : ['login-page'];
    } catch {
      return ['login-page'];
    }
  });

  const [activeModuleId, setActiveModuleId] = useState<string>('login-page');
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'split'>('split');
  const [activeLeftTab, setActiveLeftTab] = useState<'concepts' | 'requirements'>('concepts');
  const [selectedConcept, setSelectedConcept] = useState<FrontendConceptItem | null>(null);

  const activeModule = frontendModules.find(m => m.id === activeModuleId) || frontendModules[0];

  // User code state keyed by module ID
  const [userCodes, setUserCodes] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('buildfirst_frontend_codes_v1');
      if (saved) return JSON.parse(saved);
    } catch {}
    
    // Default initial codes from starterCode
    const initial: Record<string, string> = {};
    frontendModules.forEach(m => {
      initial[m.id] = m.starterCode;
    });
    return initial;
  });

  const [currentCode, setCurrentCode] = useState<string>(
    userCodes[activeModuleId] || activeModule.starterCode
  );

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  // Sync current code when module switches
  useEffect(() => {
    setCurrentCode(userCodes[activeModuleId] || activeModule.starterCode);
    setVerificationError(null);
  }, [activeModuleId]);

  // Handle code edit
  const handleCodeChange = (newCode: string) => {
    setCurrentCode(newCode);
    const updated = { ...userCodes, [activeModuleId]: newCode };
    setUserCodes(updated);
    try {
      localStorage.setItem('buildfirst_frontend_codes_v1', JSON.stringify(updated));
    } catch {}
  };

  // Reset starter code
  const handleResetCode = () => {
    handleCodeChange(activeModule.starterCode);
    setVerificationError(null);
  };

  // Check test items
  const checkStatus = activeModule.checkItems.map(item => {
    const regex = new RegExp(item.regexOrKeyword, 'i');
    const passed = regex.test(currentCode);
    return { ...item, passed };
  });

  const allPassed = checkStatus.every(item => item.passed);

  // Handle Verify & Mark Complete
  const handleVerify = () => {
    if (allPassed) {
      if (!completedModules.includes(activeModuleId)) {
        const nextCompleted = [...completedModules, activeModuleId];
        setCompletedModules(nextCompleted);
        try {
          localStorage.setItem('buildfirst_frontend_completed_v1', JSON.stringify(nextCompleted));
        } catch {}
      }
      setVerificationError(null);
      setIsSuccessModalOpen(true);
      if (onModuleComplete) {
        onModuleComplete(activeModuleId);
      }
    } else {
      const failed = checkStatus.filter(c => !c.passed);
      setVerificationError(`Missing ${failed.length} requirement(s). Please review the requirements tab.`);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] text-[#1e1b4b]">
      {/* 1. Component Module Selector Bar */}
      <div className="bg-white/80 backdrop-blur-md border-b border-violet-100 px-6 py-4 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-violet-600/10 text-violet-700 flex items-center justify-center font-bold">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#1e1b4b]">
                Select Frontend Component to Build
              </h2>
              <p className="text-xs text-gray-500">
                Choose a module to study concepts and craft in the live interactive workbench
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-violet-700 bg-violet-50 px-3 py-1.5 rounded-full border border-violet-200/60 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>{completedModules.length} / {frontendModules.length} Completed</span>
            </span>
          </div>
        </div>

        {/* Module Cards Carousel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {frontendModules.map((mod) => {
            const isCompleted = completedModules.includes(mod.id);
            const isActive = mod.id === activeModuleId;

            return (
              <button
                key={mod.id}
                onClick={() => setActiveModuleId(mod.id)}
                className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                  isActive
                    ? 'bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-500/20 ring-2 ring-violet-400/40'
                    : isCompleted
                    ? 'bg-emerald-50/60 hover:bg-emerald-50 border-emerald-200/80 text-slate-800'
                    : 'bg-white hover:bg-violet-50/50 border-slate-200 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : isCompleted
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-violet-100 text-violet-700'
                    }`}
                  >
                    {mod.category}
                  </span>

                  {isCompleted ? (
                    <CheckCircle2 className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-600'}`} />
                  ) : (
                    <span className={`text-[10px] font-bold ${isActive ? 'text-violet-100' : 'text-gray-400'}`}>
                      {mod.estimatedMinutes}m
                    </span>
                  )}
                </div>

                <h4 className={`text-xs font-extrabold truncate mb-1 ${isActive ? 'text-white' : 'text-slate-900'}`}>
                  {mod.name}
                </h4>

                <div className="flex items-center justify-between text-[11px]">
                  <span className={`font-mono text-[10px] ${isActive ? 'text-violet-200' : 'text-gray-500'}`}>
                    {mod.filename}
                  </span>
                  <span className={`font-bold ${isActive ? 'text-violet-100' : 'text-violet-600'}`}>
                    {isActive ? 'Building →' : isCompleted ? 'Built' : 'Build'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Workspace Body: Left (Learning/Requirements) & Right (Playground/Preview) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        {/* Left Column: Learning & Requirements (4 Cols) */}
        <div className="lg:col-span-5 bg-white border-r border-slate-200 flex flex-col h-full overflow-hidden">
          {/* Header & Tabs */}
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-violet-600 block mb-0.5">
                ACTIVE COMPONENT
              </span>
              <h3 className="text-base font-extrabold text-[#1e1b4b] flex items-center gap-2">
                <span>{activeModule.name}</span>
                <span className="text-xs font-mono font-medium text-gray-400">({activeModule.filename})</span>
              </h3>
            </div>

            <div className="flex bg-slate-200/70 p-1 rounded-xl gap-1">
              <button
                onClick={() => setActiveLeftTab('concepts')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeLeftTab === 'concepts'
                    ? 'bg-white text-violet-700 shadow-2xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Concepts ({activeModule.concepts.length})
              </button>
              <button
                onClick={() => setActiveLeftTab('requirements')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                  activeLeftTab === 'requirements'
                    ? 'bg-white text-violet-700 shadow-2xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Checks
                <span className={`w-2 h-2 rounded-full ${allPassed ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              </button>
            </div>
          </div>

          {/* Left Content Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {activeLeftTab === 'concepts' ? (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-violet-50/70 border border-violet-100 space-y-1">
                  <h4 className="text-xs font-bold text-violet-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-violet-600" />
                    <span>Learning Goals for this Component</span>
                  </h4>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {activeModule.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
                    Core CS & React Concepts
                  </h4>

                  {activeModule.concepts.map((concept) => (
                    <div
                      key={concept.id}
                      className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-violet-300 transition-all space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-violet-100 text-violet-800 px-2.5 py-0.5 rounded-full">
                          {concept.category}
                        </span>
                        <button
                          onClick={() => setSelectedConcept(concept)}
                          className="text-xs text-violet-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          Deep Dive →
                        </button>
                      </div>

                      <h5 className="text-sm font-bold text-[#1e1b4b]">{concept.name}</h5>
                      <p className="text-xs text-gray-600 leading-relaxed">{concept.explanation}</p>

                      <div className="bg-[#0d1117] text-emerald-400 rounded-xl p-3 text-[11px] font-mono overflow-x-auto">
                        <pre>{concept.codeExample}</pre>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-violet-600" />
                    <span>Real-Time Component Requirements</span>
                  </h4>
                  <p className="text-xs text-gray-600">
                    As you edit code in the workbench, Nxtagent automatically tests your JSX structure against these criteria:
                  </p>
                </div>

                <div className="space-y-2.5">
                  {checkStatus.map((check) => (
                    <div
                      key={check.id}
                      className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                        check.passed
                          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                            check.passed ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {check.passed ? <Check className="w-3.5 h-3.5" /> : '•'}
                        </div>
                        <span className="text-xs font-semibold">{check.description}</span>
                      </div>

                      <span
                        className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                          check.passed ? 'bg-emerald-200/80 text-emerald-800' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {check.passed ? 'PASSED' : 'PENDING'}
                      </span>
                    </div>
                  ))}
                </div>

                {verificationError && (
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium">
                    {verificationError}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50/80 flex items-center justify-between">
            <button
              onClick={handleResetCode}
              className="text-xs font-bold text-gray-500 hover:text-violet-700 flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-white transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Starter Code</span>
            </button>

            <button
              onClick={handleVerify}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold text-white shadow-md flex items-center gap-2 cursor-pointer transition-all ${
                allPassed
                  ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
                  : 'bg-violet-600 hover:bg-violet-700 shadow-violet-600/20'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>{allPassed ? 'Verify & Unlock Next Component →' : 'Test Code Requirements'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Code Workbench & Live Interactive Preview (7 Cols) */}
        <div className="lg:col-span-7 bg-[#0f172a] flex flex-col h-full overflow-hidden">
          {/* Workbench Header */}
          <div className="bg-[#1e293b] border-b border-slate-800 px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-violet-400" />
              <span className="text-xs font-mono font-bold text-slate-200">{activeModule.filename}</span>
              <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded-full">
                React 18 JSX
              </span>
            </div>

            {/* View Switcher Tabs */}
            <div className="flex bg-slate-900/80 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab('editor')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'editor' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Code Editor
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'preview' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Live Preview
              </button>
              <button
                onClick={() => setActiveTab('split')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'split' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Split View
              </button>
            </div>
          </div>

          {/* Workbench Body */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden bg-[#0d1117]">
            {/* Editor Area */}
            {(activeTab === 'editor' || activeTab === 'split') && (
              <div
                className={`${
                  activeTab === 'split' ? 'lg:col-span-6 border-r border-slate-800' : 'lg:col-span-12'
                } flex flex-col h-full overflow-hidden relative`}
              >
                <div className="px-4 py-2 bg-[#161b22] border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Component Source Code</span>
                  <span>JSX Syntax</span>
                </div>

                <div className="flex-1 relative overflow-auto p-4 font-mono text-xs leading-relaxed text-slate-100">
                  <textarea
                    value={currentCode}
                    onChange={(e) => handleCodeChange(e.target.value)}
                    spellCheck={false}
                    className="w-full h-full bg-transparent text-emerald-300 font-mono text-xs leading-relaxed outline-none resize-none"
                    style={{ whiteSpace: 'pre', tabSize: 2 }}
                  />
                </div>
              </div>
            )}

            {/* Live Interactive Preview Area */}
            {(activeTab === 'preview' || activeTab === 'split') && (
              <div
                className={`${
                  activeTab === 'split' ? 'lg:col-span-6' : 'lg:col-span-12'
                } flex flex-col h-full overflow-hidden bg-slate-100`}
              >
                <div className="px-4 py-2 bg-slate-200 border-b border-slate-300 flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-violet-600" />
                    <span>Live Rendered Component Preview</span>
                  </span>
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded-full text-slate-500 font-mono">
                    Interactive Preview
                  </span>
                </div>

                <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-radial from-violet-50/50 via-slate-100 to-slate-200">
                  {/* Real Render Simulation Container */}
                  <div className="w-full h-full flex items-center justify-center">
                    <LiveComponentRenderer code={currentCode} module={activeModule} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Concept Deep Dive Drawer */}
      {selectedConcept && (
        <ConceptDrawer
          conceptId={selectedConcept.id}
          onClose={() => setSelectedConcept(null)}
        />
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white text-center space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto font-bold text-2xl shadow-inner">
              🎉
            </div>

            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                COMPONENT VERIFIED!
              </span>
              <h3 className="text-xl font-extrabold text-[#1e1b4b] mt-2">
                {activeModule.name} Completed!
              </h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                You successfully built and verified the <span className="font-bold text-violet-700">{activeModule.filename}</span> component! You earned <span className="font-bold text-amber-600">+150 XP</span>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-violet-50/60 border border-violet-100 text-left space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-violet-700 block">
                CONCEPTS MASTERED
              </span>
              <ul className="text-xs text-gray-700 space-y-1">
                {activeModule.concepts.map((c) => (
                  <li key={c.id} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{c.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => {
                setIsSuccessModalOpen(false);
                const currentIndex = frontendModules.findIndex(m => m.id === activeModuleId);
                if (currentIndex >= 0 && currentIndex < frontendModules.length - 1) {
                  setActiveModuleId(frontendModules[currentIndex + 1].id);
                }
              }}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Continue to Next Component →</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper renderer that safely simulates rendered JSX output for student code
function LiveComponentRenderer({ code, module }: { code: string; module: FrontendComponentModule }) {
  // We extract state and render mock controls based on module type and student code
  const isEmail = /type="email"|type='email'/i.test(code);
  const isPass = /type="password"|type='password'/i.test(code);
  const isCard = module.previewType === 'card';
  const isSearch = module.previewType === 'search';
  const isNav = module.previewType === 'nav';
  const isModal = module.previewType === 'modal';

  if (isNav) {
    return (
      <div className="w-full max-w-xl bg-white/90 backdrop-blur-md rounded-2xl border border-violet-100 p-4 shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b pb-3 border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-600 text-white flex items-center justify-center font-bold">⚡</div>
            <span className="font-extrabold text-slate-900 text-sm">JobBoardCS</span>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-violet-600 text-white text-xs font-bold rounded-lg">Jobs</span>
            <span className="px-3 py-1 text-slate-600 text-xs font-bold rounded-lg">Applications</span>
            <span className="px-3 py-1 text-slate-600 text-xs font-bold rounded-lg">Saved</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">🔥 12 Days</span>
            <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">AK</div>
          </div>
        </div>
        <div className="text-center py-6 text-xs text-slate-400 italic">
          (Interactive Navbar Component Live Header)
        </div>
      </div>
    );
  }

  if (isSearch) {
    return (
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 p-5 shadow-lg space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search job title, skills..."
            className="flex-1 px-3 py-2 text-xs border rounded-xl outline-none"
          />
          <select className="px-3 py-2 text-xs border rounded-xl bg-white font-semibold">
            <option>All Types</option>
            <option>Full-time</option>
            <option>Contract</option>
          </select>
        </div>
        <div className="flex justify-between items-center text-xs">
          <label className="flex items-center gap-1.5 text-slate-600">
            <input type="checkbox" /> Remote Jobs Only
          </label>
          <button className="text-violet-600 font-bold hover:underline cursor-pointer">Clear Filters</button>
        </div>
      </div>
    );
  }

  if (isCard) {
    return (
      <div className="w-full max-w-sm bg-white rounded-2xl border-2 border-violet-500 p-5 shadow-xl space-y-3 relative">
        <span className="absolute -top-3 right-4 bg-violet-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
          FEATURED JOB
        </span>
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-bold text-slate-400">Stripe</span>
            <h3 className="text-base font-extrabold text-slate-900">Senior Frontend Engineer</h3>
            <p className="text-xs text-slate-500">📍 San Francisco, CA (Hybrid)</p>
          </div>
          <button className="text-lg text-amber-500">★</button>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {['React', 'TypeScript', 'Tailwind'].map(t => (
            <span key={t} className="text-[10px] font-bold bg-violet-100 text-violet-800 px-2 py-0.5 rounded-md">
              {t}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-slate-100">
          <span className="text-sm font-extrabold text-emerald-600">$140,000 - $180,000</span>
          <button className="bg-violet-600 text-white text-xs font-bold px-4 py-2 rounded-xl hover:opacity-90">
            Apply Now →
          </button>
        </div>
      </div>
    );
  }

  if (isModal) {
    return (
      <div className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 p-6 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-extrabold uppercase text-violet-600 bg-violet-50 px-2.5 py-0.5 rounded-full">
            APPLYING NOW
          </span>
          <button className="w-6 h-6 rounded-full bg-slate-100 text-xs font-bold">✕</button>
        </div>
        <h3 className="text-base font-extrabold text-slate-900">Senior Frontend Engineer</h3>
        <div className="space-y-2">
          <input type="text" placeholder="Full Name" className="w-full px-3 py-2 text-xs border rounded-xl" />
          <input type="email" placeholder="Email Address" className="w-full px-3 py-2 text-xs border rounded-xl" />
          <textarea placeholder="Cover note / pitch..." rows={2} className="w-full px-3 py-2 text-xs border rounded-xl" />
        </div>
        <button className="w-full bg-violet-600 text-white text-xs font-bold py-2.5 rounded-xl">
          Submit Application →
        </button>
      </div>
    );
  }

  // Default Login Page Component render preview
  return (
    <div className="w-full max-w-sm bg-white/90 backdrop-blur-xl rounded-3xl border border-white p-7 shadow-2xl space-y-5">
      <div>
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-violet-600 bg-violet-100 px-3 py-1 rounded-full">
          STUDENT PORTAL
        </span>
        <h3 className="text-xl font-extrabold text-slate-900 mt-2">Sign in</h3>
        <p className="text-xs text-slate-500">Enter your credentials to continue building</p>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
          <input
            type="email"
            placeholder="student@university.edu"
            className="w-full px-3.5 py-2.5 text-xs border border-violet-200 rounded-xl outline-none focus:ring-2 ring-violet-500"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-3.5 py-2.5 text-xs border border-violet-200 rounded-xl outline-none focus:ring-2 ring-violet-500"
          />
        </div>

        <button className="w-full bg-violet-600 text-white text-xs font-extrabold py-3 rounded-xl shadow-md hover:bg-violet-700 transition-all cursor-pointer">
          Sign in to Workspace →
        </button>
      </div>
    </div>
  );
}
