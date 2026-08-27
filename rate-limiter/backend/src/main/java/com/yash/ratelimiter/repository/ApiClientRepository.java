package com.yash.ratelimiter.repository;

import com.yash.ratelimiter.entity.ApiClient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ApiClientRepository extends JpaRepository<ApiClient, Long> {

    Optional<ApiClient> findByClientKey(String clientKey);
}
