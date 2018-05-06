package com.poll.service;

import com.poll.persistence.model.AppUser;
import com.poll.persistence.model.Survey;
import com.poll.persistence.model.SurveyLinks;
import com.poll.persistence.model.SurveyType;
import com.poll.persistence.repository.SurveyLinkRepository;
import com.poll.persistence.repository.SurveyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SurveyLinkService {

    @Autowired
    private SurveyLinkRepository surveyLinkRepository;


    public String createGeneralSurvey(SurveyLinks surveyLinks) {
        System.out.println("Published");
        surveyLinkRepository.save(surveyLinks);
        return "";
    }

}
