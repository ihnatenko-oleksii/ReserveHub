package com.reservehub.reservehub.modules.service.service;

import com.reservehub.reservehub.modules.service.dto.FavoriteDTO;
import com.reservehub.reservehub.modules.service.entity.Favorite;
import com.reservehub.reservehub.modules.service.entity.FavoriteId;
import com.reservehub.reservehub.modules.service.exception.FavoriteException;
import com.reservehub.reservehub.modules.service.repository.FavoriteRepository;
import com.reservehub.reservehub.modules.service.entity.Service;
import com.reservehub.reservehub.modules.service.repository.ServiceRepository;
import com.reservehub.reservehub.modules.user.entity.User;
import com.reservehub.reservehub.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class FavoriteService {
    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    private final ServiceRepository serviceRepository;

    @Transactional
    public FavoriteDTO addFavorite(FavoriteDTO dto) {
        // Validate user and service exist
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new FavoriteException("User not found"));
        
        Service service = serviceRepository.findById(dto.getServiceId())
                .orElseThrow(() -> new FavoriteException("Service not found"));

        // Check if favorite already exists
        FavoriteId favoriteId = new FavoriteId(dto.getUserId(), dto.getServiceId());
        if (favoriteRepository.existsById(favoriteId)) {
            throw new FavoriteException("Service is already in favorites");
        }

        // Create and save favorite
        Favorite favorite = new Favorite();
        favorite.setId(favoriteId);
        favorite.setUser(user);
        favorite.setService(service);
        favorite.setCreatedAt(LocalDateTime.now());
        favorite.setUpdatedAt(LocalDateTime.now());

        return mapToDTO(favoriteRepository.save(favorite));
    }

    @Transactional
    public void removeFavorite(Long userId, Long serviceId) {
        FavoriteId favoriteId = new FavoriteId(userId, serviceId);
        if (!favoriteRepository.existsById(favoriteId)) {
            throw new FavoriteException("Favorite not found");
        }
        favoriteRepository.deleteById(favoriteId);
    }

    public List<FavoriteDTO> getFavoritesByUserId(Long userId) {
        return favoriteRepository.findByUserId(userId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private FavoriteDTO mapToDTO(Favorite favorite) {
        FavoriteDTO dto = new FavoriteDTO();
        dto.setUserId(favorite.getUser().getId());
        dto.setServiceId(favorite.getService().getId());
        dto.setCreatedAt(favorite.getCreatedAt());
        return dto;
    }
} 