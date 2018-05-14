package com.poll.persistence.repository;

import com.poll.persistence.model.SurveyLinks;
import org.springframework.data.repository.CrudRepository;

public interface SurveyLinkRepository extends CrudRepository<SurveyLinks, Long> {
    SurveyLinks findByLink(String link);

    boolean existsByLink(String link);

    boolean existsBySurveyId(long surveyId);

    SurveyLinks findBySurveyId(long surveyId);
}
