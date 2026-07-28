import { StudentProgress, Course, TableSchema } from '../types';
import { courseData } from '../data/courseData';

const STORAGE_KEY = 'buildfirst_student_progress_v1';

export const initialProgress: StudentProgress = {
  currentMilestoneId: 2,
  currentStepId: '2-1',
  completedStepIds: ['1-1', '1-2'],
  completedMilestoneIds: [1],
  unlockedTableIds: ['patients', 'doctors'],
  userSubmissions: {
    '1-1': `CREATE TABLE patients (
  id INT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  dob DATE,
  phone VARCHAR(20),
  blood_type VARCHAR(5)
);`,
    '1-2': `CREATE TABLE doctors (
  id INT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  specialization VARCHAR(100),
  license_number VARCHAR(50) UNIQUE
);`,
  },
  lastUpdated: new Date().toISOString(),
};

export const getStudentProgress = (): StudentProgress => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProgress));
      return initialProgress;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading student progress from localStorage:', e);
    return initialProgress;
  }
};

export const saveStudentProgress = (progress: StudentProgress): void => {
  try {
    progress.lastUpdated = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Error saving student progress to localStorage:', e);
  }
};

export const resetStudentProgress = (): StudentProgress => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProgress));
  } catch (e) {
    console.error('Error resetting student progress:', e);
  }
  return initialProgress;
};

export const markStepComplete = (
  stepId: string,
  sqlSubmission: string,
  course: Course = courseData
): { updatedProgress: StudentProgress; unlockedMilestone: boolean; unlockedTableId?: string } => {
  const current = getStudentProgress();
  if (!current.completedStepIds.includes(stepId)) {
    current.completedStepIds.push(stepId);
  }
  current.userSubmissions[stepId] = sqlSubmission;

  let unlockedTableId: string | undefined = undefined;
  let unlockedMilestone = false;

  for (const milestone of course.milestones) {
    const step = milestone.steps.find((s) => s.id === stepId);
    if (step) {
      if (step.targetTable && !current.unlockedTableIds.includes(step.targetTable)) {
        current.unlockedTableIds.push(step.targetTable);
        unlockedTableId = step.targetTable;
      }

      const allMilestoneStepsDone = milestone.steps.every((s) =>
        current.completedStepIds.includes(s.id)
      );

      if (allMilestoneStepsDone && !current.completedMilestoneIds.includes(milestone.id)) {
        current.completedMilestoneIds.push(milestone.id);
        unlockedMilestone = true;

        const nextMilestone = course.milestones.find((m) => m.id === milestone.id + 1);
        if (nextMilestone) {
          current.currentMilestoneId = nextMilestone.id;
          if (nextMilestone.steps.length > 0) {
            current.currentStepId = nextMilestone.steps[0].id;
          }
        }
      } else {
        const currentStepIndex = milestone.steps.findIndex((s) => s.id === stepId);
        if (currentStepIndex >= 0 && currentStepIndex < milestone.steps.length - 1) {
          current.currentStepId = milestone.steps[currentStepIndex + 1].id;
        }
      }
      break;
    }
  }

  saveStudentProgress(current);
  return { updatedProgress: current, unlockedMilestone, unlockedTableId };
};

export const computeProgressMetrics = (progress: StudentProgress, course: Course = courseData) => {
  const totalSteps = course.milestones.reduce((acc, m) => acc + m.steps.length, 0);
  const completedStepsCount = progress.completedStepIds.length;
  const percentageComplete = totalSteps > 0 ? Math.round((completedStepsCount / totalSteps) * 100) : 0;

  const totalTablesCount = course.totalTables;
  const builtTablesCount = progress.unlockedTableIds.length;

  const unlockedConceptIds = new Set<string>();
  course.milestones.forEach((m) => {
    m.steps.forEach((s) => {
      if (progress.completedStepIds.includes(s.id)) {
        s.conceptIds.forEach((cid) => unlockedConceptIds.add(cid));
      }
    });
  });

  const tablesWithStatus: TableSchema[] = course.initialTables.map((tbl) => {
    if (progress.unlockedTableIds.includes(tbl.id)) {
      return { ...tbl, status: 'built' };
    }
    const currentMilestone = course.milestones.find((m) => m.id === progress.currentMilestoneId);
    const activeStep = currentMilestone?.steps.find((s) => s.id === progress.currentStepId);
    if (activeStep?.targetTable === tbl.id) {
      return { ...tbl, status: 'active' };
    }
    return { ...tbl, status: 'locked' };
  });

  return {
    percentageComplete,
    completedStepsCount,
    totalSteps,
    builtTablesCount,
    totalTablesCount,
    unlockedConceptCount: unlockedConceptIds.size,
    totalConceptCount: course.concepts.length,
    unlockedConceptIds: Array.from(unlockedConceptIds),
    tablesWithStatus,
  };
};

export const progressService = {
  getProgress: getStudentProgress,
  saveProgress: saveStudentProgress,
  resetProgress: resetStudentProgress,
  markStepComplete,
  computeProgressMetrics,
};
