import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar = ({ user, onLogout }) => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: '#0288d1',
        borderRadius: 0,
        mb: 3,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            color: 'white',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '1.25rem',
          }}
        >
          Blog App
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              color: 'white',
            }}
          >
            blogs
          </Button>

          <Button
            color="inherit"
            component={RouterLink}
            to="/users"
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              color: 'white',
            }}
          >
            users
          </Button>

          {user && (
            <Button
              color="inherit"
              component={RouterLink}
              to="/create"
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                color: 'white',
              }}
            >
              new blog
            </Button>
          )}

          {user ? (
            <>
              <Typography
                variant="body2"
                sx={{ color: 'white', fontStyle: 'italic', mx: 1 }}
              >
                {user.name || user.username} logged in
              </Typography>
              <Button
                color="inherit"
                onClick={onLogout}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  color: 'white',
                }}
              >
                logout
              </Button>
            </>
          ) : (
            <Button
              color="inherit"
              component={RouterLink}
              to="/login"
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                color: 'white',
              }}
            >
              login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
