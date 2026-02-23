package com.tourbooking.backend.controller;

import com.tourbooking.backend.dto.user.UserCreationRequest;
import com.tourbooking.backend.dto.user.UserLoginRequest;
import com.tourbooking.backend.dto.user.UserResponse;
import com.tourbooking.backend.service.AuthService;
import com.tourbooking.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth")
public class AuthController {
    @Autowired
    private AuthService authService;
    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register (@RequestBody UserCreationRequest userCreationRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(userCreationRequest));
    }
    @PostMapping("/login")
    public ResponseEntity<UserResponse> login (@RequestBody UserLoginRequest userLoginRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(authService.login(userLoginRequest));
    }
}
