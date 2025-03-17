import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Container, Typography } from '@mui/material';
import { loginUser } from '../redux/actions/authActions';

const Login = () => {
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(credentials));
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Login</Typography>
            <form onSubmit={handleSubmit}>
                <TextField fullWidth margin="normal" label="Email" type="email" name="email" value={credentials.email} onChange={handleChange} required />
                <TextField fullWidth margin="normal" label="Password" type="password" name="password" value={credentials.password} onChange={handleChange} required />
                <Button variant="contained" color="primary" type="submit" fullWidth>Login</Button>
            </form>
        </Container>
    );
};

export default Login;