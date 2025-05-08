package com.reservehub.reservehub.modules.service.dto;

import com.reservehub.reservehub.modules.service.enums.ServiceCategory;
import lombok.Data;

@Data
public class ServiceFilterDTO {
    private ServiceCategory category;
    private Double minPrice;
    private Double maxPrice;
    private Double minRating;
    private Integer minLikes;
    private Integer maxDuration;
    private Long ownerId;
} 