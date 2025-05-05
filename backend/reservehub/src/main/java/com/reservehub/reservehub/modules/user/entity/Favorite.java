package com.reservehub.reservehub.modules.user.entity;

import com.reservehub.reservehub.modules.service.entity.Service;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "favorites")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Favorite implements Serializable {

    @EmbeddedId
    private FavoriteId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("serviceId")
    @JoinColumn(name = "service_id")
    private Service service;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
