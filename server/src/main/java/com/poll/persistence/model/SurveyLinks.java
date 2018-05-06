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
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "startTime", nullable = true)
    private Date startTime;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "endTime", nullable = true)
    private Date endTime;

    private String link;
    private String status;
    private Long surveyId;

}
