package com.poll.persistence.repository;

import com.poll.persistence.model.Answer;
import com.poll.persistence.model.Question;
import org.hibernate.sql.ANSICaseFragment;
import org.springframework.data.repository.CrudRepository;

public interface AnswerRepository extends CrudRepository<Answer, String> {
    Answer findById(long id);
}
