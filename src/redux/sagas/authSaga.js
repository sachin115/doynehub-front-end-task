import { call, put, takeLatest } from 'redux-saga/effects';
import { REGISTER_USER, LOGIN_USER, SET_AUTH_USER } from '../actionTypes';
import { loginApi, registerApi } from '../../api/api';

function* registerUserSaga(action) {
    try {
        const user = yield call(registerApi, action.payload);
        yield put({ type: SET_AUTH_USER, payload: user });
    } catch (error) {
        console.error('Registration failed', error);
    }
}

function* loginUserSaga(action) {
    try {
        const user = yield call(loginApi, action.payload);
        yield put({ type: SET_AUTH_USER, payload: user });
    } catch (error) {
        console.error('Login failed', error);
    }
}

export default function* authSaga() {
    yield takeLatest(REGISTER_USER, registerUserSaga);
    yield takeLatest(LOGIN_USER, loginUserSaga);
}