package com.poll.persistence.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@ToString
public class QuestionOption{

    private String text;

    private String image;
}
