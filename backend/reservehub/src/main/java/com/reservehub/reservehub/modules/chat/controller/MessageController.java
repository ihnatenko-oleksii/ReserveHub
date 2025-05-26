package com.reservehub.reservehub.modules.chat.controller;

import com.reservehub.reservehub.modules.chat.dto.MessageDTO;
import com.reservehub.reservehub.modules.chat.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessageController {
    private final MessageService messageService;

    @GetMapping("/room/{roomId}")
    public ResponseEntity<List<MessageDTO>> getMessagesByRoomId(@PathVariable Long roomId) {
        return ResponseEntity.ok(messageService.getMessagesByRoomId(roomId));
    }
} 