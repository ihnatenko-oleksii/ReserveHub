package com.reservehub.reservehub.modules.notification.service;

import com.reservehub.reservehub.modules.notification.dto.NotificationDTO;
import com.reservehub.reservehub.modules.notification.entity.Notification;
import com.reservehub.reservehub.modules.notification.repository.NotificationRepository;
import com.reservehub.reservehub.modules.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public List<NotificationDTO> getUserNotifications(User user) {
        return notificationRepository.findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public NotificationDTO createNotification(User user, String content, String link) {
        Notification notification = Notification.builder()
                .user(user)
                .content(content)
                .link(link)
                .build();
        return mapToDTO(notificationRepository.save(notification));
    }

    public void deleteNotification(Long id, User user) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        if (!notification.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        notificationRepository.delete(notification);
    }

    private NotificationDTO mapToDTO(Notification notification) {
        return NotificationDTO.builder()
                .id(notification.getId())
                .content(notification.getContent())
                .link(notification.getLink())
                .createdAt(notification.getCreatedAt())
                .build();
    }
}