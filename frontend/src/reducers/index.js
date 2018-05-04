import { combineReducers } from 'redux';

import UserReducer from './UserReducer';

const MainReducer = combineReducers({
  UserReducer,
})

export default MainReducer;
