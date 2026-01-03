package com.carddemo.config;

import com.carddemo.entity.TransactionHistory;
import jakarta.persistence.EntityManagerFactory;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.database.JpaPagingItemReader;
import org.springframework.batch.item.database.builder.JpaPagingItemReaderBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class TransactionAggregationBatchConfig {

    @Bean
    public JpaPagingItemReader<TransactionHistory> transactionReader(EntityManagerFactory entityManagerFactory) {
        return new JpaPagingItemReaderBuilder<TransactionHistory>()
                .name("transactionReader")
                .entityManagerFactory(entityManagerFactory)
                .queryString("SELECT t FROM TransactionHistory t WHERE t.status = 'PENDING'")
                .pageSize(100)
                .build();
    }

    @Bean
    public ItemProcessor<TransactionHistory, TransactionHistory> transactionProcessor() {
        return transaction -> {
            // シミュレーション: 取引を「処理済み」にする
            transaction.setStatus("PROCESSED");
            return transaction;
        };
    }

    // 本来は Writer で集計結果を DB に保存したりファイルに出力したりする
    // ここでは簡易的に JpaItemWriter を使う（処理済みステータスの更新）

    @Bean
    public Step transactionAggregationStep(JobRepository jobRepository, 
                                           PlatformTransactionManager transactionManager,
                                           JpaPagingItemReader<TransactionHistory> transactionReader,
                                           ItemProcessor<TransactionHistory, TransactionHistory> transactionProcessor) {
        // 簡易的な Writer を使い回す（JpaItemWriter は AccountUpdate と同様なので省略または再利用）
        return new StepBuilder("transactionAggregationStep", jobRepository)
                .<TransactionHistory, TransactionHistory>chunk(10, transactionManager)
                .reader(transactionReader)
                .processor(transactionProcessor)
                // .writer(transactionWriter) // 必要に応じて定義
                .build();
    }

    @Bean
    public Job transactionAggregationJob(JobRepository jobRepository, Step transactionAggregationStep) {
        return new JobBuilder("transactionAggregationJob", jobRepository)
                .start(transactionAggregationStep)
                .build();
    }
}
