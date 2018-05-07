package com.poll.persistence.dto;

import com.poll.persistence.model.Question;
import com.poll.persistence.model.SurveyType;
import lombok.*;

import java.util.Date;
import java.util.List;



@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SurveyDTO {
    private String id;
    private String authorEmail;

    private List<String> invitedEmailList;

    private String type;

    private String title;

    private List<QuestionDTO> questions;

    private boolean published;

    private String expire;

    private boolean deleted;
    private String created;
    private String updated;
}
