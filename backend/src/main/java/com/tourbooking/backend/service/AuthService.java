package com.tourbooking.backend.service;

import com.tourbooking.backend.dto.user.UserCreationRequest;
import com.tourbooking.backend.dto.user.UserLoginRequest;
import com.tourbooking.backend.dto.user.UserResponse;

public interface AuthService {
    public UserResponse login (UserLoginRequest userLoginRequest);
    public UserResponse register (UserCreationRequest userCreationRequest);
}
