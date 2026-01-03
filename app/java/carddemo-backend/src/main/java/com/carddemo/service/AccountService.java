package com.carddemo.service;

import com.carddemo.entity.Account;
import com.carddemo.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    public List<Account> getAccountsByCustomerId(Integer customerId) {
        return accountRepository.findByCustomerId(customerId);
    }

    public Optional<Account> getAccountById(Integer id) {
        return accountRepository.findById(id);
    }

    public Account updateAccount(Integer id, Account updatedData) {
        return accountRepository.findById(id).map(account -> {
            account.setAccountStatus(updatedData.getAccountStatus());
            account.setCreditLimit(updatedData.getCreditLimit());
            // In a real app, balance/interest might have different rules
            return accountRepository.save(account);
        }).orElseThrow(() -> new RuntimeException("Account not found"));
    }
}
