package com.reservehub.reservehub.modules.statistics.service;

import com.reservehub.reservehub.modules.invoice.enums.InvoiceStatus;
import com.reservehub.reservehub.modules.reservation.enums.ReservationStatus;
import com.reservehub.reservehub.modules.statistics.dto.MonthlyRevenueDTO;
import com.reservehub.reservehub.modules.statistics.dto.TopServiceDTO;
import com.reservehub.reservehub.modules.statistics.dto.UserStatsSummaryDTO;
import com.reservehub.reservehub.modules.statistics.repository.StatisticsRepository;
import com.reservehub.reservehub.modules.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserStatsService {

    private final StatisticsRepository statisticsRepository;

    @Transactional(readOnly = true)
    public UserStatsSummaryDTO getUserStatsSummary(User user) {
        UserStatsSummaryDTO summary = new UserStatsSummaryDTO();

        summary.setTotalServices(statisticsRepository.countServicesByProvider(user));
        summary.setTotalReservations(statisticsRepository.countReservationsByClient(user));
        summary.setCompletedReservations(
                statisticsRepository.countReservationsByClientAndStatus(user, ReservationStatus.COMPLETED)
        );
        summary.setTotalRevenue(
                statisticsRepository.calculateTotalRevenueByProviderAndStatus(user, InvoiceStatus.PAID)
        );

        return summary;
    }

    @Transactional(readOnly = true)
    public List<MonthlyRevenueDTO> getMonthlyRevenue(User user) {
        LocalDate sixMonthsAgo = LocalDate.now().minusMonths(6);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM");

        return statisticsRepository
                .findMonthlyRevenueByProviderAndStatus(user, InvoiceStatus.PAID, sixMonthsAgo)
                .stream()
                .map(row -> {
                    MonthlyRevenueDTO dto = new MonthlyRevenueDTO();
                    dto.setMonth((String) row[0]);
                    dto.setTotal((java.math.BigDecimal) row[1]);
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<TopServiceDTO> getTopServices(User user) {
        return statisticsRepository
                .findTopServicesByProvider(user, InvoiceStatus.PAID, 5)
                .stream()
                .map(row -> {
                    TopServiceDTO dto = new TopServiceDTO();
                    dto.setServiceId((Long) row[0]);
                    dto.setServiceName((String) row[1]);
                    dto.setReservationCount((Long) row[2]);
                    dto.setTotalRevenue((java.math.BigDecimal) row[3]);
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
