package com.poll.persistence.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@ToString
public class Question{
    private String id;

    @Enumerated(EnumType.STRING)
    private QuestionType type;

    private String text;

    private String image;

//    @JsonIgnore
//    @ManyToOne
//    @JoinColumn(name = "survey_id")
//    private Survey survey;

//    @OneToMany(
//            fetch = FetchType.LAZY,
//            cascade = CascadeType.ALL,
//            orphanRemoval = true,
//            mappedBy = "question"
//    )
    @Embedded
    private List<QuestionOption> options;

//    @OneToOne(
//            fetch = FetchType.LAZY,
//            cascade = CascadeType.ALL,
//            orphanRemoval = true,
//            mappedBy = "question"
//    )
//    private QuestionAnswer answer;

    private boolean required;

}
