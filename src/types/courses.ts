export interface MilestoneDetail {
  id: number;
  title: string;
  status: 'completed' | 'active' | 'locked';
  completedAt?: string;
  concepts: string[];
  learningObjectives: string[];
  deliverables: string[];
  resources: string[];
  requiredConcepts: string[];
  xpReward: number;
  estimatedHours: number;
  completionPercent: number;
}

export interface CourseConceptDetail {
  id: string;
  name: string;
  category: string;
  technology: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  readingTime: number;
  mastered: boolean;
  masteryPercent: number;
  bookmarked: boolean;
  lastReviewed: string | null;
  courseId: string;
  overview: string;
  whyItMatters: string;
  syntax: string;
  visualDiagram: string;
  projectApplication: string;
  bestPractices: string[];
  commonMistakes: string[];
  relatedConcepts: string[];
  practiceChallenge: string;
  miniExample: string;
}

export interface ProjectResource {
  id: string;
  title: string;
  type: 'documentation' | 'cheatsheet' | 'diagram' | 'pdf' | 'best-practices';
  courseId: string;
  description: string;
  tags: string[];
  bookmarked: boolean;
}

export interface CourseNote {
  id: string;
  courseId: string;
  milestoneId?: number;
  conceptId?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CourseBookmark {
  id: string;
  type: 'concept' | 'milestone' | 'resource' | 'capsule';
  targetId: string;
  courseId: string;
  title: string;
  addedAt: string;
}

export interface RecentlyViewedItem {
  id: string;
  type: 'concept' | 'project' | 'milestone' | 'resource';
  title: string;
  courseId?: string;
  viewedAt: string;
}

export interface CourseAnalyticsData {
  timeSpent: number;
  conceptsMastered: number;
  averageQuizScore: number;
  projectsCompleted: number;
  longestStreak: number;
  practiceHours: number;
  completionPercent: number;
  learningVelocity: number;
}

export interface AchievementData {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
  icon: string;
  category: string;
  progress: number;
  progressMax: number;
}
