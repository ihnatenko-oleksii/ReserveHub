package com.reservehub.reservehub.modules.statistics.repository;

import com.reservehub.reservehub.modules.invoice.enums.InvoiceStatus;
import com.reservehub.reservehub.modules.reservation.enums.ReservationStatus;
import com.reservehub.reservehub.modules.user.entity.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public class StatisticsRepository {

    @PersistenceContext
    private EntityManager em;

    public Long countServicesByProvider(User user) {
        return em.createQuery(
                        "SELECT COUNT(s) FROM Service s WHERE s.owner = :user", Long.class)
                .setParameter("user", user)
                .getSingleResult();
    }

    public Long countReservationsByClient(User user) {
        return em.createQuery(
                        "SELECT COUNT(r) FROM Reservation r WHERE r.user = :user", Long.class)
                .setParameter("user", user)
                .getSingleResult();
    }

    public Long countReservationsByClientAndStatus(User user, ReservationStatus status) {
        return em.createQuery(
                        "SELECT COUNT(r) FROM Reservation r WHERE r.user = :user AND r.status = :status", Long.class)
                .setParameter("user", user)
                .setParameter("status", status)
                .getSingleResult();
    }

    public BigDecimal calculateTotalRevenueByProviderAndStatus(User user, InvoiceStatus status) {
        return em.createQuery(
                        "SELECT COALESCE(SUM(i.amount), 0) FROM Invoice i WHERE i.provider = :user AND i.status = :status", BigDecimal.class)
                .setParameter("user", user)
                .setParameter("status", status)
                .getSingleResult();
    }

    public List<Object[]> findMonthlyRevenueByProviderAndStatus(User user, InvoiceStatus status, LocalDate startDate) {
        return em.createQuery(
                        "SELECT FUNCTION('TO_CHAR', i.createdAt, 'YYYY-MM') as month, SUM(i.amount) as total " +
                                "FROM Invoice i WHERE i.provider = :user AND i.status = :status AND i.createdAt >= :startDate " +
                                "GROUP BY FUNCTION('TO_CHAR', i.createdAt, 'YYYY-MM') ORDER BY month", Object[].class)
                .setParameter("user", user)
                .setParameter("status", status)
                .setParameter("startDate", startDate)
                .getResultList();
    }

    public List<Object[]> findTopServicesByProvider(User user, InvoiceStatus status, int limit) {
        return em.createQuery(
                        "SELECT s.id, s.name, COUNT(r), COALESCE(SUM(i.amount), 0) " +
                                "FROM Service s LEFT JOIN Reservation r ON r.service = s " +
                                "LEFT JOIN Invoice i ON i.reservation = r " +
                                "WHERE s.owner = :user AND i.status = :status " +
                                "GROUP BY s.id, s.name ORDER BY COUNT(r) DESC", Object[].class)
                .setParameter("user", user)
                .setParameter("status", status)
                .setMaxResults(limit)
                .getResultList();
    }
}
