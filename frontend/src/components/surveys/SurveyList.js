import React, { Component } from 'react';
import {
  Link,
  withRouter,
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import { connect } from 'react-redux';

import {
  axiosSurveyGetAll,
  surveyShowDetail,
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
  List,
  Divider,
  Label,
} from 'semantic-ui-react';

import Moment from 'moment';

import SurveyForm from './SurveyForm';

import cardHeader01 from '../../assets/images/card/card_header_01.png'
import cardHeader02 from '../../assets/images/card/card_header_02.png'

import * as surveyType from '../../actions/surveyConstants';

var surveyTypeText = {}
surveyTypeText[surveyType.SV_GENERAL] = 'General Survey';
surveyTypeText[surveyType.SV_CLOSE] = 'Closed Survey';
surveyTypeText[surveyType.SV_OPEN] = 'Open Survey';


class SurveyList extends Component {

  componentDidMount() {
    console.log('SurveyList componentDidMount');
    this.props.axiosSurveyGetAll();
  }

  handleShowDetail(survey) {
    this.props.surveyShowDetail(survey, this.props.history);
  }

  redirect(to) {
    this.props.history.push({
       pathname: to
    });
  }

  generateCard = (survey) => (
    <Card key={survey.id}>
    <a onClick={() => {this.handleShowDetail(survey)}}>
      <Image src={cardHeader02} />
    </a>

    <Card.Content>
      <Card.Header>Id-{survey.id}</Card.Header>
      <Card.Meta>Title: {survey.title}</Card.Meta>
      {survey.publish == null ? '' : (
        <Card.Content onClick={(e)=>{this.redirect(`/surveyMetric/${survey.id}`)}} ><a>View Metric</a></Card.Content>
      )}


      <Card.Description>
        <List>
          <List.Item>
            <List.Icon name='users' />
            <List.Content>{surveyTypeText[survey.type]}</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='question' />
            <List.Content>{survey.questions.length} questions</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='calendar' />
            <List.Content>Created on {Moment(survey.created).format('L LT')}</List.Content>
          </List.Item>
        </List>
      </Card.Description>
    </Card.Content>
    <Card.Content>
      {survey.publish != null ?
        (<Label color="red" horizontal>Published</Label>) :
        (<Label color="grey" horizontal>DRAFT</Label>)
    }

    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='mail' />
        {survey.invitedEmailList.length} Invites sent
      </a>
    </Card.Content>
  </Card>
  )

  render() {
    var unpublishedSurveys = this.props.surveys.filter(survey => survey.publish == null);
    var publishedSurveys = this.props.surveys.filter(survey => survey.publish != null);
    
    return (
      <Container>
        <h2>Survey List</h2>
        <SurveyForm />
        <Divider />
        <Header as='h2'>
          <Icon name='lightning' />
          <Header.Content>
            Draft Surveys
          </Header.Content>
        </Header>

        { unpublishedSurveys.length === 0 ? (
            <Message compact>
              No unpublished surveys.
            </Message>
          ) : (

            <Card.Group>
            { unpublishedSurveys.map(survey => {
              return(this.generateCard(survey))
            })}

            </Card.Group>


          )}
        
        <Divider />
        <Header as='h2'>
          <Icon name='rocket' />
          <Header.Content>
            Published Surveys
          </Header.Content>
        </Header>

        { publishedSurveys.length === 0 ? (
            <Message compact>
              No published surveys.
            </Message>
          ) : (
            <Card.Group>
            { publishedSurveys.map(survey => {
              return(this.generateCard(survey))
            })}
            </Card.Group>
          )}

      </Container>

    );
  }
}

const mapStateToProps = state => {
  return {
    surveys: state.SurveyReducer.surveys,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    axiosSurveyGetAll: (data) => { dispatch(axiosSurveyGetAll(data));},
    surveyShowDetail: (data, router) => { dispatch(surveyShowDetail(data, router)); },
  }
}

const connectedSurveyList = withRouter(connect(mapStateToProps, mapDispatchToProps)(SurveyList));
export default connectedSurveyList;
