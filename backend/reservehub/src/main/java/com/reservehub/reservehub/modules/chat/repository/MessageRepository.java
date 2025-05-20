package com.reservehub.reservehub.modules.chat.repository;

import com.reservehub.reservehub.modules.chat.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findAllByRoom_IdOrderBySentAtAsc(Long roomId);
} 