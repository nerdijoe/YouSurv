package com.poll.persistence.mapper;

import com.poll.persistence.dto.QuestionDTO;
import com.poll.persistence.dto.QuestionOptionDTO;
import com.poll.persistence.model.Question;
import com.poll.persistence.model.QuestionOption;
import com.poll.persistence.model.QuestionType;
import com.poll.persistence.repository.QuestionRepository;
import com.poll.util.TimeUtil;
import lombok.Getter;
import lombok.Setter;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

////@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
//@Mapper(uses = {OptionMapper.class, AnswerMapper.class} )
//public interface QuestionMapper {
//    QuestionMapper MAPPER = Mappers.getMapper( QuestionMapper.class );
//
//
////    @Named("toModel")
//    Question toQuestion(QuestionDTO dto);
//
//    @InheritInverseConfiguration
//    QuestionDTO toQuestionDTO(Question model);
//
////    @IterableMapping(qualifiedByName = "toModel")
////    List<Question> toQuestionList(List<QuestionDTO> questions);
//
////    void map(QuestionDTO questionDTO, @MappingTarget Question question);
////
////    default List<Question> map(List<QuestionDTO> source ) {
////        if ( source != null && !source.isEmpty() ) {
////            return new ArrayList<>();
////        }
////        return Collections.emptyList();
////    }
//}

@Service
@Getter
@Setter
@Configurable
class QuestionMapper{

    @Autowired
    QuestionRepository questionRepository;

    public Question toQuestion(QuestionDTO questionDTO) {
        System.out.println("QuestionMapper.toQuestion");
        System.out.println("questionDTO = " + questionDTO);

        Question question = null;
        if ((questionDTO.getId() != null) && (questionDTO.getId().matches("\\d*"))){
            question = questionRepository.findById(Long.valueOf(questionDTO.getId()));
        }

        if (question == null ){
            question = new Question();
        }

        question.setType(QuestionType.getType(questionDTO.getType()));
        question.setText(questionDTO.getText());
        question.setImage(questionDTO.getImage());
        question.setOptions(questionDTO.getOptions());

        question.setRequired(questionDTO.isRequired());

        if (questionDTO.getCreated() == null){
            question.setCreated(new Date());
        } else{
            question.setCreated(TimeUtil.getDate(questionDTO.getCreated()));
        }

        if (questionDTO.getUpdated() == null){
            question.setUpdated(new Date());
        } else{
            question.setUpdated(TimeUtil.getDate(questionDTO.getUpdated()));
        }

        question.setDeleted(questionDTO.isDeleted());

        return question;
    }

    public static List<QuestionDTO> toQuestions(List<Question> questions) {
        List<QuestionDTO> questionDTOs = new ArrayList<>();
        for (Question question: questions){
            questionDTOs.add(toQuestionDTO(question));
        }
        return questionDTOs;
    }

    private static QuestionDTO toQuestionDTO(Question question) {
        QuestionDTO dto = new QuestionDTO();
        dto.setId(String.valueOf(question.getId()));
        dto.setType(question.getType().name());
        dto.setText(question.getText());
        dto.setImage(question.getImage());
        dto.setOptions(question.getOptions());
        dto.setRequired(question.isRequired());
        dto.setCreated(TimeUtil.getDateString(question.getCreated()));
        dto.setUpdated(TimeUtil.getDateString(question.getUpdated()));
        dto.setDeleted(question.isDeleted());
        return dto;
    }
}