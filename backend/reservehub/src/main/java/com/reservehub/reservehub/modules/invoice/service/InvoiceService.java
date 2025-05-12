package com.reservehub.reservehub.modules.invoice.service;

import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;
import com.reservehub.reservehub.modules.invoice.entity.Invoice;
import com.reservehub.reservehub.modules.invoice.enums.InvoiceStatus;
import com.reservehub.reservehub.modules.invoice.exception.InvoiceNotFoundException;
import com.reservehub.reservehub.modules.invoice.repository.InvoiceRepository;
import com.reservehub.reservehub.modules.reservation.entity.Reservation;
import com.reservehub.reservehub.modules.reservation.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final ReservationRepository reservationRepository;
    private static final String INVOICE_DIR = "invoices";

    @Transactional
    public Invoice generateInvoiceForReservation(Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        // Create invoice directory if it doesn't exist
        File directory = new File(INVOICE_DIR);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // Generate PDF filename
        String filename = String.format("invoice_%d_%s.pdf", 
            reservationId, 
            LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss")));
        String pdfPath = INVOICE_DIR + File.separator + filename;

        try {
            generatePdf(reservation, pdfPath);
        } catch (DocumentException | IOException e) {
            throw new RuntimeException("Failed to generate PDF", e);
        }

        Invoice invoice = new Invoice();
        invoice.setReservation(reservation);
        invoice.setClient(reservation.getUser());
        invoice.setProvider(reservation.getProvider());
        invoice.setAmount(reservation.getService().getPrice());
        invoice.setStatus(InvoiceStatus.UNPAID);
        invoice.setPdfPath(pdfPath);
        invoice.setCreatedAt(LocalDateTime.now());
        invoice.setUpdatedAt(LocalDateTime.now());

        return invoiceRepository.save(invoice);
    }

    private void generatePdf(Reservation reservation, String pdfPath) throws DocumentException, IOException {
        Document document = new Document();
        PdfWriter.getInstance(document, new FileOutputStream(pdfPath));
        document.open();

        // Add content to PDF
        document.add(new Paragraph("Invoice"));
        document.add(new Paragraph("Client: " + reservation.getUser().getName()));
        document.add(new Paragraph("Provider: " + reservation.getProvider().getName()));
        document.add(new Paragraph("Service: " + reservation.getService().getName()));
        document.add(new Paragraph("Date: " + reservation.getDate()));
        document.add(new Paragraph("Time: " + reservation.getTime()));
        document.add(new Paragraph("Amount: $" + reservation.getService().getPrice()));

        document.close();
    }

    public Invoice getInvoiceById(Long id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new InvoiceNotFoundException("Invoice not found with id: " + id));
    }

    public List<Invoice> getInvoicesByUserId(Long userId) {
        return invoiceRepository.findByClientId(userId);
    }

    public Resource getInvoicePdf(Long id) throws IOException {
        Invoice invoice = getInvoiceById(id);
        Path path = Paths.get(invoice.getPdfPath());
        Resource resource = new UrlResource(path.toUri());

        if (resource.exists() && resource.isReadable()) {
            return resource;
        } else {
            throw new InvoiceNotFoundException("PDF file not found for invoice: " + id);
        }
    }
} 