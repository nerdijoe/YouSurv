package com.poll.persistence.mapper;

import com.poll.persistence.dto.QuestionAnswerDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
//@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AnswerMapper {
    AnswerMapper MAPPER = Mappers.getMapper( AnswerMapper.class );

//    QuestionAnswer toModel(QuestionAnswerDTO dto);
//
//    @InheritInverseConfiguration
//    QuestionAnswerDTO fromModel(QuestionAnswer model);

}
