package com.poll.persistence.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

//@Embeddable
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
//@ToString
public class Question extends AbstractTimestampModel implements Serializable  {

//    private String id;

    @Enumerated(EnumType.STRING)
    private QuestionType type;

    private String text;

    @Column(columnDefinition = "LONGTEXT")
    private String image;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "survey_id")
    private Survey survey;

//    @OneToMany(
//            fetch = FetchType.LAZY,
//            cascade = CascadeType.ALL,
//            orphanRemoval = true,
//            mappedBy = "question"
//    )
//    @Embedded
    @ElementCollection(targetClass = QuestionOption.class)
    private List<QuestionOption> options;

//    @OneToOne(
//            fetch = FetchType.LAZY,
//            cascade = CascadeType.ALL,
//            orphanRemoval = true,
//            mappedBy = "question"
//    )
//    private QuestionAnswer answer;

    private boolean required;

    @Override
    public String toString() {
        return "Question{" +
                "type=" + type +
                ", text='" + text + '\'' +
                ", image='" + image + '\'' +
                ", options=" + options +
                ", required=" + required +
                '}';
    }
}
