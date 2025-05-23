package com.reservehub.reservehub.modules.auth.dto;

import com.reservehub.reservehub.modules.user.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthUserResponse {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String description;
    private Role role;
    private String avatarUrl;
}
