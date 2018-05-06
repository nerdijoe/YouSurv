import * as actionType from '../actions/constants';

const initialState = {
  surveys: [],  
}

const SurveyReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SURVEY_CREATE: {
      console.log('SurveyReducer SURVEY_CREATE');
      console.log('action=', action);
      
      const newSurvey = { 
        ...action.data,
      }
      return {
        ...state,
        surveys: [...state.surveys, newSurvey],
      }
    }
    case actionType.SURVEY_GET_ALL: {
      console.log('SurveyReducer SURVEY_GET_ALL');
      console.log('action = ', action);

      return {
        ...state,
        surveys: [...action.data],
      }
    }

    case actionType.SURVEY_GET_ALL_DUMMY: {
      console.log('SurveyReducer SURVEY_GET_ALL_DUMMY');
      console.log('action = ', action);

      return {
        ...state,
      }
    }
    default: 
      return state;
  }
}

export default SurveyReducer;
