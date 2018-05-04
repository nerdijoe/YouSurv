package com.poll.controller;


import com.poll.persistence.model.AppUser;
import com.poll.persistence.model.Survey;
import com.poll.persistence.model.SurveyType;
import com.poll.persistence.dto.SurveyCreateDTO;
import com.poll.service.SurveyService;
import com.poll.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;


@RestController
@RequestMapping(path="/survey")
public class SurveyRestController {

    @Autowired
    SurveyService surveyService;  //Service which will do all data retrieval/manipulation work

    @Autowired
    UserService userService;

    //-------------------Create Survey--------------------------------------------------------

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public @ResponseBody ResponseEntity<Void> createSurvey(@RequestBody SurveyCreateDTO surveyDTO, UriComponentsBuilder ucBuilder) {
        System.out.println("Creating survey, surveyorId = " + surveyDTO.getSurveyorId());


        if (surveyDTO.getSurveyorId() == null){
            System.out.println("surveyorId is not included in POST body");
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }

        if (!userService.isUserExist(Long.parseLong(surveyDTO.getSurveyorId()))){
            System.out.println("surveyor with id: " + surveyDTO.getSurveyorId() + "does not exists");
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }

        Survey survey = surveyService.createSurvey(surveyDTO);

        if (survey == null){
            System.out.println("fail to create survey");
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        surveyService.saveSurvey(survey);

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/survey/{id}").buildAndExpand(survey.getId()).toUri());
        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }


}