package com.poll.service;

import com.poll.persistence.dto.SurveyCreateDTO;
import com.poll.persistence.model.AppUser;
import com.poll.persistence.model.Survey;
import com.poll.persistence.model.SurveyType;
import com.poll.persistence.repository.AppUserRepository;
import com.poll.persistence.repository.SurveyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SurveyService {

    @Autowired
    private AppUserRepository appUserRepository;
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

    public Survey createSurvey(SurveyCreateDTO surveyDTO) {
        AppUser user = findById(Long.parseLong(surveyDTO.getSurveyorId()));
        return createSurvey(user, SurveyType.getType(surveyDTO.getType()));
    }

    private AppUser findById(long id) {
        return appUserRepository.findById(id);
    }
}
