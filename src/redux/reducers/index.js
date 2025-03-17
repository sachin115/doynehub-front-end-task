import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    users: userReducer,
});

export default rootReducer;