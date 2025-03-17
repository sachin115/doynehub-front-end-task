import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Register from './components/Register';
import Login from './components/Login';
import UserList from './components/UserList';
import ViewUser from './components/ViewUser';
import EditUser from './components/EditUser';
import { Container } from '@mui/material';
import store from './redux/store';

const ProtectedRoute = ({ element, allowedRoles }) => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    
    if (!allowedRoles.includes(user?.role)) {
        return <Navigate to="/" replace />;
    }

    return element;
};

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Container>
                    <Routes>
                        <Route path="/" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/users" element={<ProtectedRoute element={<UserList />} allowedRoles={["Admin", "Moderator"]} />} />
                        <Route path="/users/:id" element={<ProtectedRoute element={<ViewUser />} allowedRoles={["Admin", "Moderator", "User"]} />} />
                        <Route path="/users/edit/:id" element={<ProtectedRoute element={<EditUser />} allowedRoles={["Admin"]} />} />
                    </Routes>
                </Container>
            </Router>
        </Provider>
    );
};

export default App;