package com.poll.persistence.dto;

import com.poll.persistence.model.Answer;
import com.poll.persistence.model.Publish;
import com.poll.persistence.model.Question;
import com.poll.persistence.model.SurveyType;
import lombok.*;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;
import java.util.List;



@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SurveyDTO {
    private String id;
    private String surveyorEmail;
    private List<String> invitedEmailList;
    private String title;
    private String type;
    private List<QuestionDTO> questions;
    private List<AnswerDTO> answers;
//    private List<QuestionDTO> questions;
//    private List<AnswerDTO> answers;
    private Publish publish;
    private boolean deleted;
    private boolean closed;
    private String created;
    private String updated;

    private String startDate;
    private String endDate;
}
