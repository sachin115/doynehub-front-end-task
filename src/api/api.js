import axios from 'axios';

const BASE_URI = 'http://localhost:5000/api'

export const registerApi = async (userData) => {
    const response = await axios.post(`${BASE_URI}/register`, userData);
    return response.data;
};

export const loginApi = async (credentials) => {
    const response = await axios.post(`${BASE_URI}/login`, credentials);
    return response.data;
};

// src/api/userApi.js
export const fetchUsersApi = async (page) => {
    const response = await axios.get(`${BASE_URI}/api/users?page=${page}`);
    return response.data;
};

export const searchUserApi = async (id) => {
    const response = await axios.get(`${BASE_URI}/api/users/${id}`);
    return response.data;
};