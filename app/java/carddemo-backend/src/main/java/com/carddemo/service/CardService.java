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

    public Card updateCard(Integer id, Card updatedData) {
        return cardRepository.findById(id).map(card -> {
            card.setCardStatus(updatedData.getCardStatus());
            // 再発行申請などの場合は、必要に応じて他のフィールドも更新
            return cardRepository.save(card);
        }).orElseThrow(() -> new RuntimeException("Card not found"));
    }
}