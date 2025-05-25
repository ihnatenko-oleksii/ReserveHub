package com.reservehub.reservehub.modules.notification.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationDTO {
    private Long id;
    private String content;
    private String link;
    private LocalDateTime createdAt;
}