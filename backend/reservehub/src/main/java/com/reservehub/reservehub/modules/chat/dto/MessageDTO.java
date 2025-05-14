package com.reservehub.reservehub.modules.chat.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MessageDTO {
    private Long id;
    private Long roomId;
    private Long senderId;
    private String content;
    private LocalDateTime sentAt;
} 