
import { all } from 'redux-saga/effects';
import BlockSaga from './BlockSaga';

export default function* allSaga() {
  yield all([
    BlockSaga(),
  ]);
}