package com.yash.ratelimiter.web.dto;

import java.util.List;

public record StatsResponse(
        String clientKey,
        long allowedCount,
        long blockedCount,
        // Chronological (oldest first), capped -- the frontend chart buckets/plots this directly.
        List<RequestLogEntry> recent
) {
}
