package com.poll.repository;

import com.poll.model.AppUser;
import com.poll.model.Survey;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface SurveyRepository extends CrudRepository<Survey, Long> {
    List<Survey> findAll();
    Survey findById(long id);
    boolean existsById(Long id);




}
