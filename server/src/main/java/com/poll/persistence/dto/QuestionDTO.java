package com.poll.persistence.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuestionDTO {
    private String id;
    private String type;
    private String text;
    private String image;
    private List<QuestionOptionDTO> options;
    private QuestionAnswerDTO answer;
    private boolean required;
}
