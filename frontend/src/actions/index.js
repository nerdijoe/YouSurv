import axios from 'axios';

import * as actionType from './constants';

// axios.defaults.crossDomain = true;

export const axiosSignUp = (data, router) => (dispatch) => {

    console.log("test cross origin");


    axios.get('http://localhost:8080', {
            // method: 'GET',
            // mode: 'no-cors',
            // headers: {
            //     'Access-Control-Allow-Origin': '*',
            //     // 'Content-Type': 'application/json',
            // }
        })
        .then(res => {
            console.log(res);
            console.log('fetch data', res.data);
        })
        .catch(err => {
            console.log("exception caught");
            console.log(err);
        })

  console.log(" before axiosSignUp", data);
  
    axios.post('http://localhost:8080/signup', {
            // method: 'GET',
            // mode: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        },
        {
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
