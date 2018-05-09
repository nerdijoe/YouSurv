package com.poll.controller;


import com.poll.persistence.dto.SurveyDTO;
import com.poll.persistence.dto.SurveySaveDTO;
import com.poll.persistence.model.AppUser;
import com.poll.persistence.model.Survey;
import com.poll.persistence.dto.SurveyCreateDTO;
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

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;


@RestController
@RequestMapping(path="")
public class SurveyRestController {

    private Logger log = Logger.getLogger(this.getClass().getName());

    @Autowired
    SurveyService surveyService;  //Service which will do all data retrieval/manipulation work

    @Autowired
    UserService userService;

    @RequestMapping(value = "/survey/", method = RequestMethod.POST)
    public @ResponseBody ResponseEntity createSurvey(@RequestBody SurveyCreateDTO surveyDTO, Authentication auth) {
        String surveyorEmail = auth.getName();
        System.out.println("==> POST /survey/, surveyor Email = " + surveyorEmail);

        if (!userService.existsByEmail(surveyorEmail)){
            String message = "surveyor with email: " + surveyorEmail + "does not exists";
            System.out.println(message);
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("message", message);
            return new ResponseEntity(responseBody, HttpStatus.BAD_REQUEST);
        }

        SurveyDTO survey = surveyService.createSurvey(surveyorEmail, surveyDTO);

        if (survey == null){
            String message = "fail to create survey";
            System.out.println(message);
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("message", message);
            return new ResponseEntity(responseBody, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity(survey, HttpStatus.CREATED);

    }

    @RequestMapping(value = "/survey/{id}", method = RequestMethod.PUT, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity saveSurvey(@PathVariable("id") long id, @RequestBody SurveyDTO surveyDTO) {
        System.out.println("Saving survey with id " + id);
        Date now = new Date();
        System.out.println("now.toString() = " + now.toString());
        if (!surveyService.existsById(id)){
            String message = "survey with id: " + id + " does not exists";
            System.out.println(message);
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("message", message);
            return new ResponseEntity(responseBody, HttpStatus.BAD_REQUEST);
        }

        Survey survey = surveyService.save(surveyDTO);

        if (survey == null){
            System.out.println("Survey with id: " + id + " can't be saved");
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity(survey, HttpStatus.OK);

    }


    @RequestMapping(value = "/survey/{id}", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity getSurveyById(@PathVariable("id") long id) {
        System.out.println("Fetching survey with id " + id);

        Survey survey = surveyService.findById(id);
        return new ResponseEntity(survey, HttpStatus.OK);
    }


//    @RequestMapping(value = "/user/{id}/survey/", method = RequestMethod.GET)
//    public @ResponseBody ResponseEntity<List<SurveyDTO>> findAllBySurveyorId(@PathVariable String id, UriComponentsBuilder ucBuilder) {
//        if (id == null){
//            System.out.println("surveyor id is not included in url");
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//
//        Long surveyorId = Long.valueOf(id);
//        System.out.println("findAllBySurveyorId, surveyorId = " + surveyorId);
//
//
//        if (!userService.isUserExist(surveyorId)){
//            System.out.println("surveyor with id: " + surveyorId + "does not exists");
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//
//        List<SurveyDTO> surveys = surveyService.findAllBySurveyorId(surveyorId);
//
//        if (surveys == null){
//            System.out.println("fail to create survey");
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//
//        System.out.println("surveys = " + surveys);
//        log.info("surveys.size() = " + surveys.size());
//
//        return new ResponseEntity<>(surveys, HttpStatus.OK);
//    }
//
//
//



}