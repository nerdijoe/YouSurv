package com.poll.service;

import com.poll.exception.CustomException;
import com.poll.model.AppUser;
import com.poll.model.Survey;
import com.poll.model.SurveyType;
import com.poll.repository.SurveyRepository;
import com.poll.repository.UserRepository;
import com.poll.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
