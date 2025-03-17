import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URI = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: BASE_URI,
});

// Add Authorization token to every request
api.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const registerApi = async (userData) => {
    const response = await api.post('/register', userData);
    return response.data;
};

export const loginApi = async (credentials) => {
    const response = await api.post('/login', credentials);
    return response.data;
};

export const fetchUsersApi = async (page) => {
    const response = await api.get(`/get-users?page=${page}`);
    return response.data;
};

export const searchUserApi = async (id) => {
    const response = await api.get(`/user-profile/${id}`);
    return response.data;
};

export default api;