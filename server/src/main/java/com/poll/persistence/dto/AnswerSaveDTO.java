package com.poll.persistence.dto;

import com.poll.persistence.model.AnswerChoice;
import lombok.*;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AnswerSaveDTO {
    private List<AnswerChoice> choices;
}
