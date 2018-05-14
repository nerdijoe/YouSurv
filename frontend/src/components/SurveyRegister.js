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

class SurveyRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      formErrors: { Token: '' },
      emailValid: false,
      passwordValid: false,
      firstnameValid: true,
      lastnameValid: true,
      formValid: false,
      email: '',
      emailValid: true
    }
  }
  
  validateField(fieldName,value) {
    const formErrorsValidation = this.state.formErrors;
    
    let emailValid = this.state.emailValid;
    
    switch (fieldName) {
      case 'email':
        emailValid = (/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(value);
        emailValid = value==''?true:emailValid;
        formErrorsValidation.email = emailValid ? '' : ' is invalid.';
        break;
      default:
        break;
    }
    // update the error message
    this.setState({
      formErrors: formErrorsValidation,
      emailValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.emailValid }, this.render());
  }

  handleRegister(e) {
    if(e) e.preventDefault();
    console.log('handleSignIn', this.state.token);
    // this.props.axiosVerify(this.state.token, this.props.history);
    let email = (localStorage.getItem('user_email'))?localStorage.getItem('user_email'):this.state.email;
    axios.post(`${domainURL}/survey/generate/openuniquelink`,{
      email, surveyId: this.props.location.search.split('?surveyId=')[1]
    }).then( res => {
      console.log("responseeee");
      

    })
    .catch( res => {
      console.log("error 404");
        // this.setState({
        //   errorValid: false,
        //   error: res.message,
        // }, () => {
        //   this.validateField('token', this.state.token);
        // });
    })
    // // this.props.history.push('/signin');
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
    if( localStorage.getItem('user_email'))
      this.handleRegister();
    return (
      <MyContainer>
        <Navbar />

        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={4} />
              <Grid.Column width={8}>
                <Header size='huge'>Register for the Survey</Header>
              </Grid.Column>
              <Grid.Column width={4} />
            </Grid.Row>
          </Grid>

          <Grid>
            <Grid.Row>
              <Grid.Column width={4}>
              </Grid.Column>
              <Grid.Column width={8}>
                {( localStorage.getItem('user_email'))?(<div><h5>An email has been sent to your registered email id.</h5>
                  <h5>Please fill up the survey from the link sent to you</h5> </div>
                  ):(
                  <div>
                  <h2>Enter your Email ID or Sign In</h2>
                <Form onSubmit={ (e) => { this.handleRegister(e) }} >
                  <Form.Field>
                    <label>Enter Email</label>
                    <input type='email' placeholder='Email' name='email' value={this.state.email} onChange={ (e) => { this.handleChange(e); }}/>
                  </Form.Field>
      
                  <Button color='youtube' type='submit' disabled={!this.state.formValid}>Submit</Button>
                </Form>
                </div>)}

                <ErrorMessage formErrors={this.state.formErrors} />
              </Grid.Column>
              <Grid.Column width={4}>
              </Grid.Column>
            </Grid.Row>
          </Grid>





        </Container>
      </MyContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    axiosVerify: (data, router) => { dispatch(axiosSignIn(data, router)); },
  };
};

// const connectedSignIn = connect(mapStateToProps,mapDispatchToProps)(SignIn);
export default SurveyRegister;
