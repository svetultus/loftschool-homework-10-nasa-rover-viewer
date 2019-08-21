// Реализуйте редьюсер
// Файл с тестами RoverPhotos.test.js поможет вам в этом
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import {
  changeSol,
  fetchPhotosRequest,
  fetchPhotosSuccess,
  fetchPhotosFailure
} from './actions';
import { createSelector } from 'reselect';

export const photos = handleActions(
  {
    [fetchPhotosRequest]: state => state,
    [fetchPhotosSuccess]: (state, action) => action.payload,
    [fetchPhotosFailure]: state => state
  },
  {}
);

export const isLoading = handleActions(
  {
    [fetchPhotosRequest]: state => true,
    [fetchPhotosSuccess]: state => false,
    [fetchPhotosFailure]: state => false
  },
  false
);

export const isLoaded = handleActions(
  {
    [fetchPhotosRequest]: state => false,
    [fetchPhotosSuccess]: state => true,
    [fetchPhotosFailure]: state => false
  },
  false
);

export const error = handleActions(
  {
    [fetchPhotosRequest]: state => null,
    [fetchPhotosSuccess]: state => null,
    [fetchPhotosFailure]: (state, action) => action.payload
  },
  null
);
export const sol = handleActions(
  {
    [changeSol]: (state, action) => {
      return { ...state, current: action.payload };
    }
  },
  { current: 1, min: 1, max: 3 }
);

export const getPhotos = createSelector(
  state => state.roverPhotos.photos,
  photos => photos
);

export const getisLoading = createSelector(
  state => state.roverPhotos.isLoading,
  isLoading => isLoading
);

export const getisLoaded = createSelector(
  state => state.roverPhotos.isLoaded,
  isLoaded => isLoaded
);

export const getError = createSelector(
  state => state.roverPhotos.error,
  error => error
);

export const getSol = createSelector(
  state => state.roverPhotos.sol,
  sol => sol
);

export default combineReducers({ photos, isLoading, isLoaded, error, sol });
