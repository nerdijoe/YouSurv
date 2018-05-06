package com.poll.persistence.mapper;

import com.poll.persistence.dto.QuestionDTO;
import com.poll.persistence.dto.SurveyDTO;
import com.poll.persistence.model.Question;
import com.poll.persistence.model.Survey;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

@Mapper
public interface QuestionMapper {
    QuestionMapper MAPPER = Mappers.getMapper( QuestionMapper.class );

    @Mappings({
//            @Mapping(source = "authorEmail", target = "surveyor.email"),
//            @Mapping(source = "created", dateFormat = "yyyy.MM.dd HH:mm:ss", target = "created"),
//            @Mapping(source = "updated", dateFormat = "yyyy.MM.dd HH:mm:ss", target = "updated"),
    })
    Question toModel(QuestionDTO dto);


    @InheritInverseConfiguration
    QuestionDTO fromModel(Question model);

}
