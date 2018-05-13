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
  Label,
  Divider,

} from 'semantic-ui-react';

import Moment from 'moment';

import cardHeader01 from '../../assets/images/card/card_header_01.png'
import cardHeader02 from '../../assets/images/card/card_header_02.png'

import * as surveyType from '../../actions/surveyConstants';
var surveyTypeText = {}
surveyTypeText[surveyType.SV_GENERAL] = 'General Survey';
surveyTypeText[surveyType.SV_CLOSE] = 'Closed Survey';
surveyTypeText[surveyType.SV_OPEN] = 'Open Survey';


class SurveyTaking extends Component {

  componentDidMount() {
    console.log('SurveyTaking componentDidMount');
    this.props.axiosSurveyGetAll();
  }

  handleShowDetail(survey) {
    this.props.surveyShowDetail(survey, this.props.history);
  }

  generateCard = (survey, link, isSubmitted, answer) => (
    <Card key={survey.id}>
              {/* <a onClick={() => {this.handleShowDetail(survey)}}>
                <Image src={cardHeader02} />
              </a> */}
              <Link to={link}>
                <Image src={cardHeader02} />
              </Link>
              <Card.Content>
                <Card.Header>Id-{survey.id}</Card.Header>
                <Card.Meta>Title: {survey.title}</Card.Meta>
                <Card.Description>
                  <List>
                    <List.Item>
                      <List.Icon name='users' />
                      <List.Content>{surveyTypeText[survey.type]}</List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name='marker' />
                      <List.Content>{survey.questions.length} questions</List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name='user' />
                      <List.Content>
                        
                      </List.Content>
                    </List.Item>

                  </List>
                </Card.Description>
              </Card.Content>
              <Card.Content>
                <List>
                  <List.Item>
                    {isSubmitted?
                      (<Label color="red" horizontal>Submitted</Label>) :
                      (<Label color="grey" horizontal>Open</Label>)
                    }
                  </List.Item>
                  {Moment(answer.updated).format('L LT')}
                  <List.Item>
                    
                  </List.Item>
                </List>

              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name='mail' />
                  Invited by {survey.surveyorEmail}
                </a>
              </Card.Content>
            </Card>
  )

  render() {
    return (
      <Container>
        {/* <h2>Survey Taking</h2> */}
        <Header as='h2'>
          <Icon name='lightning' />
          <Header.Content>
            Pending Surveys
          </Header.Content>
        </Header>

        { this.props.surveys.length === 0 ? (
            <Message compact>
              You have no surveys.
            </Message>
          ) : ('')}

        <Card.Group>
        { this.props.surveys.filter(survey => survey.publish != null).map(survey => {
          var link = `/home/takesurvey/${survey.id}`;

          var isSubmitted = false;
          var answer = {}
          if(survey != undefined && survey.answers != undefined) {
            const pos = survey.answers.findIndex(i => i.surveyeeEmail === localStorage.getItem('user_email'))
            if(pos != -1) {
              answer = survey.answers[pos];
              isSubmitted = survey.answers[pos].submitted;
            }
          }

          if(!isSubmitted) {
            return (
              this.generateCard(survey, link, isSubmitted, answer)
            )        
          }



          {/* return (
            <Card key={survey.id}>

              <Link to={link}>
                <Image src={cardHeader02} />
              </Link>
              <Card.Content>
                <Card.Header>Id-{survey.id}</Card.Header>
                <Card.Meta>Title: {survey.title}</Card.Meta>
                <Card.Description>
                  <List>
                    <List.Item>
                      <List.Icon name='users' />
                      <List.Content>{surveyTypeText[survey.type]}</List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name='marker' />
                      <List.Content>{survey.questions.length} questions</List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name='user' />
                      <List.Content>
                        
                      </List.Content>
                    </List.Item>

                  </List>
                </Card.Description>
              </Card.Content>
              <Card.Content>
                <List>
                  <List.Item>
                    {isSubmitted?
                      (<Label color="red" horizontal>Submitted</Label>) :
                      (<Label color="grey" horizontal>Open</Label>)
                    }
                  </List.Item>
                  {Moment(answer.updated).format('L LT')}
                  <List.Item>
                    
                  </List.Item>
                </List>

              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name='mail' />
                  Invited by {survey.surveyorEmail}
                </a>
              </Card.Content>
            </Card>
          ) */}

        })}

        </Card.Group>
        
        <Divider />
        <Header as='h2'>
          <Icon name='checkmark' />
          <Header.Content>
            Submitted Surveys
          </Header.Content>
        </Header>

        <Card.Group>
        { this.props.surveys.filter(survey => survey.publish != null).map(survey => {
          var link = `/home/takesurvey/${survey.id}`;

          var isSubmitted = false;
          var answer = {}
          if(survey != undefined && survey.answers != undefined) {
            const pos = survey.answers.findIndex(i => i.surveyeeEmail === localStorage.getItem('user_email'))
            if(pos != -1) {
              answer = survey.answers[pos];
              isSubmitted = survey.answers[pos].submitted;
            }
          }

          if(isSubmitted) {
            return (
              this.generateCard(survey, link, isSubmitted, answer)
            )          
          }


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
