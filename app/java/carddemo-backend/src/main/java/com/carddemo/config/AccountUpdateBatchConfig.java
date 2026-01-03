package com.carddemo.config;

import com.carddemo.batch.AccountUpdateProcessor;
import com.carddemo.entity.Account;
import jakarta.persistence.EntityManagerFactory;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.database.JpaItemWriter;
import org.springframework.batch.item.database.JpaPagingItemReader;
import org.springframework.batch.item.database.builder.JpaItemWriterBuilder;
import org.springframework.batch.item.database.builder.JpaPagingItemReaderBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
public class AccountUpdateBatchConfig {

    @Bean
    public JpaPagingItemReader<Account> accountReader(EntityManagerFactory entityManagerFactory) {
        return new JpaPagingItemReaderBuilder<Account>()
                .name("accountReader")
                .entityManagerFactory(entityManagerFactory)
                .queryString("SELECT a FROM Account a")
                .pageSize(100)
                .build();
    }

    @Bean
    public JpaItemWriter<Account> accountWriter(EntityManagerFactory entityManagerFactory) {
        return new JpaItemWriterBuilder<Account>()
                .entityManagerFactory(entityManagerFactory)
                .build();
    }

    @Bean
    public Step accountUpdateStep(JobRepository jobRepository, 
                                  PlatformTransactionManager transactionManager,
                                  JpaPagingItemReader<Account> accountReader,
                                  AccountUpdateProcessor accountUpdateProcessor,
                                  JpaItemWriter<Account> accountWriter) {
        return new StepBuilder("accountUpdateStep", jobRepository)
                .<Account, Account>chunk(10, transactionManager)
                .reader(accountReader)
                .processor(accountUpdateProcessor)
                .writer(accountWriter)
                .build();
    }

    @Bean
    public Job accountUpdateJob(JobRepository jobRepository, Step accountUpdateStep) {
        return new JobBuilder("accountUpdateJob", jobRepository)
                .start(accountUpdateStep)
                .build();
    }
}
