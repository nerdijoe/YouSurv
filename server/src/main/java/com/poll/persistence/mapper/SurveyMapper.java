package com.poll.persistence.mapper;

import com.poll.persistence.dto.SurveyCreateDTO;
import com.poll.persistence.dto.SurveyDTO;
import com.poll.persistence.model.Question;
import com.poll.persistence.model.Survey;
import com.poll.persistence.model.SurveyType;
import com.poll.util.TimeUtil;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

//@Mapper(uses = QuestionMapper.class)
//public interface SurveyMapper {
//    SurveyMapper MAPPER = Mappers.getMapper( SurveyMapper.class );
//
//    @Mappings({
//            @Mapping(source = "authorEmail", target = "surveyor.email"),
//            @Mapping(source = "created", dateFormat = "yyyy.MM.dd HH:mm:ss", target = "created"),
//            @Mapping(source = "updated", dateFormat = "yyyy.MM.dd HH:mm:ss", target = "updated"),
//            @Mapping(source = "expire", dateFormat = "yyyy.MM.dd HH:mm:ss", target = "expire"),
//    })
//    Survey toSurvey(SurveyDTO dto );
//
//    @InheritInverseConfiguration
//    SurveyDTO toSurveyDTO(Survey model );
//
//}

public class SurveyMapper{

    public static SurveyDTO toSurveyDTO(Survey survey) {
        SurveyDTO dto = new SurveyDTO();
        dto.setId(String.valueOf(survey.getId()));
        dto.setSurveyorEmail(survey.getSurveyorEmail());
        dto.setInvitedEmailList(survey.getInvitedEmailList());
        dto.setTitle(survey.getTitle());
        dto.setType(survey.getType().name());
        dto.setQuestions(survey.getQuestions());
        dto.setAnswers(survey.getAnswers());
        dto.setPublish(survey.getPublish());
        dto.setDeleted(survey.isDeleted());
        dto.setCreated(TimeUtil.getDateString(survey.getCreated()));
        dto.setUpdated(TimeUtil.getDateString(survey.getUpdated()));
        return dto;
    }


    public static Survey toSurvey(String surveyorEmail, SurveyCreateDTO surveyDTO) {
        Survey survey = new Survey(surveyorEmail, surveyDTO.getTitle(), surveyDTO.getType());
        return survey;
    }


    public static void convertToSurvey(SurveyDTO dto, Survey survey) {
        survey.setId(Long.valueOf(dto.getId()));
        survey.setInvitedEmailList(dto.getInvitedEmailList());
        survey.setTitle(dto.getTitle());
        survey.setType(SurveyType.getType(dto.getType()));
        survey.setQuestions(dto.getQuestions());
        survey.setAnswers(dto.getAnswers());
        survey.setPublish(dto.getPublish());
        survey.setDeleted(dto.isDeleted());
        survey.setCreated(TimeUtil.getDate(dto.getCreated()));
        survey.setUpdated(TimeUtil.getDate(dto.getUpdated()));
    }
}