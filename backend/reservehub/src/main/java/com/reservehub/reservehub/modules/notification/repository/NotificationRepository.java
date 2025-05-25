package com.reservehub.reservehub.modules.notification.repository;

import com.reservehub.reservehub.modules.notification.entity.Notification;
import com.reservehub.reservehub.modules.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserOrderByCreatedAtDesc(User user);
}