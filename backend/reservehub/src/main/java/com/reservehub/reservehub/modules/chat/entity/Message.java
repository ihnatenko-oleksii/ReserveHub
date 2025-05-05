package com.reservehub.reservehub.modules.chat.entity;

import com.reservehub.reservehub.modules.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Message {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private ChatRoom room;

    @ManyToOne
    private User sender;

    private String content;
    private LocalDateTime sentAt;
}
