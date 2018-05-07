package com.poll.persistence.mapper;

import com.poll.persistence.dto.QuestionAnswerDTO;
import com.poll.persistence.dto.QuestionOptionDTO;
import com.poll.persistence.model.QuestionAnswer;
import com.poll.persistence.model.QuestionOption;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mappings;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AnswerMapper {
    AnswerMapper MAPPER = Mappers.getMapper( AnswerMapper.class );

    QuestionAnswer toModel(QuestionAnswerDTO dto);
//    QuestionOption toModel(QuestionOptionDTO dto, @Context List<QuestionOption> dtos);


    @InheritInverseConfiguration
    QuestionAnswerDTO fromModel(QuestionAnswer model);
//    QuestionOptionDTO fromModel(QuestionOption model, @Context List<QuestionOption> models);

}
