package com.poll.persistence.model;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class QuestionOption extends AbstractTimestampModel {
    private String text;

    private String image;

    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;
}
