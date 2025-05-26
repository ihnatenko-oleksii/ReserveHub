package com.reservehub.reservehub.modules.chat.controller;

import com.reservehub.reservehub.modules.chat.dto.MessageDTO;
import com.reservehub.reservehub.modules.chat.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatWebSocketController {
    private final MessageService messageService;

    @MessageMapping("/chat/{roomId}")
    @SendTo("/topic/chat/{roomId}")
    public MessageDTO sendMessage(Long roomId, MessageDTO messageDTO) {
        return messageService.saveMessage(roomId, messageDTO);
    }
} 