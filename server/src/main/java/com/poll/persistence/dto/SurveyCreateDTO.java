package com.poll.persistence.dto;

import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SurveyCreateDTO {

    private String surveyorId;
    private String type;

}
