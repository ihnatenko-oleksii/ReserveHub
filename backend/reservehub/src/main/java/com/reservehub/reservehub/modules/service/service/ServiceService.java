package com.reservehub.reservehub.modules.service.service;

import com.reservehub.reservehub.modules.service.dto.ServiceDTO;
import com.reservehub.reservehub.modules.service.dto.ServiceFilterDTO;
import com.reservehub.reservehub.modules.service.dto.ServiceImageDTO;
import com.reservehub.reservehub.modules.service.entity.Service;
import com.reservehub.reservehub.modules.service.entity.ServiceImage;
import com.reservehub.reservehub.modules.service.repository.ServiceImageRepository;
import com.reservehub.reservehub.modules.service.repository.ServiceRepository;
import com.reservehub.reservehub.modules.user.entity.User;
import com.reservehub.reservehub.modules.user.repository.UserRepository;
import com.reservehub.reservehub.modules.service.exception.ServiceNotFoundException;
import com.reservehub.reservehub.modules.utils.files.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class ServiceService {
    private final ServiceRepository serviceRepository;
    private final UserRepository userRepository;
    private final ServiceImageRepository serviceImageRepository;

    private final FileStorageService fileStorageService;


    @Transactional(readOnly = true)
    public List<ServiceDTO> getAllServices(ServiceFilterDTO filter) {
        List<Service> services = serviceRepository.findWithFilters(
                filter.getCategory(),
                filter.getMinPrice(),
                filter.getMaxPrice(),
                filter.getMinRating(),
                filter.getMinLikes(),
                filter.getMaxDuration(),
                filter.getOwnerId()
        );
        return services.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ServiceDTO getServiceById(Long id) {
        Service service = serviceRepository.findById(id)
                .orElseThrow(() -> new ServiceNotFoundException("Service not found with id: " + id));
        return mapToDTO(service);
    }

    @Transactional(readOnly = true)
    public List<ServiceDTO> getServicesByUserId(Long userId) {
        return serviceRepository.findByOwnerId(userId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public ServiceDTO createService(ServiceDTO serviceDTO, Long ownerId) {
        User owner = userRepository.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Service service = new Service();
        updateServiceFromDTO(service, serviceDTO);
        service.setOwner(owner);
        
        return mapToDTO(serviceRepository.save(service));
    }

    // ServiceService.java

    @Transactional
    @PreAuthorize("hasRole('ADMIN') or @serviceService.isOwner(#id, authentication.principal.id)")
    public ServiceDTO updateService(Long id, ServiceDTO serviceDTO, List<MultipartFile> images) {
        Service service = serviceRepository.findById(id)
                .orElseThrow(() -> new ServiceNotFoundException("Service not found with id: " + id));

        updateServiceFromDTO(service, serviceDTO);

        serviceImageRepository.deleteByService(service);

        List<ServiceImage> savedImages = new ArrayList<>();
        for (MultipartFile file : images) {
            String url = fileStorageService.storeFile(file);
            ServiceImage image = ServiceImage.builder()
                    .imageUrl(url)
                    .service(service)
                    .build();
            savedImages.add(image);
        }
        serviceImageRepository.saveAll(savedImages);

        return mapToDTO(serviceRepository.save(service));
    }



    @Transactional
    @PreAuthorize("hasRole('ADMIN') or @serviceService.isOwner(#id, authentication.principal.id)")
    public void deleteService(Long id) {
        if (!serviceRepository.existsById(id)) {
            throw new ServiceNotFoundException("Service not found with id: " + id);
        }
        serviceRepository.deleteById(id);
    }

    public boolean isOwner(Long serviceId, Long userId) {
        return serviceRepository.findById(serviceId)
                .map(service -> service.getOwner().getId().equals(userId))
                .orElse(false);
    }

    private ServiceDTO mapToDTO(Service service) {
        List<ServiceImageDTO> imageDTOs = Optional.ofNullable(service.getImages())
                .orElse(Collections.emptyList()).stream()
                .map(image -> ServiceImageDTO.builder()
                        .id(image.getId())
                        .imageUrl(image.getImageUrl())
                        .build())
                .toList();

        ServiceDTO dto = new ServiceDTO();
        dto.setId(service.getId());
        dto.setName(service.getName());
        dto.setDescription(service.getDescription());
        dto.setCategory(service.getCategory());
        dto.setPrice(service.getPrice().doubleValue());
        dto.setDuration(service.getDuration());
        dto.setRating(service.getRating());
        dto.setLikes(service.getLikes());
        dto.setOwnerId(service.getOwner().getId());
        dto.setOwnerName(service.getOwner().getName());
        dto.setImages(imageDTOs);
        return dto;
    }

    private void updateServiceFromDTO(Service service, ServiceDTO dto) {
        service.setName(dto.getName());
        service.setDescription(dto.getDescription());
        service.setCategory(dto.getCategory());
        service.setPrice(BigDecimal.valueOf(dto.getPrice()));
        service.setDuration(dto.getDuration());
    }
} 