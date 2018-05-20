package com.poll.persistence.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

//@Embeddable
@Getter
@Setter
@NoArgsConstructor
@ToString
public class AnswerChoice implements Serializable {

//    @ManyToOne
//    @JoinColumn(name = "answer_id", nullable = true)
//    private Answer answer;

    private String questionId;

    @ElementCollection(targetClass=String.class)
    @Column(columnDefinition = "LONGTEXT")
    private List<String> selection;

}
