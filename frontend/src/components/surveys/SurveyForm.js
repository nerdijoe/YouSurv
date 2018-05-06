import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';
import { connect } from 'react-redux';

import {
  axiosSurveyCreate,
} from '../../actions';

import {
  Container,
  Form,
  Button,
  Grid,
  Message,
  Header,
  Dropdown,

} from 'semantic-ui-react';
import styled from 'styled-components';

const surveyTypes = [
  { key: 'gs', value: 'general', text: 'General' },
  { key: 'cs', value: 'close', text: 'Close' },
  { key: 'os', value: 'open', text: 'Open' },
];

class SurveyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'general',
      email: '',
    }
  }
  
  handleSubmit(e) {
    e.preventDefault();
    console.log('handleSubmit state=', this.state);

    this.props.axiosSurveyCreate(this.state);
    
  }

  handleChange(e) {
    const target = e.target;
    console.log(target);
    console.log(`handleChange ${target.name}=[${target.value}]`);

    let type = surveyTypes.find(t => t.text === target.value);
    console.log('type =',type);
    this.setState({
      [target.name]: target.value,
    });
  }

  handleChangeDropdown = (e, {name, value}) => {
    console.log('here');
    this.setState({ [name]: value })
  }

  render() {
    return (
      <Container>
        <h3>Survey Form</h3>

        <Form onSubmit={ (e) => { this.handleSubmit(e) }} >
          <Form.Field>
            <Dropdown placeholder='Select Survey Type' name='type' value={this.state.type} fluid search selection options={surveyTypes} onChange={ this.handleChangeDropdown} />
          </Form.Field>
          {/* <Form.Field>
            <label>Email</label>
            <input placeholder='john.snow@winterfell.com' name='email' value={this.state.email} onChange={ (e) => { this.handleChange(e); }} />
          </Form.Field> */}

          <Button color='youtube' type='submit'>Create</Button>
        </Form>

      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  
}

const mapDispatchToProps = dispatch => {
  return {
    axiosSurveyCreate: (data) => { dispatch(axiosSurveyCreate(data)); },
  }
}

const connectedSurveyForm = connect(mapStateToProps, mapDispatchToProps)(SurveyForm);
export default connectedSurveyForm;
