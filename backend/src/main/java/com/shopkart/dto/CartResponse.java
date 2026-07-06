package com.shopkart.dto;

import lombok.*;
import java.math.BigDecimal;
import java.util.List;

@Data @AllArgsConstructor @NoArgsConstructor @Builder
public class CartResponse {
    private Long id;
    private List<CartItemDto> items;
    private BigDecimal total;

    @Data @AllArgsConstructor @NoArgsConstructor @Builder
    public static class CartItemDto {
        private Long id;
        private Long productId;
        private String productName;
        private String category;
        private BigDecimal price;
        private Integer quantity;
        private BigDecimal subtotal;
    }
}