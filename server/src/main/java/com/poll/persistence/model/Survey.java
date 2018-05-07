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


    @ManyToOne(
            fetch = FetchType.LAZY
    )
    private AppUser surveyor;

    @ElementCollection(targetClass=String.class)
    private List<String> invitedEmailList;

    @Enumerated(EnumType.STRING)
    private SurveyType type;

    private String title;


    @OneToMany(
            fetch = FetchType.LAZY,
            mappedBy = "survey",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Question> questions;

    private boolean published;

    @Temporal(TemporalType.TIMESTAMP)
    private Date expire;

    public Survey(){
        super();
        this.invitedEmailList = new ArrayList<>();
        this.questions = new ArrayList<>();
        this.published = false;
    }

    public Survey(AppUser surveyor, SurveyType type) {
        this();
        this.surveyor = surveyor;
        this.type = type;
    }

    public void setQuestions(List<Question> questions) {
        this.questions.clear();
        if (questions != null){
            this.questions.addAll(questions);
        }
    }
}
