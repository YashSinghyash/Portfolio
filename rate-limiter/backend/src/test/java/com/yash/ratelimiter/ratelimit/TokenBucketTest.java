package com.yash.ratelimiter.ratelimit;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class TokenBucketTest {

    private static final long SECOND_NANOS = 1_000_000_000L;

    @Test
    void allowsABurstUpToCapacityThenBlocks() {
        long[] clock = {0L};
        // capacity=5 over a 10s window: bursting all 5 immediately must be allowed.
        TokenBucket bucket = new TokenBucket(5, 10, () -> clock[0]);

        for (int i = 0; i < 5; i++) {
            assertTrue(bucket.tryConsume(), "request " + (i + 1) + " should be allowed within capacity");
        }
        assertFalse(bucket.tryConsume(), "6th immediate request should be blocked");
    }

    @Test
    void refillsGraduallyRatherThanAllAtOnce() {
        long[] clock = {0L};
        // capacity=5 over 10s -> refills at 0.5 tokens/sec.
        TokenBucket bucket = new TokenBucket(5, 10, () -> clock[0]);
        for (int i = 0; i < 5; i++) {
            bucket.tryConsume();
        }
        assertFalse(bucket.tryConsume());

        // 1 second later: only 0.5 tokens have refilled, still not enough for one.
        clock[0] += SECOND_NANOS;
        assertFalse(bucket.tryConsume());

        // 1 more second (2s total elapsed): 1.0 token refilled, exactly enough.
        clock[0] += SECOND_NANOS;
        assertTrue(bucket.tryConsume());
        assertFalse(bucket.tryConsume());
    }

    @Test
    void neverRefillsPastCapacityEvenAfterALongIdlePeriod() {
        long[] clock = {0L};
        TokenBucket bucket = new TokenBucket(3, 1, () -> clock[0]); // fast refill: 3 tokens/sec
        for (int i = 0; i < 3; i++) {
            bucket.tryConsume();
        }

        clock[0] += 1000L * SECOND_NANOS; // way more than enough to refill many times over

        int allowed = 0;
        for (int i = 0; i < 10; i++) {
            if (bucket.tryConsume()) {
                allowed++;
            }
        }
        assertTrue(allowed == 3, "bucket should cap at capacity (3), not accumulate unbounded tokens");
    }
}
