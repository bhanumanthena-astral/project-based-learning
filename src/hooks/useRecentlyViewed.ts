import { useState, useCallback } from 'react';
import { RecentlyViewedItem } from '../types/courses';

const STORAGE_KEY = 'recently-viewed';
const MAX_ITEMS = 20;

function loadRecent(): RecentlyViewedItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}

export function useRecentlyViewed() {
  const [recentItems, setRecentItems] = useState<RecentlyViewedItem[]>(loadRecent);

  const trackView = useCallback((item: Omit<RecentlyViewedItem, 'viewedAt'>) => {
    const now = new Date().toISOString();
    const filtered = recentItems.filter(r => !(r.id === item.id && r.type === item.type));
    const updated = [{ ...item, viewedAt: now }, ...filtered].slice(0, MAX_ITEMS);
    setRecentItems(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, [recentItems]);

  const clearRecent = useCallback(() => {
    setRecentItems([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { recentItems, trackView, clearRecent };
}
