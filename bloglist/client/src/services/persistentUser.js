const STORAGE_KEY = 'loggedBlogappUser';

export const saveUser = (user) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

export const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem(STORAGE_KEY);
  if (loggedUserJSON) {
    return JSON.parse(loggedUserJSON);
  }
  return null;
};

export const removeUser = () => {
  window.localStorage.removeItem(STORAGE_KEY);
};

export default {
  saveUser,
  getUser,
  removeUser,
};
