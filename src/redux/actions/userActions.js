import { FETCH_USERS, SEARCH_USER, SET_USERS } from "../actionTypes";



export const fetchUsers = (data) => ({
    type: FETCH_USERS,
    payload: { page: data.page, search: data.searchQuery },
});

export const searchUser = (id) => ({
    type: SEARCH_USER,
    payload: id,
});

