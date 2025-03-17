import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Container, Typography, MenuItem } from '@mui/material';
import { registerUser } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
    });
    const [errors, setErrors] = useState({});
    const roles = ['Admin', 'User', 'Moderator'];

    const validate = (name, value) => {
        let error = '';
        if (name === 'name') {
            if (value.length < 3) error = 'Name must be at least 3 characters';
        }
        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) error = 'Invalid email format';
        }
        if (name === 'password') {
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
            if (!passwordRegex.test(value)) error = 'Password must be at least 8 characters, include one uppercase letter and one number';
        }
        if (name === 'confirmPassword' && value !== formData.password) {
            error = 'Passwords do not match';
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: validate(name, value) });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(errors).some((err) => err)) {
            alert('Please fix validation errors before submitting');
            return;
        }
        dispatch(registerUser(formData));
        navigate('/login');
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Register</Typography>
            <form onSubmit={handleSubmit}>
                <TextField fullWidth margin="normal" label="Name" name="name" value={formData.name} onChange={handleChange} error={!!errors.name} helperText={errors.name} required />
                <TextField fullWidth margin="normal" label="Email" type="email" name="email" value={formData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} required />
                <TextField fullWidth margin="normal" label="Password" type="password" name="password" value={formData.password} onChange={handleChange} error={!!errors.password} helperText={errors.password} required />
                <TextField fullWidth margin="normal" label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} error={!!errors.confirmPassword} helperText={errors.confirmPassword} required />
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