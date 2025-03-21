// src/components/UserList.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Table, TableHead, TableRow, TableCell, TableBody, TextField, Button, IconButton, Typography, Card, CardContent, Box, Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchUsers, searchUser } from "../redux/actions/userActions";
import { Visibility, Edit, Search } from "@mui/icons-material";

const UserList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { users, totalPages } = useSelector((state) => state.users.users);
    const [searchId, setSearchId] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(fetchUsers({ page, searchQuery: "" }));
    }, [dispatch, page]);

    // const handleSearch = () => {
    //     if (searchId.trim().length === 24) { // Ensuring it's a full MongoDB ObjectId
    //         dispatch(fetchUsers({ page, searchQuery: searchId }));
    //     } else {
    //         alert("Please enter a complete 24-character ID.");
    //     }
    // };

    const handleView = (id) => {
        navigate(`/users/${id}`);
    };

    const handleEdit = (id) => {
        if (user.role === "Admin") {
            navigate(`/users/edit/${id}`);
        } else {
            alert("You do not have permission to edit users");
        }
    };

    useEffect(() => {
        const debounce = setTimeout(() => {
            dispatch(fetchUsers({ page, searchQuery: searchId }));
        }, 500);

        return () => clearTimeout(debounce);
    }, [searchId, page, dispatch]);

    return (
        <Container>
            <Card sx={{ mt: 4, p: 2, boxShadow: 3, borderRadius: 3 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>User Management</Typography>
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                        <TextField fullWidth label="Search by Full ID" value={searchId} onChange={(e) => setSearchId(e.target.value)} /></Box>
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
                            {users && users.length > 0 ? (
                                users.map((userItem) => (
                                    <TableRow key={userItem._id}>
                                        <TableCell>{userItem._id}</TableCell>
                                        <TableCell>{userItem.name}</TableCell>
                                        <TableCell>{userItem.email}</TableCell>
                                        <TableCell>{userItem.role}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleView(userItem._id)} color="primary">
                                                <Visibility />
                                            </IconButton>
                                            {user.role === "Admin" && (
                                                <IconButton onClick={() => handleEdit(userItem._id)} color="secondary">
                                                    <Edit />
                                                </IconButton>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        No records found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>

                    </Table>
                    <Box display="flex" justifyContent="center" mt={2}>
                        <Pagination count={totalPages} page={page} onChange={(event, value) => setPage(value)} color="primary" />
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default UserList;
