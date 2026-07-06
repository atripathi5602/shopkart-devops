package com.shopkart.dto;

import lombok.*;

@Data @AllArgsConstructor
public class AuthResponse {
    private String token;
    private UserDto user;

    @Data @AllArgsConstructor
    public static class UserDto {
        private Long id;
        private String name;
        private String email;
        private String role;
        private String phone;
    }
}