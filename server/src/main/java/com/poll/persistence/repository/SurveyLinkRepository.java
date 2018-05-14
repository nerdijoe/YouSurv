package com.poll.persistence.repository;

import com.poll.persistence.model.Survey;
import com.poll.persistence.model.SurveyLinks;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SurveyLinkRepository extends CrudRepository<SurveyLinks, Long> {
    SurveyLinks findByLink(String link);

    SurveyLinks findBySurveyIdAndSurveyeeEmail(Long surveyId, String surveyeeEmail);

    boolean existsByLink(String link);

    boolean existsBySurveyId(long surveyId);

    List<SurveyLinks> findBySurveyId(long surveyId);

    boolean existsBySurveyIdAndSurveyeeEmail(long surveyId, String email);
}
