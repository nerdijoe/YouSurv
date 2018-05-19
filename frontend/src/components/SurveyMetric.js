import React, { Component } from 'react';
import '../css/style.css';
import {Pie, Bar, Line} from 'react-chartjs-2';
import * as questionType from '../actions/surveyConstants';
import {domainURL} from '../actions/urlConstant';
import Navbar from './Navbar';
import axios from 'axios';

export default class UserMetric extends Component {

    constructor(props){
        super(props);

        this.state={
           survey:''
        }
    }

    componentWillMount() {
        let token = 'Bearer ' + localStorage.getItem('token');

        axios.get(`${domainURL}/survey/${this.props.match.params.id}`,{
            headers: {
              Authorization: token,
            }
          }).then( res => {
            console.log("responseeee", res);
            // if(res.status==200)
                this.setState({
                    survey: res.data
                })
            // else {
                // console.log("error invalid 404");
                // this.setState({
                //   tokenValid: false,
                // }, () => {
                //   this.validateField('token');
                // });
            // }

            })
            .catch( res => {
             console.log("error 404",res);
            })
            // this.props.history.push('/signin');
    }

    render(){

        let participants=0;
        console.log("surveyyyy",this.state.survey);
        let showMetric="";
        if(this.state.survey) {
            this.state.survey.answers.map(function(answer){
                if(answer.submitted==true){
                    participants++;
                }
            });
        
        let answerLength=this.state.survey.answers.length;
        let participationRate
        if(this.state.survey.invitedEmailList.length>0){
            participationRate =(participants/this.state.survey.invitedEmailList.length)*100;
        }else{
            participationRate="Not applicable to calculate "
        }
       /** let questionNameMap=new Map();
        let optionCountMap=new Map();
        let optionNameMap=new Map();
        let questionOptionMap=new Map();

        this.state.survey.questions.map(function(question){
            let optionsArray=[];
            question.options.map(function(option){
                if(!optionCountMap.has(option.id)){
                    optionCountMap.set(option.id, 0);
                    optionNameMap.set(option.id, option.text);
                    optionsArray.push(option.id);
                }
            });

            if(!questionOptionMap.has(question.id)){
                questionNameMap.set(question.id,question.text);
                questionOptionMap.set(question.id,optionsArray);
            }
        });


        this.state.survey.answers.map(function (answer){
            if(answer.submitted==true){
                answer.choices.map(function(choice){
                    choice.selection.map(function(selectedOption){
                        if(optionCountMap.has(selectedOption)){
                            optionCountMap.set(selectedOption,optionCountMap.get(selectedOption)+1);
                        }
                    });
                });
            }
        });*/

        let questionNameAndChoiceMap=new Map();
        let questionNameIdMap=new Map(); 
        let shortNameAndAnswerMap=new Map();
        let shortNameIdMap=new Map();
       
        this.state.survey.questions.map(function(question){
            let optionsArray=[];

           if(question.type!=questionType.Q_YESNO && question.type!=questionType.STAR_RATING 
                && question.type!=questionType.Q_DATE && question.type!=questionType.Q_STRING
                ){ 
                    question.options.map(function(option){
                            optionsArray.push(option.text);
                    });

                    if(!questionNameAndChoiceMap.has(question.text)){
                        questionNameAndChoiceMap.set(question.text,optionsArray);
                        questionNameIdMap.set(question.text,question.id);
                       
                    }
            }

            if(question.type===questionType.Q_STRING){
                shortNameAndAnswerMap.set(question.text,[]);
                shortNameIdMap.set(question.text,question.id);
                questionNameAndChoiceMap.set(question.text,0);
               
            }

            if(question.type===questionType.Q_YESNO ){
                questionNameAndChoiceMap.set(question.text,["Yes", "No"]);
                questionNameIdMap.set(question.text,question.id);
                
            }

            if(question.type===questionType.STAR_RATING){
                questionNameAndChoiceMap.set(question.text,["0","1","2","3","4","5"]);
                questionNameIdMap.set(question.text,question.id);
                
            }


        });
        
     
        let answers=this.state.survey.answers;
        let display=[];
        let displayShortanswers=[];
        questionNameAndChoiceMap.forEach(function(value, key){
            let optionCountMap=new Map();
            for(var i=0;i<value.length;i++){
                if(!optionCountMap.has(value[i])){
                    optionCountMap.set(value[i],0);
                }
            }

            answers.map(function(answer){
                if(answer.submitted==true){
                    answer.choices.map(function(choice){
                        if(choice.questionId==questionNameIdMap.get(key)){
                                choice.selection.map(function(selectedOption){
                                    if(optionCountMap.has(selectedOption)){
                                        optionCountMap.set(selectedOption,optionCountMap.get(selectedOption)+1);
                                    }
                                });
                            }
                         if(choice.questionId==shortNameIdMap.get(key)){
                             let shortAnswers= shortNameAndAnswerMap.get(key);
                             choice.selection.map(function(selectedOption){
                                shortAnswers.push(selectedOption);
                             });
                             shortNameAndAnswerMap.set(key,shortAnswers);
                         }   
                    });
                }
            });
            //console.log("Short Answer map=>>",shortNameAndAnswerMap);
            //console.log("Sumarray: Question Name:", key);
            

            if(questionNameIdMap.has(key)){
                        let rowArray=[];
                        
                        //rowArray.push(<td>{key}</td>);
                        let labelArr=[];
                        let dataArr=[];
                        for(var i=0;i<value.length;i++){
                            labelArr.push(value[i]);
                            dataArr.push(optionCountMap.get(value[i]));

                        // rowArray.push(<td>{value[i]}==>{optionCountMap.get(value[i])}</td>);
                        // console.log("Choices", value[i],"==>",optionCountMap.get(value[i]));
                        }


                        const pageTrace={
                            labels:labelArr,
                            datasets:[
                                {
                                    data:dataArr,
                                    label: "Number of responses",
                                    backgroundColor:"#0080ff"
                                }
                            ]
                        }
                        const options={
                            responsive:true
                        }

                        rowArray.push(<div className="col-md-4">
                        <div>
                        <b className="font-color">Question: &nbsp;</b><b>{key}</b>
                        </div>
                                <Bar data={pageTrace} options={options}/>
                            </div>
                            );

                        display.push(<div>{rowArray}</div>);
                }

                
                if(shortNameIdMap.has(key)){

                    let list=[];
                    let mapEntry=shortNameAndAnswerMap.get(key);
                    for(var i=0;i<mapEntry.length;i++){
                        list.push( <li class="list-group-item ">{mapEntry[i]}</li>);
                    }

                    displayShortanswers.push(
                        <div className="col-md-6">
                            <div ><b className="font-color">Question: &nbsp;</b><b>{key}</b></div>
                           <br></br>
                            <div><b>List of answers</b></div>
                            <ul class="list-group ">
                                {list}
                            </ul>
                        </div>
                    );
                }
        });
        
    
        
        let startTime=(this.state.survey.startDate)?this.state.survey.startDate:"Not specified";
        let endTime=(this.state.survey.endDate)?this.state.survey.endDate:"Not specified";
        if(participants>=2){

     showMetric=(<div>
        <div className="align">
                <div><b className="font-color">Start Time:</b> <b>{startTime}</b></div>
                    <br></br>
                <div><b className="font-color">End Time:</b><b>{endTime}</b></div>
                    <br></br>
                <div> <b className="font-color">Number of participants:</b> <b>{participants}</b></div>
                    <br></br>
                <div> <b className="font-color">Participation Rate:</b> <b>{participationRate}%</b></div>
                    <br></br>
           
        </div>

         <div className="align-center font-color"><b>Distribution Metric</b></div>
             <div className="container">
                <div className="row">
                        {display}
                </div>
                <br></br>
                <div className="row">
                    {displayShortanswers}
                </div>
            </div>
    </div>);
      
        }else{
            showMetric=( <div className="align-center font-color"><b>Metrics cannot be shown as number of participants are less than 2</b></div>);
        }
    }
        
        /**console.log("optionCountMap", optionCountMap);
        console.log("optionNameMap",optionNameMap);
        console.log("questionNameMap",questionNameMap);
        console.log("questionOptionMap",questionOptionMap); */   
       /** let display=[];
        let maxColSpan=0;
        let content=(questionNameMap.forEach(function(value, key) {
            let rowArray=[];
                
                rowArray.push(<td>{value}</td>) ;
                if(questionOptionMap.get(key).length>maxColSpan){
                    maxColSpan=questionOptionMap.get(key).length;
                }

               for(var i=0;i<questionOptionMap.get(key).length;i++){
                   
                    rowArray.push(<td>{optionNameMap.get(questionOptionMap.get(key)[i])},&ensp;count={optionCountMap.get(questionOptionMap.get(key)[i])}</td>)
                   
                }

                display.push(<tr>{rowArray}</tr>);
                
          }));*/
        return(
        
        <div>
           <Navbar /> 
          {showMetric}
            </div>);
    }
}
