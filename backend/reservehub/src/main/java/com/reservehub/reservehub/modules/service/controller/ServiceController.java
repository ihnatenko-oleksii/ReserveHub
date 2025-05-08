package com.reservehub.reservehub.modules.service.controller;

import com.reservehub.reservehub.modules.service.dto.ServiceDTO;
import com.reservehub.reservehub.modules.service.dto.ServiceFilterDTO;
import com.reservehub.reservehub.modules.service.service.ServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        return ResponseEntity.ok(serviceService.getServicesByUserId(userId));
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ServiceDTO> createService(
            @RequestBody ServiceDTO serviceDTO,
            @AuthenticationPrincipal Long userId) {
        return ResponseEntity.ok(serviceService.createService(serviceDTO, userId));
    }

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ServiceDTO> updateService(
            @PathVariable Long id,
            @RequestBody ServiceDTO serviceDTO) {
        return ResponseEntity.ok(serviceService.updateService(id, serviceDTO));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        serviceService.deleteService(id);
        return ResponseEntity.noContent().build();
    }
} 