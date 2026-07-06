package com.shopkart.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity @Table(name = "products")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false) private String name;
    @Column(length = 1000) private String description;
    @Column(nullable = false) private BigDecimal price;
    @Column(nullable = false) private String category;
    @Builder.Default private Integer stock = 0;
    private String imageUrl;
    @Builder.Default private Boolean active = true;
    @Builder.Default private LocalDateTime createdAt = LocalDateTime.now();
}