import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';
import { connect } from 'react-redux';

import {
  axiosSignIn,
} from '../actions';

import {domainURL} from '../actions/urlConstant';

import {
  Container,
  Form,
  Button,
  Grid,
  Message,
  Header,
} from 'semantic-ui-react';
import styled from 'styled-components';

import Navbar from './Navbar';

import axios from 'axios';
import CommonSurvey from './CommonSurvey';


const MyContainer = styled.div`
width: 100%;
height: 100%;
margin-left: 0px;
padding: 0px;
${'' /* background: #0099FF; */}

`;


const ErrorMessage = ({formErrors}) => (
  <Container>
    <div></div>
    {Object.keys(formErrors).map((fieldName, i) => {
      if (formErrors[fieldName].length > 0) {
        return (
         
          <Message negative>
            <p key={i}>{fieldName} {formErrors[fieldName]}</p>
          </Message>

        );
      }
    })}
  </Container>
);

class OpenUniqueSurvey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formErrors: { Token: '' },
      formValid: false,
      token: '',
      tokenValid: true
    }
  }

  componentWillMount() {
    // this.props.axiosVerify(this.state.token, this.props.history);
    axios.get(`${domainURL}/survey/token/`+this.props.location.search.split('?token=')[1]).then( res => {
      console.log("responseeee");
      if(res.status===200)
        this.setState({
          surveyLoad: res
        })
      else {
        console.log("error invalid 404");
        // this.setState({
        //   tokenValid: false,
        // }, () => {
        //   this.validateField('token');
        // });
      }

    })
    .catch( res => {
      console.log("error 404",res);

        this.setState({
          tokenValid: false,
          tokenMsg: res.response.data.message
        });
    })
    // this.props.history.push('/signin');
  }
  
  validateField(fieldName) {
    const formErrorsValidation = this.state.formErrors;
    
    let tokenValid = this.state.tokenValid;
    
    switch (fieldName) {
      case 'token':
        formErrorsValidation.Token = tokenValid ? '' : ' Verification code is invalid. Please Try again';
        break;
      default:
        break;
    }
    // update the error message
    this.setState({
      formErrors: formErrorsValidation,
      tokenValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.tokenValid });
  }

  handleRegister(e) {
    e.preventDefault();
    console.log('handleSignIn', this.state.token);
    
  }

  handleChange(e) {
    const target = e.target;

    console.log(`handleChange ${target.name}=[${target.value}]`);

    // validate field everytime user enters something.
    this.setState({
      [target.name]: target.value,
      tokenValid: true
    }, () => {
      this.validateField(target.name, target.value);
    });
  }


  render() {
    let urllll = this.props.location.search.split('?token=')[1];
    console.log("urlllll",urllll);
      let surveyLoad = null;
      if(this.state.surveyLoad)
        surveyLoad = (
            <CommonSurvey surveyLoad={this.state.surveyLoad} tokenurl={urllll} />
        )
    return (
      <MyContainer>
        {(this.state.tokenValid == false) ? (
          <Message compact>
            {this.state.tokenMsg}
          </Message>
        ) : (
          <div>
            <Navbar />
            <br/>
            {surveyLoad}
          </div>
        )}
      </MyContainer>
    );
  }
}

export default OpenUniqueSurvey;
