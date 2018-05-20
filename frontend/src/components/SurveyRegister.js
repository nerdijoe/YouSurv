import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Redirect from 'react-router-dom/Redirect';

import {
  unload,
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
      email: '',
      formErrors: { email: '', error: '' },
      passwordValid: false,
      formValid: false,
      email: '',
      emailValid: true,
      errorValid: true,
      isSubmitted: false
    }
  }
  
  validateField(fieldName,value) {
    const formErrorsValidation = this.state.formErrors;
    
    let emailValid = this.state.emailValid;
    let errorValid = this.state.errorValid;
    
    switch (fieldName) {
      case 'email':
        emailValid = (/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(value);
        emailValid = value==''?true:emailValid;
        formErrorsValidation.email = emailValid ? '' : ' is invalid.';
        break;
      case 'error':
        // errorValid = this.props.error ? false : true;
        if(this.props.error)
          errorValid = false;
        formErrorsValidation.error = errorValid ? '' : this.props.error;
        break;
      default:
        break;
    }
    // update the error message
    this.setState({
      formErrors: formErrorsValidation,
      emailValid,
      errorValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.emailValid });
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
      this.setState({
        isSubmitted: true
      })
    })
    .catch( res => {
      console.log("here",res.message);
      console.log("error 404....");
        // this.setState({
        //   errorValid: false,
        //   error: res.message,
        // }, () => {
        //   this.validateField('token', this.state.token);
        // });
        this.setState({
          msgerror: res.response.data.message
        })
    })
    // // this.props.history.push('/signin');
  }

  handleChange(e) {
    const target = e.target;

    console.log(`handleChange ${target.name}=[${target.value}]`);

    // validate field everytime user enters something.
    this.setState({
      [target.name]: target.value,
      msgerror:null
    }, () => {
      this.validateField(target.name, target.value);
    });
  }

  componentWillUnmount() {
    if(localStorage.getItem('user_email')) {
      axios.put(`${domainURL}/survey/reroute/openuniquelink`,{
        email:localStorage.getItem('user_email'), surveyId: this.props.location.search.split('?surveyId=')[1]
      }).then( res => {
        console.log("responseeee");
      }).catch(

      )
    }
    this.props.onUnload();
  }


  render() {
    let errorMSG = null;
    if(this.state.msgerror)
      errorMSG = (<Message negative><p>{this.state.msgerror}</p></Message>)
    console.log("res message ", this.state.error);
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
                {( localStorage.getItem('user_email'))?(<div><h5>You are registered successfully.</h5> 
                    <Redirect to="/home/surveyee" /></div>
                  ):((this.state.isSubmitted)?(<div><h5>You are registered successfully.</h5> 
                    <p>An email has been sent to your mentioned email address.<br/>Please participate in the survey from the sent link.</p></div>):(
                  <div>
                  <h2>Enter your Email ID or Sign In</h2>
                <Form onSubmit={ (e) => { this.handleRegister(e) }} >
                  <Form.Field>
                    <label>Enter Email</label>
                    <input type='email' placeholder='Email' name='email' value={this.state.email} onChange={ (e) => { this.handleChange(e); }}/>
                  </Form.Field>
      
                  <Button color='youtube' type='submit' disabled={!this.state.formValid}>Submit</Button>
                </Form>
                </div>))}

                <ErrorMessage formErrors={this.state.formErrors} />
                {errorMSG}
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
    error: state.UserReducer.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUnload: () => {dispatch(unload());}
  };
};

const connectedSurveyRegister = connect(mapStateToProps,mapDispatchToProps)(SurveyRegister);
export default connectedSurveyRegister;
