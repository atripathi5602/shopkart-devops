package com.shopkart.service;

import com.shopkart.dto.*;
import com.shopkart.entity.Product;
import com.shopkart.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service @RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepo;

    public Page<ProductResponse> getAll(String search, String category, String sort, int page, int size) {
        Sort s = switch (sort != null ? sort : "") {
            case "price_asc" -> Sort.by("price").ascending();
            case "price_desc" -> Sort.by("price").descending();
            default -> Sort.by("createdAt").descending();
        };
        Pageable pageable = PageRequest.of(page, size, s);
        return productRepo.findAllWithFilters(
            (search != null && !search.isEmpty()) ? search : null,
            (category != null && !category.isEmpty()) ? category : null,
            pageable
        ).map(this::toResponse);
    }

    public ProductResponse getById(Long id) {
        return toResponse(productRepo.findById(id).orElseThrow(() -> new RuntimeException("Product not found")));
    }

    public ProductResponse create(ProductRequest req) {
        Product p = Product.builder().name(req.getName()).description(req.getDescription())
            .price(req.getPrice()).category(req.getCategory()).stock(req.getStock())
            .imageUrl(req.getImageUrl()).build();
        return toResponse(productRepo.save(p));
    }

    public ProductResponse update(Long id, ProductRequest req) {
        Product p = productRepo.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
        p.setName(req.getName()); p.setDescription(req.getDescription());
        p.setPrice(req.getPrice()); p.setCategory(req.getCategory());
        p.setStock(req.getStock()); p.setImageUrl(req.getImageUrl());
        return toResponse(productRepo.save(p));
    }

    public void delete(Long id) {
        Product p = productRepo.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
        p.setActive(false);
        productRepo.save(p);
    }

    private ProductResponse toResponse(Product p) {
        return ProductResponse.builder().id(p.getId()).name(p.getName()).description(p.getDescription())
            .price(p.getPrice()).category(p.getCategory()).stock(p.getStock())
            .imageUrl(p.getImageUrl()).active(p.getActive()).createdAt(p.getCreatedAt()).build();
    }
}