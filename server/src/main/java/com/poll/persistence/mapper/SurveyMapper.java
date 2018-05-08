package com.poll.persistence.mapper;

import com.poll.persistence.dto.SurveyCreateDTO;
import com.poll.persistence.dto.SurveyDTO;
import com.poll.persistence.model.Survey;
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
        dto.setAuthorEmail(survey.getSurveyorEmail());
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
}