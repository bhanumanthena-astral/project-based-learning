import React from 'react';
import {
  Search, BookOpen, Zap, Clock, Trophy, BrainCircuit, Filter,
  ChevronRight, Sparkles,
} from 'lucide-react';
import { useLearningCapsules } from '../hooks/useLearningCapsules';
import { CapsuleCard } from '../components/learning/CapsuleCard';
import { LearningPathCard } from '../components/learning/LearningPathCard';
import { CapsuleDrawer } from '../components/learning/CapsuleDrawer';
import { CapsuleTopic } from '../types/learning';

const topicFilters: { label: string; value: CapsuleTopic | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'SQL', value: 'sql' },
  { label: 'React', value: 'react' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Git', value: 'git' },
  { label: 'APIs', value: 'api' },
];

const topicColors: Record<string, string> = {
  all: '#7C3AED',
  sql: '#7C3AED',
  react: '#0EA5E9',
  javascript: '#F59E0B',
  git: '#10B981',
  api: '#EC4899',
};

export const LearningCapsulesPage: React.FC = () => {
  const {
    filteredCapsules,
    learningPaths,
    selectedCapsule,
    setSelectedCapsule,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    capsuleProgress,
    toggleComplete,
    progress,
  } = useLearningCapsules();

  const handleNextCapsule = () => {
    if (!selectedCapsule) return;
    const currentIndex = filteredCapsules.findIndex(c => c.id === selectedCapsule.id);
    if (currentIndex < filteredCapsules.length - 1) {
      setSelectedCapsule(filteredCapsules[currentIndex + 1]);
    }
  };

  const stats = [
    { label: 'Capsules Completed', value: progress.completed, icon: <BookOpen size={18} />, color: '#7C3AED' },
    { label: 'Current Streak', value: `${progress.streak} days`, icon: <Trophy size={18} />, color: '#F59E0B' },
    { label: 'Total Learning Time', value: `${progress.totalTime}m`, icon: <Clock size={18} />, color: '#0EA5E9' },
    { label: 'Concepts Mastered', value: progress.conceptsMastered, icon: <BrainCircuit size={18} />, color: '#10B981' },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="glass-card-elevated p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={18} className="text-violet-600" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-violet-600">
                Learning Capsules
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
              Master essential concepts in minutes
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              Exactly what you need before you build. 2-8 minutes per capsule.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card-interactive p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: stat.color + '12', color: stat.color }}>
                {stat.icon}
              </div>
              <div>
                <p className="text-xl font-extrabold font-mono" style={{ color: 'var(--text-primary)' }}>{stat.value}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Paths */}
      <div>
        <h2 className="text-base font-extrabold mb-4" style={{ color: 'var(--text-primary)' }}>Learning Paths</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
          {learningPaths.map((path) => (
            <LearningPathCard
              key={path.id}
              path={path}
              onClick={() => {
                setFilters(prev => ({ ...prev, topic: path.topic }));
                setSearchQuery('');
              }}
            />
          ))}
        </div>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search capsules by title, topic, or difficulty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-input w-full pl-10 pr-4"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {topicFilters.map((tf) => (
            <button
              key={tf.value}
              onClick={() => setFilters(prev => ({ ...prev, topic: tf.value }))}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border"
              style={{
                background: filters.topic === tf.value ? topicColors[tf.value] + '15' : 'var(--bg-card)',
                borderColor: filters.topic === tf.value ? topicColors[tf.value] + '40' : 'var(--border-light)',
                color: filters.topic === tf.value ? topicColors[tf.value] : 'var(--text-secondary)',
              }}
            >
              {tf.label}
            </button>
          ))}

          <div className="flex-1" />

          {(['all', 'completed', 'in-progress', 'locked'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilters(prev => ({ ...prev, status }))}
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all border"
              style={{
                background: filters.status === status ? 'var(--accent-light)' : 'var(--bg-card)',
                borderColor: filters.status === status ? 'var(--accent-border)' : 'var(--border-light)',
                color: filters.status === status ? 'var(--accent)' : 'var(--text-muted)',
              }}
            >
              {status === 'all' ? 'All' : status === 'in-progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Capsule Grid */}
      {filteredCapsules.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>No capsules found</p>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Try adjusting your filters or search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filteredCapsules.map((capsule) => {
            const isLocked = !capsule.prerequisites.every(p => capsuleProgress[p]);
            return (
              <CapsuleCard
                key={capsule.id}
                capsule={capsule}
                completed={capsuleProgress[capsule.id]}
                locked={isLocked}
                onClick={() => !isLocked && setSelectedCapsule(capsule)}
              />
            );
          })}
        </div>
      )}

      {/* Capsule Detail Drawer */}
      {selectedCapsule && (
        <CapsuleDrawer
          capsule={selectedCapsule}
          completed={capsuleProgress[selectedCapsule.id]}
          onClose={() => setSelectedCapsule(null)}
          onToggleComplete={() => toggleComplete(selectedCapsule.id)}
          onNext={(() => {
            const idx = filteredCapsules.findIndex(c => c.id === selectedCapsule.id);
            return idx < filteredCapsules.length - 1 ? handleNextCapsule : undefined;
          })()}
          nextTitle={(() => {
            const idx = filteredCapsules.findIndex(c => c.id === selectedCapsule.id);
            return idx < filteredCapsules.length - 1 ? filteredCapsules[idx + 1].title : undefined;
          })()}
        />
      )}
    </div>
  );
};
