package com.poll.controller;


import com.poll.model.domain.AppUser;
import com.poll.model.dto.AppUserDTO;
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

import java.util.List;

@RestController
public class RestUserController {

    @Autowired
    UserService userService;  //Service which will do all data retrieval/manipulation work

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/login")
    public String login(
                        @RequestParam String username,
                        @RequestParam String password) {
        return userService.signin(username, password);
    }

//    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/signup")
    public String signup(
            @RequestBody AppUserDTO body) {
        System.out.println("RestUserController.signup");
        System.out.println("body = " + body);

        System.out.println("body.getUsername() = " + body.getUsername());
        System.out.println("body.getPassword() = " + body.getPassword());
        AppUser user = new AppUser();
        user.setEmail(body.getUsername());
        user.setPassword(bCryptPasswordEncoder.encode(body.getPassword()));
        user.setRole(Role.USER);
        return userService.signup(user);
    }

    //-------------------Retrieve All Users--------------------------------------------------------

    @RequestMapping(value = "/user/", method = RequestMethod.GET)
    public ResponseEntity<List<AppUser>> listAllUsers() {
        List<AppUser> appUsers = userService.findAllUsers();
        if(appUsers.isEmpty()){
            return new ResponseEntity<List<AppUser>>(HttpStatus.NO_CONTENT);//You many decide to return HttpStatus.NOT_FOUND
        }
        return new ResponseEntity<List<AppUser>>(appUsers, HttpStatus.OK);
    }


    //-------------------Retrieve Single AppUser--------------------------------------------------------

    @RequestMapping(value = "/user/{id}", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE,MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity<AppUser> getUser(@PathVariable("id") long id) {
        System.out.println("Fetching user with id " + id);
        AppUser appUser = userService.findById(id);
        if (appUser == null) {
            System.out.println("user with id " + id + " not found");
            return new ResponseEntity<AppUser>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<AppUser>(appUser, HttpStatus.OK);
    }



    //-------------------Create a AppUser--------------------------------------------------------

    @RequestMapping(value = "/user/", method = RequestMethod.POST)
    public @ResponseBody ResponseEntity<Void> createUser(@RequestBody AppUser appUser, UriComponentsBuilder ucBuilder) {
        System.out.println("Creating user " + appUser.getEmail());
        appUser.setPassword(bCryptPasswordEncoder.encode(appUser.getPassword()));
        appUser.setRole(Role.USER);

        if (userService.isUserExist(appUser)) {
            System.out.println("A user with email " + appUser.getEmail() + " already exist");
            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }

        userService.saveUser(appUser);

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/user/{id}").buildAndExpand(appUser.getId()).toUri());
        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }


    //------------------- Update a AppUser --------------------------------------------------------

    @RequestMapping(value = "/user/{id}", method = RequestMethod.PUT)
    public ResponseEntity<AppUser> updateUser(@PathVariable("id") long id, @RequestBody AppUser appUser) {
        System.out.println("Updating user " + id);

        AppUser currentAppUser = userService.findById(id);

        if (currentAppUser ==null) {
            System.out.println("user with id " + id + " not found");
            return new ResponseEntity<AppUser>(HttpStatus.NOT_FOUND);
        }

        currentAppUser.setRole(appUser.getRole());

        userService.updateUser(currentAppUser);
        return new ResponseEntity<AppUser>(currentAppUser, HttpStatus.OK);
    }

    //------------------- Delete a AppUser --------------------------------------------------------

    @RequestMapping(value = "/user/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<AppUser> deleteUser(@PathVariable("id") long id) {
        System.out.println("Fetching & Deleting user with id " + id);

        AppUser appUser = userService.findById(id);
        if (appUser == null) {
            System.out.println("Unable to delete. user with id " + id + " not found");
            return new ResponseEntity<AppUser>(HttpStatus.NOT_FOUND);
        }

        userService.deleteUserById(id);
        return new ResponseEntity<AppUser>(HttpStatus.NO_CONTENT);
    }


    //------------------- Delete All Users --------------------------------------------------------

    @RequestMapping(value = "/user/", method = RequestMethod.DELETE)
    public ResponseEntity<AppUser> deleteAllUsers() {
        System.out.println("Deleting All Users");

        userService.deleteAllUsers();
        return new ResponseEntity<AppUser>(HttpStatus.NO_CONTENT);
    }

}