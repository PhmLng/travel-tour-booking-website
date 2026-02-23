package com.tourbooking.backend.dto.user;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserUpdateRequest {
    private String username;
    private String password;
    private String fullName;
    private String email;
}
