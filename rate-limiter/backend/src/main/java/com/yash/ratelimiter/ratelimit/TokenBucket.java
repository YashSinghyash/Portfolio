package com.yash.ratelimiter.ratelimit;

import java.util.function.LongSupplier;

/**
 * Classic token bucket: {@code capacity} tokens refill continuously over
 * {@code windowSeconds} (rather than resetting in discrete steps), so a burst
 * up to capacity is allowed while the long-run average is still capped at
 * capacity/windowSeconds — unlike a naive fixed-window counter, which lets a
 * client double its effective rate by bursting right across a window boundary.
 *
 * One instance per {@code ApiClient}, created lazily and kept in memory by
 * whatever owns it (see RateLimiterInterceptor, added in Phase 2).
 */
public class TokenBucket {

    private final int capacity;
    private final double refillTokensPerNano;
    private final LongSupplier nanoClock;

    private double availableTokens;
    private long lastRefillNanos;

    public TokenBucket(int capacity, int windowSeconds) {
        this(capacity, windowSeconds, System::nanoTime);
    }

    // Package-visible so tests can drive time explicitly instead of sleeping.
    TokenBucket(int capacity, int windowSeconds, LongSupplier nanoClock) {
        if (capacity <= 0) {
            throw new IllegalArgumentException("capacity must be > 0");
        }
        if (windowSeconds <= 0) {
            throw new IllegalArgumentException("windowSeconds must be > 0");
        }
        this.capacity = capacity;
        this.refillTokensPerNano = capacity / (windowSeconds * 1_000_000_000.0);
        this.nanoClock = nanoClock;
        this.availableTokens = capacity; // start full: a fresh client isn't already penalized
        this.lastRefillNanos = nanoClock.getAsLong();
    }

    /** Attempts to consume one token. Returns true (and consumes it) if one was available. */
    public synchronized boolean tryConsume() {
        refill();
        if (availableTokens >= 1.0) {
            availableTokens -= 1.0;
            return true;
        }
        return false;
    }

    /** Mainly for the dashboard/stats — how much headroom this client currently has. */
    public synchronized double getAvailableTokens() {
        refill();
        return availableTokens;
    }

    private void refill() {
        long now = nanoClock.getAsLong();
        long elapsedNanos = now - lastRefillNanos;
        if (elapsedNanos > 0) {
            double refilled = elapsedNanos * refillTokensPerNano;
            availableTokens = Math.min(capacity, availableTokens + refilled);
            lastRefillNanos = now;
        }
    }
}
