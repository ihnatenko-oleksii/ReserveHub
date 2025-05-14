package com.reservehub.reservehub.modules.chat.service;

import com.reservehub.reservehub.modules.chat.dto.ChatRoomDTO;
import com.reservehub.reservehub.modules.chat.entity.ChatRoom;
import com.reservehub.reservehub.modules.chat.repository.ChatRoomRepository;
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
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;
    private final ServiceRepository serviceRepository;

    @Transactional
    public ChatRoomDTO getOrCreateRoom(Long clientId, Long providerId, Long serviceId) {
        // Check if room already exists
        return chatRoomRepository.findByClientIdAndProviderIdAndServiceId(clientId, providerId, serviceId)
                .map(this::mapToDTO)
                .orElseGet(() -> createNewRoom(clientId, providerId, serviceId));
    }

    public List<ChatRoomDTO> getRoomsForUser(Long userId) {
        return chatRoomRepository.findAllByClientIdOrProviderId(userId, userId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private ChatRoomDTO createNewRoom(Long clientId, Long providerId, Long serviceId) {
        User client = userRepository.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client not found"));
        
        User provider = userRepository.findById(providerId)
                .orElseThrow(() -> new RuntimeException("Provider not found"));
        
        Service service = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new RuntimeException("Service not found"));

        ChatRoom room = new ChatRoom();
        room.setClient(client);
        room.setProvider(provider);
        room.setService(service);
        room.setCreatedAt(LocalDateTime.now());

        return mapToDTO(chatRoomRepository.save(room));
    }

    private ChatRoomDTO mapToDTO(ChatRoom room) {
        ChatRoomDTO dto = new ChatRoomDTO();
        dto.setId(room.getId());
        dto.setClientId(room.getClient().getId());
        dto.setProviderId(room.getProvider().getId());
        dto.setServiceId(room.getService().getId());
        dto.setCreatedAt(room.getCreatedAt());
        return dto;
    }
} 