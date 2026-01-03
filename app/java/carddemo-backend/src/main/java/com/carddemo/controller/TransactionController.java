package com.carddemo.controller;

import com.carddemo.entity.TransactionHistory;
import com.carddemo.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping("/{id}")
    public ResponseEntity<TransactionHistory> getTransaction(@PathVariable UUID id) {
        return transactionService.getTransactionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/card/{cardId}")
    public List<TransactionHistory> getTransactionsByCard(@PathVariable Integer cardId) {
        return transactionService.getTransactionsByCardId(cardId);
    }

    @GetMapping("/account/{accountId}")
    public ResponseEntity<Page<TransactionHistory>> getTransactionsByAccount(
            @PathVariable Integer accountId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
            @RequestParam(required = false) String transactionType,
            @RequestParam(required = false) String merchantName,
            @PageableDefault(size = 10, sort = "transactionDate", direction = org.springframework.data.domain.Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(transactionService.getTransactionsByAccountId(accountId, startDate, endDate, transactionType, merchantName, pageable));
    }
}
