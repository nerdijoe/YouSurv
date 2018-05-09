package com.poll.service;

import com.poll.persistence.dto.QuestionDTO;
import com.poll.persistence.dto.SurveySaveDTO;
import com.poll.persistence.mapper.QuestionMapper;
import com.poll.persistence.mapper.SurveyMapper;
import com.poll.persistence.dto.SurveyCreateDTO;
import com.poll.persistence.dto.SurveyDTO;
import com.poll.persistence.model.*;
import com.poll.persistence.repository.*;
import com.poll.util.TimeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class SurveyService {

    @Autowired
    private AppUserRepository appUserRepository;
    @Autowired
    private SurveyRepository surveyRepository;
    @Autowired
    private AnswerRepository answerRepository;

    public SurveyDTO createSurvey(String surveyorEmail, SurveyCreateDTO surveyDTO) {
        Survey survey = SurveyMapper.toSurvey(surveyorEmail, surveyDTO);
        surveyRepository.save(survey);
        return SurveyMapper.toSurveyDTO(survey);
    }

    public Survey save(SurveyDTO surveyDTO) {
        System.out.println("surveyDTO = " + surveyDTO);
        Survey survey = surveyRepository.findById(Long.parseLong(surveyDTO.getId()));

        for (Question question: surveyDTO.getQuestions()){
            question.setId(String.valueOf(UUID.randomUUID()));
            for (QuestionOption option: question.getOptions()){
                option.setId(String.valueOf(UUID.randomUUID()));
            }
        }

        for (Answer answer: surveyDTO.getAnswers()){
            answer.setSurvey(survey);
        }



        survey.setAnswers(surveyDTO.getAnswers());

        SurveyMapper.convertToSurvey(surveyDTO, survey);
        return surveyRepository.save(survey);
    }

    public boolean existsById(long id){
        return surveyRepository.existsById(id);
    }

//    public Survey createSurvey(AppUser surveyor, String type) {
//        if (surveyor == null || type == null){
//            return null;
//        }
//        Survey survey = new Survey(surveyor, type);
//        saveSurvey(survey);
//        return survey;
//    }



//    public List<SurveyDTO> findAllBySurveyorId(Long id) {
//        List<Survey> surveys = surveyRepository.findAllBySurveyorId(id);
//        List<SurveyDTO> dtoList = new ArrayList<>();
//        for (Survey survey: surveys){
////            dtoList.add(SurveyMapper.MAPPER.toSurveyDTO(survey));
//        }
//        return dtoList;
//    }
//
//    public SurveyDTO findById(long id) {
//        Survey survey = surveyRepository.findById(id);
//        return SurveyMapper.toSurveyDTO(survey);
////        return SurveyMapper.MAPPER.toSurveyDTO(survey);
//    }
//
////    public boolean authorized(String surveyorEmail, long id) {
////        Survey survey = surveyRepository.findById(id);
////        return survey.getSurveyor().getEmail().equals(surveyorEmail);
////    }
//
//    public Survey save(long surveyId, SurveySaveDTO surveyDTO) {
//        System.out.println("==> SurveyService.save");
////        System.out.println("surveyId = " + surveyId);
////        System.out.println("surveyDTO.getQuestions() = " + surveyDTO.getQuestions());
//        Survey survey = surveyRepository.findById(surveyId);
//        survey.setTitle(surveyDTO.getTitle());
//        survey.setInvitedEmailList(surveyDTO.getInvitedEmailList());
//
//
//        List<Question> questions = new ArrayList<>();
//        List<QuestionDTO> dtoList = surveyDTO.getQuestions();
//        for (QuestionDTO dto: dtoList){
//            Question question = QuestionMapper.MAPPER.toQuestion(dto);
//            questions.add(question);
//        }
//        survey.setQuestions(questions);
//
////        survey.setQuestions(QuestionMapper.MAPPER.map(surveyDTO.getQuestions()));
//        surveyRepository.save(survey);
//        return survey;
//    }
}
