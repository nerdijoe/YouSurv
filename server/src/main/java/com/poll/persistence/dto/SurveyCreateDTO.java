package com.poll.persistence.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor @AllArgsConstructor
public class SurveyCreateDTO {

    private String surveyorId;
    private String type;

}
