package com.reservehub.reservehub.modules.service.controller;

import com.reservehub.reservehub.modules.service.dto.FavoriteDTO;
import com.reservehub.reservehub.modules.service.service.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
public class FavoriteController {
    private final FavoriteService favoriteService;

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<FavoriteDTO> addFavorite(
            @RequestBody FavoriteDTO favoriteDTO,
            @AuthenticationPrincipal UserDetails userDetails) {
        // Ensure user can only add favorites for themselves
        if (!userDetails.getUsername().equals(favoriteDTO.getUserId().toString())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        return ResponseEntity.ok(favoriteService.addFavorite(favoriteDTO));
    }

    @DeleteMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> removeFavorite(
            @RequestParam Long userId,
            @RequestParam Long serviceId,
            @AuthenticationPrincipal UserDetails userDetails) {
        // Ensure user can only remove their own favorites
        if (!userDetails.getUsername().equals(userId.toString())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        favoriteService.removeFavorite(userId, serviceId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<FavoriteDTO>> getFavoritesByUserId(
            @PathVariable Long userId,
            @AuthenticationPrincipal UserDetails userDetails) {
        // Ensure user can only view their own favorites
        if (!userDetails.getUsername().equals(userId.toString())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        return ResponseEntity.ok(favoriteService.getFavoritesByUserId(userId));
    }
} 