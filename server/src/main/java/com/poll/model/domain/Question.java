package com.poll.model.domain;


import com.poll.model.AbstractTimestampEntity;

import javax.persistence.*;
import java.util.List;

@Entity
public class Question extends AbstractTimestampEntity {
    private QuestionType type;

    private String text;

    private String image;

    @OneToMany(targetEntity=QuestionOption.class)
    private List<QuestionOption> options;

    @OneToOne
    private QuestionAnswer answer;

    private boolean isRequired;

}
