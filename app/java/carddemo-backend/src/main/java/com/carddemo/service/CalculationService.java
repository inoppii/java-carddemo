package com.carddemo.service;

import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class CalculationService {

    private static final BigDecimal DAYS_IN_YEAR = new BigDecimal("365");
    private static final BigDecimal FEE_PERCENTAGE = new BigDecimal("0.015"); // 1.5%
    private static final BigDecimal FIXED_FEE = new BigDecimal("0.10");

    /**
     * Calculates interest based on balance, annual rate, and number of days.
     * Formula: Balance * Rate * (Days / 365)
     */
    public BigDecimal calculateInterest(BigDecimal balance, BigDecimal annualRate, int days) {
        if (balance == null || annualRate == null) {
            return BigDecimal.ZERO;
        }
        
        BigDecimal timeFactor = new BigDecimal(days).divide(DAYS_IN_YEAR, 10, RoundingMode.HALF_UP);
        BigDecimal interest = balance.multiply(annualRate).multiply(timeFactor);
        
        return interest.setScale(2, RoundingMode.HALF_UP);
    }

    /**
     * Calculates transaction fee.
     * Logic: Amount * 1.5% + 0.10
     */
    public BigDecimal calculateTransactionFee(BigDecimal amount) {
        if (amount == null) {
            return BigDecimal.ZERO;
        }
        
        BigDecimal percentageFee = amount.multiply(FEE_PERCENTAGE);
        BigDecimal totalFee = percentageFee.add(FIXED_FEE);
        
        return totalFee.setScale(2, RoundingMode.HALF_UP);
    }
}
