package com.poll.repository;

import com.poll.model.domain.Question;
import org.springframework.data.repository.CrudRepository;

public interface PollQuestionRepository extends CrudRepository<Question, String> {
}
