package com.reservehub.reservehub.modules.notification.controller;

import com.reservehub.reservehub.security.CurrentUser;
import com.reservehub.reservehub.modules.auth.model.UserPrincipal;
import com.reservehub.reservehub.modules.notification.dto.NotificationDTO;
import com.reservehub.reservehub.modules.notification.service.NotificationService;
import com.reservehub.reservehub.modules.user.entity.User;
import com.reservehub.reservehub.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;
    private final UserRepository userRepository;

    @GetMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<NotificationDTO>> getMyNotifications(@CurrentUser UserPrincipal userPrincipal) {
        User user = userRepository.getReferenceById(userPrincipal.getId());
        return ResponseEntity.ok(notificationService.getUserNotifications(user));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<NotificationDTO> createNotification(
            @RequestParam Long userId,
            @RequestParam String content,
            @RequestParam String link
    ) {
        User user = userRepository.getReferenceById(userId);
        return ResponseEntity.ok(notificationService.createNotification(user, content, link));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long id, @CurrentUser UserPrincipal userPrincipal) {
        User user = userRepository.getReferenceById(userPrincipal.getId());
        notificationService.deleteNotification(id, user);
        return ResponseEntity.noContent().build();
    }
}
