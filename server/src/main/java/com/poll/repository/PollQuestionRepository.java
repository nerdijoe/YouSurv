package com.poll.repository;

import com.poll.model.PollQuestion;
import org.springframework.data.repository.CrudRepository;

public interface PollQuestionRepository extends CrudRepository<PollQuestion, String> {
}
