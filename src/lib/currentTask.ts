import { courses, CourseItem } from '../data/mockData';

export interface CurrentTask {
  title: string;
  milestoneTitle: string;
  milestoneNumber: number;
  totalMilestones: number;
  stepNumber: number;
  totalSteps: number;
  minutes: number;
  conceptNeeded: string | null;
  activeTable: string | null;
  projectPercent: number;
}

const TASK_TITLES: Record<number, string> = {
  1: 'Create the Patients table',
  2: 'Build the Appointments table',
  3: 'Normalize the Departments table',
  4: 'Write your first JOIN queries',
  5: 'Speed up slow queries',
  6: 'Lock in data safety',
};

const TASK_MINUTES: Record<number, number> = {
  1: 15,
  2: 20,
  3: 20,
  4: 25,
  5: 15,
  6: 15,
};

export function getCurrentTask(courseId?: string): CurrentTask {
  const course: CourseItem = courses.find((c) => c.id === courseId) || courses[0];
  const activeMilestone =
    course.milestones.find((m) => m.status === 'active') || course.milestones[0];
  const milestoneNumber = activeMilestone?.id ?? 1;
  const activeTable =
    course.tables.find((t) => t.status === 'active')?.name ?? activeMilestone?.tableBuilt ?? null;

  return {
    title: TASK_TITLES[milestoneNumber] ?? activeMilestone?.title ?? 'Keep building',
    milestoneTitle: activeMilestone?.title ?? 'Keep building',
    milestoneNumber,
    totalMilestones: course.totalMilestones,
    stepNumber: 1,
    totalSteps: 4,
    minutes: TASK_MINUTES[milestoneNumber] ?? 20,
    conceptNeeded: activeMilestone?.concepts?.[0] ?? null,
    activeTable,
    projectPercent: course.progressPercent,
  };
}
