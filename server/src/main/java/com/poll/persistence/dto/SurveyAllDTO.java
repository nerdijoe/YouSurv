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
public class SurveyAllDTO {
    private List<SurveyDTO> surveysAsSurveyor;
    private List<SurveyDTO> surveysAsSurveyee;

}
