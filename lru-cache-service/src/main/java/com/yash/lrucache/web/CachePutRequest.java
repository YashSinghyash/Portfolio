package com.yash.lrucache.web;

/**
 * Request body for PUT /cache/{key}.
 * `ttl` (seconds) is accepted for forward-compatibility but not enforced yet —
 * TTL/expiry is listed as a future improvement in the README, not implemented here.
 */
public record CachePutRequest(Object value, Long ttl) {
}
