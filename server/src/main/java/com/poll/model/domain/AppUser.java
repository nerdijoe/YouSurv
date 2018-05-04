package com.poll.model.domain;

import com.poll.model.IEntity;
import com.poll.security.authentication.Role;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Entity
public class AppUser implements IEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true, nullable = false)
    @Email
    private String email;

    @Column(nullable = false)
//    @Size(min = 8, message = "Minimum password length: 8 characters")
    private String password;

    private Role role;
//    @ElementCollection(fetch = FetchType.EAGER)
//    List<Role> roles;

    public AppUser(){
        role = Role.ANONYMOUS;
    }

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
