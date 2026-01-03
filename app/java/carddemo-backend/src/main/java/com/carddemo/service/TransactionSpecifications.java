package com.carddemo.service;

import com.carddemo.entity.TransactionHistory;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.Predicate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class TransactionSpecifications {

    public static Specification<TransactionHistory> build(List<Integer> cardIds, LocalDateTime startDate, LocalDateTime endDate, String transactionType, String merchantName) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (cardIds != null && !cardIds.isEmpty()) {
                predicates.add(root.get("cardId").in(cardIds));
            }

            if (startDate != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("transactionDate"), startDate));
            }

            if (endDate != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("transactionDate"), endDate));
            }

            if (transactionType != null && !transactionType.isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("transactionType"), transactionType));
            }

            if (merchantName != null && !merchantName.isEmpty()) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("merchantName")), "%" + merchantName.toLowerCase() + "%"));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
