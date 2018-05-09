package com.poll.persistence.mapper;

import com.poll.persistence.dto.QuestionDTO;
import com.poll.persistence.model.Question;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

//@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
@Mapper(uses = {OptionMapper.class, AnswerMapper.class} )
public interface QuestionMapper {
    QuestionMapper MAPPER = Mappers.getMapper( QuestionMapper.class );


//    @Named("toModel")
    Question toQuestion(QuestionDTO dto);

    @InheritInverseConfiguration
    QuestionDTO toQuestionDTO(Question model);

//    @IterableMapping(qualifiedByName = "toModel")
//    List<Question> toQuestionList(List<QuestionDTO> questions);

//    void map(QuestionDTO questionDTO, @MappingTarget Question question);
//
//    default List<Question> map(List<QuestionDTO> source ) {
//        if ( source != null && !source.isEmpty() ) {
//            return new ArrayList<>();
//        }
//        return Collections.emptyList();
//    }
}
