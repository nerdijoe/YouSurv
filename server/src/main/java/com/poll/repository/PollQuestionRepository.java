package com.poll.repository;

import com.poll.model.Question;
import org.springframework.data.repository.CrudRepository;

public interface PollQuestionRepository extends CrudRepository<Question, String> {
}
