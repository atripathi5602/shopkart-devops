package com.shopkart.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data @AllArgsConstructor @NoArgsConstructor @Builder
public class OrderResponse {
    private Long id;
    private String userEmail;
    private List<OrderItemDto> items;
    private BigDecimal totalAmount;
    private String status;
    private LocalDateTime createdAt;

    @Data @AllArgsConstructor @NoArgsConstructor @Builder
    public static class OrderItemDto {
        private Long id;
        private String productName;
        private Integer quantity;
        private BigDecimal price;
    }
}