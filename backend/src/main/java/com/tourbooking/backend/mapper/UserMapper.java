package com.tourbooking.backend.mapper;

import com.tourbooking.backend.dto.user.UserCreationRequest;
import com.tourbooking.backend.dto.user.UserResponse;
import com.tourbooking.backend.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "role", ignore = true)
    public User toUser(UserCreationRequest userCreationRequest);
    public UserResponse toUserResponse(User user);
}
