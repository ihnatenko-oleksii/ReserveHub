package com.reservehub.reservehub.modules.statistics.service;

import com.reservehub.reservehub.modules.service.entity.Service;
import com.reservehub.reservehub.modules.statistics.dto.*;
import com.reservehub.reservehub.modules.statistics.repository.StatisticsRepository;
import com.reservehub.reservehub.modules.user.entity.User;
import com.reservehub.reservehub.modules.reservation.enums.ReservationStatus;
import com.reservehub.reservehub.modules.invoice.enums.InvoiceStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class UserStatsService {
    private final StatisticsRepository statisticsRepository;

    @Transactional(readOnly = true)
    public UserStatsSummaryDTO getUserStatsSummary(User user) {
        UserStatsSummaryDTO summary = new UserStatsSummaryDTO();
        
        summary.setTotalServices(statisticsRepository.countServicesByProvider(user));
        summary.setTotalReservations(statisticsRepository.countReservationsByClient(user));
        summary.setCompletedReservations(statisticsRepository.countReservationsByClientAndStatus(user, ReservationStatus.COMPLETED.name()));
        summary.setTotalRevenue(statisticsRepository.calculateTotalRevenueByProviderAndStatus(user, InvoiceStatus.PAID));
        
        return summary;
    }

    @Transactional(readOnly = true)
    public List<MonthlyRevenueDTO> getMonthlyRevenue(User user) {
        LocalDate sixMonthsAgo = LocalDate.now().minusMonths(6);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM");
        
        return statisticsRepository.findMonthlyRevenueByProviderAndStatus(
                user, 
                InvoiceStatus.PAID, 
                sixMonthsAgo
            ).stream()
            .map(result -> {
                MonthlyRevenueDTO dto = new MonthlyRevenueDTO();
                dto.setMonth((String) result[0]);
                dto.setTotal((BigDecimal) result[1]);
                return dto;
            })
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<TopServiceDTO> getTopServices(User user) {
        return statisticsRepository
                .findTopServicesByProvider(user, InvoiceStatus.PAID)
                .stream()
                .map(result -> {
                    TopServiceDTO dto = new TopServiceDTO();
                    dto.setServiceId((Long) result[0]);
                    dto.setServiceName((String) result[1]);
                    dto.setReservationCount((Long) result[2]);
                    dto.setTotalRevenue((BigDecimal) result[3]);
                    return dto;
                })
                .collect(Collectors.toList());
    }
} 