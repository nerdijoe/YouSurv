package com.poll.model;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.List;

@Entity
public class Question extends AbstractTimestampEntity {
    private QuestionType type;

    private String text;

    private String image;

    private List<QuestionOption> options;

    private QuestionAnswer answer;

    private boolean isRequired;

}
