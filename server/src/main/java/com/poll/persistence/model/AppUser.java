package com.poll.persistence.model;

import com.poll.security.authentication.Role;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.Email;

@Entity
@Getter
@Setter
@ToString
public class AppUser implements IEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true, nullable = false)
    @Email
    private String email;

    @Column(nullable = false)
    private String password;


    @Column
    private String emailVerificationToken;


    @Column
    private boolean verified;


    private Role role;
//    @ElementCollection(fetch = FetchType.EAGER)
//    List<Role> roles;

    public AppUser(){
        role = Role.USER;
    }

}
