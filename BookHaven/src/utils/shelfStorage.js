const shelfKey = (uid) => `bookhaven-shelf-${uid || 'guest'}`;

export const loadShelfFromStorage = (uid) => {
  try {
    const raw = localStorage.getItem(shelfKey(uid));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveShelfToStorage = (uid, books) => {
  try {
    localStorage.setItem(shelfKey(uid), JSON.stringify(books));
  } catch (error) {
    console.warn('Unable to persist shelf:', error);
  }
};
