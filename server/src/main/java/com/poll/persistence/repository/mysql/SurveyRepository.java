package com.poll.persistence.repository.mysql;


import com.poll.persistence.model.Survey;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SurveyRepository extends CrudRepository<Survey, Long> {
//    List<Survey> findAll();
//    List<Survey> findAllBySurveyorId(Long id);
    Survey findById(long id);

    List<Survey> findAllBySurveyorEmail(String survoryEmail);
//    boolean existsById(Long id);




}
