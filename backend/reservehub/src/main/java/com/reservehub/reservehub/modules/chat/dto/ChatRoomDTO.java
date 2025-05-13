package com.reservehub.reservehub.modules.chat.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ChatRoomDTO {
    private Long id;
    private Long clientId;
    private Long providerId;
    private Long serviceId;
    private LocalDateTime createdAt;
} 