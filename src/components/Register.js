import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Container, Typography, MenuItem } from '@mui/material';
import { registerUser } from '../redux/actions/authActions';

const Register = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
    });
    const roles = ['Admin', 'User', 'Moderator'];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        dispatch(registerUser(formData));
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Register</Typography>
            <form onSubmit={handleSubmit}>
                <TextField fullWidth margin="normal" label="Name" name="name" value={formData.name} onChange={handleChange} required />
                <TextField fullWidth margin="normal" label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
                <TextField fullWidth margin="normal" label="Password" type="password" name="password" value={formData.password} onChange={handleChange} required />
                <TextField fullWidth margin="normal" label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                <TextField fullWidth select margin="normal" label="Role" name="role" value={formData.role} onChange={handleChange} required>
                    {roles.map((role) => (
                        <MenuItem key={role} value={role}>{role}</MenuItem>
                    ))}
                </TextField>
                <Button variant="contained" color="primary" type="submit" fullWidth>Register</Button>
            </form>
        </Container>
    );
};

export default Register;