package com.yash.ratelimiter.web.dto;

import java.time.Instant;

public record RequestLogEntry(Instant timestamp, boolean allowed) {
}
