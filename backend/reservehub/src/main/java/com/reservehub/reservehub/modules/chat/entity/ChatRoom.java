package com.reservehub.reservehub.modules.chat.entity;

import com.reservehub.reservehub.modules.service.entity.Service;
import com.reservehub.reservehub.modules.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "chat_rooms")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class ChatRoom {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User client;

    @ManyToOne
    private User provider;

    @ManyToOne
    private Service service;

    private LocalDateTime createdAt;
}
