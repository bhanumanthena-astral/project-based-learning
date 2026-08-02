export const FIRST_TASK_DONE_KEY = 'bf_first_task_done';

export const hasSeenFirstTask = (): boolean => {
  try {
    return localStorage.getItem(FIRST_TASK_DONE_KEY) === 'true';
  } catch {
    return false;
  }
};

export const markFirstTaskSeen = (): void => {
  try {
    localStorage.setItem(FIRST_TASK_DONE_KEY, 'true');
  } catch {
    // ignore storage failures
  }
};
