import { create } from 'zustand';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { getUser, saveUser, removeUser } from '../services/persistentUser';

export const useUserStore = create((set) => ({
  user: null,

  initializeUser: () => {
    const user = getUser();
    if (user) {
      set({ user });
      blogService.setToken(user.token);
    }
  },

  login: async (username, password) => {
    const user = await loginService.login({ username, password });
    saveUser(user);
    blogService.setToken(user.token);
    set({ user });
    return user;
  },

  logout: () => {
    removeUser();
    blogService.setToken(null);
    set({ user: null });
  },
}));
