package com.poll.service;

import com.poll.exception.CustomException;
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
import com.poll.util.ConfigUtil;
import com.poll.util.TimeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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



        if(null!=surveyDTO.getPublish()){
                HashSet<String> alreadyInvitedEmailSet=new HashSet<String>();

                if(!survey.getInvitedEmailList().isEmpty() && survey.getInvitedEmailList().get(0).equals("")){
                    survey.getInvitedEmailList().remove(0);
                }
                for(String email: survey.getInvitedEmailList()){
                    alreadyInvitedEmailSet.add(email);
                }



                String url="";
                String domain=ConfigUtil.DOMAIN;
                String port=ConfigUtil.PORT;
                String route="";
                String link="";
                String token="";
                url=domain+port;
                if(!surveyDTO.getInvitedEmailList().isEmpty() && surveyDTO.getInvitedEmailList().get(0).equals("")){
                    surveyDTO.getInvitedEmailList().remove(0);
                }



                for(String newEmail:surveyDTO.getInvitedEmailList()) {
                    if (!alreadyInvitedEmailSet.contains(newEmail)) {
                        if (survey.getType() == (SurveyType.SV_GENERAL)) {
                            route = "/general/survey?token=";

                            if (surveyLinkRepository.existsBySurveyId(Long.parseLong(surveyDTO.getId()))) {
                                List<SurveyLinks> surveyLinksList=surveyLinkRepository.findBySurveyId(Long.parseLong(surveyDTO.getId()));
                                token=surveyLinksList.get(0).getLink();
                                link = url + route + token;
                            } else {
                                token = UUID.randomUUID().toString();
                                link = url + route + token;
                                SurveyLinks surveyLinks = new SurveyLinks();
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


                        } else if (survey.getType() == (SurveyType.SV_CLOSE)) {
                            route = "/close/survey?token=";

                            token = UUID.randomUUID().toString();
                            link = url + route + token;
                            SurveyLinks surveyLinks = new SurveyLinks();
                            surveyLinks.setStatus("active");
                            surveyLinks.setSurveyeeEmail(newEmail);
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

                        } else if (survey.getType() == (SurveyType.SV_OPEN)) {
                            route = "/openunique/register?surveyId=";
                            link = url + route + surveyDTO.getId();

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

    public List<SurveyDTO> findAllOpenUniqueSurveys(){
        List<SurveyDTO> dtoList = new ArrayList<>();
        List<Survey> surveys = surveyRepository.findAllByType(SurveyType.SV_OPEN);
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
            } else{
                List<Answer> answers = survey.getAnswers();
                for (Answer answer : answers){
                    if (answer.getSurveyeeEmail().equals(userEmail)){
                        invitedSurveys.add(survey);
                        break;
                    }
                }
            }
        }
//        List<Survey> invitedSurveys = surveyRepository.findAllByInvitedEmailListContains(userEmail);
        return surveyMapper.toSurveyDTOList(invitedSurveys);
    }

    public boolean isSurveyCreatedBy(Survey survey, String surveyorEmail) {
        return survey.getSurveyorEmail().equals(surveyorEmail);
    }

    public SurveyDTO closeSurvey(Survey survey){
        survey.setClosed(true);
        surveyLinkRepository.deleteAll(surveyLinkRepository.findBySurveyId(survey.getId()));
        surveyRepository.save(survey);
        return surveyMapper.toSurveyDTO(survey);
    }

    public SurveyDTO unpublishSurvey(Survey survey){
        survey.setPublish(null);


        List<SurveyLinks> surveyLinksList = surveyLinkRepository.findBySurveyId(survey.getId());
        for (SurveyLinks surveyLinks: surveyLinksList){
            surveyLinks.setStatus("inactive");
            surveyLinkRepository.save(surveyLinks);
        }

        surveyRepository.save(survey);

        return surveyMapper.toSurveyDTO(survey);
    }

    public SurveyDTO publishSurvey(Survey survey) {
        Publish publish = survey.getPublish();
        if (publish == null) publish = new Publish();

//        publish.setQrCodeByteArray("0192380123087187230918230581230958");



        SurveyLinks surveyLinks;

        String url="";
        String domain=ConfigUtil.DOMAIN;
        String port=ConfigUtil.PORT;

        if(!survey.getInvitedEmailList().isEmpty() && survey.getInvitedEmailList().get(0).equals("")) {
            survey.getInvitedEmailList().remove(0);
        }
        if(survey.getType() == SurveyType.SV_GENERAL) {


            String route="/general/survey?token=";
            url=domain+port+route;
            if(surveyLinkRepository.existsBySurveyId(survey.getId())){
                surveyLinks=surveyLinkRepository.findBySurveyId(survey.getId()).get(0);
                surveyLinks.setStatus("active");
                surveyLinkRepository.save(surveyLinks);
            }else{
                surveyLinks=new SurveyLinks();
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

            }





        } else if(survey.getType() == SurveyType.SV_CLOSE){
            String route="/close/survey?token=";
            url=domain+port+route;
            publish.setLink("");
            for (String email: survey.getInvitedEmailList()){


                if(surveyLinkRepository.existsBySurveyIdAndSurveyeeEmail(survey.getId(),email)){
                    surveyLinks=surveyLinkRepository.findBySurveyIdAndSurveyeeEmail(survey.getId(),email);
                    surveyLinks.setStatus("active");
                    surveyLinkRepository.save(surveyLinks);
                }else {
                    surveyLinks=new SurveyLinks();
                    String token = UUID.randomUUID().toString();
                    String link = url + token;

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
            }
        }else if(survey.getType()== SurveyType.SV_OPEN){
            String route="/openunique/register?surveyId=";
            url=domain+port+route;
            String link=url+survey.getId();
            publish.setLink(link);

            for (String email: survey.getInvitedEmailList()){

                if(surveyLinkRepository.existsBySurveyIdAndSurveyeeEmail(survey.getId(),email)){
                    surveyLinks=surveyLinkRepository.findBySurveyIdAndSurveyeeEmail(survey.getId(),email);
                    surveyLinks.setStatus("active");
                    surveyLinkRepository.save(surveyLinks);
                }else {
                    SimpleMailMessage openUniqueSurveyLink = new SimpleMailMessage();
                    openUniqueSurveyLink.setFrom("postmaster@localhost");
                    openUniqueSurveyLink.setTo(email);
                    openUniqueSurveyLink.setSubject("Invitation to register for Open Unique Survey");
                    openUniqueSurveyLink.setText("Use below link to participate:\n" +
                            "" + link);
                    emailService.sendEmail(openUniqueSurveyLink);
                }
            }

        }
        survey.setPublish(publish);
        surveyRepository.save(survey);
        return surveyMapper.toSurveyDTO(survey);
    }

    public Answer saveAnswer(String surveyeeEmail, Survey survey, AnswerSaveDTO answerDTO) {
        Answer answer;
        if (answerDTO.getId() == null){
            answer = new Answer();
        } else{
            answer = answerRepository.findById(answerDTO.getId());
        }
        answer.setSurveyeeEmail(surveyeeEmail);
        answer.setSurvey(survey);
        answer.setChoices(answerDTO.getChoices());
        answer.setSubmitted(false);
        answerRepository.save(answer);

        return answer;
    }

    public Answer submitAnswer(long answerId, String userEmail, String token, boolean isSignedIn) {
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

        if (isSignedIn){
            SurveyLinks surveyLinks = surveyLinkRepository.findBySurveyIdAndSurveyeeEmail(answer.getSurvey().getId(), userEmail);
            if (surveyLinks != null){
                if((surveyLinks.getType().equals(SurveyType.SV_CLOSE))||  (surveyLinks.getType().equals(SurveyType.SV_OPEN))){
                    surveyLinks.setStatus("inactive");
                    surveyLinkRepository.save(surveyLinks);
                }
            }
        } else{
            SurveyLinks surveyLinks = surveyLinkRepository.findByLink(token);
            if (surveyLinks != null){
                if((surveyLinks.getType().equals(SurveyType.SV_CLOSE))||  (surveyLinks.getType().equals(SurveyType.SV_OPEN))){
                    surveyLinks.setStatus("inactive");
                    surveyLinkRepository.save(surveyLinks);
                }
            }
        }

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
        if (survey.isClosed()){
            return false;
        }
//        Date now = new Date();

        Date now = TimeUtil.dateToUTC(new Date());

        Date start = survey.getStartDate();
        Date end = survey.getEndDate();
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
        SurveyLinks surveyLinks;
        if (surveyLinkRepository.existsBySurveyIdAndSurveyeeEmail(surveyId, email)){
            surveyLinks = surveyLinkRepository.findBySurveyIdAndSurveyeeEmail(surveyId, email);
            if (!surveyLinks.getStatus().equals("active")){
                throw new CustomException("You have already submitted the survey.", HttpStatus.BAD_REQUEST);
            }
        }  else {
            surveyLinks = new SurveyLinks();
            String token=UUID.randomUUID().toString();
            surveyLinks.setLink(token);
            surveyLinks.setSurveyId(surveyId);
            surveyLinks.setStatus("active");
            surveyLinks.setType(SurveyType.SV_OPEN);
            surveyLinks.setSurveyeeEmail(email);
            surveyLinkRepository.save(surveyLinks);
        }

        String url="";
        String domain= ConfigUtil.DOMAIN;
        String port=ConfigUtil.PORT;

        String route="/openunique/survey?token=";
        url=domain+port+route;

        String link=url+surveyLinks.getLink();

        SimpleMailMessage openUniqueSurveyLink = new SimpleMailMessage();
        openUniqueSurveyLink.setFrom("postmaster@localhost");
        openUniqueSurveyLink.setTo(email);
        openUniqueSurveyLink.setSubject("Invitation to participate in Open Unique Survey");
        openUniqueSurveyLink.setText("Use below link to participate:\n" +
                "" + link);
        emailService.sendEmail(openUniqueSurveyLink);

    }

    public void openUniqueSurveyeeEmailAppender(String email, long surveyId){
        Survey survey=surveyRepository.findById(surveyId);
        HashSet<String> alreadyInvitedEmailSet=new HashSet<String>();
        for(String emailToPush:survey.getInvitedEmailList()){
            alreadyInvitedEmailSet.add(emailToPush);
        }

        List<String> oldListOfInvitedEmails=survey.getInvitedEmailList();
        if(email!="" && !alreadyInvitedEmailSet.contains(email)){
            oldListOfInvitedEmails.add(email);
        }
        survey.setInvitedEmailList(oldListOfInvitedEmails);
        surveyRepository.save(survey);
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
