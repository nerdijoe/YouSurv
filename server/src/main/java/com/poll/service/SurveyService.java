package com.poll.service;

import com.poll.persistence.dto.AnswerSaveDTO;
import com.poll.persistence.emailer.EmailService;
import com.poll.persistence.mapper.SurveyMapper;
import com.poll.persistence.dto.SurveyCreateDTO;
import com.poll.persistence.dto.SurveyDTO;
import com.poll.persistence.model.*;
//import com.poll.persistence.repository.mongo.AnswerRepository;
//import com.poll.persistence.repository.mongo.AppUserRepository;
//import com.poll.persistence.repository.mongo.SurveyRepository;
import com.poll.persistence.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
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
    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private SurveyLinkRepository surveyLinkRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private SurveyMapper surveyMapper;

    public SurveyDTO createSurvey(String surveyorEmail, SurveyCreateDTO surveyDTO) {
        Survey survey = surveyMapper.toSurvey(surveyorEmail, surveyDTO);
        surveyRepository.save(survey);
        return surveyMapper.toSurveyDTO(survey);
    }

    public Survey save(SurveyDTO surveyDTO) {
        System.out.println("surveyDTO = " + surveyDTO);
        Survey survey = surveyRepository.findById(Long.parseLong(surveyDTO.getId()));

        surveyMapper.updateSurvey(surveyDTO, survey);

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
            dtoList.add(surveyMapper.toSurveyDTO(survey));
        }
        return dtoList;
    }

    public List<SurveyDTO> findBySurveyeeEmail(String userEmail) {
        List<Survey> invitedSurveys = new ArrayList<>();
        List<Survey> allSurveys = surveyRepository.findAll();

        for (Survey survey: allSurveys){
            if (survey.getInvitedEmailList().contains(userEmail)){
                invitedSurveys.add(survey);
            }
        }
//        List<Survey> invitedSurveys = surveyRepository.findAllByInvitedEmailListContains(userEmail);
        return surveyMapper.toSurveyDTOList(invitedSurveys);
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

        SurveyLinks surveyLinks = new SurveyLinks();

        String url="";
        String domain="http://localhost:";
        String port="3000";
        if(survey.getType() == SurveyType.SV_GENERAL) {
            String route="/general/survey?token=";
            url=domain+port+route;
            String token=UUID.randomUUID().toString();
            String link=url+token;
            for (String email: survey.getInvitedEmailList()){
                SimpleMailMessage generalSurveyLink = new SimpleMailMessage();
                generalSurveyLink.setFrom("postmaster@localhost");
                generalSurveyLink.setTo(email);
                generalSurveyLink.setSubject("Invitation to participate in Survey");
                generalSurveyLink.setText("Use below link to participate:\n" +
                        "" + link);
                emailService.sendEmail(generalSurveyLink);
            }
            surveyLinks.setLink(token);
            surveyLinks.setSurveyId(survey.getId());
            surveyLinkRepository.save(surveyLinks);

        } else if(survey.getType() == SurveyType.SV_CLOSE){
            String route="/close/survey?token=";
            url=domain+port+route;
            for (String email: survey.getInvitedEmailList()){
                String token=UUID.randomUUID().toString();
                String link=url+token;

                SimpleMailMessage generalSurveyLink = new SimpleMailMessage();
                generalSurveyLink.setFrom("postmaster@localhost");
                generalSurveyLink.setTo(email);
                generalSurveyLink.setSubject("Invitation to participate in Survey");
                generalSurveyLink.setText("Use below link to participate:\n" +
                        "" + link);
                emailService.sendEmail(generalSurveyLink);
                surveyLinks.setLink(token);
                surveyLinks.setSurveyId(survey.getId());
                surveyLinkRepository.save(surveyLinks);
            }
        }
        return surveyMapper.toSurveyDTO(survey);
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


    public boolean validSurveyLinkToken(String token) {

        if (!surveyLinkRepository.existsByLink(token)) {
            return false;
        }

        SurveyLinks surveyLinks = surveyLinkRepository.findByLink(token);
        Survey survey = surveyRepository.findById(surveyLinks.getSurveyId());

        if (!validSurvey(survey) || survey.getPublish() == null){
            return false;
        }

        return true;
    }

    private boolean validSurvey(Survey survey) {
        Date now = new Date();
        Date start = survey.getPublish().getStart();
        Date end = survey.getPublish().getEnd();
        if (start != null && now.before(start)){
            return false;
        }
        if (end != null && now.after(end)){
            return false;
        }
        return true;
    }

    public Survey findBySurveyLinkToken(String token) {
        SurveyLinks surveyLinks = surveyLinkRepository.findByLink(token);
        Survey survey = surveyRepository.findById(surveyLinks.getSurveyId());
        return survey;
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
