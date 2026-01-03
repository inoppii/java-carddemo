package com.carddemo.service;

import com.carddemo.entity.Customer;
import com.carddemo.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public Optional<Customer> getCustomerById(Integer id) {
        return customerRepository.findById(id);
    }

    public Customer updateCustomer(Integer id, Customer updatedData) {
        return customerRepository.findById(id).map(customer -> {
            customer.setAddress(updatedData.getAddress());
            customer.setCity(updatedData.getCity());
            customer.setState(updatedData.getState());
            customer.setZipCode(updatedData.getZipCode());
            customer.setPhoneNumber(updatedData.getPhoneNumber());
            customer.setEmail(updatedData.getEmail());
            return customerRepository.save(customer);
        }).orElseThrow(() -> new RuntimeException("Customer not found"));
    }
}