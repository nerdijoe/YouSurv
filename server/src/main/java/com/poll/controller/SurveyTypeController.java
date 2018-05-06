package com.poll.controller;

import com.poll.persistence.dto.SurveyLinkDTO;
import com.poll.persistence.model.SurveyLinks;
import com.poll.service.SurveyLinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

@RestController
public class SurveyTypeController {


    @Autowired
    SurveyLinkService surveyLinkService;

    @PostMapping("/publish")
    public String publishSurvey(@RequestBody SurveyLinkDTO body) {
        String type = body.getType();
        String link="";
        String url="";
        String domain="localhost:";
        String port="3000/";
        String route="takeSurvey?token=";
        SurveyLinks surveyLinks=new SurveyLinks();
        if(type.equals("general")){
            Date startDate =new Date();
            Date endDate=new Date();
            try {
                java.text.SimpleDateFormat simpleDateFormat1 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
                startDate = simpleDateFormat1.parse(body.getStartDate());
                java.text.SimpleDateFormat simpleDateFormat2 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
                endDate=simpleDateFormat2.parse(body.getEndDate());
            }catch (ParseException e){
                System.out.println(e);

            }
            url=domain+port+route;
            link=url+UUID.randomUUID().toString();
            surveyLinks.setSurveyId(body.getSurveyorId());
            surveyLinks.setLink(link);
            surveyLinks.setStartTime(startDate);
            surveyLinks.setEndTime(endDate);
            surveyLinks.setStatus("active");
            surveyLinkService.createGeneralSurvey(surveyLinks);
        }

        return link;
    }


}
