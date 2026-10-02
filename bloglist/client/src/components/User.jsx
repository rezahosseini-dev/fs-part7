import { useParams } from 'react-router-dom';
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  Divider,
} from '@mui/material';
import NotFound from './NotFound';

const User = ({ users }) => {
  const { id } = useParams();
  const user = users?.find((u) => String(u.id) === String(id));

  if (!user) {
    return <NotFound title="404 - User not found" />;
  }

  return (
    <Box sx={{ my: 3 }}>
      <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
        {user.name}
      </Typography>

      <Typography
        variant="h6"
        component="h3"
        sx={{ fontWeight: 600, mt: 3, mb: 2 }}
      >
        added blogs
      </Typography>

      {user.blogs && user.blogs.length > 0 ? (
        <Paper
          elevation={0}
          sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}
        >
          <List disablePadding>
            {user.blogs.map((blog, index) => (
              <Box key={blog.id}>
                <ListItem sx={{ py: 1.5 }}>
                  <ListItemText primary={blog.title} />
                </ListItem>
                {index < user.blogs.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </Paper>
      ) : (
        <Typography variant="body1" color="text.secondary">
          No blogs added yet.
        </Typography>
      )}
    </Box>
  );
};

export default User;
