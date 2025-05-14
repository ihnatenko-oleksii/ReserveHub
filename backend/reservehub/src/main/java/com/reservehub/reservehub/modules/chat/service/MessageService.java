package com.reservehub.reservehub.modules.chat.service;

import com.reservehub.reservehub.modules.chat.dto.MessageDTO;
import com.reservehub.reservehub.modules.chat.entity.ChatRoom;
import com.reservehub.reservehub.modules.chat.entity.Message;
import com.reservehub.reservehub.modules.chat.repository.ChatRoomRepository;
import com.reservehub.reservehub.modules.chat.repository.MessageRepository;
import com.reservehub.reservehub.modules.user.entity.User;
import com.reservehub.reservehub.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;

    @Transactional
    public MessageDTO saveMessage(Long roomId, MessageDTO dto) {
        ChatRoom room = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Chat room not found"));

        User sender = userRepository.findById(dto.getSenderId())
                .orElseThrow(() -> new RuntimeException("Sender not found"));

        // Validate that sender is either client or provider of the chat room
        if (!sender.getId().equals(room.getClient().getId()) && 
            !sender.getId().equals(room.getProvider().getId())) {
            throw new RuntimeException("User is not a participant in this chat room");
        }

        Message message = new Message();
        message.setRoom(room);
        message.setSender(sender);
        message.setContent(dto.getContent());
        message.setSentAt(LocalDateTime.now());

        return mapToDTO(messageRepository.save(message));
    }

    private MessageDTO mapToDTO(Message message) {
        MessageDTO dto = new MessageDTO();
        dto.setId(message.getId());
        dto.setRoomId(message.getRoom().getId());
        dto.setSenderId(message.getSender().getId());
        dto.setContent(message.getContent());
        dto.setSentAt(message.getSentAt());
        return dto;
    }
} 