package com.reservehub.reservehub.modules.auth.service;

import com.reservehub.reservehub.modules.auth.dto.AuthResponse;
import com.reservehub.reservehub.modules.auth.dto.AuthUserResponse;
import com.reservehub.reservehub.modules.auth.dto.LoginRequest;
import com.reservehub.reservehub.modules.auth.dto.RegisterRequest;
import com.reservehub.reservehub.modules.user.entity.User;
import com.reservehub.reservehub.modules.user.enums.Role;
import com.reservehub.reservehub.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        var user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .country(request.getCountry())
                .role(Role.USER)
                .build();

        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);

        return AuthResponse.builder()
                .token(jwtToken)
                .user(
                        AuthUserResponse.builder()
                                .id(user.getId())
                                .name(user.getName())
                                .email(user.getEmail())
                                .role(user.getRole())
                                .avatarUrl(user.getAvatarUrl())
                                .build()
                )
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();

        var jwtToken = jwtService.generateToken(user);

        System.out.println("LOGIN: " + request.getEmail());

        return AuthResponse.builder()
                .token(jwtToken)
                .user(
                        AuthUserResponse.builder()
                                .id(user.getId())
                                .name(user.getName())
                                .email(user.getEmail())
                                .phone(user.getPhone())
                                .description(user.getDescription())
                                .role(user.getRole())
                                .avatarUrl(user.getAvatarUrl())
                                .build()
                )
                .build();
    }

    public AuthResponse getCurrentUser(User user) {
        return AuthResponse.builder()
                .user(
                        AuthUserResponse.builder()
                                .id(user.getId())
                                .name(user.getName())
                                .email(user.getEmail())
                                .role(user.getRole())
                                .avatarUrl(user.getAvatarUrl())
                                .build()
                )
                .build();
    }
} 