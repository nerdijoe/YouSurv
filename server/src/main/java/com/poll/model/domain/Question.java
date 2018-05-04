package com.poll.model.domain;


import com.poll.model.AbstractTimestampEntity;

import javax.persistence.*;
import java.util.List;

@Entity
public class Question extends AbstractTimestampEntity {
    private QuestionType type;

    private String text;

    private String image;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "survey_id")
    private Survey survey;

    @OneToMany(fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            mappedBy = "question")
    private List<QuestionOption> options;

    @OneToOne(fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            mappedBy = "question")
    private QuestionAnswer questionAnswer;

    private boolean isRequired;

}
