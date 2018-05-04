package com.poll.model.dto;

public class AppUserDTO {
    private String username;
    private String password;

    public AppUserDTO(){}

    public AppUserDTO(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
