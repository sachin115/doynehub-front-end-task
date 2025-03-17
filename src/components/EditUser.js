import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Container, Typography } from '@mui/material';

const EditUser = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const {users} = useSelector((state) => state.users.users);
    const user = users.find((u) => u._id === id);
    const [formData, setFormData] = useState(user || { name: '', email: '', role: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Dispatch edit user action
        console.log('Edit user data:', formData);
    };

    if (!user) {
        return <Typography>User not found</Typography>;
    }

    return (
        <Container>
            <Typography variant="h4">Edit User</Typography>
            <form onSubmit={handleSubmit}>
                <TextField fullWidth margin="normal" label="Name" name="name" value={formData.name} onChange={handleChange} required />
                <TextField fullWidth margin="normal" label="Email" name="email" value={formData.email} onChange={handleChange} required />
                <TextField fullWidth margin="normal" label="Role" name="role" value={formData.role} onChange={handleChange} required />
                <Button variant="contained" color="primary" type="submit" fullWidth>Save Changes</Button>
            </form>
        </Container>
    );
};

export default EditUser;