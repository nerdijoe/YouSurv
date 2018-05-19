import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';
import { connect } from 'react-redux';

import {
  axiosSignUp,
  unload,
  savePath
} from '../actions';

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

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      formErrors: { firstname: '', lastname: '', email: '', password: '', error: '' },
      emailValid: false,
      passwordValid: false,
      firstnameValid: true,
      lastnameValid: true,
      errorValid: true,
      formValid: false,
    }
  }
  
  validateField(fieldName, value) {
    const formErrorsValidation = this.state.formErrors;
    let firstnameValid = this.state.firstnameValid;
    let lastnameValid = this.state.lastnameValid;
    
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let errorValid = this.state.errorValid;
    
    switch (fieldName) {
      case 'firstname':
        firstnameValid = value.length > 0;
        formErrorsValidation.firstname = firstnameValid ? '' : ' is blank. Please enter your first name.';
        break;
      case 'lastname':
        lastnameValid = value.length > 0;
        formErrorsValidation.lastname = lastnameValid ? '' : ' is blank. Please enter your last name.';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        formErrorsValidation.email = emailValid ? '' : ' is invalid.';
        break;
      case 'password':
        passwordValid = value.length >= 4;
        formErrorsValidation.password = passwordValid ? '' : ' is too short. Minimum password length is 4 characters.';
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
      firstnameValid,
      lastnameValid,
      emailValid,
      passwordValid,
      errorValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.emailValid && this.state.passwordValid && this.state.firstnameValid && this.state.lastnameValid });
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  componentDidMount() {
    if(this.props.location.state)
      this.props.savePath(this.props.location.state.prevPath);
  }

  handleSignUp(e) {
    e.preventDefault();
    console.log('handleSignUp', this.state);
    this.props.axiosSignUp(this.state, this.props.history);

    // // this.props.history.push('/signin');
  }

  handleChange(e) {
    const target = e.target;

    console.log(`handleChange ${target.name}=[${target.value}]`);

    // validate field everytime user enters something.
    this.setState({
      [target.name]: target.value,
    }, () => {
      this.validateField(target.name, target.value);
    });
  }


  render() {
    let errorMSG = null;
    if(this.props.error)
      errorMSG = (<Message negative><p>{this.props.error}</p></Message>);
    return (
      <MyContainer>
        <Navbar />
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={4} />
              <Grid.Column width={8}>
                <Header size='huge'>Sign Up</Header>
              </Grid.Column>
              <Grid.Column width={4} />
            </Grid.Row>
          </Grid>

          <Grid>
            <Grid.Row>
              <Grid.Column width={4}>
              </Grid.Column>
              <Grid.Column width={8}>
              
                <Form onSubmit={ (e) => { this.handleSignUp(e) }} >
                  {/* <Form.Field>
                    <label>First Name</label>
                    <input placeholder='John' name='firstname' value={this.state.firstname} onChange={ (e) => { this.handleChange(e); }} />
                  </Form.Field>
                  <Form.Field>
                    <label>Last Name</label>
                    <input placeholder='Snow' name='lastname' value={this.state.lastname} onChange={ (e) => { this.handleChange(e); }} />
                  </Form.Field> */}
                  <Form.Field>
                    <label>Email</label>
                    <input placeholder='jon.snow@winterfell.com' name='email' value={this.state.email} onChange={ (e) => { this.handleChange(e); }} />
                  </Form.Field>
                  <Form.Field>
                    <label>Password</label>
                    <input type='password' placeholder='WinterIsComing123' name='password' value={this.state.password} onChange={ (e) => { this.handleChange(e); }}/>
                  </Form.Field>
      
                  <Button color='youtube' type='submit' disabled={!this.state.formValid}>Sign up</Button>
                </Form>

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
    axiosSignUp: (data, router) => { dispatch(axiosSignUp(data, router)); },
    onUnload: () => {dispatch(unload());},
    savePath: (prevPath) => {dispatch(savePath(prevPath));}
  };
};

const connectedSignUp = connect(mapStateToProps,mapDispatchToProps)(SignUp);
export default connectedSignUp;
