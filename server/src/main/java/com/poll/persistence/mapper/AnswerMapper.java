package com.poll.persistence.mapper;

import com.poll.persistence.dto.AnswerDTO;
import com.poll.persistence.model.Answer;
import com.poll.persistence.model.AnswerChoice;
import com.poll.util.TimeUtil;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.ArrayList;
import java.util.List;

//@Mapper
////@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
//public interface AnswerMapper {
//    AnswerMapper MAPPER = Mappers.getMapper( AnswerMapper.class );
//
////    QuestionAnswer toModel(QuestionAnswerDTO dto);
////
////    @InheritInverseConfiguration
////    QuestionAnswerDTO fromModel(QuestionAnswer model);
//
//}


public class AnswerMapper{
    public static Answer toAnswer(AnswerDTO answerDTO) {
        Answer answer = new Answer();
        answer.setSurveyeeEmail(answerDTO.getSurveyeeEmail());
        answer.setChoices(answerDTO.getChoices());
        return answer;
    }

    public static List<AnswerDTO> toAnswers(List<Answer> answers) {
        List<AnswerDTO> answerDTOs = new ArrayList<>();
        for (Answer answer : answers){
            answerDTOs.add(toAnswerDTO(answer));
        }
        return answerDTOs;
    }

    public static AnswerDTO toAnswerDTO(Answer answer) {
        AnswerDTO dto = new AnswerDTO();
        dto.setId(String.valueOf(answer.getId()));
        dto.setSurveyeeEmail(answer.getSurveyeeEmail());
        dto.setChoices(answer.getChoices());
        dto.setSubmitted(answer.isSubmitted());
        dto.setDeleted(answer.isDeleted());
        dto.setCreated(TimeUtil.getDateString(answer.getCreated()));
        dto.setUpdated(TimeUtil.getDateString(answer.getUpdated()));
        return dto;
    }

}