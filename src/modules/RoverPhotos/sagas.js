// Реализуйте саги
import { takeLatest, select, put, call, fork, all } from 'redux-saga/effects';
import { getPhotos } from './api.js';
import {
  fetchPhotosRequest,
  fetchPhotosSuccess,
  fetchPhotosFailure,
  changeSol
} from './actions.js';
import { getApiKey } from '../Auth';
import { getPhotos as getPhotosFromState, getSol } from './RoverPhotos';

const rovers = ['curiosity', 'opportunity', 'spirit'];

function* fetchPhotosWatcher() {
  yield takeLatest(fetchPhotosRequest, fetchPhotos);
  yield takeLatest(changeSol, fetchPhotos);
}

function* fetchPhotos(action) {
  try {
    const apiKey = yield select(getApiKey);
    const { current: solNum } = yield select(getSol);
    const photosFromState = yield select(getPhotosFromState);
    const photos = JSON.parse(JSON.stringify(photosFromState));

    for (let i = 0; i < rovers.length; i++) {
      const rover = rovers[i];
      const res = yield call(getPhotos, apiKey, rover, solNum);

      if (!photos[rover]) photos[rover] = {};
      photos[rover][solNum] = res;
    }

    yield put(fetchPhotosSuccess(photos));
  } catch (error) {
    yield put(fetchPhotosFailure(error.message));
  }
}

export default fetchPhotosWatcher;
