import { Paper, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const NotFound = ({ title = '404-Page Not Found' }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 4,
        mt: 4,
        textAlign: 'center',
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h4"
        color="error"
        gutterBottom
        sx={{ fontWeight: 600 }}
      >
        {title}
      </Typography>

      <Button
        variant="contained"
        component={RouterLink}
        to="/"
        sx={{ textTransform: 'none', fontWeight: 600 }}
      >
        Go to Home Page
      </Button>
    </Paper>
  );
};

export default NotFound;
