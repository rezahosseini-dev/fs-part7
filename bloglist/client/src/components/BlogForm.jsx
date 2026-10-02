import { useState } from 'react';
import { useBlogStore } from '../stores/blogStore';
import { useUserStore } from '../stores/userStore';
import { useNotificationStore } from '../stores/notificationStore'; // ۱. ایمپورت استور نوتیفیکیشن
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
} from '@mui/material';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = useBlogStore((state) => state.addBlog);
  const currentUser = useUserStore((state) => state.user);
  const notify = useNotificationStore((state) => state.notify); // ۲. دریافت اکشن notify

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const returnedBlog = await addBlog({ title, author, url }, currentUser);

      notify(
        `A new blog '${returnedBlog?.title || title}' by ${returnedBlog?.author || author} added`,
        'success'
      );

      setTitle('');
      setAuthor('');
      setUrl('');

      navigate('/');
    } catch (error) {
      console.error('Error adding blog:', error);

      notify('Failed to add blog. Please try again.', 'error');
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{ p: 4, maxWidth: 500, mx: 'auto', border: '1px solid #e0e0e0' }}
    >
      <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 700 }}>
        create new
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            size="small"
            label="Title"
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            slotProps={{
              htmlInput: { 'data-testid': 'title' },
            }}
          />

          <TextField
            fullWidth
            size="small"
            label="Author"
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            slotProps={{
              htmlInput: { 'data-testid': 'author' },
            }}
          />

          <TextField
            fullWidth
            size="small"
            label="URL"
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            slotProps={{
              htmlInput: { 'data-testid': 'url' },
            }}
          />

          <Box sx={{ pt: 1 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#1976d2',
                fontWeight: 700,
                px: 3,
                py: 1,
                borderRadius: 1,
              }}
            >
              CREATE
            </Button>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
};

export default BlogForm;
