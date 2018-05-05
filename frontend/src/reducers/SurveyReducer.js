import * as actionType from '../actions/constants';

const initialState = {
  surveys: [],  
}

const SurveyReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CREATE_SURVEY: {
      console.log('SurveyReducer CREATE_SURVEY');
      console.log('action=', action);
      
      const newSurvey = { 
        ...action.data,
        authorId: localStorage.getItem('user_email'),
        questions: [],
        isPublished: false,
        isDeleted: false,
      }
      return {
        ...state,
        surveys: [...state.surveys, newSurvey],
      }
    }
    default: 
      return state;
  }
}

export default SurveyReducer;
