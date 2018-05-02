package com.poll.repository;

import com.poll.model.AppUser;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface UserRepository extends CrudRepository<AppUser, Long> {
    List<AppUser> findAll();

    AppUser findById(long id);

    boolean existsById(Long id);

    boolean existsByEmail(String email);

    AppUser findByEmail(String email);

}
