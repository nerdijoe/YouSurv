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

import java.util.*;

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

        HashSet<String> alreadyInvitedEmailSet=new HashSet<String>();

        for(String email: survey.getInvitedEmailList()){
            alreadyInvitedEmailSet.add(email);
        }

        String url="";
        String domain="http://localhost:";
        String port="3000";
        String route="";
        String link="";
        String token="";
        url=domain+port;


        for(String newEmail:surveyDTO.getInvitedEmailList()){
            if(!alreadyInvitedEmailSet.contains(newEmail)){
                if(surveyDTO.getType().equals(SurveyType.SV_GENERAL)){
                    route="/general/survey?token=";

                    if(surveyLinkRepository.existsBySurveyId(Long.parseLong(surveyDTO.getId()))){
                        SurveyLinks surveyLinks=surveyLinkRepository.findBySurveyId(Long.parseLong(surveyDTO.getId()));
                        token=surveyLinks.getLink();
                        link=url+route+token;
                    }else{
                        token=UUID.randomUUID().toString();
                        link=url+route+token;
                        SurveyLinks surveyLinks=new SurveyLinks();
                        surveyLinks.setStatus("active");
                        surveyLinks.setLink(token);
                        surveyLinks.setSurveyId(Long.parseLong(surveyDTO.getId()));
                        surveyLinks.setType(SurveyType.SV_GENERAL);
                        surveyLinkRepository.save(surveyLinks);
                    }
                    SimpleMailMessage generalMailSender = new SimpleMailMessage();
                    generalMailSender.setFrom("postmaster@localhost");
                    generalMailSender.setTo(newEmail);
                    generalMailSender.setSubject("Invitation to participate in General Survey");
                    generalMailSender.setText("Use below link to participate:\n" +
                            "" + link);
                    emailService.sendEmail(generalMailSender);


                }else if(surveyDTO.getType().equals(SurveyType.SV_CLOSE)){
                    route="/close/survey?token=";

                    token=UUID.randomUUID().toString();
                    link=url+route+token;
                    SurveyLinks surveyLinks=new SurveyLinks();
                    surveyLinks.setStatus("active");
                    surveyLinks.setLink(token);
                    surveyLinks.setSurveyId(Long.parseLong(surveyDTO.getId()));
                    surveyLinks.setType(SurveyType.SV_CLOSE);
                    surveyLinkRepository.save(surveyLinks);

                    SimpleMailMessage closeMailSender = new SimpleMailMessage();
                    closeMailSender.setFrom("postmaster@localhost");
                    closeMailSender.setTo(newEmail);
                    closeMailSender.setSubject("Invitation to participate in Close Survey");
                    closeMailSender.setText("Use below link to participate:\n" +
                            "" + link);
                    emailService.sendEmail(closeMailSender);

                }else if(surveyDTO.getType().equals(SurveyType.SV_OPEN)){
                    route="/openunique/register?surveyId=";
                    link=url+route+surveyDTO.getId();

                    SimpleMailMessage openUniqueMailSender = new SimpleMailMessage();
                    openUniqueMailSender.setFrom("postmaster@localhost");
                    openUniqueMailSender.setTo(newEmail);
                    openUniqueMailSender.setSubject("Invitation to register for Open Unique Survey");
                    openUniqueMailSender.setText("Use below link to participate:\n" +
                            "" + link);
                    emailService.sendEmail(openUniqueMailSender);

                }

            }

        }


        /**old code starts from here*/
//        Survey survey = surveyRepository.findById(Long.parseLong(surveyDTO.getId()));

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

        publish.setQrCodeByteArray("0192380123087187230918230581230958");



        SurveyLinks surveyLinks = new SurveyLinks();

        String url="";
        String domain="http://localhost:";
        String port="3000";
        if(survey.getType() == SurveyType.SV_GENERAL) {
            String route="/general/survey?token=";
            url=domain+port+route;
            String token=UUID.randomUUID().toString();
            String link=url+token;
            publish.setLink(link);
            for (String email: survey.getInvitedEmailList()){
                SimpleMailMessage generalSurveyLink = new SimpleMailMessage();
                generalSurveyLink.setFrom("postmaster@localhost");
                generalSurveyLink.setTo(email);
                generalSurveyLink.setSubject("Invitation to participate in General Survey");
                generalSurveyLink.setText("Use below link to participate:\n" +
                        "" + link);
                emailService.sendEmail(generalSurveyLink);
            }

            surveyLinks.setLink(token);
            surveyLinks.setStatus("active");
            surveyLinks.setSurveyId(survey.getId());
            surveyLinks.setType(SurveyType.SV_GENERAL);
            surveyLinkRepository.save(surveyLinks);

        } else if(survey.getType() == SurveyType.SV_CLOSE){
            String route="/close/survey?token=";
            url=domain+port+route;
            for (String email: survey.getInvitedEmailList()){
                String token=UUID.randomUUID().toString();
                String link=url+token;

                SimpleMailMessage closedSurveyLink = new SimpleMailMessage();
                closedSurveyLink.setFrom("postmaster@localhost");
                closedSurveyLink.setTo(email);
                closedSurveyLink.setSubject("Invitation to participate in Closed Survey");
                closedSurveyLink.setText("Use below link to participate:\n" +
                        "" + link);
                emailService.sendEmail(closedSurveyLink);
                surveyLinks.setLink(token);
                surveyLinks.setSurveyId(survey.getId());
                surveyLinks.setStatus("active");
                surveyLinks.setType(SurveyType.SV_CLOSE);
                surveyLinks.setSurveyeeEmail(email);
                surveyLinkRepository.save(surveyLinks);
            }
        }else if(survey.getType()== SurveyType.SV_OPEN){
            String route="/openunique/register?surveyId=";
            url=domain+port+route;
            String link=url+survey.getId();
            for (String email: survey.getInvitedEmailList()){
                SimpleMailMessage openUniqueSurveyLink = new SimpleMailMessage();
                openUniqueSurveyLink.setFrom("postmaster@localhost");
                openUniqueSurveyLink.setTo(email);
                openUniqueSurveyLink.setSubject("Invitation to register for Open Unique Survey");
                openUniqueSurveyLink.setText("Use below link to participate:\n" +
                        "" + link);
                emailService.sendEmail(openUniqueSurveyLink);
            }

        }
        survey.setPublish(publish);
        surveyRepository.save(survey);
        return surveyMapper.toSurveyDTO(survey);
    }

    public Answer saveAnswer(String surveyeeEmail, Survey survey, AnswerSaveDTO answerDTO) {
        Answer answer = new Answer();
        answer.setSurveyeeEmail(surveyeeEmail);
        answer.setSurvey(survey);
        answer.setChoices(answerDTO.getChoices());
        answer.setSubmitted(false);
        answerRepository.save(answer);

        return answer;
    }

    public Answer submitAnswer(long answerId, String userEmail, String token) {
        Answer answer = answerRepository.findById(answerId);
        answer.setSubmitted(true);
        if(!userEmail.isEmpty()) {
            SimpleMailMessage generalSurveyLink = new SimpleMailMessage();
            generalSurveyLink.setFrom("postmaster@localhost");
            generalSurveyLink.setTo(userEmail);
            generalSurveyLink.setSubject("Survey Submission Details");
            generalSurveyLink.setText("Survey Submitted Successfully:\n" +
                    "");
            emailService.sendEmail(generalSurveyLink);
        }

        SurveyLinks surveyLinks = surveyLinkRepository.findBySurveyIdAndSurveyeeEmail(answer.getSurvey().getId(), userEmail);
        if (surveyLinks != null){
            if((surveyLinks.getType().equals(SurveyType.SV_CLOSE))||  (surveyLinks.getType().equals(SurveyType.SV_OPEN))){
                surveyLinks.setStatus("inactive");
                surveyLinkRepository.save(surveyLinks);
            }
        }

//        if(!token.isEmpty()){
//            SurveyLinks surveyLinks = surveyLinkRepository.findByLink(token);
//
//            if((surveyLinks.getType().equals(SurveyType.SV_CLOSE))||  (surveyLinks.getType().equals(SurveyType.SV_OPEN))){
//                surveyLinks.setStatus("inactive");
//                surveyLinkRepository.save(surveyLinks);
//            }
//        }


        return answerRepository.save(answer);
    }


    public boolean validSurveyLinkToken(String token) {

        if (!surveyLinkRepository.existsByLink(token)) {
            return false;
        }

        SurveyLinks surveyLinks = surveyLinkRepository.findByLink(token);
        Survey survey = surveyRepository.findById(surveyLinks.getSurveyId());


        if (!validSurvey(survey) || survey.getPublish() == null || !surveyLinks.getStatus().equals("active")){
            System.out.println("getstatus" + surveyLinks.getStatus() + "getpublish" + survey.getPublish());
            System.out.println();
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
        if (end != null && now.after(end)) {
            return false;
        }
        return true;
    }

    public Survey findBySurveyLinkToken(String token) {
        SurveyLinks surveyLinks = surveyLinkRepository.findByLink(token);
        Survey survey = surveyRepository.findById(surveyLinks.getSurveyId());
        return survey;
    }


    public void openUniqueLinkGenerator(String email, long surveyId){
        String url="";
        String domain="http://localhost:";
        String port="3000";

        String route="/openunique/survey?token=";
        url=domain+port+route;
        String token=UUID.randomUUID().toString();
        String link=url+token;


        SurveyLinks surveyLinks = new SurveyLinks();
        surveyLinks.setLink(token);
        surveyLinks.setSurveyId(surveyId);
        surveyLinks.setStatus("active");
        surveyLinks.setType(SurveyType.SV_OPEN);
        surveyLinks.setSurveyeeEmail(email);
        surveyLinkRepository.save(surveyLinks);

        SimpleMailMessage openUniqueSurveyLink = new SimpleMailMessage();
        openUniqueSurveyLink.setFrom("postmaster@localhost");
        openUniqueSurveyLink.setTo(email);
        openUniqueSurveyLink.setSubject("Invitation to participate in Open Unique Survey");
        openUniqueSurveyLink.setText("Use below link to participate:\n" +
                "" + link);
        emailService.sendEmail(openUniqueSurveyLink);

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
