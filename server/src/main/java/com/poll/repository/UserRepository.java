package com.poll.repository;

import com.poll.model.PollQuestion;
import com.poll.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface UserRepository extends CrudRepository<User, Long> {
    List<User> findAll();

    User findById(long id);

    boolean existsById(Long id);

}
