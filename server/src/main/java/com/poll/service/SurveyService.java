package com.poll.service;

import com.poll.model.domain.AppUser;
import com.poll.model.domain.Survey;
import com.poll.model.domain.SurveyType;
import com.poll.repository.SurveyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class SurveyService {

    @Autowired
    private SurveyRepository surveyRepository;


    public Survey createSurvey(AppUser surveyor, SurveyType type) {
        if (surveyor == null || type == null){
            return null;
        }
        Survey survey = new Survey(surveyor, type);
        return survey;
    }

    public void saveSurvey(Survey survey) {
        surveyRepository.save(survey);
    }
}
