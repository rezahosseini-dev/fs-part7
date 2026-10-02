import { create } from 'zustand';

export const useNotificationStore = create((set) => ({
  notification: null,

  notify: (message, type = 'success', timeout = 5000) => {
    set({ notification: { message, type } });

    setTimeout(() => {
      set({ notification: null });
    }, timeout);
  },

  clearNotification: () => set({ notification: null }),
}));
