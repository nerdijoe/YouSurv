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
} from 'semantic-ui-react';

import FormJson from "react-jsonschema-form";
// import FormJson from "react-jsonschema-form-semanticui";
// import FormJson from "react-jsonschema-form-semanticui";
import Moment from 'moment';

import uuid from 'uuid';
import cuid from 'cuid';
import { CLIENT_RENEG_LIMIT } from 'tls';

import * as questionType from '../../actions/surveyConstants';

const mcqOptions = [
  { key: questionType.MCQ_TEXT_RADIO, value: questionType.MCQ_TEXT_RADIO, text: 'Text Radio' },
  { key: questionType.MCQ_TEXT_CHECKBOX, value:questionType.MCQ_TEXT_CHECKBOX , text: 'Text Checkbox' },
  { key: questionType.MCQ_TEXT_DROPDOWN, value: questionType.MCQ_TEXT_DROPDOWN, text: 'Text Dropdown' },

  { key: questionType.MCQ_IMAGE_CHECKBOX, value: questionType.MCQ_IMAGE_CHECKBOX, text: 'Image Checkbox' },
  { key: questionType.MCQ_IMAGE_RADIO, value: questionType.MCQ_IMAGE_RADIO, text: 'Image Radio' },
];


const schema = {
  title: "Survey",
  type: "object",
  // required: ["title"],
  properties: {
    title: {type: "string", title: "Title", default: "A new task"},
    done: {type: "boolean", title: "Done?", default: false},
    "multipleChoicesList": {
      "type": "array",
      "title": "this is a question sentence?",
      "items": {
        "type": "string",
        "enum": [
          "foo",
          "bar",
          "fuzz",
          "qux"
        ]
      },
      "uniqueItems": true
    }
  }
};

const uiSchema = {
  "multipleChoicesList": {
    "ui:widget": "checkboxes"
  },
}

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
      activeItem: 'Short Answer',
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

  handleSubmit(e) {
    e.preventDefault();
    console.log('handleSubmit', this.state);
    console.log('this=', this);

    // this.props.axiosSignIn(this.state, this.props.history);
    // // this.props.history.push('/signin');

    this.props.questionUpdateText(this.state.text);
    //save current survey
    this.props.surveySaveQuestion();
  }

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
      "name": id,
      "text": this.state.questionText,
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
      "name": id,
      "text": this.state.questionText,
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

  updateOptionText(e) {
    var target = e.target
    console.log(`id=[${target.name}] value=[${target.value}] `)
    
    var options = {...this.state.options};
    options[target.name] = target.value;
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
      "name": id,
      "text": this.state.questionText,
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
    console.log('  newQuestion=', newQuestion);
    this.props.questionAdd(newQuestion);

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

  handleSubmitUpdateSurvey(e) {
    e.preventDefault();
    console.log('handleSubmitUpdateSurvey state=', this.state);

    var invitedEmailList = this.state.invitedEmailList.split(/[ ,]+/)
    console.log('invitedEmailList=', invitedEmailList);

    var currentSurvey = this.props.survey;
    currentSurvey.title = this.state.title;
    currentSurvey.invitedEmailList = invitedEmailList;
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

  render() {
    const { activeItem } = this.state;
    const options = this.state.options;
    const _this = this;
    const segmentContent = activeItem => {
      if(activeItem === 'Short Answer') {
        return (
          <div>
            <h3>Short Answer</h3>
            <Form onSubmit={e => this.handleAddShortAnswer()} >
              <Form.Field>
                <label>Enter your text</label>
                <input name="questionText" value={this.state.questionText} onChange={e => this.handleChangeShortAnswer(e)} />
              </Form.Field>
              <Button basic color="green" type="submit">Add</Button>
            </Form>
            {/* <Button basic color="green" onClick={e => {this.handleAddShortAnswer()}}>Add</Button> */}
          </div>
        )
      } else if ( activeItem === 'MCQ') {
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
              <Form.Field><label>Options</label>
                <Button basic color="green" onClick={e => this.addOption(e)} icon='plus' />
                <Button basic color="red" onClick={e => this.removeOption(e)} icon='minus'/>
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
                <Button basic color="green" type="submit">Add MCQ</Button>
              </Form.Field>
            </Form>

              {/* <Button basic color="green" onClick={e => {this.handleAddShortAnswer()}}>Add MCQ</Button> */}
            </div>
          
        ) 
      } else if ( activeItem === 'Rating' ) {
        return (
          <div>
            <h3>Rating</h3>
            <Form onSubmit={e => this.handleAddRating()} >
              <Form.Field>
                <label>Enter your text</label>
                <input name="questionText" value={this.state.questionText} onChange={e => this.handleChangeShortAnswer(e)} />
              </Form.Field>
            <Button basic color="green" type="submit">Add Rating</Button>
            </Form>
          </div>
        ) 
      } else if ( activeItem === 'Edit' ) {
        return (
          <div>
            <h3>Edit</h3>
            <Button basic color="green" onClick={e => {this.handleAddShortAnswer()}}>Edit</Button>
          </div>
        ) 
      }

    }

    const removeQuestionIcon = (question) => (
      <a onClick={e => {this.handleRemoveQuestion(question)}}><Icon color='red' size="large" name='remove'/></a>
    )

    

    return (
      <Container>
        <h2>Detail</h2>
        
        <Form onSubmit={e => this.handleSubmitUpdateSurvey(e)}>
          <Form.Field>
            <label>Title</label>
            <input placeholder='' name='title' value={this.state.title} onChange={ (e) => { this.handleChangeSurveyDetail(e); }} />
          </Form.Field>

          <Form.Field>
            <label>Invite emails (separate emails by comma)</label>
            <input placeholder='curry@warriors.com, lebron@cavs.com, ...' name='invitedEmailList' value={this.state.invitedEmailList} onChange={ (e) => { this.handleChangeSurveyDetail(e); }} />
          </Form.Field>

          <Button color="youtube" type="submit">Update Survey</Button>
        </Form>
        
        
        <Divider />

        <Menu attached='top' tabular>
          <Menu.Item name='Short Answer' active={activeItem === 'Short Answer'} onClick={this.handleItemClick} />
          <Menu.Item name='MCQ' active={activeItem === 'MCQ'} onClick={this.handleItemClick} />
          <Menu.Item name='Rating' active={activeItem === 'Rating'} onClick={this.handleItemClick} />
          {/* <Menu.Item name='Edit' active={activeItem === 'Edit'} onClick={this.handleItemClick} /> */}

          <Menu.Menu position='right'>
            <Menu.Item>
              {/* <Input transparent icon={{ name: 'search', link: true }} placeholder='Search...' /> */}
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        <Segment attached='bottom'>
          {this.props.survey.id}
          {this.props.survey.authorEmail}
          {this.props.survey.type}
          {/* { (activeItem === 'Short Answer') ? (
            <div>
              <h3>Short Answer</h3>
              <Button basic color="green" onClick={e => {this.handleAddShortAnswer()}}>Add</Button>
            </div>
            
          ): ('')}
          { (activeItem === 'MCQ') ? (
            <div>
              <h3>Multiple Choice Question</h3>
              <Button basic color="green" onClick={e => {this.handleAddShortAnswer()}}>Add MCQ</Button>
            </div>
          ): ('')} */}
          {segmentContent(activeItem)}
        </Segment>

        <h3>Preview</h3>
          <Form onSubmit={e => this.handleSubmit(e)}>
          { this.props.survey.questions.map((question, index) => {
            var order = index + 1;
            // left column width
            const lcWidth = 1;
            if(question.type === questionType.Q_STRING) {
              return (
                <Grid key={question.id} columns='equal'>
                  <Grid.Column width={lcWidth}>{removeQuestionIcon(question)}</Grid.Column>

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
            } else if(question.type === questionType.MCQ_TEXT_RADIO) {
              return (
                <Grid key={question.id} columns='equal'>
                  <Grid.Column width={lcWidth}>{removeQuestionIcon(question)}</Grid.Column>
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
                  <Grid.Column width={lcWidth}>{removeQuestionIcon(question)}</Grid.Column>
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
                  <Grid.Column width={lcWidth}>{removeQuestionIcon(question)}</Grid.Column>
                  <Grid.Column>
                    <Form.Field key={question.id}>
                      <label>{order}. {question.text}</label>
                      <Dropdown key={question.id} name={question.id} placeholder='Please choose' fluid search selection options={dropdownOptions} value={this.state.dropdownOptions} />
                    </Form.Field>
                  </Grid.Column>
                </Grid>
              )
            } else if(question.type === questionType.STAR_RATING) {
              var ratingOptions = [ 0, 1, 2, 3, 4, 5];
              return (
                <Grid key={question.id} columns='equal'>
                  <Grid.Column width={lcWidth}>{removeQuestionIcon(question)}</Grid.Column>
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

                {/* <Form.Field>
                  <Checkbox
                    
                    label='Choose this'
                    name='checkboxRadioGroup'
                    value='this'
                    // checked={this.state.value === 'this'}
                    
                  />
                  <Checkbox
                    
                    label='Choose thats'
                    name='checkboxRadioGroup'
                    value='this'
                    // checked={this.state.value === 'this'}
                    
                  />
                </Form.Field> */}
          <Divider />
          <Button color='youtube' type='submit' >Save</Button>
          </Form>

          <Divider />
          {/* <FormJson schema={schema}
          onChange={log("changed")}
          onSubmit={this.handleSubmit}
          onError={log("errors")} 
          uiSchema={uiSchema} /> */}

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
  }
}

const connectedSurveyDetail = withRouter(connect(mapStateToProps, mapDispatchToProps)(SurveyDetail));
export default connectedSurveyDetail;
