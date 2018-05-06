package com.poll.persistence.mapper;

import com.poll.persistence.dto.SurveyDTO;
import com.poll.persistence.model.Survey;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

@Mapper
public interface SurveyMapper {
    SurveyMapper MAPPER = Mappers.getMapper( SurveyMapper.class );

    @Mappings({
            @Mapping(source = "surveyorId", target = "surveyor.id"),
            @Mapping(source = "created", dateFormat = "yyyy.MM.dd HH:mm:ss", target = "created"),
            @Mapping(source = "updated", dateFormat = "yyyy.MM.dd HH:mm:ss", target = "updated")
    })
    Survey toModel(SurveyDTO dto );


    @InheritInverseConfiguration
    SurveyDTO fromModel(Survey model );

}
