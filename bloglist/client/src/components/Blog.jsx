import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Link,
  Stack,
  TextField,
  Fade,
  Skeleton,
} from '@mui/material';
import { useBlogStore } from '../stores/blogStore';
import { useUserStore } from '../stores/userStore';
import { useNotificationStore } from '../stores/notificationStore';

const Blog = () => {
  const [commentInput, setCommentInput] = useState('');
  const { id } = useParams();

  const isLoaded = useBlogStore((state) => state.isLoaded);
  const initializeBlogs = useBlogStore((state) => state.initializeBlogs);
  const blogs = useBlogStore((state) => state.blogs);

  const likeBlog = useBlogStore((state) => state.likeBlog);
  const removeBlog = useBlogStore((state) => state.removeBlog);
  const addComment = useBlogStore((state) => state.addComment);

  const currentUser = useUserStore((state) => state.user);
  const notify = useNotificationStore((state) => state.notify);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded) {
      initializeBlogs();
    }
  }, [isLoaded, initializeBlogs]);

  const blog = blogs.find((b) => String(b.id) === String(id));

  if (isLoaded && !blog) {
    throw new Error('something went wrong');
  }

  if (!isLoaded) {
    return (
      <Box sx={{ mt: 3, maxWidth: 800, mx: 'auto', p: 2 }}>
        <Skeleton
          variant="rectangular"
          height={40}
          sx={{ mb: 2, borderRadius: 1 }}
        />
        <Skeleton variant="text" width="40%" height={24} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={150} sx={{ borderRadius: 2 }} />
      </Box>
    );
  }

  if (!blog) {
    throw new Error('something went wrong');
  }

  const showRemoveButton =
    currentUser &&
    (blog.user.username === currentUser.username ||
      blog.user === currentUser.username);

  const handleLikeClick = async () => {
    try {
      await likeBlog(blog.id);
      notify(`You liked '${blog.title}'`, 'success');
    } catch (error) {
      console.error('Error liking blog:', error);
      notify('Failed to like blog', 'error');
    }
  };

  const handleRemoveClick = async () => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`);
    if (ok) {
      try {
        navigate('/');
        await removeBlog(blog, currentUser);
        notify(`Blog '${blog.title}' was successfully deleted`, 'success');
      } catch (error) {
        console.error('Error removing blog:', error);
        notify('Failed to remove blog', 'error');
      }
    }
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (!commentInput.trim()) return;

    try {
      await addComment(blog.id, commentInput);
      notify('Comment added successfully', 'success');
      setCommentInput('');
    } catch (error) {
      console.error('Error adding comment:', error);
      notify('Failed to add comment', 'error');
    }
  };

  return (
    <Fade in timeout={400}>
      <Box sx={{ mt: 3, maxWidth: 800, mx: 'auto' }}>
        <Card
          elevation={2}
          sx={{
            borderRadius: 3,
            p: 2.5,
            border: '1px solid #e2e8f0',
            boxShadow:
              '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
            transition: 'box-shadow 0.2s ease-in-out',
            '&:hover': {
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.08)',
            },
          }}
        >
          <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
            {/* Header / Blog Meta */}
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 1,
                color: '#0f172a',
                letterSpacing: '-0.02em',
              }}
            >
              {blog.title}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: '#64748b',
                mb: 1.5,
                fontSize: '1.05rem',
                fontWeight: 500,
              }}
            >
              by {blog.author}
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Link
                href={blog.url}
                target="_blank"
                rel="noreferrer"
                underline="hover"
                sx={{
                  color: '#0288d1',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  wordBreak: 'break-all',
                }}
              >
                {blog.url}
              </Link>
            </Box>

            <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2.5 }}>
              Added by <strong>{blog.user.name || blog.user.username}</strong>
            </Typography>

            {/* Action Bar */}
            <Stack
              direction="row"
              sx={{ alignItems: 'center', mb: 4 }}
              spacing={2}
            >
              <Typography
                variant="body1"
                sx={{ fontWeight: 700, color: '#1e293b' }}
              >
                <span data-testid="likes-count">{blog.likes} likes</span>
              </Typography>

              {currentUser && (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleLikeClick}
                  sx={{
                    borderColor: '#0288d1',
                    color: '#0288d1',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    borderRadius: 1.5,
                    px: 2.5,
                    '&:hover': {
                      backgroundColor: 'rgba(2, 136, 209, 0.08)',
                      borderColor: '#0288d1',
                    },
                  }}
                >
                  LIKE
                </Button>
              )}

              {showRemoveButton && (
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  onClick={handleRemoveClick}
                  sx={{
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    borderRadius: 1.5,
                    px: 2.5,
                  }}
                >
                  REMOVE
                </Button>
              )}
            </Stack>

            {/* Comments Section */}
            <Typography
              variant="h5"
              component="h3"
              sx={{ fontWeight: 700, mb: 2, color: '#0f172a' }}
            >
              comments
            </Typography>

            <Box
              component="form"
              onSubmit={handleCommentSubmit}
              sx={{ display: 'flex', gap: 1.5, mb: 3, maxWidth: 520 }}
            >
              <TextField
                id="comment"
                label="comment"
                size="small"
                placeholder="add a comment..."
                value={commentInput}
                onChange={({ target }) => setCommentInput(target.value)}
                sx={{
                  flexGrow: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1.5,
                    backgroundColor: '#f8fafc',
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                disableElevation
                sx={{
                  backgroundColor: '#0288d1',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  borderRadius: 1.5,
                  px: 3,
                  whiteSpace: 'nowrap',
                  '&:hover': {
                    backgroundColor: '#0277bd',
                  },
                }}
              >
                add comment
              </Button>
            </Box>

            {/* Comments List */}
            {blog.comments && blog.comments.length > 0 ? (
              <Box
                component="ul"
                sx={{
                  pl: 3,
                  m: 0,
                  '& li': {
                    mb: 1,
                    fontSize: '0.98rem',
                    color: '#334155',
                    lineHeight: 1.5,
                  },
                }}
              >
                {blog.comments.map((comment, index) => (
                  <li key={`${index}-${comment}`}>{comment}</li>
                ))}
              </Box>
            ) : (
              <Typography
                variant="body2"
                sx={{ color: '#94a3b8', fontStyle: 'italic' }}
              >
                No comments yet.
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </Fade>
  );
};

export default Blog;
