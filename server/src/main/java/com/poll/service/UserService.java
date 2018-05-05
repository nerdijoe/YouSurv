package com.poll.service;

import com.poll.exception.CustomException;
import com.poll.model.domain.AppUser;
import com.poll.repository.UserRepository;
import com.poll.security.authentication.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    public List<AppUser> findAllUsers() {
        return userRepository.findAll();
    }

    public AppUser findById(long id) {
        return userRepository.findById(id);
    }

    public void saveUser(AppUser appUser) {
        userRepository.save(appUser);
    }

    public boolean isUserExist(AppUser appUser) {
        return userRepository.existsByEmail(appUser.getEmail());
    }

    public AppUser findByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public void updateUser(AppUser currentAppUser) {
        userRepository.save(currentAppUser);
    }

    public void deleteUserById(long id) {
        userRepository.deleteById(id);
    }

    public void deleteAllUsers() {
        userRepository.deleteAll();
    }

    public String signup(AppUser user) {
        if (!userRepository.existsByEmail(user.getEmail())) {
            System.out.println("UserService.signup user.password=" + user.getPassword());
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);
            return jwtTokenProvider.createToken(user.getEmail(), Arrays.asList(user.getRole()));
        } else {
            throw new CustomException("Username is already in use", HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    public String signin(String username, String password) {
        try {
            System.out.println("UserService.signin=" + username +", " + password);
            System.out.println("   password encoded" + passwordEncoder.encode(password));

            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            System.out.println("    after authenticate");

            return jwtTokenProvider.createToken(username, Arrays.asList(findByEmail(username).getRole()));
        } catch (AuthenticationException e) {
            System.out.println(e);
            throw new CustomException("Invalid username/password supplied", HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    public String signinV2(String username, String password) {
        try {
            System.out.println("UserService.signinV2=" + username +", " + password);
            System.out.println("   password encoded" + passwordEncoder.encode(password));
            if (userRepository.existsByEmail(username)) {
                AppUser user = userRepository.findByEmail(username);
                System.out.println("user.password =" + user.getPassword());
                if(passwordEncoder.matches(password, user.getPassword())) {

                    return jwtTokenProvider.createToken(user.getEmail(), Arrays.asList(user.getRole()));
                }
                else {
                    throw new CustomException("Password is incorrect", HttpStatus.UNPROCESSABLE_ENTITY);
                }
            } else {
                throw new CustomException("Email is incorrect ", HttpStatus.UNPROCESSABLE_ENTITY);
            }



//            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

//            return jwtTokenProvider.createToken(username, Arrays.asList(findByEmail(username).getRole()));
        } catch (AuthenticationException e) {
            System.out.println(e);
            throw new CustomException("Invalid username/password supplied", HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

}
