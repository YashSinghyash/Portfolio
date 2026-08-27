package com.yash.ratelimiter.web;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

/**
 * The "downstream service" being protected. Deliberately trivial: by the time
 * this method runs, RateLimiterInterceptor has already allowed the request
 * (a blocked one never reaches here -- the interceptor short-circuits with a
 * 429 first). That separation is the point: this controller has zero
 * rate-limiting logic in it.
 */
@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class SimulateController {

    @PostMapping("/simulate/{clientKey}")
    public Map<String, Object> simulate(@PathVariable String clientKey) {
        return Map.of(
                "clientKey", clientKey,
                "allowed", true,
                "timestamp", Instant.now().toString());
    }
}
