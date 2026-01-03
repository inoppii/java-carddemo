package com.carddemo.controller;

import com.carddemo.entity.TransactionHistory;
import com.carddemo.service.TransactionService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
public class TransactionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TransactionService transactionService;

    @Test
    public void testGetTransactionsByAccountWithFilters() throws Exception {
        TransactionHistory tx = new TransactionHistory();
        tx.setTransactionId(UUID.randomUUID());
        tx.setMerchantName("Test Merchant");
        tx.setTransactionDate(LocalDateTime.now());

        Page<TransactionHistory> page = new PageImpl<>(Collections.singletonList(tx));

        when(transactionService.getTransactionsByAccountId(eq(123), any(LocalDateTime.class), any(LocalDateTime.class), eq("PAYMENT"), eq("Test"), any(Pageable.class)))
                .thenReturn(page);

        mockMvc.perform(get("/api/transactions/account/123")
                .param("startDate", "2023-01-01T00:00:00")
                .param("endDate", "2023-12-31T23:59:59")
                .param("transactionType", "PAYMENT")
                .param("merchantName", "Test")
                .param("page", "0")
                .param("size", "10")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].merchantName").value("Test Merchant"));
    }
}
