import { SEARCH_USER, SET_USERS } from '../actionTypes';

const initialState = {
    users: [],
    user: {}
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return { ...state, users: action.payload };
        case SEARCH_USER:
            console.log("user in search", action.payload)
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
};

export default userReducer;