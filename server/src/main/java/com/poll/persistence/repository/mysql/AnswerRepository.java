package com.poll.persistence.repository.mysql;

import com.poll.persistence.model.Answer;
import com.poll.persistence.model.Question;
import org.hibernate.sql.ANSICaseFragment;
import org.springframework.data.repository.CrudRepository;

public interface AnswerRepository extends CrudRepository<Answer, String> {
}
