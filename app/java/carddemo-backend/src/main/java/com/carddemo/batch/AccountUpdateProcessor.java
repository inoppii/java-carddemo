package com.carddemo.batch;

import com.carddemo.entity.Account;
import com.carddemo.service.CalculationService;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class AccountUpdateProcessor implements ItemProcessor<Account, Account> {

    @Autowired
    private CalculationService calculationService;

    @Override
    public Account process(Account account) throws Exception {
        // COBOL (CBACT04C) のロジックをシミュレート
        // 1. 利息の計算
        BigDecimal annualRate = new BigDecimal("0.05"); // 仮の年利 5%
        int days = 30; // 1ヶ月分
        BigDecimal interest = calculationService.calculateInterest(account.getBalance(), annualRate, days);
        
        // 2. 残高の更新
        account.setBalance(account.getBalance().add(interest));
        
        // 3. 最終更新日の更新
        // account.setUpdatedAt(LocalDateTime.now()); // Entity で @PreUpdate 处理
        
        return account;
    }
}
