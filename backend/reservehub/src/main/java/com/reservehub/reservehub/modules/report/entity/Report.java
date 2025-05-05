package com.reservehub.reservehub.modules.report.entity;

import com.reservehub.reservehub.modules.user.entity.User;
import com.reservehub.reservehub.modules.report.enums.ReportType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "reports")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Report {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @Enumerated(EnumType.STRING)
    private ReportType type;

    private String dateRange;
    private String filePath;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
