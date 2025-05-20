package com.reservehub.reservehub.modules.statistics.service;

import com.reservehub.reservehub.modules.statistics.dto.*;
import com.reservehub.reservehub.modules.service.repository.ServiceRepository;
import com.reservehub.reservehub.modules.reservation.repository.ReservationRepository;
import com.reservehub.reservehub.modules.invoice.repository.InvoiceRepository;
import com.reservehub.reservehub.modules.user.entity.User;
import com.reservehub.reservehub.modules.reservation.enums.ReservationStatus;
import com.reservehub.reservehub.modules.invoice.entity.InvoiceStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserStatsService {
    private final ServiceRepository serviceRepository;
    private final ReservationRepository reservationRepository;
    private final InvoiceRepository invoiceRepository;

    @Transactional(readOnly = true)
    public UserStatsSummaryDTO getUserStatsSummary(User user) {
        UserStatsSummaryDTO summary = new UserStatsSummaryDTO();
        
        summary.setTotalServices(serviceRepository.countByProvider(user));
        summary.setTotalReservations(reservationRepository.countByClient(user));
        summary.setCompletedReservations(reservationRepository.countByClientAndStatus(user, ReservationStatus.COMPLETED));
        summary.setTotalRevenue(invoiceRepository.calculateTotalRevenueByProviderAndStatus(user, InvoiceStatus.PAID));
        
        return summary;
    }

    @Transactional(readOnly = true)
    public List<MonthlyRevenueDTO> getMonthlyRevenue(User user) {
        LocalDate sixMonthsAgo = LocalDate.now().minusMonths(6);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM");
        
        return invoiceRepository.findMonthlyRevenueByProviderAndStatus(
                user, 
                InvoiceStatus.PAID, 
                sixMonthsAgo
            ).stream()
            .map(result -> {
                MonthlyRevenueDTO dto = new MonthlyRevenueDTO();
                dto.setMonth(result.getMonth().format(formatter));
                dto.setTotal(result.getTotal());
                return dto;
            })
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<TopServiceDTO> getTopServices(User user) {
        return serviceRepository.findTopServicesByProvider(user, 5)
            .stream()
            .map(result -> {
                TopServiceDTO dto = new TopServiceDTO();
                dto.setServiceId(result.getServiceId());
                dto.setServiceName(result.getServiceName());
                dto.setReservationCount(result.getReservationCount());
                dto.setTotalRevenue(result.getTotalRevenue());
                return dto;
            })
            .collect(Collectors.toList());
    }
} 