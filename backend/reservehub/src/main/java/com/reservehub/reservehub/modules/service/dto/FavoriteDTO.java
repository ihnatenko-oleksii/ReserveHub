package com.reservehub.reservehub.modules.service.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FavoriteDTO {
    private Long userId;
    private Long serviceId;
    private LocalDateTime createdAt;
} 