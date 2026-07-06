package com.shopkart.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class ProductRequest {
    @NotBlank private String name;
    private String description;
    @NotNull @DecimalMin("0.01") private BigDecimal price;
    @NotBlank private String category;
    @NotNull @Min(0) private Integer stock;
    private String imageUrl;
}