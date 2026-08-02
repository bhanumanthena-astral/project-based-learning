import { useState, useCallback } from 'react';
import { CourseBookmark } from '../types/courses';

const STORAGE_KEY = 'course-bookmarks';

function loadBookmarks(): CourseBookmark[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<CourseBookmark[]>(loadBookmarks);

  const save = useCallback((b: CourseBookmark[]) => {
    setBookmarks(b);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(b));
  }, []);

  const addBookmark = useCallback((bookmark: CourseBookmark) => {
    const exists = bookmarks.find(b => b.targetId === bookmark.targetId && b.type === bookmark.type);
    if (!exists) save([...bookmarks, { ...bookmark, addedAt: new Date().toISOString() }]);
  }, [bookmarks, save]);

  const removeBookmark = useCallback((targetId: string, type: string) => {
    save(bookmarks.filter(b => !(b.targetId === targetId && b.type === type)));
  }, [bookmarks, save]);

  const isBookmarked = useCallback((targetId: string, type: string) => {
    return bookmarks.some(b => b.targetId === targetId && b.type === type);
  }, [bookmarks]);

  const clearBookmarks = useCallback(() => save([]), [save]);

  return { bookmarks, addBookmark, removeBookmark, isBookmarked, clearBookmarks };
}
