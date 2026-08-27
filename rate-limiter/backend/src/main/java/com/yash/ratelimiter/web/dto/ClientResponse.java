package com.yash.ratelimiter.web.dto;

public record ClientResponse(
        Long id,
        String name,
        String clientKey,
        int requestLimit,
        int windowSeconds,
        double availableTokens
) {
}
