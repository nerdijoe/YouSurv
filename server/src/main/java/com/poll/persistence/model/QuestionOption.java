package com.poll.persistence.model;

import javax.persistence.*;

@Entity
public class QuestionOption extends AbstractTimestampModel {
    private String text;

    private String image;

    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;
}
