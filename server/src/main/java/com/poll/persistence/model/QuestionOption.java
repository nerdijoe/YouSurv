package com.poll.persistence.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;

//@Embeddable
@Getter
@Setter
@NoArgsConstructor
@ToString
public class QuestionOption implements Serializable {

    private String id;
    private String text;

    private String image;
}
