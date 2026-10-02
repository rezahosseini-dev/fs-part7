import { Alert, Box } from '@mui/material';
import { useNotificationStore } from '../stores/notificationStore';

const Notification = () => {
  const notification = useNotificationStore((state) => state.notification);

  if (!notification) {
    return null;
  }

  const { message, type } = notification;
  const severity = type === 'error' ? 'error' : 'success';

  return (
    <Box sx={{ mb: 3 }}>
      <Alert
        severity={severity}
        variant="standard"
        sx={{
          borderRadius: 1,
          backgroundColor: severity === 'success' ? '#e8f5e9' : undefined,
          color: severity === 'success' ? '#1b5e20' : undefined,
          fontSize: '0.95rem',
          fontWeight: 500,
        }}
      >
        {message}
      </Alert>
    </Box>
  );
};

export default Notification;
