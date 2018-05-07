package com.poll.persistence.mapper;

import com.poll.persistence.dto.QuestionAnswerDTO;
import com.poll.persistence.dto.QuestionDTO;
import com.poll.persistence.dto.SurveyDTO;
import com.poll.persistence.model.Question;
import com.poll.persistence.model.QuestionAnswer;
import com.poll.persistence.model.Survey;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import javax.swing.text.html.Option;
import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface QuestionMapper {
    QuestionMapper MAPPER = Mappers.getMapper( QuestionMapper.class );

    Question toModel(QuestionDTO dto);

    @InheritInverseConfiguration
    QuestionDTO fromModel(Question model);

}
