package com.shopkart.service;

import com.shopkart.dto.*;
import com.shopkart.entity.*;
import com.shopkart.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.stream.Collectors;

@Service @RequiredArgsConstructor @Transactional
public class CartService {
    private final CartRepository cartRepo;
    private final CartItemRepository cartItemRepo;
    private final ProductRepository productRepo;
    private final UserRepository userRepo;

    public CartResponse getCart(String email) {
        User user = getUser(email);
        Cart cart = cartRepo.findByUser(user).orElseGet(() -> cartRepo.save(Cart.builder().user(user).build()));
        return toResponse(cart);
    }

    public CartResponse addItem(String email, AddCartItemRequest req) {
        User user = getUser(email);
        Cart cart = cartRepo.findByUser(user).orElseGet(() -> cartRepo.save(Cart.builder().user(user).build()));
        Product product = productRepo.findById(req.getProductId()).orElseThrow(() -> new RuntimeException("Product not found"));
        if (product.getStock() < req.getQuantity()) throw new RuntimeException("Insufficient stock");

        cart.getItems().stream()
            .filter(i -> i.getProduct().getId().equals(req.getProductId()))
            .findFirst()
            .ifPresentOrElse(
                item -> item.setQuantity(item.getQuantity() + req.getQuantity()),
                () -> cart.getItems().add(CartItem.builder().cart(cart).product(product).quantity(req.getQuantity()).price(product.getPrice()).build())
            );
        return toResponse(cartRepo.save(cart));
    }

    public CartResponse updateItem(String email, Long itemId, UpdateCartItemRequest req) {
        Cart cart = getCart(email, itemId);
        cart.getItems().stream().filter(i -> i.getId().equals(itemId)).findFirst()
            .ifPresent(i -> i.setQuantity(req.getQuantity()));
        return toResponse(cartRepo.save(cart));
    }

    public CartResponse removeItem(String email, Long itemId) {
        Cart cart = getCart(email, itemId);
        cart.getItems().removeIf(i -> i.getId().equals(itemId));
        return toResponse(cartRepo.save(cart));
    }

    public void clearCart(String email) {
        User user = getUser(email);
        cartRepo.findByUser(user).ifPresent(cart -> { cart.getItems().clear(); cartRepo.save(cart); });
    }

    private Cart getCart(String email, Long itemId) {
        User user = getUser(email);
        return cartRepo.findByUser(user).orElseThrow(() -> new RuntimeException("Cart not found"));
    }

    private User getUser(String email) {
        return userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    private CartResponse toResponse(Cart cart) {
        var items = cart.getItems().stream().map(i -> CartResponse.CartItemDto.builder()
            .id(i.getId()).productId(i.getProduct().getId()).productName(i.getProduct().getName())
            .category(i.getProduct().getCategory()).price(i.getPrice()).quantity(i.getQuantity())
            .subtotal(i.getPrice().multiply(BigDecimal.valueOf(i.getQuantity()))).build()
        ).collect(Collectors.toList());
        BigDecimal total = items.stream().map(CartResponse.CartItemDto::getSubtotal).reduce(BigDecimal.ZERO, BigDecimal::add);
        return CartResponse.builder().id(cart.getId()).items(items).total(total).build();
    }
}