package com.poll.persistence.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SurveyLinkDTO {

    private Long surveyorId;
    private String type;
    private List<String> invitedEmailList;
    private String startDate;
    private String endDate;
}
