package com.poll.service;

import com.poll.model.User;
import com.poll.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public User findById(long id) {
        return userRepository.findById(id);
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }

    public boolean isUserExist(User user) {
        return userRepository.existsById(user.getId());
    }

    public void updateUser(User currentUser) {
        userRepository.save(currentUser);
    }

    public void deleteUserById(long id) {
        userRepository.deleteById(id);
    }

    public void deleteAllUsers() {
        userRepository.deleteAll();
    }
}
