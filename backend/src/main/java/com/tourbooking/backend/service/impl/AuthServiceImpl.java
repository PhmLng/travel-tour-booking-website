package com.tourbooking.backend.service.impl;

import com.tourbooking.backend.dto.user.UserCreationRequest;
import com.tourbooking.backend.dto.user.UserLoginRequest;
import com.tourbooking.backend.dto.user.UserResponse;
import com.tourbooking.backend.enums.Role;
import com.tourbooking.backend.entity.User;
import com.tourbooking.backend.mapper.UserMapper;
import com.tourbooking.backend.repository.UserRepository;
import com.tourbooking.backend.service.AuthService;
import com.tourbooking.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final UserRepository userRepository;


    @Override
    public UserResponse login(UserLoginRequest userLoginRequest) {
        User user = userRepository.findByUsername(userLoginRequest.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));
        boolean matches = passwordEncoder.matches(userLoginRequest.getPassword(), user.getPassword());
        if (!matches) {
            throw new RuntimeException("Incorrect password");
        }
        return userMapper.toUserResponse(user);
    }

    @Override
    public UserResponse register(UserCreationRequest userCreationRequest) {
        User user =userMapper.toUser(userCreationRequest);
        user.setPassword(passwordEncoder.encode(userCreationRequest.getPassword()));
        user.setRole(Role.ROLE_USER);
        return userService.craeteUser(user);
    }
}
