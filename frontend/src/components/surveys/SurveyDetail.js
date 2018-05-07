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
  surveySave,
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
  Divider
} from 'semantic-ui-react';

import FormJson from "react-jsonschema-form";
// import FormJson from "react-jsonschema-form-semanticui";
// import FormJson from "react-jsonschema-form-semanticui";
import Moment from 'moment';

import uuid from 'uuid';

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


class SurveyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      activeItem: 'Short Answer',
      questions: [],
      text: {},
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
    this.props.surveySave();
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
    var newQuestion = {
      "id": uuid(),
      "type": 'string',
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
    console.log('  newQuestion=', newQuestion);
    this.props.questionAdd(newQuestion);

  }


  updateState(e, question) {
    var target = e.target
    console.log(`id=[${target.id}] value=[${target.value}] `)
    console.log('question=', question);
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

  
  componentWillMount() {
    var text = {}
    this.props.survey.questions.map(q => text[q.id] = q.text)
    console.log('componentWillMount text=', text);
    this.setState({
      text: text
    })
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Container>
        <h2>Detail</h2>
        
        
        <Divider />

        <Menu attached='top' tabular>
          <Menu.Item name='Short Answer' active={activeItem === 'Short Answer'} onClick={this.handleItemClick} />
          <Menu.Item name='MCQ' active={activeItem === 'MCQ'} onClick={this.handleItemClick} />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input transparent icon={{ name: 'search', link: true }} placeholder='Search...' />
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        <Segment attached='bottom'>
          {this.props.survey.id}
          {this.props.survey.authorEmail}
          {this.props.survey.type}
          { (activeItem === 'Short Answer') ? (
            <div>
              <h3>Short Answer</h3>
              <Button basic color="green" onClick={e => {this.handleAddShortAnswer()}}>Add</Button>
            </div>
            
          ): ('')}
          { (activeItem === 'MCQ') ? (
            <h3>Multiple Choice Question</h3>   
          ): ('')}
        </Segment>

        <h3>Preview</h3>
          <Form onSubmit={e => this.handleSubmit(e)}>
          { this.props.survey.questions.map(question => {
            {/* console.log(question) */}
            if(question.type === 'string') {
              return ( 
                <Form.Field key={question.id} >
                  <label>Enter your question</label>
                  <input id={question.id} name={question.name} value={this.state.text[question.id]} onChange={e => this.updateState(e, question)} /> 
                </Form.Field>
                )
            } else 
              return 'help'

          })
          
        

          }
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
    surveySave: () => { dispatch(surveySave()); },
  }
}

const connectedSurveyDetail = withRouter(connect(mapStateToProps, mapDispatchToProps)(SurveyDetail));
export default connectedSurveyDetail;
