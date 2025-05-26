package com.reservehub.reservehub.modules.service.controller;

import com.reservehub.reservehub.modules.auth.model.UserPrincipal;
import com.reservehub.reservehub.modules.service.dto.ServiceDTO;
import com.reservehub.reservehub.modules.service.dto.ServiceFilterDTO;
import com.reservehub.reservehub.modules.service.enums.ServiceCategory;
import com.reservehub.reservehub.modules.service.service.ServiceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
public class ServiceController {
    private final ServiceService serviceService;


    @GetMapping
    public ResponseEntity<List<ServiceDTO>> getAllServices(ServiceFilterDTO filter) {
        return ResponseEntity.ok(serviceService.getAllServices(filter));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceDTO> getServiceById(@PathVariable Long id) {
        return ResponseEntity.ok(serviceService.getServiceById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ServiceDTO>> getServicesByUserId(@PathVariable Long userId) {
        log.info("getServicesByUserId {}", userId);
        return ResponseEntity.ok(serviceService.getServicesByUserId(userId));
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ServiceDTO> createService(
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam ServiceCategory category,
            @RequestParam Double price,
            @RequestParam Integer duration,
            @RequestParam(required = false) MultipartFile image,
            @AuthenticationPrincipal UserPrincipal user) {
        ServiceDTO serviceDTO = ServiceDTO.builder()
                .id(null)
                .name(name)
                .description(description)
                .category(category)
                .price(price)
                .duration(duration)
                .rating(null)
                .likes(0)
                .ownerId(user.getId())
                .ownerName(user.getName())
                .build();
        return ResponseEntity.ok(serviceService.createService(serviceDTO, user.getId()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ServiceDTO> updateService(
            @PathVariable Long id,
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam Double price,
            @RequestParam Integer duration,
            @RequestParam ServiceCategory category,
            @RequestParam(required = false) List<MultipartFile> images,
            @AuthenticationPrincipal UserPrincipal user) {

        ServiceDTO serviceDTO = ServiceDTO.builder()
                .name(name)
                .description(description)
                .price(price)
                .duration(duration)
                .category(category)
                .ownerId(user.getId())
                .build();

        return ResponseEntity.ok(serviceService.updateService(id, serviceDTO, images != null ? images : List.of()));
    }




    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        serviceService.deleteService(id);
        return ResponseEntity.noContent().build();
    }
} 