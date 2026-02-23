package com.tourbooking.backend.dto.user;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserCreationRequest {
    private String username;
    private String password;
    private String fullName;
    private String email;
}
