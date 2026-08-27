package com.yash.ratelimiter.ratelimit;

import com.yash.ratelimiter.entity.ApiClient;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Owns exactly one {@link TokenBucket} per client, created lazily on first
 * use and kept in memory for the life of the process (buckets are runtime
 * state, not something we persist — RequestLog is the durable record).
 */
@Component
public class TokenBucketRegistry {

    private final Map<Long, TokenBucket> buckets = new ConcurrentHashMap<>();

    public TokenBucket getOrCreate(ApiClient client) {
        return buckets.computeIfAbsent(
                client.getId(),
                id -> new TokenBucket(client.getRequestLimit(), client.getWindowSeconds()));
    }
}
