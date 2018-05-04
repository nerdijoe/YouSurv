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
