package com.tourbooking.backend.dto.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@JsonPropertyOrder({ "id", "fullName", "username", "email", "role", "createdAt"})
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private String fullName;
    private String role;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;
}
