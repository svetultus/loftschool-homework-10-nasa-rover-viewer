// Реализуйте редьюсер
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { addKey } from './actions';
import { createSelector } from 'reselect';

const apiKey = handleActions(
  {
    [addKey]: (state, action) => action.payload
  },
  null
);

const isAuthorized = handleActions(
  {
    [addKey]: (state, action) => true
  },
  false
);

export const getApiKey = createSelector(
  state => state.auth.apiKey,
  apiKey => apiKey
);

export const getIsAuthorized = createSelector(
  state => state.auth.isAuthorized,
  isAuthorized => isAuthorized
);

export default combineReducers({ apiKey, isAuthorized });
