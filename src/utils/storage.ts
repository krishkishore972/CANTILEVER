export const storage = {
  get: (key: string) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },

  set: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Handle storage errors silently
    }
  },

  remove: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch {
      // Handle storage errors silently
    }
  },

  clear: () => {
    try {
      localStorage.clear();
    } catch {
      // Handle storage errors silently
    }
  }
};