import { REGISTER_USER, LOGIN_USER, SET_AUTH_USER, LOGOUT_USER } from '../actionTypes';

export const registerUser = (userData) => ({
    type: REGISTER_USER,
    payload: userData,
});

export const loginUser = (credentials) => ({
    type: LOGIN_USER,
    payload: credentials,
});

export const setAuthUser = (user) => ({
    type: SET_AUTH_USER,
    payload: user,
});

export const logoutUser = () => ({
    type: LOGOUT_USER,
});