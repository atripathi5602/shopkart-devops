package com.shopkart.service;

import com.shopkart.dto.*;
import com.shopkart.entity.User;
import com.shopkart.repository.UserRepository;
import com.shopkart.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service @RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authManager;

    public AuthResponse login(AuthRequest req) {
        authManager.authenticate(new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));
        User user = userRepo.findByEmail(req.getEmail()).orElseThrow();
        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, toDto(user));
    }

    public AuthResponse register(RegisterRequest req) {
        if (userRepo.existsByEmail(req.getEmail())) throw new RuntimeException("Email already registered");
        User user = User.builder()
            .name(req.getName()).email(req.getEmail())
            .password(passwordEncoder.encode(req.getPassword()))
            .phone(req.getPhone()).build();
        userRepo.save(user);
        return new AuthResponse(jwtUtil.generateToken(user.getEmail()), toDto(user));
    }

    public AuthResponse.UserDto getMe(String email) {
        return toDto(userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found")));
    }

    private AuthResponse.UserDto toDto(User u) {
        return new AuthResponse.UserDto(u.getId(), u.getName(), u.getEmail(), u.getRole().name(), u.getPhone());
    }
}