import axios from 'axios';
import cuid from 'cuid';

import * as actionType from './constants';
import {domainURL} from './urlConstant';

// axios.defaults.crossDomain = true;

export const unload = () => {
  return {
    type: actionType.UNLOAD,
    data: '',
  };
};

export const savePath = (pathdata) => {
  return {
    type: actionType.SAVEPATH,
    data: pathdata,
  };
};

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

  axios.post(`${domainURL}/signup`, {
    email: data.email,
    password: data.password,
    // firstname: data.firstname,
    // lastname: data.lastname,
  })
  .then(res => {
    console.log('** afteraxiosSignup res.data', res.data);
    dispatch(userSignUp(data));
    router.push('/verify');
  })
  .catch(err => {
    console.log("xxxxx");
    console.log(err);
    dispatch(userSignUpFail(err));
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

export const userSignUpFail = (data) => {
  return {
    type: actionType.USER_SIGN_UP_FAIL,
    data: data.response.data.message,
  };
};

export const axiosSignIn = (data, router) => (dispatch) => {
  console.log('axiosSignIn');

  axios.post(`${domainURL}/signin`, {
    email: data.email,
    password: data.password,
  }).then( res => {
    console.log('after axiosSignIn, res:', res);

    // save token to localStorage
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user_email', data.email);

    dispatch(userSignIn(data));

    router.push('/home');
  }).catch(res => {
    dispatch(userSignInFail(res));
  })
}

export const userSignInFail = (data) => {
  return {
    type: actionType.USER_SIGN_IN_FAIL,
    data: data.response.data.message,
  };
}

export const userSignIn = (data) => {
  return {
    type: actionType.USER_SIGN_IN,
    data,
  };
}

// export const axiosVerify = (data, router) => (dispatch) => {
//   console.log('axiosVerify');

//   axios.post('http://localhost:8080/user/verify?emailVerificationToken='+data).then( res => {

//     dispatch(userVerify(data));

//     // router.push('/signin');
//   })
// }

// export const userVerify = (data) => {
//   return {
//     type: actionType.USER_VERIFY,
//     data,
//   };
// }

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
  const token = 'Bearer ' + localStorage.getItem('token');
  console.log('token = ', token);
  axios.post(`${domainURL}/survey/`, {
    title: data.title,
    type: data.type,
  }, {
    headers: {
      Authorization: token,
    }
  })
  .then(res => {
    console.log('>  after axiosCreateSurvey res.data', res.data);
    dispatch(surveyCreate(res.data));
    // router.push('/signin');
  })
  .catch(err => {
    console.log("***  error axiosCreateSurvey");
    console.log(err);
  })

  // Simulation using dummy response
  /*
  const res = {
    data: {
      id: cuid(),
      surveyorEmail: localStorage.getItem('user_email'),
      invitedEmailList: [],
      title: data.title,
      type: data.type,
      questions: [],
      answers: [],
      publish: null,
      deleted: false,
      created: '2018-05-05 15:14:00',
      updated: '2018-05-05 15:14:00',
      start: null,
      end: null,
    }
  }

  dispatch(surveyCreate(res.data));
  */
}

export const surveyCreate = (data) => {
  return {
    type: actionType.SURVEY_CREATE,
    data,
  }
}

export const axiosSurveyGetAll = (data) => (dispatch) => {
  console.log('<  before axiosSurveyGetAll data=', data);
  const token = 'Bearer ' + localStorage.getItem('token');

  axios.get(`${domainURL}/survey/`, {
    headers: {
      Authorization: token,
    }
  })
  .then(res => {
    console.log('> after axiosSurveyGetAll res.data', res.data);
      dispatch(surveyGetAll(res.data));
      dispatch(surveyTakingCurrentClear());
    // router.push('/signin');
  })
  .catch(err => {
    console.log("***  error axiosSurveyGetAll");
    console.log(err);
  })

  // dispatch(surveyGetAllDummy());

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

export const axiosSurveyUpdate = (data) => dispatch => {
  console.log('<  before axiosSurveyUpdate data=', data);
  const token = 'Bearer ' + localStorage.getItem('token');
  console.log('token=', token)

  axios.put(`${domainURL}/survey/${data.id}`, data ,{
    headers: {
      Authorization: token,
    }
  })
  .then(res => {
    console.log('> after axiosSurveyUpdate res.data', res.data);
      dispatch(surveyUpdate(res.data));
    // router.push('/signin');
  })
  .catch(err => {
    console.log("***  error axiosSurveyUpdate");
    console.log(err);
  })

  // dispatch(surveyUpdate(data));

}

export const surveyUpdate = (data) => {
  return {
    type: actionType.SURVEY_UPDATE,
    data,
  }
}



export const surveyShowDetail = (data, router) => (dispatch) => {
  router.push('/home/surveydetail');
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


// this is for dummy data
export const surveySaveQuestion = () => dispatch => {
  console.log('surveySave' );

  dispatch(surveySaveQuestionReduce());
}

export const surveySaveQuestionReduce = () => {
  return {
    type: actionType.SURVEY_SAVE_QUESTION,

  }
}

export const questionAddFromJson = data => dispatch => {
  console.log('questionAddFromJson data=', data);
  dispatch(questionAddFromJsonReduce(data))
}

export const questionAddFromJsonReduce = (data) => {
  return {
    type: actionType.QUESTION_ADD_FROM_JSON_FILE,
    data,
  }
}


export const questionRemove = (data) => dispatch => {
  console.log('questionRemove');

  dispatch(questionRemoveReduce(data));
}

export const questionRemoveReduce = (data) => {
  return {
    type: actionType.QUESTION_REMOVE,
    data,
  }
}

// ==============================================================================
// Surveyee Action
// ==============================================================================

export const surveyTakingGetById = (data) => dispatch => {
  console.log('surveyGetById data=', data);

  dispatch(surveyTakingGetByIdReduce(data));
}

export const surveyTakingGetByIdReduce = (data) => {
  return {
    type: actionType.SURVEY_TAKING_GET_BY_ID,
    data,
  }
}

export const surveyTakingSaveProgress = (data, surveyId, answerId) => dispatch => {
  console.log('surveyTakingSaveProgress data=', data);
  console.log('surveyId=', surveyId);
  console.log('answerId=', answerId);

  // axios POST
  // {
  //   surveyId: surveyId,
  //   choices: data,
  // }

  const token = 'Bearer ' + localStorage.getItem('token');
  axios.post(`${domainURL}/survey/${surveyId}/answer`, {
    choices: data,
    id: answerId,
  }, {
    headers: {
      Authorization: token,
    }
  })
  .then(res => {
    console.log('>  after surveyTakingSaveProgress res.data', res.data);
    dispatch(surveyTakingSaveProgressReduce(res.data));

    dispatch(surveyTakingAnswerChangesFalse());
    // router.push('/signin');
  })
  .catch(err => {
    console.log("***  error axiosSaveSurvey");
    console.log(err);
  })

  // dispatch(surveyTakingSaveProgressReduceDummy(data));

}

export const surveyTakingSaveProgressReduceDummy = (data) => {
  return {
    type: actionType.SURVEY_TAKING_SAVE_PROGRESS_DUMMY,
    data,
  }
}

export const surveyTakingSaveProgressReduce = (data) => {
  return {
    type: actionType.SURVEY_TAKING_SAVE_PROGRESS,
    data,
  }
}

export const axiosSurveyPublish = (data) => dispatch => {
  console.log('axiosSurveyPublish data=', data);
  var surveyId = data.id;

  const token = 'Bearer ' + localStorage.getItem('token');
  axios.post(`${domainURL}/survey/${surveyId}/publish`, {}, {
    headers: {
      Authorization: token,
    }
  })
  .then(res => {
    console.log('>  after axiosSurveyPublish res.data', res.data);
    dispatch(surveyPublish(res.data));
    // router.push('/signin');
  })
  .catch(err => {
    console.log("***  error axiosSurveyPublish");
    console.log(err);
  })
}

export const surveyPublish = (data) => {
  return {
    type: actionType.SURVEY_PUBLISH,
    data,
  }
}

export const axiosSurveyUnpublish = (data) => dispatch => {
  console.log('axiosSurveyUnpublish data=', data);
  var surveyId = data.id;

  const token = 'Bearer ' + localStorage.getItem('token');
  axios.post(`${domainURL}/survey/${surveyId}/unpublish`, {}, {
    headers: {
      Authorization: token,
    }
  })
  .then(res => {
    console.log('>  after axiosSurveyUnpublish res.data', res.data);
    dispatch(surveyUnpublish(res.data));
    // router.push('/signin');
  })
  .catch(err => {
    console.log("***  error axiosSurveyUnpublish");
    console.log(err);
  })
}

export const surveyUnpublish = (data) => {
  return {
    type: actionType.SURVEY_UNPUBLISH,
    data,
  }
}



export const axiosSurveyClose = (data) => dispatch => {
  console.log('axiosSurveyClose data=', data);
  var surveyId = data.id;

  const token = 'Bearer ' + localStorage.getItem('token');
  axios.post(`${domainURL}/survey/${surveyId}/close`, {}, {
    headers: {
      Authorization: token,
    }
  })
  .then(res => {
    console.log('>  after axiosSurveyClose res.data', res.data);
    dispatch(surveyClose(res.data));
    // router.push('/signin');
  })
  .catch(err => {
    console.log("***  error axiosSurveyClose");
    console.log(err);
  })
}

export const surveyClose = (data) => {
  return {
    type: actionType.SURVEY_CLOSE,
    data,
  }
}



// Survey Taking ----------------------------------------------------------------

export const axiosSurveyTakingSubmit = (data) => dispatch => {
  console.log('axiosSurveySubmit data=', data);
  var surveyId = data.id;
  const userEmail = localStorage.getItem('user_email');
  // Find the correct answer object
  const pos = data.answers.findIndex(i => i.surveyeeEmail === userEmail)
  // if existing answer by this user exist, just update his answers
  var answerId = '';
  if(pos != -1) {
    answerId = data.answers[pos].id;
  }

  console.log(`---surveyId=${surveyId}, answerId=${answerId}`);

  const token = 'Bearer ' + localStorage.getItem('token');
  console.log('token=', token);

  axios.post(`${domainURL}/survey/${surveyId}/answer/${answerId}`, {}, {
    headers: {
      Authorization: token,
    }
  })
  .then(res => {
    console.log('>  after axiosSurveySubmit res.data', res.data);
    dispatch(surveyTakingSubmit(res.data));
    // router.push('/signin');
  })
  .catch(err => {
    console.log("***  error axiosSurveySubmit");
    console.log(err);
  })
}

export const surveyTakingSubmit = (data) => {
  return {
    type: actionType.SURVEY_TAKING_SUBMIT,
    data,
  }
}

export const surveyTakingAnswerChangesTrue = () => {
  return {
    type: actionType.SURVEY_TAKING_ANSWER_CHANGES_TRUE,
  }
}

export const surveyTakingAnswerChangesFalse = () => {
  return {
    type: actionType.SURVEY_TAKING_ANSWER_CHANGES_FALSE,
  }
}

export const surveyTakingCurrentClear = () => {
  return {
    type: actionType.SURVEY_TAKING_CURRENT_CLEAR,
  }
}



export const axiosSurveyGetAllOpenUnique = () => (dispatch) => {
  console.log('<  before axiosSurveyGetAllOpenUnique');
  const token = 'Bearer ' + localStorage.getItem('token');

  axios.get(`${domainURL}/survey/openUnique`)
  .then(res => {
    console.log('> after axiosSurveyGetAllOpenUnique res.data', res.data);
      dispatch(surveyGetAllOpenUnique(res.data));
    // router.push('/signin');
  })
  .catch(err => {
    console.log("***  error axiosSurveyGetAllOpenUnique");
    console.log(err);
  })

}

export const surveyGetAllOpenUnique = (data) => {
  return {
    type: actionType.SURVEY_GET_ALL_OPENUNIQUE,
    data,
  }
}
