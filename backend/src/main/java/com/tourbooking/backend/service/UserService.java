package com.tourbooking.backend.service;

import com.tourbooking.backend.dto.user.UserCreationRequest;
import com.tourbooking.backend.dto.user.UserResponse;
import com.tourbooking.backend.dto.user.UserUpdateRequest;
import com.tourbooking.backend.entity.User;

public interface UserService {
    public UserResponse getUserById(Long id);
    public UserResponse craeteUser(User user);
    public UserResponse updateUser(UserUpdateRequest user);
    public void deleteUser(Long id);
}
