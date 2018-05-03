package com.poll.model;

import javax.persistence.*;

@Entity
public class QuestionOption extends AbstractTimestampEntity {
    private String text;

    private String image;

    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;
}
