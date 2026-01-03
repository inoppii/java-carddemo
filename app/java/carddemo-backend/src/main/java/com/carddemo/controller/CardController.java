package com.carddemo.controller;

import com.carddemo.entity.Card;
import com.carddemo.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cards")
public class CardController {

    @Autowired
    private CardService cardService;

    @GetMapping("/{id}")
    public ResponseEntity<Card> getCard(@PathVariable Integer id) {
        return cardService.getCardById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/account/{accountId}")
    public List<Card> getCardsByAccount(@PathVariable Integer accountId) {
        return cardService.getCardsByAccountId(accountId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Card> updateCard(@PathVariable Integer id, @RequestBody Card card) {
        return ResponseEntity.ok(cardService.updateCard(id, card));
    }
}