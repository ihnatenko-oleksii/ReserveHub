package com.reservehub.reservehub.modules.reservation.controller;

import com.reservehub.reservehub.modules.reservation.dto.ReservationDTO;
import com.reservehub.reservehub.modules.reservation.dto.ReservationDetailsDTO;
import com.reservehub.reservehub.modules.reservation.dto.ReservationDetailsObligationsDTO;
import com.reservehub.reservehub.modules.reservation.dto.ReservationExportDTO;
import com.reservehub.reservehub.modules.reservation.enums.ReservationStatus;
import com.reservehub.reservehub.modules.reservation.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {
    private final ReservationService reservationService;

    @PostMapping
    public ResponseEntity<ReservationDTO> createReservation(@RequestBody ReservationDTO reservationDTO) {
        return ResponseEntity.ok(reservationService.createReservation(reservationDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReservationDTO> updateReservation(
            @PathVariable Long id,
            @RequestBody ReservationDTO reservationDTO) {
        return ResponseEntity.ok(reservationService.updateReservation(id, reservationDTO));
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<ReservationDTO> updateStatusReservation(
            @PathVariable Long id,
            @RequestParam ReservationStatus status) {
        return ResponseEntity.ok(reservationService.updateStatusReservation(id, status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelReservation(@PathVariable Long id) {
        reservationService.cancelReservation(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservationDTO> getReservationById(@PathVariable Long id) {
        return ResponseEntity.ok(reservationService.getReservationById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ReservationDetailsDTO>> getAllReservationsForUser(@PathVariable Long userId) {
        return ResponseEntity.ok(reservationService.getAllReservationsForUser(userId));
    }

    @GetMapping("/provider/{providerId}")
    public ResponseEntity<List<ReservationDetailsObligationsDTO>> getAllReservationsForProvider(@PathVariable Long providerId) {
        return ResponseEntity.ok(reservationService.getAllReservationsForProvider(providerId));
    }
}
