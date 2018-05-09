package com.poll.persistence.repository.mysql;

import com.poll.persistence.model.Answer;
import com.poll.persistence.model.Question;
import org.springframework.data.repository.CrudRepository;

public interface QuestionRepository extends CrudRepository<Question, String> {
}
