package com.shopkart.controller;

import com.shopkart.dto.*;
import com.shopkart.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/cart") @RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @GetMapping
    public ResponseEntity<CartResponse> getCart(@AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.ok(cartService.getCart(user.getUsername()));
    }

    @PostMapping("/items")
    public ResponseEntity<CartResponse> addItem(@AuthenticationPrincipal UserDetails user, @Valid @RequestBody AddCartItemRequest req) {
        return ResponseEntity.ok(cartService.addItem(user.getUsername(), req));
    }

    @PutMapping("/items/{itemId}")
    public ResponseEntity<CartResponse> updateItem(@AuthenticationPrincipal UserDetails user, @PathVariable Long itemId, @Valid @RequestBody UpdateCartItemRequest req) {
        return ResponseEntity.ok(cartService.updateItem(user.getUsername(), itemId, req));
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<CartResponse> removeItem(@AuthenticationPrincipal UserDetails user, @PathVariable Long itemId) {
        return ResponseEntity.ok(cartService.removeItem(user.getUsername(), itemId));
    }

    @DeleteMapping
    public ResponseEntity<Void> clearCart(@AuthenticationPrincipal UserDetails user) {
        cartService.clearCart(user.getUsername());
        return ResponseEntity.noContent().build();
    }
}