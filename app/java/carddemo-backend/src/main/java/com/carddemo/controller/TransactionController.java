package com.carddemo.controller;

import com.carddemo.entity.TransactionHistory;
import com.carddemo.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping("/card/{cardId}")
    public List<TransactionHistory> getTransactionsByCard(@PathVariable Integer cardId) {
        return transactionService.getTransactionsByCardId(cardId);
    }
}
