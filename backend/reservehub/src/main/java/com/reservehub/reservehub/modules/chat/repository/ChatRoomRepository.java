package com.reservehub.reservehub.modules.chat.repository;

import com.reservehub.reservehub.modules.chat.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    Optional<ChatRoom> findByClientIdAndProviderIdAndServiceId(Long clientId, Long providerId, Long serviceId);
    List<ChatRoom> findAllByClientIdOrProviderId(Long clientId, Long providerId);
} 