import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import userService from '../services/users';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Link,
} from '@mui/material';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getAll().then((data) => setUsers(data));
  }, []);

  return (
    <Box sx={{ my: 3 }}>
      <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
        Users
      </Typography>

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ border: '1px solid #e0e0e0' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Username</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link
                    component={RouterLink}
                    to={`/users/${user.id}`}
                    underline="hover"
                    color="primary"
                    sx={{ fontWeight: 500 }}
                  >
                    {user.name}
                  </Link>
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.blogs ? user.blogs.length : 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Users;
