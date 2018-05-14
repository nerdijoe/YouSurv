import React, { Component } from 'react';
import { 
  Link,
  withRouter,
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';

import {
  questionAdd,
  questionUpdateText,
  questionRemove,
  surveySaveQuestion,
  axiosSurveyUpdate,
  axiosSurveyPublish,

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
  Label,
  List,

} from 'semantic-ui-react';

import FormJson from "react-jsonschema-form";
// import FormJson from "react-jsonschema-form-semanticui";
// import FormJson from "react-jsonschema-form-semanticui";
import moment from 'moment';
import DatePicker from 'react-datepicker';

import uuid from 'uuid';
import cuid from 'cuid';
import { CLIENT_RENEG_LIMIT } from 'tls';

import QRCODE from 'qrcode.react';

import * as questionType from '../../actions/surveyConstants';

import * as surveyType from '../../actions/surveyConstants';

var surveyTypeText = {}
surveyTypeText[surveyType.SV_GENERAL] = 'General Survey';
surveyTypeText[surveyType.SV_CLOSE] = 'Closed Survey';
surveyTypeText[surveyType.SV_OPEN] = 'Open Survey';


const mcqOptions = [
  { key: questionType.MCQ_TEXT_RADIO, value: questionType.MCQ_TEXT_RADIO, text: 'Text Radio', flag: 'ly' },
  { key: questionType.MCQ_TEXT_CHECKBOX, value:questionType.MCQ_TEXT_CHECKBOX , text: 'Text Checkbox', flag: 'ly'  },
  { key: questionType.MCQ_TEXT_DROPDOWN, value: questionType.MCQ_TEXT_DROPDOWN, text: 'Text Dropdown', flag: 'ly'  },
  { key: questionType.MCQ_IMAGE_RADIO, value: questionType.MCQ_IMAGE_RADIO, text: 'Image Radio', flag: 'so'  },
  { key: questionType.MCQ_IMAGE_CHECKBOX, value: questionType.MCQ_IMAGE_CHECKBOX, text: 'Image Checkbox', flag: 'so'  },
];

const questions = [{
			"id": "123",
      "type": "string",
      "name": "q1",
			"text": "What is bitcoin?",
			"image": "https://i.imgur.com/q62LNBE.jpg",
			"options": [
				{
					"id":"",
					"text":"",
					"image":"",
					"created": "2018-05-02 15:00:59",
					"updated": "2018-05-02 15:00:59",
					"isDeleted": false
				}
			],
			"answer":{
				"id":"",
				"text":"",
				"created": "2018-05-02 15:00:59",
				"updated": "2018-05-02 15:00:59",
				"isDeleted": false
			},
			"isRequired": true,
			"created": "2018-05-02 15:00:59",
			"updated": "2018-05-02 15:00:59",
			"isDeleted": false
    },
    {
			"id": "222",
      "type": "string",
      "name": "q2",
			"text": "what???",
			"image": "https://i.imgur.com/q62LNBE.jpg",
			"options": [
				{
          "id":"",
          "name": "",
					"text":"",
					"image":"",
					"created": "2018-05-02 15:00:59",
					"updated": "2018-05-02 15:00:59",
					"isDeleted": false
				}
			],
			"answer":{
				"id":"",
				"text":['fdfd'],
				"created": "2018-05-02 15:00:59",
				"updated": "2018-05-02 15:00:59",
				"isDeleted": false
			},
			"isRequired": true,
			"created": "2018-05-02 15:00:59",
			"updated": "2018-05-02 15:00:59",
			"isDeleted": false
		}
  ]


// const log = (type) => console.log.bind(console, type);
// const onSubmit = ({formData}) => {
//   console.log("Data submitted: ",  formData);
// }

const addQuestion = (type) => {
  var newQuestion = {
    "id": "0",
    "type": type,
    "name": "q1",
    "text": "",
    "image": "",
    "options": [
      {
        "id":"",
        "text":"",
        "image":"",
      }
    ],
    "answer":{
      "id":"",
      "text":"",
    },
    "required": false,
  }
}


// ----------------------------------------------------------------------------

class SurveyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      activeItem: 'MCQ',
      questions: [],
      text: {},
      questionText: '',
      options: {
        option_0: '',
        option_1: '',
        option_2: '',
      },
      questionType: questionType.MCQ_TEXT_RADIO,
      dropdownOptions: '',
      rating: '',
      title: this.props.survey.title,
      invitedEmailList: '',
      startDate: this.props.survey.startDate,
      endDate: this.props.survey.endDate,
      questionDate: moment(),
      newEmailList: '',
      isPublishError: false,
    }

    
  }
  
  // state = { 
  //   activeItem: 'Short Answer',
  //   questions: [],
  //   text: {},
  // }


  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  // handleSubmit({formData}) {
  //   console.log("Data submitted: ",  formData);
  // }

  addQuestion(type) {
    var newQuestion = {
      "id": "0",
      "type": type,
      "name": uuid(),
      "text": "",
      "image": "",
      "options": [
        {
          "id":"",
          "text":"",
          "image":"",
        }
      ],
      "answer":{
        "id":"",
        "text":"",
      },
      "required": false,
    }

    // this.setState({
    //   questions:[...this.state.questions, newQuestion],
    // })
    return newQuestion;
  }

  handleAddShortAnswer() {
    console.log("handleAddShortAnswer");
    console.log('this=', this)
    var id = cuid();
    var newQuestion = {
      "id": id,
      "type": questionType.Q_STRING,
      "text": this.state.questionText,
      "image": "",
      "options": [
        {
          "id":"",
          "text":"",
          "image":"",
        }
      ],
      "required": false,
      "deleted": false,
    }
    console.log('  newQuestion=', newQuestion);
    this.props.questionAdd(newQuestion);

  }

  handleAddMCQ(type) {
    console.log('handleAddMCQ type=', type);
    console.log('this.state.shortAnswer=', this.state.shortAnswer);


    var id = cuid();
    var newQuestion = {
      "id": id,
      "type": this.state.questionType,
      "text": this.state.questionText,
      "image": "",
      "options": [
        {
          "id":"",
          "text":"",
          "image":"",
        }
      ],
      "required": false,
      "deleted": false,
    }

    var options = [];
    Object.keys(this.state.options).map(key => {
      var o = {
        id: key,
        text: this.state.options[key],
        image: '',
      }

      options.push(o);
    })
    newQuestion['options'] = options;

    console.log('  newQuestion=', newQuestion);
    this.props.questionAdd(newQuestion);

  }

  handleChangeQuestionType(e, data) {
    var target = e.target;
    console.log(`handleChangeQuestionType data=`, data);
    // console.log('e = ', e);
    
    this.setState({
      [data.name]: data.value
    });
  }

  addOption(e) {
    console.log('addOption');
    e.preventDefault();
    var newOption = `option_${Object.keys(this.state.options).length}`
    console.log(' newOption=', newOption);

    var options = {...this.state.options};
    options[newOption] = '';
    console.log('options=', options);
    this.setState({options});
  }

  removeOption(e) {
    console.log('removeOption');
    e.preventDefault();

    var index = Object.keys(this.state.options).length - 1;
    var exclude = `option_${index}`;
    // var options = Object.keys(this.state.options).filter( key =>{return (key !== exclude) });

    var options = {}
    Object.keys(this.state.options).map( key => {
      if(key !== exclude)
        options[key] = this.state.options[key];
    })

    console.log(`index=${index}, exclude=${exclude}`);
    console.log('options=', options);

    this.setState({options});
  }

  handleAddRating() {
    console.log("handleAddRating");
    console.log('this=', this)
    var id = cuid();
    var newQuestion = {
      "id": id,
      "type": questionType.STAR_RATING,
      "text": this.state.questionText,
      "image": "",
      "options": [
        {
          "id":"",
          "text":"",
          "image":"",
        }
      ],
      "required": false,
      "deleted": false,
    }
    console.log('  newQuestion=', newQuestion);
    this.props.questionAdd(newQuestion);

  }

  handleAddYesNo() {
    console.log("handleAddYesNo");
    console.log('this=', this)
    var id = cuid();
    var newQuestion = {
      "id": id,
      "type": questionType.Q_YESNO,
      "text": this.state.questionText,
      "image": "",
      "options": [
        {
          "id":"",
          "text":"",
          "image":"",
        }
      ],
      "required": false,
      "deleted": false,
    }
    console.log('  newQuestion=', newQuestion);
    this.props.questionAdd(newQuestion);

  }

  handleAddDate() {
    console.log("handleAddDate");
    console.log('this=', this)
    var id = cuid();
    var newQuestion = {
      "id": id,
      "type": questionType.Q_DATE,
      "text": this.state.questionText,
      "image": "",
      "options": [
        {
          "id":"",
          "text":"",
          "image":"",
        }
      ],
      "required": false,
      "deleted": false,
    }
    console.log('  newQuestion=', newQuestion);
    this.props.questionAdd(newQuestion);

  }




  updateOptionText(e) {
    var target = e.target
    console.log(`id=[${target.name}] value=[${target.value}] `)
    
    var options = {...this.state.options};
    options[target.name] = target.value;
    console.log('options=', options);
    this.setState({options});
  }



  updateState(e) {
    var target = e.target
    console.log(`id=[${target.id}] value=[${target.value}] `)
    // console.log('question=', question);
    // this.setState({
    // // questions: [..._this.state.questions, target.value]
    //   [target.id]: [target.value]
    // })

    // question.text = target.value;
    // console.log('after assigned question=', question);

    // this.setState({
    //   // questions: [..._this.state.questions, target.value]
    //     [target.id]: [target.value]
    //   })

    var text = {...this.state.text};
    text[target.id] = target.value;
    console.log('text=', text);
    this.setState({text});
  }

  handleChangeShortAnswer(e) {
    var target = e.target;
    console.log(`handleChangeShortAnswer target.name=${target.name}, value=${target.value}`);

    this.setState({
      [target.name]: target.value,
    })

  }

  handleRating(e) {
    
    console.log('handleRating e=', e);
  }
  
  handleRemoveQuestion(question) {
    console.log('handleRemoveQuestion question=', question);

    this.props.questionRemove(question);
  }

  handleChangeSurveyDetail(e) {
    var target = e.target;
    console.log(`handleChangeSurveyDetail target.name=${target.name}, value=${target.value}`);

    this.setState({
      [target.name]: target.value,
    })

  }

  // Save questions
  handleSubmit(e) {
    e.preventDefault();
    console.log('handleSubmit', this.state);
    console.log('this=', this);

    // this.props.axiosSignIn(this.state, this.props.history);
    // // this.props.history.push('/signin');

    // this.props.questionUpdateText(this.state.text);
    
    //save current survey
    this.props.surveySaveQuestion();
    this.props.axiosSurveyUpdate(this.props.survey);

  }
  
  handleSubmitUpdateSurvey(e) {
    e.preventDefault();
    console.log('handleSubmitUpdateSurvey state=', this.state);
    var combined = this.state.invitedEmailList
    if(this.state.newEmailList.length > 0) {
      combined += ', ' + this.state.newEmailList;
    }
    console.log('   combined=', combined);

    // var invitedEmailList = this.state.invitedEmailList.split(/[ ,]+/)

    // update the invitedEmailList
    var invitedEmailList = combined.split(/[ ,]+/)

    console.log('invitedEmailList=', invitedEmailList);

    var currentSurvey = this.props.survey;
    currentSurvey.title = this.state.title;
    currentSurvey.invitedEmailList = invitedEmailList;
    currentSurvey.startDate = this.state.startDate;
    currentSurvey.endDate = this.state.endDate;

    this.props.axiosSurveyUpdate(currentSurvey);
    
  }

  componentWillMount() {
    var text = {}
    this.props.survey.questions.map(q => text[q.id] = q.text)
    console.log('componentWillMount text=', text);

    // var invitedEmailList = ''.concat.apply(',', this.props.survey.invitedEmailList);
    var invitedEmailList = '';
    if(this.props.survey.invitedEmailList != undefined)
      invitedEmailList = this.props.survey.invitedEmailList.join(", ");
    console.log('invitedEmailList=', invitedEmailList);

    this.setState({
      text: text,
      invitedEmailList: invitedEmailList,
    })
  }

  handleChangeStartDate(date) {
    console.log('handleChangeStartDate date=', date);
    this.setState({
      startDate: date,
    })

  }

  handleChangeEndDate(date) {
    console.log('handleChangeEndDate date=', date);
    this.setState({
      endDate: date,
    })
  }

  handlePublish(e) {
    console.log('handlePublish');
    e.preventDefault();
    
    // call to 
    this.props.axiosSurveyPublish(this.props.survey);
  }

  handleUnpublish(e) {
    console.log('handleUnpublish');
    e.preventDefault();
    
    if(this.props.survey.answers.length > 0) {
      this.setState({
        isPublishError: true,
      })
    } else {
      // call to axiosSurveyUnpublish(this.props.survey);
    }
  }

  handleCloseSurvey(e) {
    console.log('handleCloseSurvey');
    e.preventDefault();
    
    // call to axiosCloseSurvey(this.props.survey);
  }




  render() {
    const { activeItem } = this.state;
    const options = this.state.options;
    const _this = this;
    const buttonColor = 'red';
    const segmentContent = activeItem => {
      if ( activeItem === 'MCQ') {
        return (
          
            <div>
              <h3>Multiple Choice Question</h3>
              <Form onSubmit={e => this.handleAddMCQ()} >
              <Form.Field><label>Select Type</label></Form.Field>
              <Form.Field>
              <Dropdown name='questionType' placeholder='Select Type' fluid search selection options={mcqOptions} value={this.state.questionType} onChange={(e, data) => this.handleChangeQuestionType(e, data)}/>
              </Form.Field>
              <Form.Field>
                <label>Enter your text</label>
                <input name="questionText" value={this.state.questionText} onChange={e => this.handleChangeShortAnswer(e)} />
              </Form.Field>
              <Form.Field>
                <label>Options</label><label>(For Image options, enter image URL)</label>
              </Form.Field>
              <Form.Field>
                <Button basic color={buttonColor} onClick={e => this.addOption(e)} icon='plus' />
                <Button basic color="grey" onClick={e => this.removeOption(e)} icon='minus'/>
              </Form.Field>
              <div id="dynamicInput">
                  {
                    Object.keys(this.state.options).map( function(key, index){
                      {/* console.log(`options rendering index=${index} key=${key}`); */}
                      var order = index + 1;
                      return (
                        <Form.Group key={index}>
                          <Form.Field>{order}</Form.Field>
                          <Form.Field width={12}>
                             <input name={key} value={options[key]} onChange={e => _this.updateOptionText(e)} />
                          </Form.Field>
                        </Form.Group>

                      )
                    })                  
                  }

              </div>
              <Form.Field>
                <Button basic color={buttonColor} type="submit">Add MCQ</Button>
              </Form.Field>
            </Form>

              {/* <Button basic color="green" onClick={e => {this.handleAddShortAnswer()}}>Add MCQ</Button> */}
            </div>
        )
      }
      else if ( activeItem === 'YesNo' ) {
        return (
          <div>
            <h3>Yes/No</h3>
            <Form onSubmit={e => this.handleAddYesNo()} >
              <Form.Field>
                <label>Enter your text</label>
                <input name="questionText" value={this.state.questionText} onChange={e => this.handleChangeShortAnswer(e)} />
              </Form.Field>
            <Button basic color={buttonColor} type="submit">Add Yes/No</Button>
            </Form>
          </div>
        )
      }
      else if(activeItem === 'Short Answer') {
        return (
          <div>
            <h3>Short Answer</h3>
            <Form onSubmit={e => this.handleAddShortAnswer()} >
              <Form.Field>
                <label>Enter your text</label>
                <input name="questionText" value={this.state.questionText} onChange={e => this.handleChangeShortAnswer(e)} />
              </Form.Field>
              <Button basic color={buttonColor} type="submit">Add Short Answer</Button>
            </Form>
            {/* <Button basic color="green" onClick={e => {this.handleAddShortAnswer()}}>Add</Button> */}
          </div>
        )
      }  
      else if ( activeItem === 'Date' ) {
        return (
          <div>
            <h3>Date</h3>
            <Form onSubmit={e => this.handleAddDate()} >
              <Form.Field>
                <label>Enter your text</label>
                <input name="questionText" value={this.state.questionText} onChange={e => this.handleChangeShortAnswer(e)} />
              </Form.Field>
            <Button basic color={buttonColor} type="submit">Add Date</Button>
            </Form>
          </div>
        ) 
      } 
      else if ( activeItem === 'Rating' ) {
        return (
          <div>
            <h3>Rating</h3>
            <Form onSubmit={e => this.handleAddRating()} >
              <Form.Field>
                <label>Enter your text</label>
                <input name="questionText" value={this.state.questionText} onChange={e => this.handleChangeShortAnswer(e)} />
              </Form.Field>
            <Button basic color={buttonColor} type="submit">Add Rating</Button>
            </Form>
          </div>
        ) 
      } 
      else if ( activeItem === 'Edit' ) {
        return (
          <div>
            <h3>Edit</h3>
            <Button basic color={buttonColor} onClick={e => {this.handleAddShortAnswer()}}>Edit</Button>
          </div>
        ) 
      }

    }

    const removeQuestionIcon = (question) => (
      <a onClick={e => {this.handleRemoveQuestion(question)}}><Icon color='grey' size="large" name='remove'/></a>
    )

    

    return (
      <Container>
        <h2>Detail</h2>
        <Message negative attached>
          <Message.Header>Information</Message.Header>

          <List>
            <List.Item>
              <List.Icon name='id card outline' />
              <List.Content>Survey Id: {this.props.survey.id}</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='users' />
              <List.Content>{surveyTypeText[this.props.survey.type]}</List.Content>
            </List.Item>
            <List.Item>
              {this.props.survey.publish != null ?
                (<Label color="red" horizontal>Published</Label>) :
                (<Label color="grey" horizontal>DRAFT</Label>)
              }
            </List.Item>

          </List>        
          {this.props.survey.publish != null ? (
              <List>
                <List.Item>
                  <List.Icon name='calendar' />
                  <List.Content>
                    Start: {this.props.survey.publish.start != null ? moment(this.props.survey.publish.start).format('L LT') : 'not set'}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='calendar' />
                  <List.Content>End: {this.props.survey.publish.end != null ? (moment(this.props.survey.publish.end).format('L LT')) : 'not set'}</List.Content>
                </List.Item>

                {this.props.survey.type == surveyType.SV_GENERAL ? (
                  <div>
                    <List.Item>
                      <List.Content>
                        <QRCODE value={this.props.survey.publish.link} />
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Content>
                        Link: {this.props.survey.publish.link}
                      </List.Content>
                    </List.Item>

                  </div>
                ) : ('')}

              </List>
              
            ) : ('')}

        </Message>


        <Form className='attached fluid segment' onSubmit={e => this.handleSubmitUpdateSurvey(e)}>
          <Form.Field>
            <label>Title</label>
            <input placeholder='' name='title' value={this.state.title} onChange={ (e) => { this.handleChangeSurveyDetail(e); }} disabled={this.props.survey.publish != null? true : false}/>
          </Form.Field>
            
          {this.props.survey.publish != null ? (
            <Form.Field>
              <label>Invited</label>
              <input placeholder='curry@warriors.com, lebron@cavs.com, ...' name='invitedEmailList' value={this.state.invitedEmailList} disabled='true' />
            </Form.Field>
          ) : ('')}

          <Form.Field>
            {this.props.survey.publish != null ? (
              <div>
                <label>Invite more people (separate emails by comma)</label>
                <input placeholder='curry@warriors.com, lebron@cavs.com, ...' name='newEmailList' value={this.state.newEmailList} onChange={ (e) => { this.handleChangeSurveyDetail(e); }} />
              </div>
            ): (
              <div>
                <label>Invite emails (separate emails by comma)</label>
                <input placeholder='curry@warriors.com, lebron@cavs.com, ...' name='invitedEmailList' value={this.state.invitedEmailList} onChange={ (e) => { this.handleChangeSurveyDetail(e); }} />
              </div>
            )}
            

          </Form.Field>

          <Form.Group>
            <Form.Field>
              <label>Start Date</label>
              <DatePicker
                selected={this.state.startDate}
                onChange={date => this.handleChangeStartDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="LLL"
                timeCaption="time"
              />
            </Form.Field>
            <Form.Field>
              <label>End Date</label>
              <DatePicker
                selected={this.state.endDate}
                onChange={date => this.handleChangeEndDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="LLL"
                timeCaption="time"
              />
            </Form.Field>
          </Form.Group> 

          <Form.Group>
            <Form.Field>
              <Button basic color="red" type="submit">Update Survey</Button>
            </Form.Field>
            <Form.Field>
              {this.props.survey.publish != null ? (
                <div>
                  <Button color="grey" onClick={e => this.handleUnpublish(e) }>Unpublish</Button>
                  <Button color="yellow" onClick={e => this.handleCloseSurvey(e) }>Close</Button>
                </div>
              ) : (
                <Button color="youtube" onClick={e => this.handlePublish(e) }>Publish</Button>
              )}
            </Form.Field>
          </Form.Group>
        </Form>
        
        { this.state.isPublishError ? (
          <Message compact warning>
            Cannot unpublish, one of the surveys has been submitted.
          </Message>
        ) : ('')}
        
        <Divider />

        { this.props.survey.publish != null ? ('') : (
          <div>
            <Menu attached='top' tabular>
              <Menu.Item name='MCQ' active={activeItem === 'MCQ'} onClick={this.handleItemClick} />
              <Menu.Item name='YesNo' active={activeItem === 'YesNo'} onClick={this.handleItemClick} />
              <Menu.Item name='Short Answer' active={activeItem === 'Short Answer'} onClick={this.handleItemClick} />
              <Menu.Item name='Date' active={activeItem === 'Date'} onClick={this.handleItemClick} />
              <Menu.Item name='Rating' active={activeItem === 'Rating'} onClick={this.handleItemClick} />
            </Menu>

            <Segment attached='bottom'>
              {segmentContent(activeItem)}
            </Segment>
          </div>
        ) }


          <Header as='h3'>
            <Icon name='file text outline' />
            <Header.Content>
              Preview
            </Header.Content>
          </Header>

          <Message>
      
          <Form onSubmit={e => this.handleSubmit(e)}>
          { this.props.survey.questions.length === 0 ? (
            <Message compact>
              You have no questions for this survey, please add them.
            </Message>
          ) : ('')}

          { this.props.survey.questions.map((question, index) => {
            var order = index + 1;
            // left column width
            const lcWidth = 1;
            if(question.type === questionType.MCQ_TEXT_RADIO) {
              return (
                <Grid key={question.id} columns='equal'>
                  {this.props.survey.publish == null ? (
                    <Grid.Column width={lcWidth}>{removeQuestionIcon(question)}</Grid.Column>
                    ) : ('')
                  }
                  
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
                        // checked={this.state.value === 'this'}
                        // onChange={this.handleChange}
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
                  {/* <Grid.Column width={lcWidth}>{removeQuestionIcon(question)}</Grid.Column> */}
                  {this.props.survey.publish == null ? (
                    <Grid.Column width={lcWidth}>{removeQuestionIcon(question)}</Grid.Column>
                    ) : ('')
                  }
                <Grid.Column>
                <Form.Field key={question.id}>
                  <label>{order}. {question.text}</label>
                </Form.Field>
                  {question.options.map(option => {
                    return (
                      <Form.Field key={option.id}>
                      <Checkbox
                        key={option.id}
                        label={option.text}
                        name={question.id}
                        value={option.text}
                        // checked={this.state.value === 'this'}
                        // onChange={this.handleChange}
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
                  value: option.value,
                  text: option.text,
                }
                dropdownOptions.push(newOption);
              })
              return (
                <Grid key={question.id} columns='equal'>
                  {/* <Grid.Column width={lcWidth}>{removeQuestionIcon(question)}</Grid.Column> */}
                  {this.props.survey.publish == null ? (
                    <Grid.Column width={lcWidth}>{removeQuestionIcon(question)}</Grid.Column>
                    ) : ('')
                  }
                  <Grid.Column>
                    <Form.Field key={question.id}>
                      <label>{order}. {question.text}</label>
                      <Dropdown key={question.id} name={question.id} placeholder='Please choose' fluid search selection options={dropdownOptions} value={this.state.dropdownOptions} />
                    </Form.Field>
                  </Grid.Column>
                </Grid>
              )
            }
            else if(question.type === questionType.MCQ_IMAGE_RADIO) {
              return (
                <Grid key={question.id} columns='equal'>
                  {/* <Grid.Column width={lcWidth}>{removeQuestionIcon(question)}</Grid.Column> */}
                  {this.props.survey.publish == null ? (
                    <Grid.Column width={lcWidth}>{removeQuestionIcon(question)}</Grid.Column>
                    ) : ('')
                  }
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
                          // checked={this.state.value === 'this'}
                          // onChange={this.handleChange}
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
                  {/* <Grid.Column width={lcWidth}>{removeQuestionIcon(question)}</Grid.Column> */}
                {this.props.survey.publish == null ? (
                  <Grid.Column width={lcWidth}>{removeQuestionIcon(question)}</Grid.Column>
                  ) : ('')
                }
                <Grid.Column>
                <Form.Field key={question.id}>
                  <label>{order}. {question.text}</label>
                </Form.Field>
                  {question.options.map(option => {
                    return (
                      <Form.Field key={option.id}>
                      <Grid columns='equal'>
                      <Grid.Row>
                        <Grid.Column width={1}>
                          <Checkbox key={option.id}
                          label=''
                          name={question.id}
                          value={option.text}
                          // checked={this.state.value === 'this'}
                          // onChange={this.handleChange}
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
              var ratingOptions = ['Yes', 'No'];
              return (
                <Grid key={question.id} columns='equal'>
                  {/* <Grid.Column width={lcWidth}>{removeQuestionIcon(question)}</Grid.Column> */}
                  {this.props.survey.publish == null ? (
                    <Grid.Column width={lcWidth}>{removeQuestionIcon(question)}</Grid.Column>
                    ) : ('')
                  }
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
                            name='rating'
                            value={option}
                          />
                        </Form.Field>
                      )
                    })}
                    </Form.Group>
                </Grid.Column>
                </Grid>
              )
            } 
            else if(question.type === questionType.Q_STRING) {
              return (
                <Grid key={question.id} columns='equal'>
                  {/* <Grid.Column width={lcWidth}>{removeQuestionIcon(question)}</Grid.Column> */}
                  {this.props.survey.publish == null ? (
                    <Grid.Column width={lcWidth}>{removeQuestionIcon(question)}</Grid.Column>
                    ) : ('')
                  }
                  <Grid.Column>
                    
                  
                  <Form.Field>
                  {/* <label>Enter your question</label>
                  <input id={question.id} name={question.name} value={(this.state.text[question.id] != undefined) ? this.state.text[question.id] : ''} onChange={e => this.updateState(e)} />  */}
                  <label>{order}. {question.text}</label>
                  </Form.Field>
                  <Form.Field>
                  <input id={question.id} name={question.id} placeholder="Enter your answer here" />
                  </Form.Field>
                  </Grid.Column>
                </Grid>
              )
            }
            else if(question.type === questionType.Q_DATE) {
              return (
                <Grid key={question.id} columns='equal'>
                  {/* <Grid.Column width={lcWidth}>{removeQuestionIcon(question)}</Grid.Column> */}
                  {this.props.survey.publish == null ? (
                    <Grid.Column width={lcWidth}>{removeQuestionIcon(question)}</Grid.Column>
                    ) : ('')
                  }
                  <Grid.Column>
                    <Form.Field>
                    {/* <label>Enter your question</label>
                    <input id={question.id} name={question.name} value={(this.state.text[question.id] != undefined) ? this.state.text[question.id] : ''} onChange={e => this.updateState(e)} />  */}
                    <label>{order}. {question.text}</label>
                    </Form.Field>
                    <Form.Field>
                      <DatePicker
                        selected={this.state.questionDate}
                        // onChange=''
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="LLL"
                        timeCaption="time"
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid>
              )
            } 
            else if(question.type === questionType.STAR_RATING) {
              var ratingOptions = [ 0, 1, 2, 3, 4, 5];
              return (
                <Grid key={question.id} columns='equal'>
                  {/* <Grid.Column width={lcWidth}>{removeQuestionIcon(question)}</Grid.Column> */}
                  {this.props.survey.publish == null ? (
                    <Grid.Column width={lcWidth}>{removeQuestionIcon(question)}</Grid.Column>
                    ) : ('')
                  }
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
                            name='rating'
                            value={option}
                          />
                        </Form.Field>
                      )
                    })}
                    </Form.Group>
                </Grid.Column>
                </Grid>
              )
            } 
            else 
              return 'help'
          })
          
        

          }


          
          { (this.props.survey.questions.length > 0  && this.props.survey.publish == null) ? (
            <div>
              <Divider />
              <Button color='youtube' type='submit' >Save Questions</Button>
            </div>
          ) : ('')}

          </Form>

          </Message> 

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
    questionAdd: (data) => { dispatch(questionAdd(data)); },
    questionUpdateText: (data) => { dispatch(questionUpdateText(data)); },
    questionRemove: (data) => { dispatch(questionRemove(data)); },
    axiosSurveyUpdate: (data) => { dispatch(axiosSurveyUpdate(data)); },
    surveySaveQuestion: () => { dispatch(surveySaveQuestion()); },
    axiosSurveyPublish: (data) => { dispatch(axiosSurveyPublish(data)); },
  }
}

const connectedSurveyDetail = withRouter(connect(mapStateToProps, mapDispatchToProps)(SurveyDetail));
export default connectedSurveyDetail;
