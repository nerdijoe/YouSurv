package com.poll.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class QuestionOption extends AbstractTimestampEntity {
    private String text;

    private String image;

}
