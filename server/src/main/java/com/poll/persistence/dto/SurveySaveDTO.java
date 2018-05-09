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
public class SurveySaveDTO {
    private String title;
    private List<String> invitedEmailList;
    private List<QuestionDTO> questions;
    private String expire;
}

