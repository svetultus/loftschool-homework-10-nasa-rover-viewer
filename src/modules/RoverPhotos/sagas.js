// Реализуйте саги
import {
  takeLatest,
  take,
  takeEvery,
  select,
  put,
  call,
  fork,
  all
} from 'redux-saga/effects';
import { getPhotos } from './api.js';
import {
  fetchPhotosRequest,
  fetchPhotosSuccess,
  fetchPhotosFailure,
  changeSol
} from './actions.js';
import { getApiKey } from '../Auth';
import { getPhotos as getPhotosFromState, getSol } from './RoverPhotos';

function* fetchPhotosWatcher() {
  while (true) {
    const action = yield take(fetchPhotosRequest);
    yield fork(fetchPhotos, action.payload);
  }
  yield takeLatest(changeSol, fetchPhotos);
}

function* fetchPhotos(payload) {
  const { sol, name } = payload;

  try {
    const apiKey = yield select(getApiKey);
    const photosFromState = yield select(getPhotosFromState);
    const photos = JSON.parse(JSON.stringify(photosFromState));
    if (
      !photos[name] ||
      !photos[name][sol] ||
      !photos[name][sol].photos.length
    ) {
      const res = yield call(getPhotos, apiKey, name, sol);
      yield put(fetchPhotosSuccess({ ...res, name, sol }));
    }
  } catch (error) {
    yield put(fetchPhotosFailure({ error: error.message, name, sol }));
  }
}

export default fetchPhotosWatcher;
