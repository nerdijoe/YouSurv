import axios from 'axios';

import * as actionType from './constants';

// axios.defaults.crossDomain = true;
const token = 'Bearer ' + localStorage.getItem('token');

export const axiosSignUp = (data, router) => (dispatch) => {

    console.log("test cross origin");


    // axios.get('http://localhost:8080', {
    //         // method: 'GET',
    //         // mode: 'no-cors',
    //         // headers: {
    //         //     'Access-Control-Allow-Origin': '*',
    //         //     // 'Content-Type': 'application/json',
    //         // }
    //     })
    //     .then(res => {
    //         console.log(res);
    //         console.log('fetch data', res.data);
    //     })
    //     .catch(err => {
    //         console.log("exception caught");
    //         console.log(err);
    //     })

  console.log(" before axiosSignUp", data);
  
  axios.post('http://localhost:8080/signup', {
    username: data.email,
    password: data.password,
    // firstname: data.firstname,
    // lastname: data.lastname,
  })
  .then(res => {
    console.log('** afteraxiosSignup res.data', res.data);
    dispatch(userSignUp(data));
    router.push('/signin');
  })
  .catch(err => {
    console.log("xxxxx");
    console.log(err);
    // alert(err);
  })


  // fetch("http://localhost:8080/signup", {
  //   method: 'POST',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     username: data.email,
  //     password: data.password,
  //  })
  // })
  // .then((response) => response.text())
  // .then((responseText) => {
  //   alert(responseText);
  // })
  // .catch((error) => {
  //     console.error(error);
  // });

  // let token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJicm8xQGhhaGEuY29tIiwiYXV0aCI6W3siYXV0aG9yaXR5IjoiVVNFUiJ9XSwiaWF0IjoxNTI1NDAzOTgxLCJleHAiOjE1MjU0MDc1ODF9.Jyv_E3pff59-3o2DKe3AkYV48wuQNodXS11UMMjvkbM';
  // axios.get('http://localhost:8080/user/', {
  //   headers: {
  //     Authorization: token,
  //   }
  // }).then(res => {
  //   console.log("axios.get");
  //   console.log(res);
  // }).catch(err => {
  //   console.log(err);
  // })


}

export const userSignUp = (data) => {
  console.log('userSignUp', data);
  return {
    type: actionType.USER_SIGN_UP,
    data,
  };
};

export const axiosSignIn = (data, router) => (dispatch) => {
  console.log('axiosSignIn');

  axios.post('http://localhost:8080/login', {
    username: data.email,
    password: data.password,
  }).then( res => {
    console.log('after axiosSignIn, res:', res);

    // save token to localStorage
    localStorage.setItem('token', res.data);
    localStorage.setItem('user_email', data.email);

    dispatch(userSignIn(data));

    router.push('/home');
  })
}

export const userSignIn = (data) => {
  return {
    type: actionType.USER_SIGN_IN,
    data,
  };
}

export const userSignOutRequest = () => (dispatch) => {
  console.log('userSignOutRequest');

  localStorage.removeItem('token');
  localStorage.removeItem('user_id');
  localStorage.removeItem('user_email');
  localStorage.removeItem('user_firstname');
  localStorage.removeItem('user_lastname');
  // localStorage.removeItem('user_mysql_id');
  // localStorage.removeItem('user_mongo_id');

  // router.push('/');
  dispatch(userSignOut());

}

export const userSignOut = () => {
  return {
    type: actionType.USER_SIGN_OUT,
  };
};

export const axiosSurveyCreate = data => dispatch => {
  console.log('<  before axiosSurveyCreate data=', data);
  // axios.post('http://localhost:8080/surveys', {
  //   type: data.type,
  // }, {
  //   headers: {
  //     token,
  //   }
  // })
  // .then(res => {
  //   console.log('>  after axiosCreateSurvey res.data', res.data);
  //   dispatch(createSurvey(data));
  //   // router.push('/signin');
  // })
  // .catch(err => {
  //   console.log("***  error axiosCreateSurvey");
  //   console.log(err);
  // })

/*
question object
{
			"id": "",
			"type": "",
			"text": "",
			"image": "",
			"options": [
				{
					"id":"",
					"text":"",
					"image":"",
					"created": "2018-05-02 15:00:59",
					"updated": "2018-05-02 15:00:59",
					"isDeleted": false
				}
			]
			"answer":{
				"id":"",
				"text":"",
				"created": "2018-05-02 15:00:59",
				"updated": "2018-05-02 15:00:59",
				"isDeleted": false
			}
			"isRequired": true
			"created": "2018-05-02 15:00:59",
			"updated": "2018-05-02 15:00:59",
			"isDeleted": false
		}
*/


  
  const res = {
    data: {
      id: '1',
      authorEmail: localStorage.getItem('user_email'),
      invitedEmailList: [],
      title: data.title,
      type: data.type,
      questions: [],
      answers: [],
      published: '2018-05-05 15:14:00',
      deleted: false,
      created: '2018-05-05 15:14:00',
      updated: '2018-05-05 15:14:00',
    }
  }
  
  dispatch(surveyCreate(res.data));

}

export const surveyCreate = (data) => {
  return {
    type: actionType.SURVEY_CREATE,
    data,
  }
}

export const axiosSurveyGetAll = (data) => (dispatch) => {
  console.log('<  before axiosSurveyGetAll data=', data);

  // axios.get('http://localhost:8080/surveys', {
  //   headers: {
  //     token,
  //   }
  // })
  // .then(res => {
  //   console.log('> after axiosSurveyGetAll res.data', res.data);
  //     dispatch(surveyGetAll(res.data));
  //   // router.push('/signin');
  // })
  // .catch(err => {
  //   console.log("***  error axiosSurveyGetAll");
  //   console.log(err);
  // })

  dispatch(surveyGetAllDummy());

}

export const surveyGetAll = (data) => {
  return {
    type: actionType.SURVEY_GET_ALL,
    data,
  }
}

export const surveyGetAllDummy = () => {
  return {
    type: actionType.SURVEY_GET_ALL_DUMMY
  }
}

export const surveyShowDetail = (data, router) => (dispatch) => {
  router.push('/surveydetail');
  dispatch(surveyShowDetailReduce(data));
}

export const surveyShowDetailReduce = (data) => {
  return {
    type: actionType.SURVEY_GET_ONE,
    data,
  }
}

export const questionAdd = data => dispatch => {
  console.log('questionAdd data=', data);
  dispatch(questionAddReduce(data))
}

export const questionAddReduce = (data) => {
  return {
    type: actionType.QUESTION_ADD,
    data,
  }
}

export const questionUpdateText = (data) => dispatch => {
  console.log('questionUpdateText data=', data);

  dispatch(questionUpdateTextReduce(data));
  
}

export const questionUpdateTextReduce = (data) => {
  return {
    type: actionType.QUESTION_UPDATE_TEXT,
    data,
  }
}

export const surveySaveQuestion = () => dispatch => {
  console.log('surveySave' );
  
  dispatch(surveySaveQuestionReduce());
}

export const surveySaveQuestionReduce = () => {
  return {
    type: actionType.SURVEY_SAVE_QUESTION,

  }
}
