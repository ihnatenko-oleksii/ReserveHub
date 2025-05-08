package com.reservehub.reservehub.modules.user.dto;

import com.reservehub.reservehub.modules.user.enums.Role;
import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String email;
    private String name;
    private String phone;
    private String description;
    private String avatarUrl;
    private Role role;
} 