import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Container, Typography } from '@mui/material';
import { loginUser } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const {isAuthenticated} = useSelector((state) => state?.auth);
    console.log("is", isAuthenticated)
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = (name, value) => {
        let error = '';
        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) error = 'Invalid email format';
        }
        if (name === 'password') {
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
            if (!passwordRegex.test(value)) error = 'Password must be at least 8 characters, include one uppercase letter and one number';
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
        setErrors({ ...errors, [name]: validate(name, value) });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(errors).some((err) => err)) {
            alert('Please fix validation errors before submitting');
            return;
        }
        dispatch(loginUser(credentials));
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Login</Typography>
            <form onSubmit={handleSubmit}>
                <TextField fullWidth margin="normal" label="Email" type="email" name="email" value={credentials.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} required />
                <TextField fullWidth margin="normal" label="Password" type="password" name="password" value={credentials.password} onChange={handleChange} error={!!errors.password} helperText={errors.password} required />
                <Button variant="contained" color="primary" type="submit" fullWidth>Login</Button>
            </form>
        </Container>
    );
};

export default Login;