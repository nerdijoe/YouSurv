import * as actionType from '../actions/constants';
import cuid from 'cuid';
import moment from 'moment';

const initialState = {
  surveys: [],
  surveyCurrent: {
    questions:[],
  },
  surveyTaking: [],
  surveyTakingCurrent: {
    questions:[],
  },
  answerChanges: false,
  surveysOpenUnique: [],
}

const SurveyReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SURVEY_CREATE: {
      console.log('SurveyReducer SURVEY_CREATE');
      console.log('action=', action);

      const newSurvey = {
        ...action.data,
      }

      // takingSurveys only for testing
      return {
        ...state,
        surveys: [...state.surveys, newSurvey],
        // surveyTaking: [...state.surveyTaking, newSurvey],
      }
    }
    case actionType.SURVEY_GET_ALL: {
      console.log('SurveyReducer SURVEY_GET_ALL');
      console.log('action.data = ', action.data);

      return {
        ...state,
        surveys: [...action.data.surveysAsSurveyor],
        surveyTaking: [...action.data.surveysAsSurveyee],
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
        surveyCurrent: {...state.surveyCurrent, questions: updateQuestion},
      }
    }
    case actionType.QUESTION_ADD_FROM_JSON_FILE: {
      console.log('SurveyReducer QUESTION_ADD_FROM_JSON_FILE action=', action);

      const updateQuestion = [...state.surveyCurrent.questions, ...action.data];

      return {
        ...state,
        surveyCurrent: {...state.surveyCurrent, questions: updateQuestion},
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
    case actionType.QUESTION_REMOVE: {
      console.log('SurveyReducer QUESTION_REMOVE action.data=', action.data);
      const UpdatedSurveyCurrent = {...state.surveyCurrent};

      UpdatedSurveyCurrent.questions = [
        ...UpdatedSurveyCurrent.questions.filter(q => q.id !== action.data.id)
      ];

      return {
        ...state,
        surveyCurrent: UpdatedSurveyCurrent,
      }
    }
    case actionType.SURVEY_UPDATE: {
      console.log('SurveyReducer SURVEY_UPDATE action.data=', action.data);

      const updatedSurveys = [...state.surveys];
      const pos = updatedSurveys.findIndex(i => i.id === state.surveyCurrent.id)

      // replace the whole survey with the updated survey
      updatedSurveys[pos] = action.data;

      return {
        ...state,
        surveys: updatedSurveys,
        surveyCurrent: action.data,
        // surveyTaking: updatedSurveys,

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
        // surveyTaking: updatedSurveys,

      }
    }
    case actionType.SURVEY_PUBLISH: {
      console.log('SurveyReducer SURVEY_PUBLISH action.data=', action.data);

      const updatedSurveys = [...state.surveys];
      const pos = updatedSurveys.findIndex(i => i.id === action.data.id)

      // replace the whole survey with the updated survey
      updatedSurveys[pos] = action.data;

      return {
        ...state,
        surveys: updatedSurveys,
        surveyCurrent: action.data,

      }
    }
    case actionType.SURVEY_UNPUBLISH: {
      console.log('SurveyReducer SURVEY_UNPUBLISH action.data=', action.data);

      const updatedSurveys = [...state.surveys];
      const pos = updatedSurveys.findIndex(i => i.id === action.data.id)

      // replace the whole survey with the updated survey
      updatedSurveys[pos] = action.data;

      return {
        ...state,
        surveys: updatedSurveys,
        surveyCurrent: action.data,

      }
    }
    case actionType.SURVEY_CLOSE: {
      console.log('SurveyReducer SURVEY_CLOSE action.data=', action.data);

      const updatedSurveys = [...state.surveys];
      const pos = updatedSurveys.findIndex(i => i.id === action.data.id)

      // replace the whole survey with the updated survey
      updatedSurveys[pos] = action.data;

      return {
        ...state,
        surveys: updatedSurveys,
        surveyCurrent: action.data,

      }
    }
    case actionType.SURVEY_TAKING_GET_BY_ID: {
      console.log('SurveyReducer SURVEY_TAKING_GET_BY_ID');
      console.log('action = ', action);
      // const surveyDetail = state.surveys.filter(s => s.id === action.id )
      const surveyTaking = [...state.surveyTaking];
      const surveyTakingCurrent = surveyTaking.filter(s => s.id === action.data)
      console.log('     surveyTaking=', surveyTaking);
      console.log('     surveyTakingCurrent=', surveyTakingCurrent);
      return {
        ...state,
        surveyTakingCurrent: surveyTakingCurrent[0],
      }
    }
    case actionType.SURVEY_TAKING_CURRENT_CLEAR: {

      return {
        ...state,
        surveyTakingCurrent: {questions:[]},
      }
    }
    case actionType.SURVEY_TAKING_SAVE_PROGRESS_DUMMY: {
      console.log('SurveyReducer SURVEY_TAKING_SAVE_PROGRESS');
      console.log('action = ', action);
      const data = action.data;

      // find by surveyee email
      const UpdatedSurveyTakingCurrent = {...state.surveyTakingCurrent}
      const updateAnswers = [...UpdatedSurveyTakingCurrent.answers];

      const email = localStorage.getItem('user_email');
      const pos = updateAnswers.findIndex(i => i.surveyeeEmail === email)

      // if existing answer by this user exist, just update his answers
      if(pos != -1) {
        updateAnswers[pos].choices = data;

        /*
        // find the question id if exist
        updateAnswers[pos].choices.map( c => {
          if( data.hasOwnProperty(c.questionId) ) {
            // update value
            c.selection = data[c.questionId];
          }
        })

        // insert choices if it does not exist
        Object.keys(data).forEach( key => {
          updateAnswers[pos].choices.findIndex(i => i.questionId === key)
          if (pos == -1) {
            var choice = {
              questionId: key,
              selection: data[key],
            }
            updateAnswers[pos].choices.push(choice);
          }
        })
        */



      } else {
        // insert into answers array
/*
{
			"id":"12",
			"surveyeeEmail": "rudy@sjsu.edu",
			"choices": [
				{
					"questionId": "11",
					"selection": ["111", "113"]
				}
			],
			"created": "2018-05-02 15:00:59",
			"updated": "2018-05-02 15:00:59",
			"deleted": false,
			"submitted": true
		},
*/

        var newAnswer = {
          id: cuid(),
          surveyeeEmail: email,
          choices: data,
          created: '',
          updated: '',
          deleted: false,
          submitted: false,
        }


        updateAnswers.push(newAnswer);
      }

      const surveyTaking = [...state.surveyTaking];
      const posfoo = surveyTaking.findIndex(i => i.id === UpdatedSurveyTakingCurrent.id)

      UpdatedSurveyTakingCurrent.answers = updateAnswers;

      // replace the whole survey with the updated survey
      if(posfoo != -1)
        surveyTaking[posfoo] = UpdatedSurveyTakingCurrent



      return {
        ...state,
        surveyTaking: surveyTaking,
        surveyTakingCurrent: UpdatedSurveyTakingCurrent,

      }
    }
    case actionType.SURVEY_TAKING_SAVE_PROGRESS: {
      console.log('SurveyReducer SURVEY_TAKING_SAVE_PROGRESS');
      console.log('action = ', action);
      const data = action.data.choices;

      // find by surveyee email
      const UpdatedSurveyTakingCurrent = {...state.surveyTakingCurrent}
      const updateAnswers = [...UpdatedSurveyTakingCurrent.answers];

      const email = localStorage.getItem('user_email');
      const pos = updateAnswers.findIndex(i => i.surveyeeEmail === email)

      // if existing answer by this user exist, just update his answers
      if(pos != -1) {
        updateAnswers[pos].choices = data;
      } else {
        // insert into answers array
        updateAnswers.push(action.data);
      }

      const surveyTaking = [...state.surveyTaking];
      const posfoo = surveyTaking.findIndex(i => i.id === UpdatedSurveyTakingCurrent.id)


      UpdatedSurveyTakingCurrent.answers = updateAnswers;

      // replace the whole survey with the updated survey
      if(posfoo != -1)
        surveyTaking[posfoo] = UpdatedSurveyTakingCurrent


      return {
        ...state,
        surveyTaking: surveyTaking,
        surveyTakingCurrent: UpdatedSurveyTakingCurrent,

      }
    }

    case actionType.SURVEY_TAKING_SUBMIT: {
      console.log('SurveyReducer SURVEY_SUBMIT action.data=', action.data);

      // find by surveyee email
      const UpdatedSurveyTakingCurrent = {...state.surveyTakingCurrent}
      const updateAnswers = [...UpdatedSurveyTakingCurrent.answers];

      console.log("updatedddd");

      const email = localStorage.getItem('user_email');
      const pos = updateAnswers.findIndex(i => i.surveyeeEmail === email)
      console.log('---->>>>> updateAnswers[pos]=', updateAnswers[pos])

      // if existing answer by this user exist, just update his answers
      if(pos != -1) {
        updateAnswers[pos] = action.data;
      }

      UpdatedSurveyTakingCurrent.answers = updateAnswers;

      const surveyTaking = [...state.surveyTaking];
      const posfoo = surveyTaking.findIndex(i => i.id === UpdatedSurveyTakingCurrent.id)
      // replace the whole survey with the updated survey
      if(posfoo != -1)
        surveyTaking[posfoo] = UpdatedSurveyTakingCurrent

      return {
        ...state,
        surveyTaking: surveyTaking,
        surveyTakingCurrent: UpdatedSurveyTakingCurrent,
      }

    }
    case actionType.SURVEY_TAKING_ANSWER_CHANGES_TRUE: {
      return {
        ...state,
        answerChanges: true,
      }
    }
    case actionType.SURVEY_TAKING_ANSWER_CHANGES_FALSE: {
      return {
        ...state,
        answerChanges: false,
      }
    }
    case actionType.SURVEY_GET_ALL_OPENUNIQUE: {
      console.log('SurveyReducer SURVEY_GET_ALL_OPENUNIQUE');
      console.log('action.data = ', action.data);

      return {
        ...state,
        surveysOpenUnique: [...action.data],
      }
    }
    default:
      return state;
  }
}

export default SurveyReducer;
