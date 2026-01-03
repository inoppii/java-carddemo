package com.carddemo.repository;

import com.carddemo.entity.TransactionHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import java.util.List;

public interface TransactionHistoryRepository extends JpaRepository<TransactionHistory, UUID> {
    List<TransactionHistory> findByCardId(Integer cardId);
}
