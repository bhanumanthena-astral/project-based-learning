export type CapsuleTopic = 'sql' | 'react' | 'javascript' | 'git' | 'api';
export type CapsuleDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface LearningCapsule {
  id: string;
  title: string;
  description: string;
  topic: CapsuleTopic;
  difficulty: CapsuleDifficulty;
  duration: number;
  concept: string;
  syntaxExample: string;
  visualExplanation: string;
  projectUsage: string[];
  miniExample: string;
  commonMistakes: string[];
  bestPractices: string[];
  quiz: QuizQuestion[];
  prerequisites: string[];
  xp: number;
  completed: boolean;
  completedAt?: string;
  quizScore?: number;
}

export interface LearningPath {
  id: string;
  title: string;
  topic: CapsuleTopic;
  description: string;
  capsuleCount: number;
  totalDuration: number;
  color: string;
  icon: string;
}

export interface CapsuleProgress {
  completed: number;
  inProgress: number;
  totalXP: number;
  streak: number;
  totalTime: number;
  conceptsMastered: number;
}

export interface LearningFilters {
  topic: CapsuleTopic | 'all';
  difficulty: CapsuleDifficulty | 'all';
  status: 'all' | 'completed' | 'in-progress' | 'locked';
}
