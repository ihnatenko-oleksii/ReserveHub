package com.reservehub.reservehub.modules.service.entity;

import com.reservehub.reservehub.modules.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
@Entity
@Table(name = "services")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Service {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private BigDecimal price;
    private Integer duration;
    private BigDecimal rating;
    private Integer likes;

    @ManyToOne
    private User provider;

    @ManyToOne
    private ServiceCategory category;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
