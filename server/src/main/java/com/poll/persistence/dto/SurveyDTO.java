package com.poll.persistence.dto;

import com.poll.persistence.model.Question;
import com.poll.persistence.model.SurveyType;
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
public class SurveyDTO {
    private String surveyorId;

    private List<String> invitedEmailList;

    private String type;

//    private List<QuestionDTO> questions;

    private boolean isPublished;
    private boolean isDeleted;

    private String created;
    private String updated;


}
