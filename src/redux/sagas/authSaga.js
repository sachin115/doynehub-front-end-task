import { call, put, takeLatest } from 'redux-saga/effects';
import { REGISTER_USER, LOGIN_USER, SET_AUTH_USER, SHOW_TOAST } from '../actionTypes';
import { loginApi, registerApi } from '../../api/api';

function* registerUserSaga(action) {
    try {
        const user = yield call(registerApi, action.payload);
        yield put({ type: SET_AUTH_USER, payload: user });
        yield put({ type: SHOW_TOAST, payload: { message: "Registration successful", severity: "success" } });
    } catch (error) {
        yield put({ type: SHOW_TOAST, payload: { message: "Registration failed", severity: "error" } });
    }
}

function* loginUserSaga(action) {
    try {
        const user = yield call(loginApi, action.payload);
        yield put({ type: SET_AUTH_USER, payload: user });
        yield put({ type: SHOW_TOAST, payload: { message: "Login successful", severity: "success" } });
    } catch (error) {
        yield put({ type: SHOW_TOAST, payload: { message: "Invalid credentials", severity: "error" } });
    }
}

export default function* authSaga() {
    yield takeLatest(REGISTER_USER, registerUserSaga);
    yield takeLatest(LOGIN_USER, loginUserSaga);
}