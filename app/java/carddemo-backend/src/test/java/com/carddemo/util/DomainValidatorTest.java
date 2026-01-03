package com.carddemo.util;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class DomainValidatorTest {

    @Test
    public void testIsNumeric() {
        assertTrue(DomainValidator.isNumeric("12345"));
        assertFalse(DomainValidator.isNumeric("123a5"));
        assertFalse(DomainValidator.isNumeric(null));
        assertFalse(DomainValidator.isNumeric(""));
    }

    @Test
    public void testValidateZipCode() {
        // Assuming US format for now based on existing Customer entity length=10
        assertTrue(DomainValidator.isValidZipCode("12345"));
        assertTrue(DomainValidator.isValidZipCode("12345-6789"));
        assertFalse(DomainValidator.isValidZipCode("1234"));
        assertFalse(DomainValidator.isValidZipCode("abcde"));
    }

    @Test
    public void testValidateEmail() {
        assertTrue(DomainValidator.isValidEmail("test@example.com"));
        assertFalse(DomainValidator.isValidEmail("test@"));
        assertFalse(DomainValidator.isValidEmail("test"));
        assertFalse(DomainValidator.isValidEmail("@example.com"));
    }
}
