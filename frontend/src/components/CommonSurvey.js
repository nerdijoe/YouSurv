import React, { Component } from 'react';
import { 
  Link,
  withRouter,
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import IdleTimer from 'react-idle-timer';
import axios from 'axios';

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

import * as questionType from '../actions/surveyConstants';
import  {domainURL} from '../actions/urlConstant';

import avatarMatt from '../assets/images/avatar/small/matt.jpg';

const ErrorMessage = ({formErrors}) => (
  <Container>
    <div></div>
    {Object.keys(formErrors).map((fieldName, i) => {
      if (formErrors[fieldName].length > 0) {
        return (
         
          <Message negative>
            <p key={i}>{fieldName} {formErrors[fieldName]}</p>
          </Message>

        );
      }
    })}
  </Container>
);

class CommonSurvey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      survey: this.props.surveyLoad.data,
      answers: {},
      isSubmitted: false,
      formErrors: { email: '' },
      formValid: false,
      email: '',
      emailValid: true
    }
    this.handleSubmitSaveProgress = this.handleSubmitSaveProgress.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getAlertMsg = this.getAlertMsg.bind(this);
  }

  validateField(fieldName,value) {
    const formErrorsValidation = this.state.formErrors;
    
    let emailValid = this.state.emailValid;
    
    switch (fieldName) {
      case 'email':
        emailValid = (/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(value);
        emailValid = value==''?true:emailValid;
        formErrorsValidation.email = emailValid ? '' : ' is invalid.';
        break;
      default:
        break;
    }
    // update the error message
    this.setState({
      formErrors: formErrorsValidation,
      emailValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.emailValid });
  }
  
  componentWillMount() {
    console.log('** SurveyTakingDetail componentWillMount');
    if(this.state.survey != undefined && this.state.survey.answers != undefined) {
      this.state.survey.answers.map(answer => {
        if(answer.surveyeeEmail === localStorage.getItem('user_email')) {
          console.log("will mount answer",answer);
          this.setState({
            isSubmitted: answer.submitted
          })
        }
      })
    }
    
    // convert answer object to answers{ qid: ['answer1', 'answer2']}

  }

  

  componentDidMount() {
    console.log('SurveyTakingDetail componentDidMount',this.state.survey);

    // get the survey id from the url
    // var surveyId = this.props.match.params.id;
    // console.log(`  surveyId=${surveyId}`);

    // this.props.surveyTakingGetById(surveyId);

    // for general survey page, call axios to fetch the survey

    var answers = {}
    var answerId = null;
    if(this.state.survey != undefined && this.state.survey.answers != undefined) {
      this.state.survey.answers.map(answer => {
        if(answer.surveyeeEmail === localStorage.getItem('user_email')) {
          answerId = answer.id;
          answer.choices.map( c => { answers[c.questionId] = c.selection})
        }
      })
    }

    console.log('     answers=', answers);

    this.setState({
      answers,
      answerId
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
      answers: answers, hasChanges: true
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
      answers: answers, hasChanges: true
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
      answers: answers, hasChanges: true
    });

    
  }

  handleChangeDate(date, question) {
    console.log('handleChangeDate date=', date);
    console.log('question=', question)
    var answers = {...this.state.answers};

    if(question.type == questionType.Q_DATE) {
      answers[question.id] = [date];
    }

    console.log('--> answers=', answers);
    this.setState({
      answers: answers,
      hasChanges: true

    });

    // this.props.surveyTakingAnswerChangesTrue();

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


  handleSubmitSaveProgress() {
    // e.preventDefault();
    console.log('handleSubmitSaveProgress');
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
   if (this.state.hasChanges && !this.state.isSubmitted && localStorage.getItem('user_email'))
    {
      var choices = [];
      Object.keys(this.state.answers).map(key => {
        var newChoice = {
          questionId: key,
          selection: this.state.answers[key],
        }
        choices.push(newChoice);
      })
      const token = 'Bearer ' + localStorage.getItem('token');

      console.log('choices=', choices);

      // this.props.surveyTakingSaveProgress(choices, this.state.survey.id);
      axios.post(`${domainURL}/survey/${this.state.survey.id}/answer`, {
          choices: choices,
          id: this.state.answerId,
        }, {
          headers: {
            Authorization: token,
          }
        })
        .then(res => {
          console.log('>  after handleSaveProgress ', res.data);
          if (this.state.hasChanges)
          {
            this.setState({ hasChanges: false, alertVisible: true, alertStyle: 'success', answerId: res.data.id });
          }
          // router.push('/signin');
        })
        .catch(err => {
          console.log("***  error axiosSaveSurvey");
          console.log(err);
        })
      }
    }

    getAlertMsg() {
      if (this.state.hasChanges) {
        return "Data has unsaved changes";
      }
      else {
        return "Data saved successfully";
      }
    }

  handleSurveySubmit(e) {
    e.preventDefault();
    console.log('handleSurveySubmit');
    var surveyId = this.state.survey.id;
    const userEmail = localStorage.getItem('user_email');
    // Find the correct answer object
    const pos = this.state.survey.answers.findIndex(i => i.surveyeeEmail === userEmail)
    // if existing answer by this user exist, just update his answers
    var answerId = '';
    var choices = [];
      Object.keys(this.state.answers).map(key => {
        var newChoice = {
          questionId: key,
          selection: this.state.answers[key],
        }
        choices.push(newChoice);
      })

    if(pos != -1) {
      answerId = this.state.survey.answers[pos].id;
    }
    else
      answerId = this.state.answerId;

    const token = 'Bearer ' + localStorage.getItem('token');

    // this.props.axiosSurveyTakingSubmit(this.state.survey);
    let route = `${domainURL}/survey/${surveyId}/answer/${answerId}`, header = {
      headers: {
        Authorization: token,
      }
    };
    if(!localStorage.getItem('user_email')) {
      route = `${domainURL}/savesubmitanswer/survey/${surveyId}`;
      header = '';
    }
    axios.post( route, {token: this.props.tokenurl, email:this.state.email, choices: choices}, header)
      .then(res => {
        console.log('>  after axiosSurveySubmit res.data', res.data);
        // dispatch(surveyTakingSubmit(res.data));
        this.setState({
          isSubmitted: true
        })
        // router.push('/signin');
      })
      .catch(err => {
        console.log("***  error axiosSurveySubmit");
        console.log(err);
      })
    }

    // componentWillReceiveProps(nextProps){
    //   if((typeof(this.props.email)!==undefined && nextProps.email!="")) {
    //     console.log("inside if ", nextProps);
    //     this.setState({
    //       email : !nextProps.email ? false : true
    //     })
        
    //     // console.log("inside if email", thiemail);
    //   }
    // }

    handleChange(e) {
      const target = e.target;
  
      console.log(`handleChange ${target.name}=[${target.value}]`);
  
      // validate field everytime user enters something.
      this.setState({
        [target.name]: target.value,
        emailValid: true
      }, () => {
        this.validateField(target.name, target.value);
      });

      console.log(`handleChange ${target.name}=[${target.value}]`);
    }

    validateField(fieldName,value) {
      const formErrorsValidation = this.state.formErrors;
      
      let emailValid = this.state.emailValid;
      
      switch (fieldName) {
        case 'email':
          emailValid = (/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(value);
          emailValid = value==''?true:emailValid;
          formErrorsValidation.email = emailValid ? '' : ' is invalid.';
          break;
        default:
          break;
      }
      // update the error message
      this.setState({
        formErrors: formErrorsValidation,
        emailValid
      }, this.validateForm);
    }

  render() {
    console.log("survey load",this.state.survey);
    // if existing answer by this user exist, just update his answers
    var answer = {submitted: false};
    var disabled = false;
    if(this.state.isSubmitted) disabled = true;
    if(this.state.survey != undefined && this.state.survey.answers != undefined) {
      const pos = this.state.survey.answers.findIndex(i => i.surveyeeEmail === localStorage.getItem('user_email'))
      if(pos != -1) {
        answer = this.state.survey.answers[pos];
        disabled = true;
      }
    }

    console.log('        **** answer object=', answer);
    return (
      <Container>
        {/* {this.state.survey.id}-{this.state.survey.title} */}
        {(this.state.survey == undefined) ? (
          <Message compact>
            Invalid Survey Id
          </Message>
        ) : (
          <div>
          <Comment.Group>
            <Comment>
              <Comment.Avatar as='a' src={avatarMatt} />
              <Comment.Content>
                <Comment.Author>Survey by {this.state.survey.surveyorEmail}</Comment.Author>
                <Comment.Metadata>
                  <div>{this.state.survey.title}</div>
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
          <Form>
            {(localStorage.getItem('user_email')) ? (
                <div>
                    {/* <p>Email: {this.state.User_Email}</p> */}
                </div>
              ) : (
                <div>
                  <p>Please Enter your Email ID if you want confirmation of your response (Optional)</p>
                  <Form.Field>
                    <input name="email" type="text" id="emailInput" class="input" maxlength="50" title="email" value={this.state.email} onChange={ (e) => { this.handleChange(e); }}/>
                  </Form.Field>
                  <ErrorMessage formErrors={this.state.formErrors} />
                </div>
            )}
          </Form>
          <IdleTimer ref="saveTimer" timeout={1000} startOnLoad={false} idleAction={this.handleSubmitSaveProgress}>
            {this.state.alertVisible && <div>{this.getAlertMsg()}</div>}
            <h3>Please fill this survey questions</h3>
            <Form >
            { this.state.survey.questions.length === 0 ? (
              <Message compact>
                This survey has no questions.
              </Message>
            ) : ('')}

            { this.state.survey.questions.map((question, index) => {
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
                    <input id={question.id} name={question.id} placeholder="Enter your answer here" value={(this.state.answers[question.id] != undefined) ? this.state.answers[question.id][0] : ''} onChange={ (e) => this.updateAnswers(e, question)} disabled={disabled} />
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
                          disabled={disabled}
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
                          disabled={disabled}
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
                          disabled={disabled}
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
                              disabled={disabled}
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
                            disabled={disabled}
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
                            disabled={disabled}
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
              else if(question.type === questionType.Q_YESNO) {
                var ratingOptions = [ "Yes", "No"];
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
                              disabled={disabled}
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
              }
              else if(question.type === questionType.Q_DATE) {
              return (
                <Grid key={question.id} columns='equal'>
                  <Grid.Column>
                    <Form.Field>
                    {/* <label>Enter your question</label>
                    <input id={question.id} name={question.name} value={(this.state.text[question.id] != undefined) ? this.state.text[question.id] : ''} onChange={e => this.updateState(e)} />  */}
                    <label>{order}. {question.text}</label>
                    </Form.Field>
                    <Form.Field>
                      <DatePicker
                        selected={(this.state.answers[question.id] != undefined) ? moment(this.state.answers[question.id][0]) : ''}
                        onChange={date => this.handleChangeDate(date, question)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="LLL"
                        timeCaption="time"
                        disabled={disabled}
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid>
                )
              }
              else 
                return 'invalid question type'
            })
            
          

            }


            <Divider />
            { (this.state.survey.questions.length > 0   && !this.state.isSubmitted) ? (
              <Form.Group>
                {/* <Form.Field><Button basic color='red' type='submit' >Save Progress</Button></Form.Field> */}
                <Form.Field><Button color='youtube' onClick={e => this.handleSurveySubmit(e)} disabled={!this.state.emailValid} >Submit</Button></Form.Field>
              </Form.Group>

            ) : (
              <Message compact>
                Survey is completed.
              </Message>
            )}

            {/* <Button color='youtube' type='submit' >Save</Button> */}
            </Form>
          </IdleTimer>
          </div>

        )}

      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    // survey: state.SurveyReducer.surveyTakingCurrent,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // surveyTakingGetById: (data) => { dispatch(surveyTakingGetById(data)); },
    // surveyTakingSaveProgress: (data, surveyId) => { dispatch(surveyTakingSaveProgress(data, surveyId)); },
    // axiosSurveyTakingSubmit: (data) => { dispatch(axiosSurveyTakingSubmit(data)); },
  }
}

const connectedCommonSurvey = withRouter(connect(mapStateToProps, mapDispatchToProps)(CommonSurvey));
export default connectedCommonSurvey;
