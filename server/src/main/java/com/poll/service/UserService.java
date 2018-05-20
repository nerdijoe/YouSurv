package com.poll.service;

import com.poll.exception.CustomException;
import com.poll.persistence.dto.AppUserDTO;
import com.poll.persistence.mapper.AppUserMapper;
import com.poll.persistence.emailer.EmailService;
import com.poll.persistence.model.AppUser;
//import com.poll.persistence.repository.mongo.AppUserRepository;
import com.poll.persistence.repository.AppUserRepository;
import com.poll.security.authentication.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private EmailService emailService;

    @Autowired
    private AuthenticationManager authenticationManager;


    static String OTP(int len)
    {
        // Using numeric values
        String numbers = "0123456789";

        // Using random method
        Random rndm_method = new Random();

//        char[] otp = new char[len];
        String otp = "";
        for (int i = 0; i < len; i++)
        {
            // Use of charAt() method : to get character value
            // Use of nextInt() as it is scanning the value as int
            otp +=
                    numbers.charAt(rndm_method.nextInt(numbers.length()));
        }

        return otp;
    }

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
        int length = 4;
        String token = OTP(length);
        appUser.setEmailVerificationToken(token);
        appUserRepository.save(appUser);

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom("postmaster@localhost");
        mailMessage.setTo(appUser.getEmail());
        mailMessage.setSubject("MyPoll - Account Registration Confirmation");
        mailMessage.setText("Your verification code is :\n" + token);
        emailService.sendEmail(mailMessage);
    }

    public String signin(AppUserDTO dto) {
        System.out.println("UserService.signin");
        if (!appUserRepository.existsByEmail(dto.getEmail())){
            throw new CustomException("Wrong email or password", HttpStatus.UNAUTHORIZED);
        }

        AppUser user = appUserRepository.findByEmail(dto.getEmail());

        if (!user.isVerified()){
            throw new CustomException("The user has not been verified", HttpStatus.UNAUTHORIZED);
        }

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new CustomException("Wrong email or password", HttpStatus.UNAUTHORIZED);
        } else{
            return jwtTokenProvider.createToken(user.getEmail(), Arrays.asList(user.getRole()));
        }
    }



    public void verifyUser(String emailVerificationToken){
        try {
            AppUser user =appUserRepository.findByEmailVerificationToken(emailVerificationToken);
            System.out.print("Before Save"+user.getId());
            user.setVerified(true);
            appUserRepository.save(user);
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom("postmaster@localhost");
            mailMessage.setTo(user.getEmail());
            mailMessage.setSubject("Account Confirmed");
            mailMessage.setText("You have successfully registered!!");
            emailService.sendEmail(mailMessage);

        }catch (Exception e){
            throw new CustomException("Relation not found", HttpStatus.NOT_FOUND);
        }
    }

    public String getAuthName(Authentication auth){
        return auth.getName();
    }

}
