import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import MainReducer from '../reducers';

const middlewares = applyMiddleware(logger, thunk);

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(); 

const store = createStore(
  MainReducer,
  compose(
    middlewares,
    devTools,
  ),
);

export default store;
