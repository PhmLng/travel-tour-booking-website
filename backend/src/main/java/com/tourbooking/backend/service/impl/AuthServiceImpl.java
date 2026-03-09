package com.tourbooking.backend.service.impl;

import com.tourbooking.backend.dto.user.UserCreationRequest;
import com.tourbooking.backend.dto.user.UserLoginRequest;
import com.tourbooking.backend.dto.user.UserResponse;
import com.tourbooking.backend.entity.Role;
import com.tourbooking.backend.entity.User;
import com.tourbooking.backend.exception.DuplicateException;
import com.tourbooking.backend.mapper.UserMapper;
import com.tourbooking.backend.repository.UserRepository;
import com.tourbooking.backend.service.AuthService;
import com.tourbooking.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private UserRepository userRepository;

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
        if (userRepository.findByUsername(userCreationRequest.getUsername()).isPresent()) {
            throw new DuplicateException("Username already in use");
        }
        User user =userMapper.toUser(userCreationRequest);
        user.setPassword(passwordEncoder.encode(userCreationRequest.getPassword()));
        user.setRole(Role.ROLE_USER);
        return userService.craeteUser(user);
    }
}
