package com.reservehub.reservehub.modules.service.dto;

import com.reservehub.reservehub.modules.service.enums.ServiceCategory;
import lombok.Data;

@Data
public class ServiceDTO {
    private Long id;
    private String name;
    private String description;
    private ServiceCategory category;
    private Double price;
    private Integer duration;
    private Double rating;
    private Integer likes;
    private Long ownerId;
    private String ownerName;
} 