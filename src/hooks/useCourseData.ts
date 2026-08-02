import { useState, useCallback } from 'react';
import { courses } from '../data/mockData';
import { projectMilestones, detailedConcepts, analyticsData, courseAchievements } from '../data/extendedCourseData';
import { CourseConceptDetail, MilestoneDetail, CourseAnalyticsData, AchievementData } from '../types/courses';

export function useCourseData(courseId?: string) {
  const course = courses.find(c => c.id === courseId) || courses[0];
  const milestones: MilestoneDetail[] = projectMilestones[courseId || course.id] || [];
  const concepts: CourseConceptDetail[] = detailedConcepts.filter(c => c.courseId === (courseId || course.id));
  const analytics: CourseAnalyticsData = analyticsData;
  const achievements: AchievementData[] = courseAchievements;

  return { course, milestones, concepts, analytics, achievements };
}

export function useConceptMastery(conceptId: string) {
  const [mastery, setMastery] = useState(() => {
    const stored = localStorage.getItem(`concept-mastery-${conceptId}`);
    if (stored) return JSON.parse(stored);
    const found = detailedConcepts.find(c => c.id === conceptId);
    return { percent: found?.masteryPercent || 0, lastReviewed: found?.lastReviewed || null };
  });

  const updateMastery = useCallback((newPercent: number) => {
    const updated = { percent: newPercent, lastReviewed: new Date().toISOString().split('T')[0] };
    setMastery(updated);
    localStorage.setItem(`concept-mastery-${conceptId}`, JSON.stringify(updated));
  }, [conceptId]);

  return { mastery, updateMastery };
}
