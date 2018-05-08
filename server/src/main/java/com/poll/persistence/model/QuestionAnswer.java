package com.poll.persistence.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

//@Entity
//@Getter
//@NoArgsConstructor
//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class QuestionAnswer extends AbstractTimestampModel {
    @ElementCollection(targetClass=String.class)
    private List<String> text;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "question_id")
    private Question question;
}
