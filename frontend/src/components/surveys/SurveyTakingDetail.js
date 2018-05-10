import React, { Component } from 'react';
import { 
  Link,
  withRouter,
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';

import {
  surveyTakingGetById,
  surveyTakingSaveProgress,
  axiosSurveyTakingSubmit,
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
  Input,
  Menu,
  Segment,
  Divider,
  Checkbox,
  Radio,
  Dropdown,
  Rating,
  Comment,

} from 'semantic-ui-react';

import FormJson from "react-jsonschema-form";
// import FormJson from "react-jsonschema-form-semanticui";
// import FormJson from "react-jsonschema-form-semanticui";
import moment from 'moment';
import DatePicker from 'react-datepicker';

import uuid from 'uuid';
import cuid from 'cuid';
import { CLIENT_RENEG_LIMIT } from 'tls';

import * as questionType from '../../actions/surveyConstants';

import avatarMatt from '../../assets/images/avatar/small/matt.jpg';

class SurveyTakingDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      survey: this.props.survey,
      answers: {},
    }
  }
  
  componentWillMount() {
    console.log('** SurveyTakingDetail componentWillMount');

    // convert answer object to answers{ qid: ['answer1', 'answer2']}

  }

  componentDidMount() {
    console.log('SurveyTakingDetail componentDidMount');

    // get the survey id from the url
    var surveyId = this.props.match.params.id;
    console.log(`  surveyId=${surveyId}`);

    this.props.surveyTakingGetById(surveyId);

    // for general survey page, call axios to fetch the survey

    var answers = {}
    if(this.props.survey != undefined && this.props.survey.answers != undefined) {
      this.props.survey.answers.map(answer => {
        if(answer.surveyeeEmail === localStorage.getItem('user_email')) {
          answer.choices.map( c => { answers[c.questionId] = c.selection})
        }
      })
    }

    console.log('     answers=', answers);

    this.setState({
      answers,

    })

  }

  updateAnswers(e, question) {
    console.log('updateAnswers question=', question);
    var target = e.target
    console.log(`id=[${target.id}] value=[${target.value}] `)

    var answers = {...this.state.answers};

    if(question.type == questionType.Q_STRING) {
      answers[target.id] = [target.value];
    }
    // if(answers.hasOwnProperty(target.id)) {
    //   console.log('answer.hasOwnProperty');
    //   answers[target.id].push(target.value);
    // }
    // else {
    //   answers[target.id] = [target.value];
    // }
      
    console.log('--> answers=', answers);
    this.setState({
      answers: answers,
    });
  }

  handleChangeMCQRadio = (e, {value}, question) => {
    console.log('handleChangeMCQRadio e=', e);
    console.log('value=', value);
    console.log('question=', question);

    var answers = {...this.state.answers};
    answers[question.id] = [value];
    

    console.log('--> answers=', answers);
    this.setState({
      answers: answers,
    });    
  }

  handleChangeMCQCheckbox = (e, {value}, question) => {
    console.log('handleChangeMCQCheckbox e=', e);
    console.log('value=', value);
    console.log('question=', question);

    var answers = {...this.state.answers};

    if(answers.hasOwnProperty(question.id)){
      var pos = answers[question.id].indexOf(value)
      if( pos > -1){
        answers[question.id].splice(pos, 1);
      } else {
        answers[question.id].push(value);
      }
      
    } else {
      answers[question.id] = [value];
    }

    console.log('--> answers=', answers);
    this.setState({
      answers: answers,
    }); 
  }

  handleChangeMCQDropdown = (e, {name, value}, question) => {
    console.log('handleChangeMCQDropdown e=', e);
    console.log('name=', name);
    console.log('value=', value);
    console.log('question=', question);
    var target = e.target
    console.log('target=', target);
    // console.log(`e.target.id=[${target.id}] e.target.value=[${target.value}]   target.option=${target.option}`);
    
    var answers = {...this.state.answers};
    answers[question.id] = [value];

    console.log('--> answers=', answers);
    this.setState({
      answers: answers,
    });

    
  }

  // handleTest(e, data) {
  //   console.log( 'handleTest, data=', data );
  //   console.log('data.text=', data.text)
  // }
  // handleTest = (e, {data}) => {
  //   console.log( 'handleTest, data=', data );
  //   console.log('e=', e)
  //   // console.log('data.text=', data.text)
  // }
  // handleTest = (e, {name, value}) => {
  //   console.log( 'handleTest, name=', name );
  //   console.log( 'value=', value);
  //   console.log('e=', e)
  // }


  handleSubmitSaveProgress(e) {
    e.preventDefault();
    console.log('handleSubmitSaveProgress', this.state);
    // console.log('this=', this);

    // this.props.questionUpdateText(this.state.text);
    
    //save current survey
    // this.props.surveySaveQuestion();
    // this.props.axiosSurveyUpdate(this.props.survey);
    /*
      {
        "choices": [{
          "questionId": "11",
          "selection": ["111", "113"]
        }]
      }

    */
    var choices = [];
    Object.keys(this.state.answers).map(key => {
      var newChoice = {
        questionId: key,
        selection: this.state.answers[key],
      }
      choices.push(newChoice);
    })

    console.log('choices=', choices);

    this.props.surveyTakingSaveProgress(choices, this.props.survey.id);
  }

  handleSurveySubmit(e) {
    e.preventDefault();
    console.log('handleSurveySubmit');

    this.props.axiosSurveyTakingSubmit(this.props.survey);
  }


  render() {

    // if existing answer by this user exist, just update his answers
    var answer = {submitted: false};

    if(this.props.survey != undefined && this.props.survey.answers != undefined) {
      const pos = this.props.survey.answers.findIndex(i => i.surveyeeEmail === localStorage.getItem('user_email'))
      if(pos != -1) {
        answer = this.props.survey.answers[pos];
      }
    }

    console.log('        **** answer object=', answer);

    return (
      <Container>
        {/* {this.state.survey.id}-{this.state.survey.title} */}
        {(this.props.survey == undefined) ? (
          <Message compact>
            Invalid Survey Id
          </Message>
        ) : (
          <div>
          <Comment.Group>
            <Comment>
              <Comment.Avatar as='a' src={avatarMatt} />
              <Comment.Content>
                <Comment.Author>Survey by {this.props.survey.surveyorEmail}</Comment.Author>
                <Comment.Metadata>
                  <div>{this.props.survey.title}</div>
                  <div>
                    {/* <Icon name='star' />
                    5 Faves */}
                  </div>
                </Comment.Metadata>
                {/* <Comment.Text>
                  Hey guys, I hope this example comment is helping you read this documentation.
                </Comment.Text> */}
              </Comment.Content>
            </Comment>
          </Comment.Group>

            <h3>Please fill this survey questions</h3>
            <Form onSubmit={e => this.handleSubmitSaveProgress(e)}>
            { this.props.survey.questions.length === 0 ? (
              <Message compact>
                This survey has no questions.
              </Message>
            ) : ('')}

            { this.props.survey.questions.map((question, index) => {
              var order = index + 1;
              // left column width
              const lcWidth = 1;
              if(question.type === questionType.Q_STRING) {
                return (
                  <Grid key={question.id} columns='equal'>

                    <Grid.Column>
                    <Form.Field>
                    {/* <label>Enter your question</label>
                    <input id={question.id} name={question.name} value={(this.state.text[question.id] != undefined) ? this.state.text[question.id] : ''} onChange={e => this.updateState(e)} />  */}
                    <label>{order}. {question.text}</label>
                    </Form.Field>
                    <Form.Field>
                    <input id={question.id} name={question.id} placeholder="Enter your answer here" value={(this.state.answers[question.id] != undefined) ? this.state.answers[question.id][0] : ''} onChange={ (e) => this.updateAnswers(e, question)} />
                    </Form.Field>
                    </Grid.Column>
                  </Grid>
                )
              } else if(question.type === questionType.MCQ_TEXT_RADIO) {
                return (
                  <Grid key={question.id} columns='equal'>
                    <Grid.Column>
                    <Form.Field>
                      <label>{order}. {question.text}</label>
                    </Form.Field>
                    {question.options.map(option => {
                      return (
                        <Form.Field key={option.id}>
                        <Radio key={option.id}
                          label={option.text}
                          name={question.id}
                          value={option.text}
                          checked={(this.state.answers[question.id] != undefined) ? this.state.answers[question.id][0] === option.text : false}
                          // checked={this.state.value === 'this'}
                          onChange={(e, {value}) => this.handleChangeMCQRadio(e, {value}, question)}
                        />
                        </Form.Field>
                      )
                    })}
                    </Grid.Column>
                    
                  </Grid>
                )
              } 
              else if(question.type === questionType.MCQ_TEXT_CHECKBOX) {
                return (
                  <Grid key={question.id} columns='equal'>
                  <Grid.Column>
                  <Form.Field key={question.id}>
                    <label>{order}. {question.text}</label>
                  </Form.Field>
                    {question.options.map(option => {
                      var found = false;
                      if(this.state.answers[question.id] != undefined) {
                        found = (this.state.answers[question.id].indexOf(option.text) > -1)
                      }
                      return (
                        <Form.Field key={option.id}>
                        <Checkbox
                          key={option.id}
                          label={option.text}
                          name={question.id}
                          value={option.text}
                          checked={found}
                          onChange={(e, {value}) => this.handleChangeMCQCheckbox(e, {value}, question)}
                        />
                        </Form.Field>
                      )
                    })}
                    </Grid.Column>
                  </Grid>
                )
              }
              else if(question.type === questionType.MCQ_TEXT_DROPDOWN) {
                // create the dropdown options array
                var dropdownOptions = [];
                question.options.map(option => {
                  var newOption = {
                    key: option.value,
                    value: option.text,
                    text: option.text,
                  }
                  dropdownOptions.push(newOption);
                })
                var getValue = '';
                if (this.state.answers[question.id] != undefined) {
                  getValue = this.state.answers[question.id][0];
                }
                return (
                  <Grid key={question.id} columns='equal'>
                    <Grid.Column>
                      <Form.Field key={question.id}>
                        <label>{order}. {question.text}</label>
                        <Dropdown
                          key={question.id}
                          name={question.id}
                          placeholder='Please choose'
                          fluid search selection
                          options={dropdownOptions}
                          value={getValue}
                          onChange={(e, {name, value}) => this.handleChangeMCQDropdown(e, {name, value}, question)}
                          // onChange={this.handleTest}
                        />
                      </Form.Field>
                    </Grid.Column>
                  </Grid>
                )
              } else if(question.type === questionType.STAR_RATING) {
                var ratingOptions = [ "0", "1", "2", "3", "4", "5"];
                return (
                  <Grid key={question.id} columns='equal'>
                    <Grid.Column>
                      <Form.Field key={question.id}>
                        <label>{order}. {question.text}</label>
                      </Form.Field>
                      <Form.Group>
                      {ratingOptions.map( (option, index) => {
                        return (
                          <Form.Field key={index}>
                            <Radio key={index}
                              label={option}
                              name={question.id}
                              value={option}
                              checked={(this.state.answers[question.id] != undefined) ? this.state.answers[question.id][0] === option : false}
                          // checked={this.state.value === 'this'}
                          onChange={(e, {value}) => this.handleChangeMCQRadio(e, {value}, question)}

                            />
                          </Form.Field>
                        )
                      })}
                      </Form.Group>
                  </Grid.Column>
                  </Grid>
                )
              } else if(question.type === questionType.MCQ_IMAGE_RADIO) {
                return (
                  <Grid key={question.id} columns='equal'>
                    <Grid.Column>
                    <Form.Field>
                      <label>{order}. {question.text}</label>
                    </Form.Field>
                    {question.options.map(option => {
                      return (
                        <Form.Field key={option.id}>
                        <Grid columns='equal'>
                        <Grid.Row>
                          <Grid.Column width={1}>
                            <Radio key={option.id}
                            label=''
                            name={question.id}
                            value={option.text}
                            checked={(this.state.answers[question.id] != undefined) ? this.state.answers[question.id][0] === option.text : false}
                          // checked={this.state.value === 'this'}
                          onChange={(e, {value}) => this.handleChangeMCQRadio(e, {value}, question)}
                          />
                          </Grid.Column>
                          <Grid.Column>
                          <Image src={option.text} size="medium" />
                          </Grid.Column>
                        </Grid.Row>
                        </Grid>
                        </Form.Field>
                      )
                    })}
                    </Grid.Column>
                    
                  </Grid>
                )
              } else if(question.type === questionType.MCQ_IMAGE_CHECKBOX) {
                return (
                  <Grid key={question.id} columns='equal'>
                  <Grid.Column>
                  <Form.Field key={question.id}>
                    <label>{order}. {question.text}</label>
                  </Form.Field>
                    {question.options.map(option => {
                      var found = false;
                      if(this.state.answers[question.id] != undefined) {
                        found = (this.state.answers[question.id].indexOf(option.text) > -1)
                      }
                      return (
                        <Form.Field key={option.id}>
                        <Grid columns='equal'>
                        <Grid.Row>
                          <Grid.Column width={1}>
                            <Checkbox key={option.id}
                            label=''
                            name={question.id}
                            value={option.text}
                            checked={found}
                            onChange={(e, {value}) => this.handleChangeMCQCheckbox(e, {value}, question)}
                          />
                          </Grid.Column>
                          <Grid.Column>
                          <Image src={option.text} size="medium" />
                          </Grid.Column>
                        </Grid.Row>
                        </Grid>
                        </Form.Field>

                      )
                    })}
                    </Grid.Column>
                  </Grid>
                )
              }
              else 
                return 'invalid question type'
            })
            
          

            }


            <Divider />
            { (this.props.survey.questions.length > 0   && !answer.submitted) ? (
              <Form.Group>
                <Form.Field><Button basic color='red' type='submit' >Save Progress</Button></Form.Field>
                <Form.Field><Button color='youtube' onClick={e => this.handleSurveySubmit(e)} >Submit</Button></Form.Field>
              </Form.Group>

            ) : (
              <Message compact>
                Survey is completed.
              </Message>
            )}

            {/* <Button color='youtube' type='submit' >Save</Button> */}
            </Form>

          </div>

        )}

      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    survey: state.SurveyReducer.surveyTakingCurrent,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    surveyTakingGetById: (data) => { dispatch(surveyTakingGetById(data)); },
    surveyTakingSaveProgress: (data, surveyId) => { dispatch(surveyTakingSaveProgress(data, surveyId)); },
    axiosSurveyTakingSubmit: (data) => { dispatch(axiosSurveyTakingSubmit(data)); },
  }
}

const connectedSurveyTakingDetail = withRouter(connect(mapStateToProps, mapDispatchToProps)(SurveyTakingDetail));
export default connectedSurveyTakingDetail;
