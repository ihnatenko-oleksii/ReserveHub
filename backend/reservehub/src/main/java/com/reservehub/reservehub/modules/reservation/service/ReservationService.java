package com.reservehub.reservehub.modules.reservation.service;

import com.reservehub.reservehub.modules.invoice.service.InvoiceService;
import com.reservehub.reservehub.modules.notification.service.NotificationService;
import com.reservehub.reservehub.modules.reservation.dto.ReservationDTO;
import com.reservehub.reservehub.modules.reservation.dto.ReservationDetailsDTO;
import com.reservehub.reservehub.modules.reservation.dto.ReservationDetailsObligationsDTO;
import com.reservehub.reservehub.modules.reservation.dto.ReservationExportDTO;
import com.reservehub.reservehub.modules.reservation.entity.Reservation;
import com.reservehub.reservehub.modules.reservation.enums.ReservationStatus;
import com.reservehub.reservehub.modules.reservation.exception.ReservationNotFoundException;
import com.reservehub.reservehub.modules.reservation.repository.ReservationRepository;
import com.reservehub.reservehub.modules.service.entity.Service;
import com.reservehub.reservehub.modules.service.repository.ServiceRepository;
import com.reservehub.reservehub.modules.user.entity.User;
import com.reservehub.reservehub.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final ServiceRepository serviceRepository;
    private final InvoiceService invoiceService;
    private final NotificationService notificationService;

    @Transactional
    public ReservationDTO createReservation(ReservationDTO dto) {
        validateReservationData(dto);
        
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        User provider = userRepository.findById(dto.getProviderId())
                .orElseThrow(() -> new RuntimeException("Provider not found"));
        
        Service service = serviceRepository.findById(dto.getServiceId())
                .orElseThrow(() -> new RuntimeException("Service not found"));

        Reservation reservation = new Reservation();
        reservation.setUser(user);
        reservation.setProvider(provider);
        reservation.setService(service);
        reservation.setDate(dto.getDate());
        reservation.setTime(dto.getTime());
        reservation.setNotes(dto.getNotes());
        reservation.setStatus(ReservationStatus.PENDING);
        reservation.setCreatedAt(LocalDateTime.now());
        reservation.setUpdatedAt(LocalDateTime.now());

        ReservationDTO reservationDTO = mapToDTO(reservationRepository.save(reservation));

        notificationService.createNotification(
                service.getOwner(),
                "Nowa rezerwacja usługi: " + service.getName(),
                "my-obligations"
        );

        return reservationDTO;
    }

    @Transactional
    public ReservationDTO updateReservation(Long id, ReservationDTO dto) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ReservationNotFoundException("Reservation not found with id: " + id));

        validateReservationData(dto);

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        User provider = userRepository.findById(dto.getProviderId())
                .orElseThrow(() -> new RuntimeException("Provider not found"));
        
        Service service = serviceRepository.findById(dto.getServiceId())
                .orElseThrow(() -> new RuntimeException("Service not found"));

        ReservationStatus oldStatus = reservation.getStatus();
        reservation.setUser(user);
        reservation.setProvider(provider);
        reservation.setService(service);
        reservation.setDate(dto.getDate());
        reservation.setTime(dto.getTime());
        reservation.setNotes(dto.getNotes());
        reservation.setStatus(dto.getStatus());
        reservation.setUpdatedAt(LocalDateTime.now());

        Reservation savedReservation = reservationRepository.save(reservation);

        // Generate invoice if status changed to CONFIRMED
        if (oldStatus != ReservationStatus.CONFIRMED && dto.getStatus() == ReservationStatus.CONFIRMED) {
            invoiceService.generateInvoiceForReservation(savedReservation.getId());
        }

        return mapToDTO(savedReservation);
    }

    @Transactional
    public ReservationDTO updateStatusReservation(Long id, ReservationStatus status) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ReservationNotFoundException("Reservation not found"));

        reservation.setStatus(status);
        reservation.setUpdatedAt(LocalDateTime.now());

        Reservation res = reservationRepository.save(reservation);
        if (status == ReservationStatus.CONFIRMED) {
            invoiceService.generateInvoiceForReservation(reservation.getId());
        }
        return mapToDTO(res);
    }


    @Transactional
    public void cancelReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ReservationNotFoundException("Reservation not found with id: " + id));
        
        reservation.setStatus(ReservationStatus.CANCELLED);
        reservation.setUpdatedAt(LocalDateTime.now());
        reservationRepository.save(reservation);
    }

    public ReservationDTO getReservationById(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ReservationNotFoundException("Reservation not found with id: " + id));
        return mapToDTO(reservation);
    }

    public List<ReservationDetailsDTO> getAllReservationsForUser(Long userId) {
        return new ArrayList<>(reservationRepository.findAllDetailsForUser(userId));
    }


    public List<ReservationDetailsObligationsDTO> getAllReservationsForProvider(Long providerId) {
        return new ArrayList<>(reservationRepository.findAllDetailsForProvider(providerId));
    }

    private void validateReservationData(ReservationDTO dto) {
        LocalDateTime reservationDateTime = LocalDateTime.of(dto.getDate(), dto.getTime());
        if (reservationDateTime.isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Reservation date and time must be in the future");
        }
    }

    private ReservationDTO mapToDTO(Reservation reservation) {
        ReservationDTO dto = new ReservationDTO();
        dto.setId(reservation.getId());
        dto.setUserId(reservation.getUser().getId());
        dto.setProviderId(reservation.getProvider().getId());
        dto.setServiceId(reservation.getService().getId());
        dto.setDate(reservation.getDate());
        dto.setTime(reservation.getTime());
        dto.setNotes(reservation.getNotes());
        dto.setStatus(reservation.getStatus());
        return dto;
    }
} 