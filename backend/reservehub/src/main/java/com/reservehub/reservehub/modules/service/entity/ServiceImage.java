package com.reservehub.reservehub.modules.service.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "service_images")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ServiceImage {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id")
    private Service service;
}
