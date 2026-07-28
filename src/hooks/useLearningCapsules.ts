import { useState, useCallback, useMemo } from 'react';
import { capsules, learningPaths } from '../data/learningCapsules';
import { LearningCapsule, CapsuleProgress, LearningFilters } from '../types/learning';
import { currentUser } from '../data/mockData';

const STORAGE_KEY = 'nxtagent_capsule_progress';

function loadProgress(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return {};
}

function saveProgress(progress: Record<string, boolean>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function useLearningCapsules() {
  const [selectedCapsule, setSelectedCapsule] = useState<LearningCapsule | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<LearningFilters>({
    topic: 'all',
    difficulty: 'all',
    status: 'all',
  });

  const [capsuleProgress, setCapsuleProgress] = useState<Record<string, boolean>>(() => {
    const stored = loadProgress();
    const merged: Record<string, boolean> = {};
    for (const c of capsules) {
      merged[c.id] = stored[c.id] ?? c.completed;
    }
    return merged;
  });

  const toggleComplete = useCallback((capsuleId: string) => {
    setCapsuleProgress(prev => {
      const next = { ...prev, [capsuleId]: !prev[capsuleId] };
      saveProgress(next);
      return next;
    });
  }, []);

  const filteredCapsules = useMemo(() => {
    return capsules.filter(c => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesSearch = c.title.toLowerCase().includes(q) ||
          c.topic.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.difficulty.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }
      if (filters.topic !== 'all' && c.topic !== filters.topic) return false;
      if (filters.difficulty !== 'all' && c.difficulty !== filters.difficulty) return false;
      if (filters.status === 'completed' && !capsuleProgress[c.id]) return false;
      if (filters.status === 'in-progress' && capsuleProgress[c.id]) return false;
      if (filters.status === 'locked') {
        const hasPrereqs = c.prerequisites.every(p => capsuleProgress[p]);
        if (hasPrereqs) return false;
      }
      return true;
    });
  }, [searchQuery, filters, capsuleProgress]);

  const progress: CapsuleProgress = useMemo(() => {
    const completedIds = Object.entries(capsuleProgress).filter(([, v]) => v).map(([k]) => k);
    const completedCount = completedIds.length;
    const totalXP = completedIds.reduce((sum, id) => {
      const cap = capsules.find(c => c.id === id);
      return sum + (cap?.xp ?? 0);
    }, 0);
    return {
      completed: completedCount,
      inProgress: capsules.filter(c => !capsuleProgress[c.id] && c.prerequisites.every(p => capsuleProgress[p])).length,
      totalXP,
      streak: currentUser.streak,
      totalTime: completedCount * 4,
      conceptsMastered: completedCount,
    };
  }, [capsuleProgress]);

  const capsulesByPath = useMemo(() => {
    return learningPaths.map(path => ({
      ...path,
      capsules: capsules.filter(c => c.topic === path.topic),
      completedCount: capsules.filter(c => c.topic === path.topic && capsuleProgress[c.id]).length,
    }));
  }, [capsuleProgress]);

  return {
    capsules,
    filteredCapsules,
    learningPaths: capsulesByPath,
    selectedCapsule,
    setSelectedCapsule,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    capsuleProgress,
    toggleComplete,
    progress,
  };
}
