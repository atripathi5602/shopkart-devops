package com.shopkart.config;

import com.shopkart.entity.*;
import com.shopkart.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;

@Component @RequiredArgsConstructor @Slf4j
public class DataInitializer implements CommandLineRunner {
    private final UserRepository userRepo;
    private final ProductRepository productRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepo.count() > 0) return;

        User admin = User.builder().name("Admin User").email("admin@shopkart.com")
            .password(passwordEncoder.encode("admin123")).role(User.Role.ADMIN).phone("9876543210").build();
        User customer = User.builder().name("Test User").email("user@shopkart.com")
            .password(passwordEncoder.encode("user123")).phone("9876543211").build();
        userRepo.save(admin); userRepo.save(customer);

        String[][] products = {
            {"iPhone 15 Pro", "Latest Apple smartphone with A17 Pro chip and 48MP camera", "89999", "Electronics", "50"},
            {"Samsung 4K TV 55 Inch", "Crystal clear 4K display with smart features", "54999", "Electronics", "20"},
            {"Sony WH-1000XM5", "Industry-leading noise canceling wireless headphones", "29999", "Electronics", "75"},
            {"Nike Air Max 270", "Comfortable running shoes with Air cushioning", "8999", "Clothing", "100"},
            {"Levi's 511 Jeans", "Slim fit denim jeans in classic blue", "3999", "Clothing", "200"},
            {"The Alchemist", "Bestselling novel by Paulo Coelho", "299", "Books", "500"},
            {"Atomic Habits", "Tiny Changes, Remarkable Results by James Clear", "499", "Books", "300"},
            {"Yoga Mat Premium", "Non-slip 6mm thick exercise mat", "1499", "Sports", "150"},
            {"Cricket Bat MRF", "Full size English willow cricket bat", "2999", "Sports", "80"},
            {"Coffee Maker Deluxe", "12-cup programmable coffee maker", "3499", "Home", "60"},
            {"Air Purifier HEPA", "True HEPA filter removes 99.97% pollutants", "12999", "Home", "40"},
            {"Organic Green Tea", "100% natural Darjeeling green tea, 250g", "399", "Food", "1000"}
        };
        for (String[] p : products) {
            productRepo.save(Product.builder().name(p[0]).description(p[1])
                .price(new BigDecimal(p[2])).category(p[3]).stock(Integer.parseInt(p[4])).build());
        }
        log.info("Sample data initialized: 2 users, {} products", products.length);
    }
}