package com.poll.controller;


import com.poll.model.AppUser;
import com.poll.model.Survey;
import com.poll.model.SurveyType;
import com.poll.security.Role;
import com.poll.service.SurveyService;
import com.poll.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping(path="/survey")
public class SurveyRestController {

    @Autowired
    SurveyService surveyService;  //Service which will do all data retrieval/manipulation work

    @Autowired
    UserService userService;

    //-------------------Create Survey--------------------------------------------------------

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public @ResponseBody ResponseEntity<Void> createSurvey(@RequestBody String surveyorId, String type, UriComponentsBuilder ucBuilder) {
        System.out.println("Creating survey, surveyorId = " + surveyorId);

        if (surveyorId == null){
            System.out.println("surveyorId is not included in POST body");
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }

        if (!userService.isUserExist(Long.parseLong(surveyorId))){
            System.out.println("surveyor with id: " + surveyorId + "does not exists");
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }

        AppUser user = userService.findById(Long.parseLong(surveyorId));
        Survey survey = surveyService.createSurvey(user, SurveyType.getType(type));

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