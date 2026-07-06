package com.shopkart.controller;

import com.shopkart.dto.*;
import com.shopkart.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/orders") @RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.createOrder(user.getUsername()));
    }

    @GetMapping("/my")
    public ResponseEntity<List<OrderResponse>> myOrders(@AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.ok(orderService.getMyOrders(user.getUsername()));
    }

    @GetMapping
    public ResponseEntity<List<OrderResponse>> allOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<OrderResponse> updateStatus(@PathVariable Long id, @RequestBody UpdateStatusRequest req) {
        return ResponseEntity.ok(orderService.updateStatus(id, req.getStatus()));
    }
}