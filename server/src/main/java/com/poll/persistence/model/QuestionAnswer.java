package com.poll.persistence.model;

import javax.persistence.*;

@Entity
public class QuestionAnswer extends AbstractTimestampModel {
    private String text;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id")
    private Question question;
}
