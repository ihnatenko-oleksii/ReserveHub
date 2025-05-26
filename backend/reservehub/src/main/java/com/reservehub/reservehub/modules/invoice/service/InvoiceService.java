package com.reservehub.reservehub.modules.invoice.service;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.reservehub.reservehub.modules.invoice.dto.InvoiceUserViewDTO;
import com.reservehub.reservehub.modules.invoice.entity.Invoice;
import com.reservehub.reservehub.modules.invoice.enums.InvoiceStatus;
import com.reservehub.reservehub.modules.invoice.exception.InvoiceNotFoundException;
import com.reservehub.reservehub.modules.invoice.repository.InvoiceRepository;
import com.reservehub.reservehub.modules.reservation.entity.Reservation;
import com.reservehub.reservehub.modules.reservation.repository.ReservationRepository;
import com.reservehub.reservehub.modules.notification.service.NotificationService;
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
    private final NotificationService notificationService;
    private static final String INVOICE_DIR = "uploads/invoices";

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

        Invoice savedInvoice = invoiceRepository.save(invoice);

        // Notify provider about invoice creation
        notificationService.createNotification(
            reservation.getProvider(),
            "Invoice created for " + reservation.getService().getName(),
            "invoices"
        );

        return savedInvoice;
    }

    private void generatePdf(Reservation reservation, String pdfPath) throws DocumentException, IOException {
        Document document = new Document();
        PdfWriter.getInstance(document, new FileOutputStream(pdfPath));
        document.open();

        // Fonts
        Font titleFont = new Font(Font.HELVETICA, 20, Font.BOLD);
        Font headerFont = new Font(Font.HELVETICA, 12, Font.BOLD);
        Font normalFont = new Font(Font.HELVETICA, 12);

        // Title
        Paragraph title = new Paragraph("INVOICE", titleFont);
        title.setAlignment(Paragraph.ALIGN_CENTER);
        title.setSpacingAfter(20f);
        document.add(title);

        // Client & Provider Info
        Paragraph clientInfo = new Paragraph("Billed To: " + reservation.getUser().getName(), normalFont);
        Paragraph providerInfo = new Paragraph("Provided By: " + reservation.getProvider().getName(), normalFont);
        clientInfo.setSpacingAfter(5f);
        providerInfo.setSpacingAfter(15f);
        document.add(clientInfo);
        document.add(providerInfo);

        // Table with service info
        PdfPTable table = new PdfPTable(2);
        table.setWidthPercentage(100);
        table.setSpacingBefore(10f);
        table.setSpacingAfter(10f);

        // Column headers
        table.addCell(new Phrase("Service", headerFont));
        table.addCell(new Phrase(reservation.getService().getName(), normalFont));
        table.addCell(new Phrase("Date", headerFont));
        table.addCell(new Phrase(reservation.getDate().toString(), normalFont));
        table.addCell(new Phrase("Time", headerFont));
        table.addCell(new Phrase(reservation.getTime().toString(), normalFont));
        table.addCell(new Phrase("Duration", headerFont));
        table.addCell(new Phrase(reservation.getService().getDuration() + " minutes", normalFont));
        table.addCell(new Phrase("Price", headerFont));
        table.addCell(new Phrase("$" + reservation.getService().getPrice(), normalFont));

        document.add(table);

        // Notes (if any)
        if (reservation.getNotes() != null && !reservation.getNotes().isBlank()) {
            Paragraph notesHeader = new Paragraph("Notes:", headerFont);
            notesHeader.setSpacingBefore(10f);
            Paragraph notes = new Paragraph(reservation.getNotes(), normalFont);
            notes.setSpacingAfter(10f);
            document.add(notesHeader);
            document.add(notes);
        }

        // Footer
        Paragraph issued = new Paragraph("Issued on: " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")), normalFont);
        issued.setSpacingBefore(30f);
        document.add(issued);

        Paragraph thankYou = new Paragraph("Thank you for your business!", normalFont);
        thankYou.setSpacingBefore(15f);
        document.add(thankYou);

        document.close();
    }


    public Invoice getInvoiceById(Long id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new InvoiceNotFoundException("Invoice not found with id: " + id));
    }

    public List<InvoiceUserViewDTO> getInvoicesByUserId(Long userId) {
        List<Invoice> invoices = invoiceRepository.findByClientIdOrProviderId(userId, userId);

        return invoices.stream().map(invoice -> InvoiceUserViewDTO.builder()
                        .id(invoice.getId())
                        .amount(invoice.getAmount())
                        .status(invoice.getStatus().name())
                        .pdfPath(invoice.getPdfPath())
                        .createdAt(invoice.getCreatedAt())

                        .reservationId(invoice.getReservation() != null ? invoice.getReservation().getId() : null)
                        .serviceName(invoice.getReservation() != null && invoice.getReservation().getService() != null
                                ? invoice.getReservation().getService().getName() : null)

                        .clientId(invoice.getClient().getId())
                        .clientName(invoice.getClient().getName())

                        .providerId(invoice.getProvider().getId())
                        .providerName(invoice.getProvider().getName())
                        .build())
                .collect(Collectors.toList());
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