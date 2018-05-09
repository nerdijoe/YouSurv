package com.poll.persistence.mapper;

import com.poll.persistence.dto.QuestionOptionDTO;
import com.poll.persistence.model.QuestionOption;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import javax.validation.Constraint;
import java.util.List;

//@Mapper
////@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
//public interface OptionMapper {
//    OptionMapper MAPPER = Mappers.getMapper( OptionMapper.class );
//
//    QuestionOption toModel(QuestionOptionDTO dto);
//
//    @InheritInverseConfiguration
//    QuestionOptionDTO toDTO(QuestionOption value);
//
//}


public class OptionMapper{

    public static QuestionOption toOption(QuestionOptionDTO optionDTO) {
        QuestionOption option = new QuestionOption();
        option.setId(optionDTO.getId());
        option.setText(optionDTO.getText());
        option.setImage(optionDTO.getImage());
        return option;
    }
}