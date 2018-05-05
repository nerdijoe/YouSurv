import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';
import { connect } from 'react-redux';

import {
  axiosCreateSurvey,
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

class SurveyForm extends Component {
  render() {
    return (
      <Container>
      <h3>Survey Form</h3>
      </Container>
    );
  }
}

export default SurveyForm;
