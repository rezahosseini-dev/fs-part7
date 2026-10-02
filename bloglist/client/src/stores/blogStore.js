import { create } from 'zustand';
import blogService from '../services/blogs';

export const useBlogStore = create((set, get) => ({
  blogs: [],
  isLoaded: false,

  initializeBlogs: async () => {
    try {
      const blogs = await blogService.getAll();
      set({ blogs, isLoaded: true });
    } catch (error) {
      console.error('Failed to initialize blogs:', error);

      set({ blogs: [], isLoaded: true });
    }
  },

  addBlog: async (blogObject, currentUser) => {
    if (currentUser?.token) {
      blogService.setToken(currentUser.token);
    }
    const returnedBlog = await blogService.create(blogObject);

    const blogToState = {
      ...returnedBlog,
      user: {
        id:
          typeof returnedBlog.user === 'object'
            ? returnedBlog.user.id
            : returnedBlog.user || currentUser?.id,
        username: currentUser?.username,
        name: currentUser?.name,
      },
    };

    set({ blogs: get().blogs.concat(blogToState), isLoaded: true });
    return returnedBlog;
  },

  likeBlog: async (id) => {
    const blogToLike = get().blogs.find((b) => String(b.id) === String(id));
    if (!blogToLike) return;

    const updatedBlog = {
      user: blogToLike.user?.id || blogToLike.user,
      likes: blogToLike.likes + 1,
      author: blogToLike.author,
      title: blogToLike.title,
      url: blogToLike.url,
    };

    const returnedBlog = await blogService.update(id, updatedBlog);

    const blogToState = {
      ...returnedBlog,
      likes:
        returnedBlog.likes !== undefined
          ? returnedBlog.likes
          : blogToLike.likes + 1,

      user:
        typeof returnedBlog.user === 'object'
          ? returnedBlog.user
          : blogToLike.user,
    };

    set({
      blogs: get().blogs.map((b) =>
        String(b.id) === String(id) ? blogToState : b
      ),
    });
  },

  removeBlog: async (blog, currentUser) => {
    if (currentUser?.token) {
      blogService.setToken(currentUser.token);
    }
    await blogService.remove(blog.id);
    set({ blogs: get().blogs.filter((b) => String(b.id) !== String(blog.id)) });
  },

  addComment: async (id, comment) => {
    const returnedData = await blogService.addComment(id, comment);

    set({
      blogs: get().blogs.map((b) => {
        if (String(b.id) === String(id)) {
          const comments = returnedData.comments || returnedData;
          return {
            ...b,
            comments: Array.isArray(comments)
              ? comments
              : (b.comments || []).concat(comment),
          };
        }
        return b;
      }),
    });
  },
}));
