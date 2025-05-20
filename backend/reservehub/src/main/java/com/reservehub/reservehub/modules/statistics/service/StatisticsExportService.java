package com.reservehub.reservehub.modules.statistics.service;

import com.opencsv.CSVWriter;
import com.reservehub.reservehub.modules.reservation.dto.ReservationExportDTO;
import com.reservehub.reservehub.modules.user.entity.User;
import com.reservehub.reservehub.modules.reservation.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.StringWriter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StatisticsExportService {
    private final ReservationRepository reservationRepository;

    public String exportUserReservationsToCsv(User user) {
        List<ReservationExportDTO> reservations = reservationRepository.findReservationsForExport(user);

        StringWriter writer = new StringWriter();
        try (CSVWriter csvWriter = new CSVWriter(writer)) {
            csvWriter.writeNext(new String[]{"Reservation ID", "Service", "Client", "Price", "Status", "Invoice"});

            for (ReservationExportDTO dto : reservations) {
                csvWriter.writeNext(new String[]{
                        dto.getReservationId().toString(),
                        dto.getServiceName(),
                        dto.getClientName(),
                        dto.getAmount(),
                        dto.getStatus(),
                        dto.getInvoiceStatus() != null ? dto.getInvoiceStatus() : "N/A"
                });
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return writer.toString();
    }
} 