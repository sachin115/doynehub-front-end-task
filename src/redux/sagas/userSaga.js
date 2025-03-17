import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_USERS, SEARCH_USER, SET_SEARCHED_USER, SET_USERS } from '../actionTypes';
import { fetchUsersApi, searchUserApi } from '../../api/api';

function* fetchUsersSaga(action) {
    console.log("action", action.payload)
    try {
        const users = yield call(fetchUsersApi, action.payload);
        yield put({ type: SET_USERS, payload: users });
    } catch (error) {
        console.error('Fetching users failed', error);
    }
}

function* searchUserSaga(action) {
    try {
        const user = yield call(searchUserApi, action.payload);
        console.log("user inside saga", user)
        yield put({ type: SET_SEARCHED_USER, payload: user });
    } catch (error) {
        console.error('User search failed', error);
    }
}

export default function* userSaga() {
    yield takeLatest(FETCH_USERS, fetchUsersSaga);
    yield takeLatest(SEARCH_USER, searchUserSaga);
}
