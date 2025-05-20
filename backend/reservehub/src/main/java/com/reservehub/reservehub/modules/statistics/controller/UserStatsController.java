package com.reservehub.reservehub.modules.statistics.controller;

import com.reservehub.reservehub.modules.statistics.dto.*;
import com.reservehub.reservehub.modules.statistics.service.UserStatsService;
import com.reservehub.reservehub.modules.statistics.service.StatisticsExportService;
import com.reservehub.reservehub.modules.user.entity.User;
import com.reservehub.reservehub.security.CurrentUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stats")
@RequiredArgsConstructor
public class UserStatsController {
    private final UserStatsService userStatsService;
    private final StatisticsExportService statisticsExportService;

    @GetMapping("/summary")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<UserStatsSummaryDTO> getUserStatsSummary(@CurrentUser User user) {
        return ResponseEntity.ok(userStatsService.getUserStatsSummary(user));
    }

    @GetMapping("/revenue-by-month")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<MonthlyRevenueDTO>> getMonthlyRevenue(@CurrentUser User user) {
        return ResponseEntity.ok(userStatsService.getMonthlyRevenue(user));
    }

    @GetMapping("/top-services")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<TopServiceDTO>> getTopServices(@CurrentUser User user) {
        return ResponseEntity.ok(userStatsService.getTopServices(user));
    }

    @GetMapping("/export")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<String> exportUserData(@CurrentUser User user) {
        String csvContent = statisticsExportService.exportUserReservationsToCsv(user);
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.TEXT_PLAIN);
        headers.setContentDispositionFormData("attachment", "user_reservations.csv");
        
        return ResponseEntity.ok()
                .headers(headers)
                .body(csvContent);
    }
} 