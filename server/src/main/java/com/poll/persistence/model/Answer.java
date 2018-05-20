package com.poll.persistence.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Answer extends AbstractTimestampModel {

    private String surveyeeEmail;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "survey_id")
    private Survey survey;

//    @OneToMany(
//            fetch = FetchType.LAZY,
//            cascade = CascadeType.ALL,
//            orphanRemoval = true,
//            mappedBy = "answer"
//    )
//    @Embedded
    @ElementCollection(targetClass = AnswerChoice.class)
    @Column(columnDefinition = "LONGBLOB")
    private List<AnswerChoice> choices;

    private boolean submitted;

}
