package com.poll.persistence.mapper;

import com.poll.persistence.dto.QuestionOptionDTO;
import com.poll.persistence.model.QuestionOption;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import javax.validation.Constraint;
import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
//@Mapper
public interface OptionMapper {
    OptionMapper MAPPER = Mappers.getMapper( OptionMapper.class );

    QuestionOption toModel(QuestionOptionDTO dto);
//    QuestionOption toModel(QuestionOptionDTO dto, @Context List<QuestionOption> dtos);


    @InheritInverseConfiguration
    QuestionOptionDTO map(QuestionOption value);
//    QuestionOptionDTO fromModel(QuestionOption model, @Context List<QuestionOption> models);

}
