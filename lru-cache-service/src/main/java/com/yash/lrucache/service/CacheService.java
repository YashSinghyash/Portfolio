package com.yash.lrucache.service;

import com.yash.lrucache.core.LRUCache;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Thin Spring-facing wrapper around the hand-rolled {@link LRUCache}: adds
 * hit/miss counters for the /cache/stats endpoint and reads capacity from
 * application.properties.
 *
 * TTL is intentionally not implemented yet — see README "Future improvements".
 */
@Service
public class CacheService {

    private final LRUCache<String, Object> cache;
    private final AtomicLong hits = new AtomicLong();
    private final AtomicLong misses = new AtomicLong();

    public CacheService(@Value("${cache.capacity:100}") int capacity) {
        this.cache = new LRUCache<>(capacity);
    }

    public Optional<Object> get(String key) {
        Object value = cache.get(key);
        if (value == null) {
            misses.incrementAndGet();
            return Optional.empty();
        }
        hits.incrementAndGet();
        return Optional.of(value);
    }

    public void put(String key, Object value) {
        cache.put(key, value);
    }

    public boolean delete(String key) {
        return cache.remove(key);
    }

    public CacheStats stats() {
        return new CacheStats(cache.capacity(), cache.size(), hits.get(), misses.get());
    }

    public record CacheStats(int capacity, int size, long hits, long misses) {
    }
}
