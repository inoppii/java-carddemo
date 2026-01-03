package com.carddemo.service;

import org.junit.jupiter.api.Test;
import java.math.BigDecimal;
import static org.junit.jupiter.api.Assertions.*;

public class CalculationServiceTest {

    private final CalculationService calculationService = new CalculationService();

    @Test
    public void testCalculateInterest() {
        BigDecimal balance = new BigDecimal("1000.00");
        BigDecimal rate = new BigDecimal("0.05"); // 5%
        int days = 30;
        
        // Expected: 1000 * 0.05 * (30/365) = 4.11 (rounded)
        BigDecimal expected = new BigDecimal("4.11");
        
        BigDecimal result = calculationService.calculateInterest(balance, rate, days);
        assertEquals(expected, result);
    }

    @Test
    public void testCalculateTransactionFee() {
        BigDecimal amount = new BigDecimal("100.00");
        
        // Assume fee is 1.5% + $0.10
        BigDecimal expected = new BigDecimal("1.60");
        
        BigDecimal result = calculationService.calculateTransactionFee(amount);
        assertEquals(expected, result);
    }
}
