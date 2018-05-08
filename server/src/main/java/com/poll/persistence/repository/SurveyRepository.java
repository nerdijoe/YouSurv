package com.poll.persistence.repository;


import com.poll.persistence.model.Survey;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SurveyRepository extends CrudRepository<Survey, Long> {
//    List<Survey> findAll();
//    List<Survey> findAllBySurveyorId(Long id);
//    Survey findById(long id);
//    boolean existsById(Long id);




}
