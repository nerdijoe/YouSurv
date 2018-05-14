package com.poll.persistence.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Survey extends AbstractTimestampModel {

    private String surveyorEmail;

    @ElementCollection(targetClass=String.class)
    private List<String> invitedEmailList;

    private String title;

    @Enumerated(EnumType.STRING)
    private SurveyType type;

    @OneToMany(
            fetch = FetchType.LAZY,
            mappedBy = "survey",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
//    @Embedded
//    @Size(max = 10000)
    @ElementCollection(targetClass = Question.class)
    private List<Question> questions;

    @OneToMany(
            fetch = FetchType.LAZY,
            mappedBy = "survey",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
//    @Embedded
    @ElementCollection(targetClass = Answer.class)
    private List<Answer> answers;

    @Embedded
    private Publish publish;

    private boolean closed;

    @Temporal(TemporalType.TIMESTAMP)
    private Date startDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date endDate;

    public Survey(){
        super();
        this.invitedEmailList = new ArrayList<>();
        this.questions = new ArrayList<>();
        this.answers = new ArrayList<>();
        this.closed = false;
    }

    public Survey(String surveyorEmail, String title, String type) {
        this();
        this.surveyorEmail = surveyorEmail;
        this.title = title;
        this.type = SurveyType.getType(type);
    }

    public void setQuestions(List<Question> questions) {
        if (this.questions != null){
            this.questions.clear();
        } else{
            this.questions = new ArrayList<>();
        }
        this.questions.addAll(questions);
    }

    public void setAnswers(List<Answer> answers) {
        if (this.answers != null){
            this.answers.clear();
        } else{
            this.answers = new ArrayList<>();
        }
        this.answers.addAll(answers);
    }

    public List<Answer> getAnswers(){
        if (answers == null){
            answers = new ArrayList<>();
        }
        return answers;
    }

    public List<Question> getQuestions() {
        if (questions == null)
            questions = new ArrayList<>();
        return questions;
    }
}
