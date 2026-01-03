package com.carddemo.service;

import com.carddemo.entity.TransactionHistory;
import com.carddemo.repository.TransactionHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionHistoryRepository transactionHistoryRepository;

    public List<TransactionHistory> getTransactionsByCardId(Integer cardId) {
        return transactionHistoryRepository.findByCardId(cardId);
    }
}
