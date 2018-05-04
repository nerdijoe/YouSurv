package com.poll.model;

import com.poll.security.authentication.Role;

import javax.persistence.*;

@Entity
public class AppUser implements IEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    private String email;

    private String password;

    private Role role;

    public AppUser(){}

    public boolean auth(String email, String password){
        return this.email.equals(email) && this.password.equals(password);
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Long getId() {
        return id;
    }
}
