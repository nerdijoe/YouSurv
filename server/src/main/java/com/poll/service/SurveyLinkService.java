package com.poll.service;

import com.poll.persistence.model.AppUser;
import com.poll.persistence.model.Survey;
import com.poll.persistence.model.SurveyLinks;
import com.poll.persistence.model.SurveyType;
import com.poll.persistence.repository.SurveyLinkRepository;
import com.poll.persistence.repository.SurveyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class SurveyLinkService {

    @Autowired
    private SurveyLinkRepository surveyLinkRepository;


    public String createGeneralSurvey(SurveyLinks surveyLinks) {
        System.out.println("Published");
        surveyLinkRepository.save(surveyLinks);
        return "";
    }

    public String createClosedSurvey(SurveyLinks surveyLinks) {
        System.out.println("Published");
        surveyLinkRepository.save(surveyLinks);
        return "";
    }
    public boolean validate(String token, SurveyLinks surveyLinks){

        try {
            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
            Date date = new Date();
            Date today = dateFormat.parse(dateFormat.format(date));
//            if(today.after(surveyLinks.getStartTime()) && today.before(surveyLinks.getEndTime()) && surveyLinks.getStatus().equals("active")){
                return true;
//            }
        }catch (ParseException e){

        }

        //System.out.println("links data:"+surveyLinks);
        return false;
    }
}
