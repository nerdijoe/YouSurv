package com.poll.controller;


import com.poll.persistence.dto.*;
import com.poll.persistence.mapper.AnswerMapper;
import com.poll.persistence.mapper.SurveyMapper;
import com.poll.persistence.model.Answer;
import com.poll.persistence.model.AppUser;
import com.poll.persistence.model.Survey;
import com.poll.service.SurveyService;
import com.poll.service.UserService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import org.json.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;


@RestController
@RequestMapping(path = "")
public class SurveyRestController {

    private Logger log = Logger.getLogger(this.getClass().getName());

    @Autowired
    SurveyService surveyService;  //Service which will do all data retrieval/manipulation work

    @Autowired
    UserService userService;

    @Autowired
    SurveyMapper surveyMapper;

    @RequestMapping(value = "/survey/", method = RequestMethod.POST)
    public @ResponseBody
    ResponseEntity createSurvey(@RequestBody SurveyCreateDTO surveyDTO, Authentication auth) {
        String surveyorEmail = auth.getName();
        System.out.println("==> POST /survey/, surveyor Email = " + surveyorEmail);

        if (!userService.existsByEmail(surveyorEmail)) {
            String message = "surveyor with email: " + surveyorEmail + "does not exists";
            System.out.println(message);
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("message", message);
            return new ResponseEntity(responseBody, HttpStatus.BAD_REQUEST);
        }

        SurveyDTO survey = surveyService.createSurvey(surveyorEmail, surveyDTO);

        if (survey == null) {
            String message = "fail to create survey";
            System.out.println(message);
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("message", message);
            return new ResponseEntity(responseBody, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity(survey, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/survey/", method = RequestMethod.GET)
    public @ResponseBody
    ResponseEntity findAllSurveyBySurveyor(Authentication auth) {
        String userEmail = auth.getName();
        List<SurveyDTO> surveysAsSurveyor = surveyService.findBySurveyorEmail(userEmail);

        List<SurveyDTO> surveysAsSurveyee = surveyService.findBySurveyeeEmail(userEmail);

        SurveyAllDTO surveys = new SurveyAllDTO();
        surveys.setSurveysAsSurveyee(surveysAsSurveyee);
        surveys.setSurveysAsSurveyor(surveysAsSurveyor);

        return new ResponseEntity(surveys, HttpStatus.OK);
    }

    @RequestMapping(value = "/survey/{id}", method = RequestMethod.PUT, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity saveSurvey(@PathVariable("id") long id, @RequestBody SurveyDTO surveyDTO) {

        if (!surveyService.existsById(id)) {
            String message = "survey with id: " + id + " does not exists";
            System.out.println(message);
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("message", message);
            return new ResponseEntity(responseBody, HttpStatus.BAD_REQUEST);
        }

        Survey survey = surveyService.save(surveyDTO);

        if (survey == null) {
            System.out.println("Survey with id: " + id + " can't be saved");
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity(surveyMapper.toSurveyDTO(survey), HttpStatus.OK);

    }


    @RequestMapping(value = "/survey/{id}", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity getSurveyById(@PathVariable("id") long id) {
        System.out.println("Fetching survey with id " + id);

        if (!surveyService.existsById(id)) {
            String message = "Survey with id: " + id + " doesn't exist";
            System.out.println(message);
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("message", message);
            return new ResponseEntity(responseBody, HttpStatus.BAD_REQUEST);
        }

        Survey survey = surveyService.findById(id);
        return new ResponseEntity(surveyMapper.toSurveyDTO(survey), HttpStatus.OK);
    }

    @RequestMapping(value = "/survey/{id}/publish", method = RequestMethod.POST, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity publishSurvey(@PathVariable("id") long id, Authentication auth) {

        if (!surveyService.existsById(id)) {
            String message = "Survey with id: " + id + " doesn't exist";
            System.out.println(message);
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("message", message);
            return new ResponseEntity(responseBody, HttpStatus.BAD_REQUEST);
        }

        String surveyorEmail = auth.getName();
        Survey survey = surveyService.findById(id);

        if (!surveyService.isSurveyCreatedBy(survey, surveyorEmail)) {
            String message = "User with email: " + surveyorEmail + " have no authorization to publish survey with id: " + id;
            System.out.println(message);
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("message", message);
            return new ResponseEntity(responseBody, HttpStatus.FORBIDDEN);
        }
        SurveyDTO surveyDTO = surveyService.publishSurvey(survey);
        return new ResponseEntity(surveyDTO, HttpStatus.OK);
    }

    @RequestMapping(value = "/survey/{id}/answer", method = RequestMethod.POST, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity saveSurveyAnswer(@PathVariable("id") long id, @RequestBody AnswerSaveDTO answerDTO, Authentication auth) {

        if (!surveyService.existsById(id)) {
            String message = "Survey with id: " + id + " doesn't exist";
            System.out.println(message);
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("message", message);
            return new ResponseEntity(responseBody, HttpStatus.BAD_REQUEST);
        }

        String surveyeeEmail = auth.getName();
        Survey survey = surveyService.findById(id);

        Answer answer = surveyService.answerSurvey(surveyeeEmail, survey, answerDTO);

        return new ResponseEntity(answer, HttpStatus.OK);
    }

    @RequestMapping(value = "/survey/{surveyId}/answer/{answerId}", method = RequestMethod.POST, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity submitSurveyAnswer(@RequestBody String token ,@PathVariable("surveyId") long surveyId, @PathVariable("answerId") long answerId, Authentication auth) {
        String userEmail = auth.getName() ;
        if(!token.equals("{}")) {

            JSONObject obj = new JSONObject(token);
            token = obj.getString("token");
        } else {
            token = "";
        }

        Answer answer = surveyService.submitAnswer(answerId, userEmail, token);
        return new ResponseEntity(AnswerMapper.toAnswerDTO(answer), HttpStatus.OK);
    }

    @RequestMapping(value = "/survey/{surveyId}/savesubmitanswer", method = RequestMethod.POST, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity savesubmitSurveyAnswer(@RequestBody String body ,@PathVariable("surveyId") long surveyId, @PathVariable("answerId") long answerId) {
//        String userEmail = auth.getName() ;
        if (!surveyService.existsById(surveyId)) {
            String message = "Survey with id: " + surveyId + " doesn't exist";
            System.out.println(message);
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("message", message);
            return new ResponseEntity(responseBody, HttpStatus.BAD_REQUEST);
        }

        Survey survey = surveyService.findById(surveyId);
        JSONObject obj = new JSONObject(body);
        String token = obj.getString("token");
        String userEmail = obj.getString("email");
        AnswerSaveDTO answerDTO = (AnswerSaveDTO)obj.get("choices");

        Answer answer = surveyService.answerSurvey(userEmail, survey, answerDTO);
//        return new ResponseEntity(answer, HttpStatus.OK);

        Answer submitanswer = surveyService.submitAnswer(answerId, userEmail, token);
        return new ResponseEntity(AnswerMapper.toAnswerDTO(submitanswer), HttpStatus.OK);
    }

    @RequestMapping(value = "/survey/token/{token}", method = RequestMethod.GET)
    public ResponseEntity validateSurveyLink(@PathVariable("token") String token) {

        if (!surveyService.validSurveyLinkToken(token)){
            String message = "Either Link does not exist or is invalid";
            System.out.println(message);
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("message", message);
            return new ResponseEntity(responseBody, HttpStatus.FORBIDDEN);
        }
        Survey survey = surveyService.findBySurveyLinkToken(token);
        return new ResponseEntity(surveyMapper.toSurveyDTO(survey), HttpStatus.OK);
    }


}