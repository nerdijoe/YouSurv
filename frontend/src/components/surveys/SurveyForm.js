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

import * as surveyType from '../../actions/surveyConstants';

const surveyTypes = [
  { key: surveyType.SV_GENERAL, value: surveyType.SV_GENERAL , text: 'General' },
  { key: surveyType.SV_CLOSE, value: surveyType.SV_CLOSE, text: 'Close' },
  { key: surveyType.SV_OPEN, value: surveyType.SV_OPEN, text: 'Open' },
];

class SurveyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: surveyType.SV_GENERAL,
      title: '',
      expire: '',
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('handleSubmit state=', this.state);

    this.props.axiosSurveyCreate(this.state);

  }

  handleChange(e) {
    const target = e.target;
    // console.log(target);
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
        <h3>Create your survey</h3>

        <Form onSubmit={ (e) => { this.handleSubmit(e) }} >
          <Form.Field>
            <label>Title</label>
            <input placeholder='Survey Title' name='title' value={this.state.title} onChange={ (e) => { this.handleChange(e); }} />
          </Form.Field>
          {/* <Form.Field>
            <label>Expire</label>
            <input placeholder='Name' name='title' value={this.state.title} onChange={ (e) => { this.handleChange(e); }} />
          </Form.Field> */}

          <Form.Field>
            <label>Type</label>
            <Dropdown placeholder="Select Survey Type" name='type' value={this.state.type} fluid search selection options={surveyTypes} onChange={ this.handleChangeDropdown} />
          </Form.Field>


          <Button color='youtube' type='submit'>Create</Button>
        </Form>

      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {
    axiosSurveyCreate: (data) => { dispatch(axiosSurveyCreate(data)); },
  }
}

const connectedSurveyForm = connect(mapStateToProps, mapDispatchToProps)(SurveyForm);
export default connectedSurveyForm;
