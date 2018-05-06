import React, { Component } from 'react';

import { connect } from 'react-redux';

import {
  axiosSurveyGetAll,
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

import cardHeader01 from '../../assets/images/card/card_header_01.png'
import cardHeader02 from '../../assets/images/card/card_header_02.png'


class SurveyList extends Component {
  render() {
    return (
      <Container>
        <Card.Group>
        { this.props.surveys.map(survey => {

          return (
            <Card key={survey.id}>
              <Image src={cardHeader02} />
              <Card.Content>
                <Card.Header>{survey.id}</Card.Header>
                <Card.Meta>{Moment(survey.created).format('L LT')}</Card.Meta>
                <Card.Description>{survey.type}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name='user' />
                  10 Friends
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
    surveys: state.SurveyReducer.surveys,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    axiosSurveyGetAll: (data) => { dispatch(axiosSurveyGetAll(data));},
  }
}

const connectedSurveyList = connect(mapStateToProps, mapDispatchToProps)(SurveyList);
export default connectedSurveyList;
