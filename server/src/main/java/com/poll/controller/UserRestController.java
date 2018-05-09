package com.poll.controller;


import com.poll.persistence.model.AppUser;
import com.poll.persistence.dto.AppUserDTO;
import com.poll.response.CustomResponse;
import com.poll.security.authentication.Role;
import com.poll.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class UserRestController {

    @Autowired
    UserService userService;  //Service which will do all data retrieval/manipulation work

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/signin")
    public ResponseEntity signin(@RequestBody AppUserDTO dto) {
        System.out.println("RestUserController.login");
        String token =  userService.signin(dto);
        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("token", token);
        return new ResponseEntity(responseBody, HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity signup(@RequestBody AppUserDTO dto) {
        System.out.println("RestUserController.signup");

        userService.signup(dto);

        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("message", "Successfully signup");

        return new ResponseEntity(responseBody, HttpStatus.OK);
    }

//    //-------------------Retrieve All Users--------------------------------------------------------
//
//    @RequestMapping(value = "/user/", method = RequestMethod.GET)
//    public ResponseEntity<List<AppUser>> listAllUsers() {
//        List<AppUser> appUsers = userService.findAllUsers();
//        if(appUsers.isEmpty()){
//            return new ResponseEntity<List<AppUser>>(HttpStatus.NO_CONTENT);//You many decide to return HttpStatus.NOT_FOUND
//        }
//        return new ResponseEntity<List<AppUser>>(appUsers, HttpStatus.OK);
//    }
//
//
//    //-------------------Retrieve Single AppUser--------------------------------------------------------
//
//    @RequestMapping(value = "/user/{id}", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE,MediaType.APPLICATION_XML_VALUE})
//    public ResponseEntity<AppUser> getUser(@PathVariable("id") long id) {
//        System.out.println("Fetching user with id " + id);
//        AppUser appUser = userService.findById(id);
//        if (appUser == null) {
//            System.out.println("user with id " + id + " not found");
//            return new ResponseEntity<AppUser>(HttpStatus.NOT_FOUND);
//        }
//        return new ResponseEntity<AppUser>(appUser, HttpStatus.OK);
//    }
//
//
//
//    //-------------------Create a AppUser--------------------------------------------------------
//
//    @RequestMapping(value = "/user/", method = RequestMethod.POST)
//    public @ResponseBody ResponseEntity<Void> createUser(@RequestBody AppUser appUser, UriComponentsBuilder ucBuilder) {
//        System.out.println("Creating user " + appUser.getEmail());
//        appUser.setPassword(bCryptPasswordEncoder.encode(appUser.getPassword()));
//        appUser.setRole(Role.USER);
//
//        if (userService.isUserExist(appUser)) {
//            System.out.println("A user with email " + appUser.getEmail() + " already exist");
//            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
//        }
//
//        userService.saveUser(appUser);
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setLocation(ucBuilder.path("/user/{id}").buildAndExpand(appUser.getId()).toUri());
//        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
//    }
//
//
//    //------------------- Update a AppUser --------------------------------------------------------
//
//    @RequestMapping(value = "/user/{id}", method = RequestMethod.PUT)
//    public ResponseEntity<AppUser> updateUser(@PathVariable("id") long id, @RequestBody AppUser appUser) {
//        System.out.println("Updating user " + id);
//
//        AppUser currentAppUser = userService.findById(id);
//
//        if (currentAppUser ==null) {
//            System.out.println("user with id " + id + " not found");
//            return new ResponseEntity<AppUser>(HttpStatus.NOT_FOUND);
//        }
//
//        currentAppUser.setRole(appUser.getRole());
//
//        userService.updateUser(currentAppUser);
//        return new ResponseEntity<AppUser>(currentAppUser, HttpStatus.OK);
//    }
//
//    //------------------- Delete a AppUser --------------------------------------------------------
//
//    @RequestMapping(value = "/user/{id}", method = RequestMethod.DELETE)
//    public ResponseEntity<AppUser> deleteUser(@PathVariable("id") long id) {
//        System.out.println("Fetching & Deleting user with id " + id);
//
//        AppUser appUser = userService.findById(id);
//        if (appUser == null) {
//            System.out.println("Unable to delete. user with id " + id + " not found");
//            return new ResponseEntity<AppUser>(HttpStatus.NOT_FOUND);
//        }
//
//        userService.deleteUserById(id);
//        return new ResponseEntity<AppUser>(HttpStatus.NO_CONTENT);
//    }
//
//
//    //------------------- Delete All Users --------------------------------------------------------
//
//    @RequestMapping(value = "/user/", method = RequestMethod.DELETE)
//    public ResponseEntity<AppUser> deleteAllUsers() {
//        System.out.println("Deleting All Users");
//
//        userService.deleteAllUsers();
//        return new ResponseEntity<AppUser>(HttpStatus.NO_CONTENT);
//    }


    @RequestMapping(value="/user/verify", method = RequestMethod.PUT)
    public void verifyUser(@RequestParam String emailVerificationToken){
        System.out.println("Token" + emailVerificationToken);
        userService.verifyUser(emailVerificationToken);
    }
}