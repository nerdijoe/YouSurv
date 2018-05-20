package com.poll.persistence.dto;

import com.poll.persistence.model.AnswerChoice;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SaveSubmitAnswerDTO {
    private String token;
    private String email;
    private List<AnswerChoice> choices;
}
