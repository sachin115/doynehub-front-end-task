import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { setAuthUser } from './redux/actions/authActions';
import Register from './components/Register';
import Login from './components/Login';
import UserList from './components/UserList';
import ViewUser from './components/ViewUser';
import EditUser from './components/EditUser';
import { Container } from '@mui/material';
import Header from './components/Header';

const ProtectedRoute = ({ element, allowedRoles }) => {
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    console.log("user", user)

    useEffect(() => {
        if (!isAuthenticated) {
            const token = Cookies.get('token');
            const storedUser = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
            if (token && storedUser) {
                dispatch(setAuthUser({ user: storedUser, token }));
            }
        }
    }, [dispatch, isAuthenticated]);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    
    if (!allowedRoles.includes(user?.role)) {
      return <Navigate to={user?.role === "User" ? `/users/${user.id}` : "/users"} replace />;
  }

    return element;
};

const App = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);

    return (
        <Router>
          <Header />
            <Container>
                <Routes>
                    <Route path="/" element={isAuthenticated ? <Navigate to="/users" replace /> : <Register />} />
                    <Route path="/login" element={isAuthenticated ? <Navigate to="/users" replace /> : <Login />} />
                    <Route path="/users" element={<ProtectedRoute element={<UserList />} allowedRoles={["Admin", "Moderator"]} />} />
                    <Route path="/users/:id" element={<ProtectedRoute element={<ViewUser />} allowedRoles={["Admin", "Moderator", "User"]} />} />
                    <Route path="/users/edit/:id" element={<ProtectedRoute element={<EditUser />} allowedRoles={["Admin"]} />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;