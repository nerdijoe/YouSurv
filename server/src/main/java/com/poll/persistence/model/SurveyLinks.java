package com.poll.persistence.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class SurveyLinks {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String link;
    private String status;
    @Enumerated(EnumType.STRING)
    private SurveyType type;
    private long surveyId;
    private String surveyeeEmail;

}
