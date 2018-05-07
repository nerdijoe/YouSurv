package com.poll.persistence.mapper;

import com.poll.persistence.dto.SurveyDTO;
import com.poll.persistence.model.Survey;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

//@Mapper
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SurveyMapper {
    SurveyMapper MAPPER = Mappers.getMapper( SurveyMapper.class );

    @Mappings({
            @Mapping(source = "authorEmail", target = "surveyor.email"),
            @Mapping(source = "created", dateFormat = "yyyy.MM.dd HH:mm:ss", target = "created"),
            @Mapping(source = "updated", dateFormat = "yyyy.MM.dd HH:mm:ss", target = "updated"),
            @Mapping(source = "expire", dateFormat = "yyyy.MM.dd HH:mm:ss", target = "expire"),
    })
    Survey toModel(SurveyDTO dto );


    @InheritInverseConfiguration
    SurveyDTO fromModel(Survey model );

}
