package com.tourbooking.backend.controller;

import com.tourbooking.backend.dto.user.UserCreationRequest;
import com.tourbooking.backend.dto.user.UserLoginRequest;
import com.tourbooking.backend.dto.user.UserResponse;
import com.tourbooking.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register (@RequestBody UserCreationRequest userCreationRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(userCreationRequest));
    }
    @PostMapping("/login")
    public ResponseEntity<UserResponse> login (@RequestBody UserLoginRequest userLoginRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(authService.login(userLoginRequest));
    }
}
