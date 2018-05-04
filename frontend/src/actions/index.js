import axios from 'axios';

import * as actionType from './constants';


export const axiosSignUp = (data, router) => (dispatch) => {
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
  })
  .catch(err => {
    console.log("xxxxx");
    console.log(err);
  })
}

export const userSignUp = (data) => {
  console.log('userSignUp', data);
  return {
    type: actionType.USER_SIGN_UP,
    data,
  };
};
