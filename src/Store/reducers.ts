import { combineReducers } from 'redux';

import { HomeReducer } from './Home/reducer';
import { StoreReducer } from './Store/reducer';
import { EntityReducer } from './Entity/reducer';

export const initialState = {
  home: HomeReducer,
  store: StoreReducer,
  entities: EntityReducer
};

export default combineReducers(initialState);
