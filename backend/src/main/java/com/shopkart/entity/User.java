package com.shopkart.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity @Table(name = "users")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false) private String name;
    @Column(unique = true, nullable = false) private String email;
    @Column(nullable = false) private String password;
    private String phone;
    @Enumerated(EnumType.STRING) @Builder.Default private Role role = Role.CUSTOMER;
    @Builder.Default private LocalDateTime createdAt = LocalDateTime.now();

    public enum Role { CUSTOMER, ADMIN }
}