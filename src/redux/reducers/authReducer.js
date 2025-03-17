import { REGISTER_USER, LOGIN_USER, SET_AUTH_USER, LOGOUT_USER } from '../actionTypes';

const initialState = {
    user: null,
    isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER:
            return { ...state, user: action.payload, isAuthenticated: true };
        case LOGOUT_USER:
            return { ...state, user: null, isAuthenticated: false };
        default:
            return state;
    }
};

export default authReducer;