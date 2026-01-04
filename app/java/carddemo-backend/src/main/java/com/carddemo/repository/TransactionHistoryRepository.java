package com.carddemo.repository;

import com.carddemo.entity.TransactionHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import java.util.UUID;
import java.util.List;

public interface TransactionHistoryRepository extends JpaRepository<TransactionHistory, UUID>, JpaSpecificationExecutor<TransactionHistory> {
    List<TransactionHistory> findByCardId(Integer cardId);
    Page<TransactionHistory> findByCardIdIn(List<Integer> cardIds, Pageable pageable);
}
