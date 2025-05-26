package com.reservehub.reservehub.modules.auth.controller;

import com.reservehub.reservehub.modules.auth.dto.AuthResponse;
import com.reservehub.reservehub.modules.auth.dto.LoginRequest;
import com.reservehub.reservehub.modules.auth.dto.RegisterRequest;
import com.reservehub.reservehub.modules.auth.service.AuthService;
import com.reservehub.reservehub.modules.user.entity.User;
import com.reservehub.reservehub.modules.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/me")
    public ResponseEntity<AuthResponse> getCurrentUser(Authentication authentication) {
        String email = authentication.getName();
        User user = userService.mapToEntity(userService.getUserByEmail(email));
        return ResponseEntity.ok(authService.getCurrentUser(user));
    }
} 