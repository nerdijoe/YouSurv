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

public class SurveyMapper {

    public static SurveyDTO toSurveyDTO(Survey survey) {
        SurveyDTO dto = new SurveyDTO();
        dto.setId(String.valueOf(survey.getId()));
        dto.setSurveyorEmail(survey.getSurveyorEmail());
        dto.setInvitedEmailList(survey.getInvitedEmailList());
        dto.setTitle(survey.getTitle());
        dto.setType(dto.getType());
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


        if (dto.getInvitedEmailList() != null)
            survey.setInvitedEmailList(dto.getInvitedEmailList());
        if (dto.getTitle() != null)
            survey.setTitle(dto.getTitle());

        if (dto.getType() != null)
            survey.setType(SurveyType.getType(dto.getType()));

        if (dto.getQuestions() != null)
            survey.setQuestions(dto.getQuestions());

        if (dto.getAnswers() != null)
            survey.setAnswers(dto.getAnswers());

        if (dto.getPublish() != null)
            survey.setPublish(dto.getPublish());

        survey.setDeleted(dto.isDeleted());

        if (dto.getQuestions() != null)
            survey.setCreated(TimeUtil.getDate(dto.getCreated()));

        if (dto.getQuestions() != null)
            survey.setUpdated(TimeUtil.getDate(dto.getUpdated()));
    }
}