package com.shopkart.service;

import com.shopkart.dto.OrderResponse;
import com.shopkart.entity.*;
import com.shopkart.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service @RequiredArgsConstructor @Transactional
public class OrderService {
    private final OrderRepository orderRepo;
    private final CartRepository cartRepo;
    private final UserRepository userRepo;
    private final ProductRepository productRepo;

    public OrderResponse createOrder(String email) {
        User user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        Cart cart = cartRepo.findByUser(user).orElseThrow(() -> new RuntimeException("Cart is empty"));
        if (cart.getItems().isEmpty()) throw new RuntimeException("Cart is empty");

        Order order = Order.builder().user(user).build();
        List<OrderItem> orderItems = cart.getItems().stream().map(ci -> {
            Product p = ci.getProduct();
            if (p.getStock() < ci.getQuantity()) throw new RuntimeException("Insufficient stock for: " + p.getName());
            p.setStock(p.getStock() - ci.getQuantity());
            productRepo.save(p);
            return OrderItem.builder().order(order).product(p).productName(p.getName())
                .quantity(ci.getQuantity()).price(ci.getPrice()).build();
        }).collect(Collectors.toList());

        BigDecimal total = orderItems.stream()
            .map(i -> i.getPrice().multiply(BigDecimal.valueOf(i.getQuantity())))
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        order.setItems(orderItems);
        order.setTotalAmount(total);
        Order saved = orderRepo.save(order);
        cart.getItems().clear();
        cartRepo.save(cart);
        return toResponse(saved);
    }

    public List<OrderResponse> getMyOrders(String email) {
        User user = userRepo.findByEmail(email).orElseThrow();
        return orderRepo.findByUserOrderByCreatedAtDesc(user).stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<OrderResponse> getAllOrders() {
        return orderRepo.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    public OrderResponse updateStatus(Long id, String status) {
        Order order = orderRepo.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(Order.OrderStatus.valueOf(status));
        return toResponse(orderRepo.save(order));
    }

  private OrderResponse toResponse(Order o) {
    List<OrderResponse.OrderItemDto> items =
        o.getItems() == null
            ? List.<OrderResponse.OrderItemDto>of()
            : o.getItems().stream().map(i ->
                OrderResponse.OrderItemDto.builder()
                    .id(i.getId())
                    .productName(i.getProductName())
                    .quantity(i.getQuantity())
                    .price(i.getPrice())
                    .build()
            ).collect(Collectors.toList());

    return OrderResponse.builder()
        .id(o.getId())
        .userEmail(o.getUser().getEmail())
        .items(items)
        .totalAmount(o.getTotalAmount())
        .status(o.getStatus().name())
        .createdAt(o.getCreatedAt())
        .build();
}
}