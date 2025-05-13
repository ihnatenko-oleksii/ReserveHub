package com.reservehub.reservehub.modules.service.repository;

import com.reservehub.reservehub.modules.service.entity.Favorite;
import com.reservehub.reservehub.modules.service.entity.FavoriteId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, FavoriteId> {
    boolean existsById(FavoriteId id);
    void deleteById(FavoriteId id);
    List<Favorite> findByUserId(Long userId);
} 