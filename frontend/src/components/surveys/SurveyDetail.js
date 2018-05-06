import React, { Component } from 'react';
import { 
  Link,
  withRouter,
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';

import {
  
} from '../../actions';

import {
  Container,
  Form,
  Button,
  Grid,
  Message,
  Header,
  Card,
  Image,
  Icon,

} from 'semantic-ui-react';

import Moment from 'moment';

class SurveyDetail extends Component {
  render() {
    return (
      <Container>
        <h2>Detail</h2>
        {this.props.survey.id}
        {this.props.survey.authorEmail}
        {this.props.survey.type}
        
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    survey: state.SurveyReducer.surveyCurrent,
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

const connectedSurveyDetail = withRouter(connect(mapStateToProps, mapDispatchToProps)(SurveyDetail));
export default connectedSurveyDetail;
