import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table, TableHead, TableRow, TableCell, TableBody, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createUser, fetchUsers, searchUser } from '../redux/actions/userActions';

const UserList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const users = useSelector((state) => state.users.users);
    const [searchId, setSearchId] = useState('');
    const [page, setPage] = useState(1);
    const [newUser, setNewUser] = useState({ name: '', email: '', role: 'User' });

    useEffect(() => {
        dispatch(fetchUsers(page));
    }, [dispatch, page]);

    const handleSearch = () => {
        if (searchId.trim()) {
            if (user.role === 'User' && searchId !== user.id) {
                alert('You can only search for your own profile');
                return;
            }
            dispatch(searchUser(searchId));
        }
    };

    const handleCreateUser = () => {
        if (user.role === 'Admin') {
            dispatch(createUser(newUser));
        } else {
            alert('Only admins can create users');
        }
    };

    const handleView = (id) => {
        navigate(`/users/${id}`);
    };

    const handleEdit = (id) => {
        if (user.role === 'Admin') {
            navigate(`/users/edit/${id}`);
        } else {
            alert('You do not have permission to edit users');
        }
    };

    return (
        <Container>
            <TextField label="Search by ID" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
            <Button onClick={handleSearch} variant="contained" color="primary">Search</Button>
            {user.role === 'Admin' && (
                <div>
                    <TextField label="Name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
                    <TextField label="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                    <Button onClick={handleCreateUser} variant="contained" color="secondary">Create User</Button>
                </div>
            )}
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((userItem) => (
                        <TableRow key={userItem.id}>
                            <TableCell>{userItem.id}</TableCell>
                            <TableCell>{userItem.name}</TableCell>
                            <TableCell>{userItem.email}</TableCell>
                            <TableCell>{userItem.role}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleView(userItem.id)} variant="outlined">View</Button>
                                {user.role === 'Admin' && (
                                    <Button onClick={() => handleEdit(userItem.id)} variant="outlined" color="secondary">Edit</Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</Button>
            <Button onClick={() => setPage(page + 1)}>Next</Button>
        </Container>
    );
};

export default UserList;