package com.carddemo.service;

import com.carddemo.entity.Card;
import com.carddemo.repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CardService {

    @Autowired
    private CardRepository cardRepository;

    public List<Card> getCardsByAccountId(Integer accountId) {
        return cardRepository.findByAccountId(accountId);
    }
    
    public Optional<Card> getCardById(Integer id) {
        return cardRepository.findById(id);
    }
    
    public Optional<Card> getCardByNumber(String cardNumber) {
        return cardRepository.findByCardNumber(cardNumber);
    }
}
