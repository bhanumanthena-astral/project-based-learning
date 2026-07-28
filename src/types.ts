export interface ColumnSchema {
  name: string;
  type: string;
  isPrimaryKey?: boolean;
  isForeignKey?: boolean;
  references?: string;
  isNullable?: boolean;
  description?: string;
}

export interface TableSchema {
  id: string;
  name: string;
  description: string;
  status: 'built' | 'active' | 'locked';
  unlockedAtMilestone: number;
  columns: ColumnSchema[];
}

export interface Step {
  id: string;
  stepNumber: number;
  totalStepsInMilestone: number;
  taskTitle: string;
  taskDescription: string;
  conceptIds: string[];
  targetTable: string;
  columnsAdded: ColumnSchema[];
  sqlHint: string;
  expectedSqlKeywords: string[];
  starterCode: string;
  solutionCode: string;
}

export interface Milestone {
  id: number;
  title: string;
  status: 'completed' | 'active' | 'locked';
  summary: string;
  steps: Step[];
  unlockedConcepts: string[];
}

export interface Concept {
  id: string;
  name: string;
  category: 'Database Fundamentals' | 'Relationships' | 'Optimization' | 'Integrity & Transactions';
  explanation: string;
  miniExample: string;
  projectApplication: string;
  usedInTables: string[];
}

export interface Course {
  id: string;
  title: string;
  subject: string;
  estimatedHours: number;
  totalMilestones: number;
  totalTables: number;
  description: string;
  milestones: Milestone[];
  concepts: Concept[];
  initialTables: TableSchema[];
}

export interface StudentProgress {
  currentMilestoneId: number;
  currentStepId: string;
  completedStepIds: string[];
  completedMilestoneIds: number[];
  unlockedTableIds: string[];
  userSubmissions: Record<string, string>; // stepId -> sql
  lastUpdated: string;
}
