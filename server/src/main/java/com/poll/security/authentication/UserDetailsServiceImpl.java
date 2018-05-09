package com.poll.security.authentication;

import com.poll.persistence.model.AppUser;
//import com.poll.persistence.repository.mongo.AppUserRepository;
import com.poll.persistence.repository.AppUserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;


@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private AppUserRepository appUserRepository;

    public UserDetailsServiceImpl(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        AppUser appUser = appUserRepository.findByEmail(username);

        if (appUser == null) {
            throw new UsernameNotFoundException(username);
        }
        return new User(appUser.getEmail(), appUser.getPassword(), Collections.emptyList());
    }
}