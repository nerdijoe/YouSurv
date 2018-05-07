import * as actionType from '../actions/constants';

const initialState = {
  surveys: [],
  surveyCurrent: {
    questions:[],
  },
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
    case actionType.SURVEY_GET_ONE: {
      console.log('SurveyReducer SURVEY_GET_ONE');
      console.log('action = ', action);
      // const surveyDetail = state.surveys.filter(s => s.id === action.id )
      return {
        ...state,
        surveyCurrent: action.data,
      }
    }
    case actionType.QUESTION_ADD: {
      console.log('SurveyReducer QUESTION_ADD action=', action);

      const updateQuestion = [...state.surveyCurrent.questions, action.data];

      return {
        ...state,
        surveyCurrent: {...state.surveyCurrent, questions: updateQuestion}

      }
    }
    case actionType.QUESTION_UPDATE_TEXT: {
      console.log('SurveyReducer QUESTION_UPDATE_TEXT action.data=', action.data);
      const UpdatedSurveyCurrent = {...state.surveyCurrent}
      const updatedQuestions = [...state.surveyCurrent.questions];
      Object.keys(action.data).forEach(function(key) {
        // var val = o[key];
        // find question with correct id
        const pos = UpdatedSurveyCurrent.questions.findIndex(i => i.id === key);
        if (pos !== -1) {
          console.log(typeof UpdatedSurveyCurrent.questions[pos].text);
          console.log(`--> UpdatedSurveyCurrent.questions[${pos}].text=${UpdatedSurveyCurrent.questions[pos].text}`);
  
          UpdatedSurveyCurrent.questions[pos].text = action.data[key];
        }

      });

      return {
        ...state,
        surveyCurrent: UpdatedSurveyCurrent,
      }
      
    }
    case actionType.SURVEY_SAVE_QUESTION: {
      console.log('SurveyReducer SURVEY_SAVE');
      // save current survey to survey arrays
      const updatedSurveys = [...state.surveys];
      const pos = updatedSurveys.findIndex(i => i.id === state.surveyCurrent.id)

      updatedSurveys[pos].questions = state.surveyCurrent.questions;
      
      return {
        ...state,
        surveys: updatedSurveys,
      }

    }
    default: 
      return state;
  }
}

export default SurveyReducer;
