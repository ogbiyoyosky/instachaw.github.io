import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import api from './api';
import Reducers from './reducers';

export default (initialState = {}) => {
  return createStore(Reducers,
    initialState,
    composeWithDevTools(
      applyMiddleware(
        thunkMiddleware.withExtraArgument(api)
      )
    ));
};