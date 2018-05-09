package com.poll.service;

import com.poll.persistence.dto.AnswerSaveDTO;
import com.poll.persistence.mapper.SurveyMapper;
import com.poll.persistence.dto.SurveyCreateDTO;
import com.poll.persistence.dto.SurveyDTO;
import com.poll.persistence.model.*;
//import com.poll.persistence.repository.mongo.AnswerRepository;
//import com.poll.persistence.repository.mongo.AppUserRepository;
//import com.poll.persistence.repository.mongo.SurveyRepository;
import com.poll.persistence.repository.AnswerRepository;
import com.poll.persistence.repository.AppUserRepository;
import com.poll.persistence.repository.QuestionRepository;
import com.poll.persistence.repository.SurveyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SurveyService {

    @Autowired
    private AppUserRepository appUserRepository;
    @Autowired
    private SurveyRepository surveyRepository;
    @Autowired
    private AnswerRepository answerRepository;
    @Autowired
    private QuestionRepository questionRepository;

    public SurveyDTO createSurvey(String surveyorEmail, SurveyCreateDTO surveyDTO) {
        Survey survey = SurveyMapper.toSurvey(surveyorEmail, surveyDTO);
        surveyRepository.save(survey);
        return SurveyMapper.toSurveyDTO(survey);
    }

    public Survey save(SurveyDTO surveyDTO) {
        System.out.println("surveyDTO = " + surveyDTO);
        Survey survey = surveyRepository.findById(Long.parseLong(surveyDTO.getId()));

        SurveyMapper.updateSurvey(surveyDTO, survey);

//        for (Question question: survey.getQuestions()){
//            questionRepository.save(question);
//        }
//
//        for (Answer answer: survey.getAnswers()){
//            answerRepository.save(answer);
//        }

        return surveyRepository.save(survey);
    }

    public boolean existsById(long id){
        return surveyRepository.existsById(id);
    }

    public Survey findById(long id) {
        return surveyRepository.findById(id);
    }

    public List<SurveyDTO> findBySurveyorEmail(String surveyorEmail) {
        List<SurveyDTO> dtoList = new ArrayList<>();
        List<Survey> surveys = surveyRepository.findAllBySurveyorEmail(surveyorEmail);
        for (Survey survey: surveys){
            dtoList.add(SurveyMapper.toSurveyDTO(survey));
        }
        return dtoList;
    }

    public boolean isSurveyCreatedBy(Survey survey, String surveyorEmail) {
        return survey.getSurveyorEmail().equals(surveyorEmail);
    }

    public SurveyDTO publishSurvey(Survey survey) {
        Publish publish = survey.getPublish();
        if (publish == null) publish = new Publish();
        publish.setLink("http://localhost/survey/"+survey.getId());
        publish.setQrCodeByteArray("0192380123087187230918230581230958");
        survey.setPublish(publish);
        surveyRepository.save(survey);
        return SurveyMapper.toSurveyDTO(survey);
    }

    public Answer answerSurvey(String surveyeeEmail, Survey survey, AnswerSaveDTO answerDTO) {
        Answer answer = new Answer();
        answer.setSurveyeeEmail(surveyeeEmail);
        answer.setSurvey(survey);
        answer.setChoices(answerDTO.getChoices());
        answer.setSubmitted(false);
        answerRepository.save(answer);

        return answer;
    }

    public Answer submitAnswer(long answerId) {
        Answer answer = answerRepository.findById(answerId);
        answer.setSubmitted(true);
        return answerRepository.save(answer);
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
