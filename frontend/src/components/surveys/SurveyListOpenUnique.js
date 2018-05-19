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
  axiosSurveyGetAllOpenUnique,
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
import cardHeader03 from '../../assets/images/card/card_header_03.png'

import * as surveyType from '../../actions/surveyConstants';

var surveyTypeText = {}
surveyTypeText[surveyType.SV_GENERAL] = 'General Survey';
surveyTypeText[surveyType.SV_CLOSE] = 'Closed Survey';
surveyTypeText[surveyType.SV_OPEN] = 'Open Survey';


class SurveyListOpenUnique extends Component {

  componentDidMount() {
    console.log('SurveyListOpenUnique componentDidMount');
    this.props.axiosSurveyGetAllOpenUnique();
  }

  handleShowDetail(survey) {
    this.props.surveyShowDetail(survey, this.props.history);
  }

  handleClickSurvey(link) {
    console.log('handleClickSurvey');
    link = link.replace('http://localhost:3000/', '');
    console.log('   link=', link);
    // this.props.history.push({
    //   pathname: link,
    // });
    this.redirect(link);
  }

  redirect(to) {
    this.props.history.push({
       pathname: to
    });
  }

  generateCard = (survey) => (
    <Card key={survey.id}>
    <a href={survey.publish.link}>
      <Image src={cardHeader03} />
    </a>

    <Card.Content>
      <Card.Header>{survey.title}</Card.Header>
      <Card.Meta>SurveyId: {survey.id}</Card.Meta>

      <Card.Description>
        <List>
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

    {/* <Card.Content extra>
      <a>
        <Icon name='mail' />
        {survey.invitedEmailList.length} Invites sent
      </a>
    </Card.Content> */}
  </Card>
  )

  render() {
    // var unpublishedSurveys = this.props.surveys.filter(survey => survey.publish == null);
    console.log('SurveyListOpenUnique this.props.surveys=', this.props.surveys);
    var publishedSurveys = this.props.surveys.filter(survey => survey.publish != null && !survey.closed);
    // var closedSurveys = this.props.surveys.filter(survey => survey.publish != null && survey.closed)
    return (
      <Container>
        {/* <h2>Open Surveys</h2> */}
        {/* <SurveyForm /> */}
        {/* <Header as='h2'>
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


          )} */}
        
        <Divider />
        <Message
          color="red"
          header='Open Survey Instruction'
          list={[
            'You can participate in this open survey by registering with your email.',
            'You will receive a unique link in your inbox.',
            'Click the link to participate in the survey.',
          ]}
        />

        <Header as='h2'>
          <Icon name='rocket' />
          <Header.Content>
            Open Surveys
          </Header.Content>
        </Header>

        { publishedSurveys.length === 0 ? (
            <Message compact>
              No open surveys.
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
    surveys: state.SurveyReducer.surveysOpenUnique,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    axiosSurveyGetAll: (data) => { dispatch(axiosSurveyGetAll(data));},
    surveyShowDetail: (data, router) => { dispatch(surveyShowDetail(data, router)); },
    axiosSurveyGetAllOpenUnique: () => { dispatch(axiosSurveyGetAllOpenUnique());},
  }
}

const connectedSurveyListOpenUnique = withRouter(connect(mapStateToProps, mapDispatchToProps)(SurveyListOpenUnique));
export default connectedSurveyListOpenUnique;
