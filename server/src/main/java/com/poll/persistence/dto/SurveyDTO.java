package com.poll.persistence.dto;

import com.poll.persistence.model.Answer;
import com.poll.persistence.model.Publish;
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
    private String title;
    private String type;
    private List<Question> questions;
    private List<Answer> answers;
    private Publish publish;
    private boolean deleted;
    private String created;
    private String updated;
}
