import { SET_SEARCHED_USER, SET_USERS} from '../actionTypes';

const initialState = {
    users: [],
    user: {},
    loading: true
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return { ...state, users: action.payload };
        case SET_SEARCHED_USER:
            console.log("user in search", action.payload)
            return {
                ...state,
                user: action.payload,
                loading: false
            }
        default:
            return state;
    }
};

export default userReducer;