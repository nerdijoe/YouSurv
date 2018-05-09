package com.poll.persistence.mapper;

import com.poll.persistence.dto.AppUserDTO;
import com.poll.persistence.model.AppUser;

public class AppUserMapper {

    public static AppUser toAppUser(AppUserDTO dto) {
        AppUser user = new AppUser();
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        return user;
    }
}
