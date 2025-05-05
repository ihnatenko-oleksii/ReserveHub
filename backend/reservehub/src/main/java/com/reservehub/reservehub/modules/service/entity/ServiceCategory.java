package com.reservehub.reservehub.modules.service.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "service_categories")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class ServiceCategory {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String icon;
    private String color;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}