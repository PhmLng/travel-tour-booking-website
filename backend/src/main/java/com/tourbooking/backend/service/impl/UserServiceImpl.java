package com.tourbooking.backend.service.impl;

import com.tourbooking.backend.dto.user.UserCreationRequest;
import com.tourbooking.backend.dto.user.UserResponse;
import com.tourbooking.backend.dto.user.UserUpdateRequest;
import com.tourbooking.backend.entity.User;
import com.tourbooking.backend.mapper.UserMapper;
import com.tourbooking.backend.repository.UserRepository;
import com.tourbooking.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public UserResponse getUserById(Long id) {
       User user = userRepository.findById(id).orElseThrow(()->new RuntimeException("User not found"));
       return userMapper.toUserResponse(user);
    }

    @Override
    public UserResponse craeteUser(User user) {
        if(!user.getPassword().startsWith("$2a$")){
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return userMapper.toUserResponse(userRepository.save(user));
    }

    @Override
    public UserResponse updateUser(UserUpdateRequest user) {
        return null;
    }

    @Override
    public void deleteUser(Long id) {

    }
}
