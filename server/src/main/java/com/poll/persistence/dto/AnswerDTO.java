package com.poll.persistence.dto;

import com.poll.persistence.model.AnswerChoice;
import com.poll.persistence.model.Publish;
import lombok.*;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AnswerDTO {
    private String id;
    private String surveyeeEmail;
    private List<AnswerChoice> choices;
    private boolean submitted;
    private boolean deleted;
    private String created;
    private String updated;
}
