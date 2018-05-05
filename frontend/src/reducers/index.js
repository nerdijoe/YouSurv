import { combineReducers } from 'redux';

import UserReducer from './UserReducer';
import SurveyReducer from './SurveyReducer';

const MainReducer = combineReducers({
  UserReducer,
  SurveyReducer,
  
})

export default MainReducer;
