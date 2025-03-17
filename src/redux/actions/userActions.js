import { FETCH_USERS, SEARCH_USER, SET_USERS, CREATE_USER, FETCH_USER_BY_ID } from "../actionTypes";


export const fetchUsers = (page) => ({
    type: FETCH_USERS,
    payload: page,
});

export const searchUser = (id) => ({
    type: SEARCH_USER,
    payload: id,
});

export const setUsers = (users) => ({
    type: SET_USERS,
    payload: users,
});
