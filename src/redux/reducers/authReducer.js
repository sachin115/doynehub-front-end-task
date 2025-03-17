import { SET_AUTH_USER, LOGOUT_USER } from '../actionTypes';
import Cookies from 'js-cookie';

const initialState = {
    user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
    isAuthenticated: !!Cookies.get('token'),
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER:
            Cookies.set('user', JSON.stringify(action.payload.user), { expires: 7 });
            Cookies.set('token', action.payload.token, { expires: 7 });
            return { ...state, user: action.payload.user, isAuthenticated: true };
        case LOGOUT_USER:
            Cookies.remove('user');
            Cookies.remove('token');
            return { ...state, user: null, isAuthenticated: false };
        default:
            return state;
    }
};

export default authReducer;