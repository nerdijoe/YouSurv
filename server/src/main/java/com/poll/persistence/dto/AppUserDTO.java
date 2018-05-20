package com.poll.persistence.dto;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AppUserDTO {
    private String email;
    private String password;
}
