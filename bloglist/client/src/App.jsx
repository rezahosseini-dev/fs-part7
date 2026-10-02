import { useState, useEffect } from 'react';
import { useBlogStore } from './stores/blogStore';
import { useUserStore } from './stores/userStore';
import { useNotificationStore } from './stores/notificationStore';
import Users from './components/Users';
import User from './components/User';
import userService from './services/users';
import {
  Routes,
  Route,
  Link as RouterLink,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import {
  Typography,
  Button,
  Container,
  Box,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

import Blog from './components/Blog';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);

  const blogs = useBlogStore((state) => state.blogs);
  const initializeBlogs = useBlogStore((state) => state.initializeBlogs);

  const user = useUserStore((state) => state.user);
  const initializeUser = useUserStore((state) => state.initializeUser);
  const loginUser = useUserStore((state) => state.login);
  const logoutUser = useUserStore((state) => state.logout);

  const notify = useNotificationStore((state) => state.notify);

  const navigate = useNavigate();

  useEffect(() => {
    initializeBlogs();
    initializeUser();
    userService.getAll().then((data) => setUsers(data));
  }, [initializeBlogs, initializeUser]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await loginUser(username, password);
      setUsername('');
      setPassword('');
      notify('Welcome back!', 'success');
      navigate('/');
    } catch (error) {
      notify(
        error?.response?.data?.error || 'wrong username or password',
        'error'
      );
    }
  };

  const handleLogout = () => {
    logoutUser();
    notify('Logged out successfully', 'success');
    navigate('/');
  };

  const sortedBlogs = Array.isArray(blogs)
    ? [...blogs].sort((a, b) => (b.likes || 0) - (a.likes || 0))
    : [];

  return (
    <Container maxWidth="md" sx={{ pt: 3, pb: 5 }}>
      <Navbar user={user} onLogout={handleLogout} />

      <Notification />

      <ErrorBoundary>
        <Routes>
          <Route
            path="/"
            element={
              <Box>
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{ mb: 3, fontWeight: 600 }}
                >
                  blogs
                </Typography>
                <Paper elevation={2} sx={{ borderRadius: 2 }}>
                  <List disablePadding>
                    {sortedBlogs.map((blog, index) => (
                      <Box key={blog.id}>
                        <ListItem
                          component={RouterLink}
                          to={`/blogs/${blog.id}`}
                          sx={{
                            textDecoration: 'none',
                            color: 'inherit',
                            '&:hover': { backgroundColor: 'action.hover' },
                            py: 2,
                          }}
                        >
                          <ListItemText
                            primary={blog.title}
                            slotProps={{
                              primary: {
                                fontSize: '1.1rem',
                                fontWeight: 500,
                              },
                            }}
                          />
                        </ListItem>
                        {index < sortedBlogs.length - 1 && <Divider />}
                      </Box>
                    ))}
                  </List>
                </Paper>
              </Box>
            }
          />

          <Route
            path="/create"
            element={
              user ? (
                <Box>
                  <BlogForm />
                </Box>
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />

          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User users={users} />} />

          <Route
            path="/login"
            element={
              user ? (
                <Navigate replace to="/" />
              ) : (
                <Container maxWidth="xs">
                  <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 3 }}>
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}
                    >
                      Log in to application
                    </Typography>
                    <Box component="form" onSubmit={handleLogin} noValidate>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                        slotProps={{
                          htmlInput: { 'data-testid': 'username' },
                        }}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        id="password"
                        label="Password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        slotProps={{
                          htmlInput: { 'data-testid': 'password' },
                        }}
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{
                          mt: 3,
                          borderRadius: 2,
                          textTransform: 'none',
                          fontWeight: 600,
                        }}
                      >
                        login
                      </Button>
                    </Box>
                  </Paper>
                </Container>
              )
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </Container>
  );
};

export default App;
