import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Typography, Container, Box, CircularProgress } from "@mui/material";
import { searchUser } from '../redux/actions/userActions';

const ViewUser = () => {
    const { id } = useParams();
    console.log("inside view", id)
    const dispatch = useDispatch();
    const {loading, user} = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(searchUser(id))
    },[id])

    
    

    return (
        <Container maxWidth="sm">
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                {loading ? (
                    <CircularProgress size={50} />
                ) : (
                    <Card sx={{ maxWidth: 400, width: "100%", boxShadow: 5, borderRadius: 3 }}>
                        <CardContent>
                            <Typography variant="h4" textAlign="center" gutterBottom>
                                User Details
                            </Typography>
                            <Typography variant="h6">
                                <strong>Name:</strong> {user.name}
                            </Typography>
                            <Typography variant="h6">
                                <strong>Email:</strong> {user.email}
                            </Typography>
                            <Typography variant="h6">
                                <strong>Role:</strong> {user.role}
                            </Typography>
                        </CardContent>
                    </Card>
                )}
            </Box>
        </Container>
    );
};

export default ViewUser;