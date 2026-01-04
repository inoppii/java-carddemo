package com.carddemo.service;

import com.carddemo.entity.Card;
import com.carddemo.entity.TransactionHistory;
import com.carddemo.repository.CardRepository;
import com.carddemo.repository.TransactionHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    @Autowired
    private TransactionHistoryRepository transactionHistoryRepository;

    @Autowired
    private CardRepository cardRepository;

    public List<TransactionHistory> getTransactionsByCardId(Integer cardId) {
        return transactionHistoryRepository.findByCardId(cardId);
    }

    public Optional<TransactionHistory> getTransactionById(UUID id) {
        return transactionHistoryRepository.findById(id);
    }

    public Page<TransactionHistory> getTransactionsByAccountId(
            Integer accountId, 
            LocalDateTime startDate, 
            LocalDateTime endDate, 
            String transactionType, 
            String merchantName, 
            Pageable pageable) {
        List<Integer> cardIds = cardRepository.findByAccountId(accountId).stream()
                .map(Card::getCardId)
                .collect(Collectors.toList());
        
        if (cardIds.isEmpty()) {
            return Page.empty(pageable);
        }
        
        Specification<TransactionHistory> spec = TransactionSpecifications.build(cardIds, startDate, endDate, transactionType, merchantName);
        return transactionHistoryRepository.findAll(spec, pageable);
    }
}
