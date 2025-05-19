package com.reservehub.reservehub.modules.chat.service;

import com.reservehub.reservehub.modules.chat.dto.MessageDTO;
import com.reservehub.reservehub.modules.chat.entity.ChatRoom;
import com.reservehub.reservehub.modules.chat.entity.Message;
import com.reservehub.reservehub.modules.chat.repository.ChatRoomRepository;
import com.reservehub.reservehub.modules.chat.repository.MessageRepository;
import com.reservehub.reservehub.modules.user.entity.User;
import com.reservehub.reservehub.modules.user.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;

    @Transactional
    public MessageDTO saveMessage(Long roomId, MessageDTO messageDTO) {
        ChatRoom chatRoom = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new EntityNotFoundException("Chat room not found"));

        User sender = userRepository.findById(messageDTO.getSenderId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Message message = new Message();
        message.setChatRoom(chatRoom);
        message.setSender(sender);
        message.setContent(messageDTO.getContent());

        Message savedMessage = messageRepository.save(message);

        return convertToDTO(savedMessage);
    }

    @Transactional(readOnly = true)
    public List<MessageDTO> getMessagesByRoomId(Long roomId) {
        // Validate room exists
        if (!chatRoomRepository.existsById(roomId)) {
            throw new EntityNotFoundException("Chat room not found");
        }

        // Get messages and convert to DTOs
        return messageRepository.findAllByRoomIdOrderBySentAtAsc(roomId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private MessageDTO convertToDTO(Message message) {
        MessageDTO dto = new MessageDTO();
        dto.setId(message.getId());
        dto.setRoomId(message.getChatRoom().getId());
        dto.setSenderId(message.getSender().getId());
        dto.setContent(message.getContent());
        dto.setSentAt(message.getSentAt());
        return dto;
    }
} 