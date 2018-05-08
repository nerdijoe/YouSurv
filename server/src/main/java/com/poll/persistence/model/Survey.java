package com.poll.persistence.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
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
    private List<Question> questions;

    @OneToMany(
            fetch = FetchType.LAZY,
            mappedBy = "survey",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Answer> answers;

    @Embedded
    private Publish publish;

    public Survey(){
        super();
        this.invitedEmailList = new ArrayList<>();
        this.questions = new ArrayList<>();
        this.answers = new ArrayList<>();
    }

    public Survey(String surveyorEmail, String title, String type) {
        this();
        this.surveyorEmail = surveyorEmail;
        this.title = title;
        this.type = SurveyType.getType(type);
    }

    public void setQuestions(List<Question> questions) {
        this.questions.clear();
        if (questions != null){
            this.questions.addAll(questions);
        }
    }

    public void setAnswers(List<Answer> answers) {
        this.answers.clear();
        if (answers != null){
            this.answers.addAll(answers);
        }
    }
}
