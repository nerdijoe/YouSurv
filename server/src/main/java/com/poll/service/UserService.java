package com.poll.service;

import com.poll.exception.CustomException;
import com.poll.persistence.dto.AppUserDTO;
import com.poll.persistence.mapper.AppUserMapper;
import com.poll.persistence.model.AppUser;
import com.poll.persistence.repository.AppUserRepository;
import com.poll.security.authentication.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    public List<AppUser> findAllUsers() {
        return appUserRepository.findAll();
    }

    public AppUser findById(long id) {
        return appUserRepository.findById(id);
    }

    public void saveUser(AppUser appUser) {
        appUserRepository.save(appUser);
    }

    public boolean isUserExist(AppUser appUser) {
        return appUserRepository.existsByEmail(appUser.getEmail());
    }

    public boolean isUserExist(Long id) {
        return appUserRepository.existsById(id);
    }


    public AppUser findByEmail(String email){
        return appUserRepository.findByEmail(email);
    }

    public void updateUser(AppUser currentAppUser) {
        appUserRepository.save(currentAppUser);
    }

    public void deleteUserById(long id) {
        appUserRepository.deleteById(id);
    }

    public void deleteAllUsers() {
        appUserRepository.deleteAll();
    }

    public boolean existsByEmail(String surveyorEmail) {
        return appUserRepository.existsByEmail(surveyorEmail);
    }

    public void signup(AppUserDTO dto) {
        if (appUserRepository.existsByEmail(dto.getEmail())){
            throw new CustomException("Email has been registered", HttpStatus.BAD_REQUEST);
        }

        dto.setPassword(passwordEncoder.encode(dto.getPassword()));
        AppUser appUser = AppUserMapper.toAppUser(dto);
        appUserRepository.save(appUser);
    }

    public String signin(AppUserDTO dto) {
        System.out.println("UserService.signin");
        if (!appUserRepository.existsByEmail(dto.getEmail())){
            throw new CustomException("Wrong email or password", HttpStatus.UNAUTHORIZED);
        }

        AppUser user = appUserRepository.findByEmail(dto.getEmail());

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new CustomException("Wrong email or password", HttpStatus.UNAUTHORIZED);
        } else{
            return jwtTokenProvider.createToken(user.getEmail(), Arrays.asList(user.getRole()));
        }
    }
}
