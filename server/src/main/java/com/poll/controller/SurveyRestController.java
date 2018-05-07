package com.poll.controller;


import com.poll.persistence.dto.SurveyDTO;
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

import java.util.List;
import java.util.logging.Logger;


@RestController
@RequestMapping(path="")
public class SurveyRestController {

    private Logger log = Logger.getLogger(this.getClass().getName());

    @Autowired
    SurveyService surveyService;  //Service which will do all data retrieval/manipulation work

    @Autowired
    UserService userService;


    @RequestMapping(value = "/user/{id}/survey/", method = RequestMethod.GET)
    public @ResponseBody ResponseEntity<List<SurveyDTO>> findAllBySurveyorId(@PathVariable String id, UriComponentsBuilder ucBuilder) {
        if (id == null){
            System.out.println("surveyor id is not included in url");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Long surveyorId = Long.valueOf(id);
        System.out.println("findAllBySurveyorId, surveyorId = " + surveyorId);


        if (!userService.isUserExist(surveyorId)){
            System.out.println("surveyor with id: " + surveyorId + "does not exists");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        List<SurveyDTO> surveys = surveyService.findAllBySurveyorId(surveyorId);

        if (surveys == null){
            System.out.println("fail to create survey");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        System.out.println("surveys = " + surveys);
        log.info("surveys.size() = " + surveys.size());

        return new ResponseEntity<>(surveys, HttpStatus.OK);
    }

    @RequestMapping(value = "/survey/", method = RequestMethod.POST)
    public @ResponseBody ResponseEntity<SurveyDTO> createSurvey(@RequestBody SurveyCreateDTO surveyDTO, UriComponentsBuilder ucBuilder, Authentication auth) {
        String surveyorEmail = auth.getName();
        System.out.println("surveyor Email = " + surveyorEmail);

        if (!userService.existsByEmail(surveyorEmail)){
            System.out.println("surveyor with email: " + surveyorEmail + "does not exists");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        SurveyDTO survey = surveyService.createSurvey(surveyorEmail, surveyDTO);

        if (survey == null){
            System.out.println("fail to create survey");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(survey, HttpStatus.CREATED);

//        HttpHeaders headers = new HttpHeaders();
//        headers.setLocation(ucBuilder.path("/survey/{id}").buildAndExpand(survey.getId()).toUri());
//        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/survey/{id}", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<SurveyDTO> getSurveyById(@PathVariable("id") long id) {
        System.out.println("Fetching survey with id " + id);

        SurveyDTO surveyDTO = surveyService.findById(id);
        return new ResponseEntity<>(surveyDTO, HttpStatus.OK);
    }

}