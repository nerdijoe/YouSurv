package com.poll.persistence.repository;

import com.poll.persistence.model.Question;
import org.springframework.data.repository.CrudRepository;

public interface PollQuestionRepository extends CrudRepository<Question, String> {
}
