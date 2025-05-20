package com.reservehub.reservehub.modules.statistics.service;

import com.opencsv.CSVWriter;
import com.reservehub.reservehub.modules.user.entity.User;
import com.reservehub.reservehub.modules.reservation.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.StringWriter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StatisticsExportService {
    private final ReservationRepository reservationRepository;

    public String exportUserReservationsToCsv(User user) {
        StringWriter writer = new StringWriter();
        try (CSVWriter csvWriter = new CSVWriter(writer)) {
            // Write header
            String[] header = {"Reservation ID", "Service Name", "Client Name", "Price", "Status", "Invoice Status"};
            csvWriter.writeNext(header);

            // Get user's reservations
            List<Object[]> reservations = reservationRepository.findUserReservationsForExport(user);

            // Write data
            for (Object[] reservation : reservations) {
                String[] line = {
                    String.valueOf(reservation[0]), // reservationId
                    String.valueOf(reservation[1]), // serviceName
                    String.valueOf(reservation[2]), // clientName
                    String.valueOf(reservation[3]), // price
                    String.valueOf(reservation[4]), // status
                    String.valueOf(reservation[5])  // invoiceStatus
                };
                csvWriter.writeNext(line);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error exporting reservations to CSV", e);
        }
        return writer.toString();
    }
} 