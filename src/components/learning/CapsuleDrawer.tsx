import React, { useState } from 'react';
import { X, CheckCircle2, ChevronDown, ChevronUp, Zap, Clock, Trophy, ArrowRight, Check, AlertTriangle, Lightbulb } from 'lucide-react';
import { LearningCapsule } from '../../types/learning';

interface CapsuleDrawerProps {
  capsule: LearningCapsule;
  completed: boolean;
  onClose: () => void;
  onToggleComplete: () => void;
  onNext?: () => void;
  nextTitle?: string;
}

export const CapsuleDrawer: React.FC<CapsuleDrawerProps> = ({ capsule, completed, onClose, onToggleComplete, onNext, nextTitle }) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showMistakes, setShowMistakes] = useState(false);
  const [showPractices, setShowPractices] = useState(false);

  const correctCount = capsule.quiz.filter((q, i) => quizAnswers[i] === q.correctIndex).length;
  const allCorrect = correctCount === capsule.quiz.length;

  const handleAnswer = (qIdx: number, aIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [qIdx]: aIdx }));
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
    if (allCorrect && !completed) {
      onToggleComplete();
    }
  };

  const handleClose = () => {
    if (!quizSubmitted && Object.keys(quizAnswers).length > 0) {
      handleSubmitQuiz();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.2)' }} onClick={handleClose} />

      <div
        className="relative z-10 w-full max-w-lg h-full flex flex-col overflow-hidden animate-in slide-in-from-right duration-300 border-l"
        style={{
          background: 'var(--bg-card)',
          borderColor: 'var(--border-light)',
          boxShadow: '-10px 0 40px rgba(0,0,0,0.1)',
        }}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b shrink-0" style={{ borderColor: 'var(--border-light)' }}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                style={{
                  background: capsule.difficulty === 'beginner' ? 'rgba(16,185,129,0.1)' :
                    capsule.difficulty === 'intermediate' ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)',
                  color: capsule.difficulty === 'beginner' ? '#059669' :
                    capsule.difficulty === 'intermediate' ? '#D97706' : '#DC2626',
                }}
              >
                {capsule.difficulty}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-[var(--text-muted)] font-medium">
                <Clock size={11} /> {capsule.duration} min
              </span>
              <span className="flex items-center gap-1 text-[11px] font-bold" style={{ color: 'var(--accent)' }}>
                <Zap size={11} /> +{capsule.xp} XP
              </span>
            </div>
            <button onClick={handleClose} className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] transition-colors" style={{ color: 'var(--text-muted)' }}>
              <X size={18} />
            </button>
          </div>
          <h2 className="text-xl font-extrabold" style={{ color: 'var(--text-primary)' }}>{capsule.title}</h2>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{capsule.description}</p>
          {completed && (
            <div className="flex items-center gap-1.5 mt-2 text-emerald-600 text-xs font-bold">
              <CheckCircle2 size={14} /> Completed
            </div>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* 1. Concept */}
          <section>
            <h3 className="text-[10px] font-extrabold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>Concept</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{capsule.concept}</p>
          </section>

          {/* 2. Syntax */}
          <section>
            <h3 className="text-[10px] font-extrabold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>Syntax</h3>
            <div className="rounded-xl p-4 overflow-x-auto text-sm leading-relaxed font-mono" style={{ background: '#0F0F1A', color: '#34D399' }}>
              <pre>{capsule.syntaxExample}</pre>
            </div>
          </section>

          {/* 3. Visual */}
          <section>
            <h3 className="text-[10px] font-extrabold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>Visual Explanation</h3>
            <div className="rounded-xl p-4 text-sm leading-relaxed font-mono whitespace-pre" style={{ background: 'var(--bg-body)', color: 'var(--text-secondary)', border: '1px solid var(--border-light)' }}>
              {capsule.visualExplanation}
            </div>
          </section>

          {/* 4. Real Project Usage */}
          <section>
            <h3 className="text-[10px] font-extrabold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>Real Project Usage</h3>
            <div className="space-y-1.5">
              {capsule.projectUsage.map((u, i) => (
                <div key={i} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <Check size={14} className="text-emerald-500 shrink-0" /> {u}
                </div>
              ))}
            </div>
          </section>

          {/* 5. Mini Example */}
          <section>
            <h3 className="text-[10px] font-extrabold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>Mini Example</h3>
            <div className="rounded-xl p-4 text-sm leading-relaxed" style={{ background: 'var(--accent-light)', color: 'var(--text-primary)', border: '1px solid var(--accent-border)' }}>
              <Lightbulb size={14} className="inline mr-1.5" style={{ color: 'var(--accent)' }} />
              {capsule.miniExample}
            </div>
          </section>

          {/* 6. Common Mistakes */}
          <section>
            <button onClick={() => setShowMistakes(!showMistakes)} className="flex items-center gap-2 w-full">
              <h3 className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>Common Mistakes</h3>
              {showMistakes ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {showMistakes && (
              <div className="mt-2 space-y-1.5">
                {capsule.commonMistakes.map((m, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm" style={{ color: '#DC2626' }}>
                    <AlertTriangle size={14} className="shrink-0" /> {m}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 7. Best Practices */}
          <section>
            <button onClick={() => setShowPractices(!showPractices)} className="flex items-center gap-2 w-full">
              <h3 className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>Best Practices</h3>
              {showPractices ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {showPractices && (
              <div className="mt-2 space-y-1.5">
                {capsule.bestPractices.map((p, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm" style={{ color: '#059669' }}>
                    <Check size={14} className="shrink-0" /> {p}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 8. Quiz */}
          <section>
            <button onClick={() => setShowQuiz(!showQuiz)} className="flex items-center gap-2 w-full">
              <h3 className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                Quick Quiz ({capsule.quiz.length} questions)
              </h3>
              {showQuiz ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {showQuiz && (
              <div className="mt-3 space-y-4">
                {capsule.quiz.map((q, qi) => (
                  <div key={qi} className="rounded-xl p-4" style={{ background: 'var(--bg-body)', border: '1px solid var(--border-light)' }}>
                    <p className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{qi + 1}. {q.question}</p>
                    <div className="space-y-1.5">
                      {q.options.map((opt, oi) => {
                        const selected = quizAnswers[qi] === oi;
                        const correct = quizSubmitted && oi === q.correctIndex;
                        const wrong = quizSubmitted && selected && oi !== q.correctIndex;
                        return (
                          <button
                            key={oi}
                            onClick={() => handleAnswer(qi, oi)}
                            className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm transition-all border"
                            style={{
                              background: correct ? 'rgba(16,185,129,0.08)' : wrong ? 'rgba(239,68,68,0.08)' : selected ? 'var(--accent-light)' : 'transparent',
                              borderColor: correct ? 'rgba(16,185,129,0.3)' : wrong ? 'rgba(239,68,68,0.3)' : selected ? 'var(--accent-border)' : 'var(--border-light)',
                              color: correct ? '#059669' : wrong ? '#DC2626' : 'var(--text-secondary)',
                            }}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {!quizSubmitted && Object.keys(quizAnswers).length === capsule.quiz.length && (
                  <button
                    onClick={handleSubmitQuiz}
                    className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all"
                    style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}
                  >
                    Submit Answers
                  </button>
                )}

                {quizSubmitted && (
                  <div className="rounded-xl p-4 text-center" style={{
                    background: allCorrect ? 'rgba(16,185,129,0.08)' : 'rgba(245,158,11,0.08)',
                    border: '1px solid ' + (allCorrect ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)'),
                  }}>
                    <p className="text-sm font-bold" style={{ color: allCorrect ? '#059669' : '#D97706' }}>
                      {allCorrect ? 'All correct! 🎉' : `${correctCount}/${capsule.quiz.length} correct`}
                    </p>
                    {allCorrect && !completed && (
                      <p className="text-xs mt-1 font-medium" style={{ color: 'var(--text-muted)' }}>Capsule marked as complete!</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </section>
        </div>

        {/* Footer */}
        <div className="p-5 border-t shrink-0" style={{ borderColor: 'var(--border-light)' }}>
          <div className="flex gap-3">
            <button
              onClick={() => { onToggleComplete(); onClose(); }}
              className="flex-1 py-3 rounded-xl font-bold text-sm transition-all text-white border"
              style={{
                background: completed
                  ? 'linear-gradient(135deg, #6B7280, #4B5563)'
                  : 'linear-gradient(135deg, #7C3AED, #6D28D9)',
                borderColor: completed ? 'rgba(255,255,255,0.1)' : 'rgba(124,58,237,0.3)',
              }}
            >
              {completed ? 'Mark as Incomplete' : 'Mark Complete + {capsule.xp} XP'}
            </button>
            {onNext && (
              <button
                onClick={() => { onNext(); }}
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all border"
                style={{
                  background: 'var(--bg-card)',
                  borderColor: 'var(--border-light)',
                  color: 'var(--text-primary)',
                }}
              >
                {nextTitle || 'Next'} <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
