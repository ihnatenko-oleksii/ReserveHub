package com.reservehub.reservehub.modules.service.repository;

import com.reservehub.reservehub.modules.service.entity.ServiceImage;
import com.reservehub.reservehub.modules.service.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceImageRepository extends JpaRepository<ServiceImage, Long> {
    List<ServiceImage> findByService(Service service);
    void deleteByService(Service service);
}