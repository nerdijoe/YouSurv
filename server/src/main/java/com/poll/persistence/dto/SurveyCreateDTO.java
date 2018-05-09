package com.poll.persistence.dto;

import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SurveyCreateDTO {
    private String title;
    private String type;
}
