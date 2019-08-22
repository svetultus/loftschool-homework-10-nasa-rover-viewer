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
    [fetchPhotosRequest]: (state, action) => {
      const { name, sol } = action.payload;
      const stateCopy = JSON.parse(JSON.stringify(state));

      if (!stateCopy[name]) stateCopy[name] = {};
      if (!stateCopy[name][sol]) stateCopy[name][sol] = {};
      stateCopy[name][sol].photos = [];
      stateCopy[name][sol].isLoading = true;
      stateCopy[name][sol].isLoaded = false;

      return { ...stateCopy };
    },
    [fetchPhotosSuccess]: (state, action) => {
      const { photos, name, sol } = action.payload;
      const stateCopy = JSON.parse(JSON.stringify(state));

      stateCopy[name][sol].photos = photos;
      stateCopy[name][sol].isLoading = false;
      stateCopy[name][sol].isLoaded = true;
      return { ...stateCopy };
    },
    [fetchPhotosFailure]: (state, action) => {
      const { name, sol, error } = action.payload;
      const stateCopy = JSON.parse(JSON.stringify(state));

      stateCopy[name][sol].isLoading = false;
      stateCopy[name][sol].isLoaded = false;

      return { ...stateCopy };
    }
  },
  {}
);

export const error = handleActions(
  {
    [fetchPhotosRequest]: state => null,
    [fetchPhotosSuccess]: state => null,
    [fetchPhotosFailure]: (state, action) => action.payload.error
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

export const getError = createSelector(
  state => state.roverPhotos.error,
  error => error
);

export const getSol = createSelector(
  state => state.roverPhotos.sol,
  sol => sol
);

export default combineReducers({ photos, error, sol });
