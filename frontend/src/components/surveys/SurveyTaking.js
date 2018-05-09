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
} from 'semantic-ui-react';

import Moment from 'moment';

import cardHeader01 from '../../assets/images/card/card_header_01.png'
import cardHeader02 from '../../assets/images/card/card_header_02.png'


class SurveyTaking extends Component {

  handleShowDetail(survey) {
    this.props.surveyShowDetail(survey, this.props.history);
  }

  render() {
    return (
      <Container>
        <h2>Survey Taking</h2>
        { this.props.surveys.length === 0 ? (
            <Message compact>
              You have no surveys.
            </Message>
          ) : ('')}

        <Card.Group>
        { this.props.surveys.map(survey => {
          var link = `/home/takesurvey/${survey.id}`;
          return (
            <Card key={survey.id}>
              {/* <a onClick={() => {this.handleShowDetail(survey)}}>
                <Image src={cardHeader02} />
              </a> */}
              <Link to={link}>
                <Image src={cardHeader02} />
              </Link>
              <Card.Content>
                <Card.Header>{survey.id} {survey.title}</Card.Header>
                <Card.Meta>{Moment(survey.created).format('L LT')}</Card.Meta>
                <Card.Description>
                  <List>
                    <List.Item>
                      <List.Icon name='users' />
                      <List.Content>{survey.type}</List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name='marker' />
                      <List.Content>{survey.questions.length} questions</List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name='user' />
                      <List.Content>
                        {survey.surveyorEmail}
                      </List.Content>
                    </List.Item>

                  </List>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name='mail' />
                  {survey.invitedEmailList.length} Invites sent
                </a>
              </Card.Content>
            </Card>
          )

        })} 
        
        </Card.Group>

      </Container>

    );
  }
}

const mapStateToProps = state => {
  return {
    surveys: state.SurveyReducer.surveyTaking,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    axiosSurveyGetAll: (data) => { dispatch(axiosSurveyGetAll(data));},
    surveyShowDetail: (data, router) => { dispatch(surveyShowDetail(data, router)); },
  }
}

const connectedSurveyTaking = withRouter(connect(mapStateToProps, mapDispatchToProps)(SurveyTaking));
export default connectedSurveyTaking;
