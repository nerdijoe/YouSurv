package com.poll.persistence.repository;

import com.poll.persistence.model.AppUser;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface AppUserRepository extends CrudRepository<AppUser, Long> {
    List<AppUser> findAll();

    AppUser findById(long id);

    boolean existsById(Long id);

    boolean existsByEmail(String email);

    AppUser findByEmail(String email);

    AppUser findByEmailVerificationToken(String emailVerificationToken);

}
