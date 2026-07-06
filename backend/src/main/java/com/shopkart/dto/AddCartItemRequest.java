package com.shopkart.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class AddCartItemRequest {
    @NotNull private Long productId;
    @NotNull @Min(1) private Integer quantity;
}