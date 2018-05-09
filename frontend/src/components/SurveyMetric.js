import React, { Component } from 'react';
import '../css/style.css'
export default class UserMetric extends Component {

    constructor(props){
        super(props);

        this.state={
           
          survey:{"id": "1",
          "surveyorEmail": "jiaqi.qin@sjsu.edu",
          "invitedEmailList": [
              "frank.qjq@outlook.com", 
              "rudy@sjsu.edu"
          ],
          "title": "SJSU Survey",
          "type": "general",
          "questions": [
              {
                  "id": "11",
                  "type": "MCQ_TEXT_RADIO",
                  "text": "Which is your favorite course?",
                  "image": "",
                  "options": [
                      {
                          "id":"111",
                          "text":"CMPE 275",
                          "image":"",
                          "created": "2018-05-02 15:00:59",
                          "updated": "2018-05-02 15:00:59",
                          "deleted": false
                      }, {
                          "id":"112",
                          "text":"CMPE 285",
                          "image":"",
                          "created": "2018-05-02 15:00:59",
                          "updated": "2018-05-02 15:00:59",
                          "deleted": false
                      }, {
                          "id":"113",
                          "text":"CMPE 202",
                          "image":"",
                          "created": "2018-05-02 15:00:59",
                          "updated": "2018-05-02 15:00:59",
                          "deleted": false
                      }
                  ],
                  "required": true,
                  "created": "2018-05-02 15:00:59",
                  "updated": "2018-05-02 15:00:59",
                  "deleted": false
              }, {
                "id": "18",
                "type": "MCQ_TEXT_RADIO",
                "text": "Which is your favorite city?",
                "image": "",
                "options": [
                    {
                        "id":"114",
                        "text":"San Jose",
                        "image":"",
                        "created": "2018-05-02 15:00:59",
                        "updated": "2018-05-02 15:00:59",
                        "deleted": false
                    }, {
                        "id":"115",
                        "text":"San Franscisco",
                        "image":"",
                        "created": "2018-05-02 15:00:59",
                        "updated": "2018-05-02 15:00:59",
                        "deleted": false
                    }
                ],
                "required": true,
                "created": "2018-05-02 15:00:59",
                "updated": "2018-05-02 15:00:59",
                "deleted": false
            }
          ],
          "answers": [
              {
                  "id":"12",
                  "surveyeeEmail": "rudy@sjsu.edu",
                  "choices": [
                      {
                          "id": "121",
                          "questionId": "11",
                          "selection": ["111", "113"]
                      }
                  ],
                  "created": "2018-05-02 15:00:59",
                  "updated": "2018-05-02 15:00:59",
                  "deleted": false,
                  "submitted": true
              },
              {
                "id":"12",
                "surveyeeEmail": "rudy@sjsu.edu",
                "choices": [
                    {
                        "id": "121",
                        "questionId": "18",
                        "selection": ["115"]
                    }
                ],
                "created": "2018-05-02 15:00:59",
                "updated": "2018-05-02 15:00:59",
                "deleted": false,
                "submitted": true
            }
          ],
      "start": "2018-05-02 15:00:59",
      "end": "2018-05-02 15:00:59",
          "publish": {
              "Link": "localhost:3000/takeSurvey?token=f9110fdf-e6be-4ca6-ab89-c4210295e2f9",
          "qr_img": []
          },
          "deleted": false,
          "created": "2018-05-02 15:00:59",
          "updated": "2018-05-02 15:00:59",
      }
      
            
        }
    }

    render(){

        let participants=0;
        this.state.survey.answers.map(function(answer){
            if(answer.submitted==true){
                participants++;
            }
        });

        let participationRate=participants/this.state.survey.invitedEmailList.length;
        let questionNameMap=new Map();
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
        });
        


        /**console.log("optionCountMap", optionCountMap);
        console.log("optionNameMap",optionNameMap);
        console.log("questionNameMap",questionNameMap);
        console.log("questionOptionMap",questionOptionMap); */   
        let display=[];
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
                
          }));


        return(
        
        <div>
            
          <div className="align">
            <div><b className="font-color">Start Time:</b> <b>{this.state.survey.start}</b></div>
            <br></br>
            <div><b className="font-color">End Time:</b><b>{this.state.survey.end}</b></div>
            <br></br>
            <div> <b className="font-color">Number of participants:</b> <b>{participants}</b></div>
            <br></br>
            <div> <b className="font-color">Participation Rate:</b> <b>{participationRate*100}%</b></div>
            <br></br>
           
        </div>

         <div className="align-center font-color"><b>Distribution Metric</b></div>
             <div className="container">
             
             <div className="row">
             <div className="col-md-12">
            
             <table className="table table-bordered">
             <tr >
                <th>Question</th>
                <th colspan={maxColSpan}>Option choices and their response count</th>
              </tr>
                
                <tbody>
                    {display}
                </tbody>
             </table>
             </div>
             </div>
             </div>
            </div>);
    }
}