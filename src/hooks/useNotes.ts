import { useState, useCallback } from 'react';
import { CourseNote } from '../types/courses';

const STORAGE_KEY = 'course-notes';

function loadNotes(): CourseNote[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}

export function useNotes() {
  const [notes, setNotes] = useState<CourseNote[]>(loadNotes);

  const save = useCallback((n: CourseNote[]) => {
    setNotes(n);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(n));
  }, []);

  const addNote = useCallback((note: Omit<CourseNote, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newNote: CourseNote = { ...note, id: `note-${Date.now()}`, createdAt: now, updatedAt: now };
    save([...notes, newNote]);
    return newNote;
  }, [notes, save]);

  const updateNote = useCallback((id: string, content: string) => {
    save(notes.map(n => n.id === id ? { ...n, content, updatedAt: new Date().toISOString() } : n));
  }, [notes, save]);

  const deleteNote = useCallback((id: string) => {
    save(notes.filter(n => n.id !== id));
  }, [notes, save]);

  const getNotesForCourse = useCallback((courseId: string) => {
    return notes.filter(n => n.courseId === courseId);
  }, [notes]);

  const getNotesForMilestone = useCallback((courseId: string, milestoneId: number) => {
    return notes.filter(n => n.courseId === courseId && n.milestoneId === milestoneId);
  }, [notes]);

  const getNotesForConcept = useCallback((conceptId: string) => {
    return notes.filter(n => n.conceptId === conceptId);
  }, [notes]);

  return { notes, addNote, updateNote, deleteNote, getNotesForCourse, getNotesForMilestone, getNotesForConcept };
}
