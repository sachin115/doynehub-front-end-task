import { FETCH_USERS, HIDE_TOAST, SEARCH_USER, SHOW_TOAST } from "../actionTypes";



export const fetchUsers = (data) => ({
    type: FETCH_USERS,
    payload: { page: data.page, search: data.searchQuery },
});

export const searchUser = (id) => ({
    type: SEARCH_USER,
    payload: id,
});

export const showToast = (message, severity = "info") => ({
    type: SHOW_TOAST,
    payload: { message, severity },
});

export const hideToast = () => ({
    type: HIDE_TOAST,
});

