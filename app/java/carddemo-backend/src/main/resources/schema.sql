-- CardDemo PostgreSQL Schema Definition

-- Enable UUID extension for generating unique identifiers
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Customer Table
-- Holds customer personal information.
CREATE TABLE customer (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    address VARCHAR(100),
    city VARCHAR(50),
    state VARCHAR(20),
    zip_code VARCHAR(10),
    phone_number VARCHAR(15),
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Account Table
-- Holds account details.
CREATE TABLE account (
    account_id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES customer(customer_id),
    account_number VARCHAR(20) UNIQUE NOT NULL,
    account_status VARCHAR(10) DEFAULT 'ACTIVE', -- ACTIVE, CLOSED, SUSPENDED
    balance DECIMAL(15, 2) DEFAULT 0.00,
    credit_limit DECIMAL(15, 2) NOT NULL,
    interest_rate DECIMAL(5, 4) DEFAULT 0.00,
    open_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Card Table
-- Holds credit card information linked to accounts.
CREATE TABLE card (
    card_id SERIAL PRIMARY KEY,
    account_id INTEGER NOT NULL REFERENCES account(account_id),
    card_number VARCHAR(16) UNIQUE NOT NULL,
    card_type VARCHAR(20) NOT NULL, -- VISA, MASTERCARD, AMEX
    expiration_date DATE NOT NULL,
    cvv VARCHAR(4) NOT NULL,
    card_status VARCHAR(10) DEFAULT 'ACTIVE',
    issue_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Transaction History Table
-- Records all transactions made with cards.
CREATE TABLE transaction_history (
    transaction_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    card_id INTEGER NOT NULL REFERENCES card(card_id),
    transaction_type VARCHAR(20) NOT NULL, -- PURCHASE, REFUND, PAYMENT
    amount DECIMAL(15, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    merchant_name VARCHAR(100),
    merchant_city VARCHAR(50),
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'PENDING' -- PENDING, COMPLETED, DECLINED
);

-- 5. Auth Fraud Table
-- Stores potential fraud detection data.
CREATE TABLE auth_fraud (
    fraud_id SERIAL PRIMARY KEY,
    transaction_id UUID REFERENCES transaction_history(transaction_id),
    severity_score INTEGER,
    fraud_reason VARCHAR(255),
    detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. User Table (for System Access)
-- Replaces RACF user definitions.
CREATE TABLE app_user (
    user_id VARCHAR(20) PRIMARY KEY, -- e.g., USER001
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL, -- USER, ADMIN
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_customer_email ON customer(email);
CREATE INDEX idx_account_customer ON account(customer_id);
CREATE INDEX idx_card_account ON card(account_id);
CREATE INDEX idx_card_number ON card(card_number);
CREATE INDEX idx_transaction_card ON transaction_history(card_id);
CREATE INDEX idx_transaction_date ON transaction_history(transaction_date);
