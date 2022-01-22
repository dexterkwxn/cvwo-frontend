import { takeLeading, put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import { TaskAction } from '../action_creators';
import axiosRequest, { RequestMethod }  from '../../axios';
import axios from 'axios';

async function fetchAll() {
  try {
    return axiosRequest('/fetch');
  } catch (err) {
    console.log('TaskSaga - fetchAll() failed: ', err);
  }
}
export function* runFetchAll() {
  console.log('TaskSaga - runFetchAll()');
  try {
    const fetchAllData = yield fetchAll();
    yield put(TaskAction.fetchAllSuccess(fetchAllData));
  } catch (err) {
    yield put(TaskAction.fetchAllError(err));
  }
}

async function addTask(action) {
  try {
    return axiosRequest('/addTask', action.payload.data, RequestMethod.POST);
  } catch (err) {
    console.log('TaskSaga - addTask() failed: ', err);
  }
}
export function* runAddTask(action) {
  console.log('TaskSaga - runAddTask()');
  try {
    yield addTask(action);
    yield put(TaskAction.addTaskSuccess());
  } catch (err) {
    yield put(TaskAction.addTaskError(err));
  }
}

async function updateTask(action) {
  try {
    return axiosRequest('/updateTask/' + action.payload.id, action.payload.data, RequestMethod.POST)
  } catch (err) {
    console.log('TaskSaga - updateTask() failed: ', err);
  }
}
export function* runUpdateTask(action) {
  console.log('TaskSaga - runUpdateTask()');
  try {
    yield updateTask(action);
    yield put(TaskAction.updateTaskSuccess());
  } catch (err) {
    yield put(TaskAction.updateTaskError(err));
  }
}

async function removeTask(action) {
  try {
    return axiosRequest('/removeTask/' + action.payload.id, null, RequestMethod.POST);
  } catch (err) {
    console.log('TaskSaga - removeTask()')
  }
}
export function* runRemoveTask(action) {
  console.log('TaskSaga - runRemoveTask()');
  try {
    yield removeTask(action);
    yield put(TaskAction.removeTaskSuccess());
  } catch (err) {
    yield put(TaskAction.removeTaskError(err));
  }
}

export default function* watchTaskSaga() {
  yield takeEvery('FETCH_ALL', runFetchAll);
  yield takeLeading('ADD_TASK', runAddTask);
  yield takeLeading('UPDATE_TASK', runUpdateTask);
  yield takeLeading('REMOVE_TASK', runRemoveTask);
}
