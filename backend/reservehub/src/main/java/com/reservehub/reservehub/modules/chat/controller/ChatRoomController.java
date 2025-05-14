package com.reservehub.reservehub.modules.chat.controller;

import com.reservehub.reservehub.modules.chat.dto.ChatRoomDTO;
import com.reservehub.reservehub.modules.chat.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat-rooms")
@RequiredArgsConstructor
public class ChatRoomController {
    private final ChatRoomService chatRoomService;

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ChatRoomDTO> getOrCreateRoom(
            @RequestParam Long clientId,
            @RequestParam Long providerId,
            @RequestParam Long serviceId) {
        return ResponseEntity.ok(chatRoomService.getOrCreateRoom(clientId, providerId, serviceId));
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<ChatRoomDTO>> getRoomsForUser(@PathVariable Long userId) {
        return ResponseEntity.ok(chatRoomService.getRoomsForUser(userId));
    }
} 