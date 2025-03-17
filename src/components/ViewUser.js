import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Typography } from '@mui/material';

const ViewUser = () => {
    const { id } = useParams();
    const users = useSelector((state) => state.users.users);
    const user = users.find((u) => u.id === id);

    if (!user) {
        return <Typography>User not found</Typography>;
    }

    return (
        <Container>
            <Typography variant="h4">User Details</Typography>
            <Typography>Name: {user.name}</Typography>
            <Typography>Email: {user.email}</Typography>
            <Typography>Role: {user.role}</Typography>
        </Container>
    );
};

export default ViewUser;