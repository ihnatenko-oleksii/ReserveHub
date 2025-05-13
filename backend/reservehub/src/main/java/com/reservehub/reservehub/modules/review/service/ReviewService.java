package com.reservehub.reservehub.modules.review.service;

import com.reservehub.reservehub.modules.review.dto.ReviewDTO;
import com.reservehub.reservehub.modules.review.entity.Review;
import com.reservehub.reservehub.modules.review.exception.ReviewValidationException;
import com.reservehub.reservehub.modules.review.repository.ReviewRepository;
import com.reservehub.reservehub.modules.reservation.entity.Reservation;
import com.reservehub.reservehub.modules.reservation.enums.ReservationStatus;
import com.reservehub.reservehub.modules.reservation.repository.ReservationRepository;
import com.reservehub.reservehub.modules.service.entity.Service;
import com.reservehub.reservehub.modules.service.repository.ServiceRepository;
import com.reservehub.reservehub.modules.user.entity.User;
import com.reservehub.reservehub.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ReservationRepository reservationRepository;
    private final ServiceRepository serviceRepository;
    private final UserRepository userRepository;

    @Transactional
    public ReviewDTO createReview(ReviewDTO dto) {
        // Validate reservation exists and is completed
        Reservation reservation = reservationRepository.findById(dto.getReservationId())
                .orElseThrow(() -> new ReviewValidationException("Reservation not found"));

        if (reservation.getStatus() != ReservationStatus.COMPLETED) {
            throw new ReviewValidationException("Cannot review a reservation that is not completed");
        }

        // Validate user is the reservation owner
        if (!reservation.getUser().getId().equals(dto.getUserId())) {
            throw new ReviewValidationException("Only the reservation owner can leave a review");
        }

        // Check if review already exists
        if (reviewRepository.existsByReservationId(dto.getReservationId())) {
            throw new ReviewValidationException("A review already exists for this reservation");
        }

        // Get user and service
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new ReviewValidationException("User not found"));
        Service service = serviceRepository.findById(dto.getServiceId())
                .orElseThrow(() -> new ReviewValidationException("Service not found"));

        // Create and save review
        Review review = new Review();
        review.setUser(user);
        review.setService(service);
        review.setReservation(reservation);
        review.setRating(dto.getRating());
        review.setComment(dto.getComment());
        review.setCreatedAt(LocalDateTime.now());
        review.setUpdatedAt(LocalDateTime.now());

        Review savedReview = reviewRepository.save(review);

        // Update service average rating
        updateServiceRating(service);

        return mapToDTO(savedReview);
    }

    public List<ReviewDTO> getReviewsByServiceId(Long serviceId) {
        return reviewRepository.findByServiceId(serviceId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<ReviewDTO> getReviewsByUserId(Long userId) {
        return reviewRepository.findByUserId(userId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private void updateServiceRating(Service service) {
        List<Review> reviews = reviewRepository.findByServiceId(service.getId());
        if (!reviews.isEmpty()) {
            BigDecimal averageRating = reviews.stream()
                    .map(Review::getRating)
                    .reduce(BigDecimal.ZERO, BigDecimal::add)
                    .divide(BigDecimal.valueOf(reviews.size()), 2, RoundingMode.HALF_UP);
            service.setRating(averageRating.doubleValue());
            serviceRepository.save(service);
        }
    }

    private ReviewDTO mapToDTO(Review review) {
        ReviewDTO dto = new ReviewDTO();
        dto.setId(review.getId());
        dto.setUserId(review.getUser().getId());
        dto.setServiceId(review.getService().getId());
        dto.setReservationId(review.getReservation().getId());
        dto.setRating(review.getRating());
        dto.setComment(review.getComment());
        dto.setCreatedAt(review.getCreatedAt());
        return dto;
    }
} 