package com.poll.persistence.repository;

import com.poll.persistence.model.SurveyLinks;
import org.springframework.data.repository.CrudRepository;

public interface SurveyLinkRepository extends CrudRepository<SurveyLinks, Long> {
}
