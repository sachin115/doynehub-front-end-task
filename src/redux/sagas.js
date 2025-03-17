import { all } from 'redux-saga/effects';
import authSaga from './sagas/authSaga';
import userSaga from './sagas/userSaga';

export default function* rootSaga() {
    yield all([
        authSaga(),
        userSaga(),
    ]);
}