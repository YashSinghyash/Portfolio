package com.yash.ratelimiter.ratelimit;

import com.yash.ratelimiter.entity.ApiClient;
import com.yash.ratelimiter.entity.RequestLog;
import com.yash.ratelimiter.repository.ApiClientRepository;
import com.yash.ratelimiter.repository.RequestLogRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.HandlerMapping;

import java.time.Instant;
import java.util.Map;
import java.util.Optional;

/**
 * Sits in front of the controllers (see WebConfig) and decides allow/block
 * before business logic ever runs -- rate-limiting is not the controller's
 * concern. Regardless of the decision, every attempt is logged so history
 * survives restarts and the dashboard has something to show.
 */
@Component
public class RateLimiterInterceptor implements HandlerInterceptor {

    private final ApiClientRepository apiClientRepository;
    private final RequestLogRepository requestLogRepository;
    private final TokenBucketRegistry tokenBucketRegistry;

    public RateLimiterInterceptor(
            ApiClientRepository apiClientRepository,
            RequestLogRepository requestLogRepository,
            TokenBucketRegistry tokenBucketRegistry) {
        this.apiClientRepository = apiClientRepository;
        this.requestLogRepository = requestLogRepository;
        this.tokenBucketRegistry = tokenBucketRegistry;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String clientKey = extractClientKey(request);
        if (clientKey == null || clientKey.isBlank()) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing client key in path");
            return false;
        }

        Optional<ApiClient> maybeClient = apiClientRepository.findByClientKey(clientKey);
        if (maybeClient.isEmpty()) {
            // Unknown client: nothing to log this against, so reject before any bucket/log work.
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "Unknown client: " + clientKey);
            return false;
        }
        ApiClient client = maybeClient.get();

        TokenBucket bucket = tokenBucketRegistry.getOrCreate(client);
        boolean allowed = bucket.tryConsume();

        requestLogRepository.save(new RequestLog(client.getId(), Instant.now(), allowed));

        if (!allowed) {
            response.setStatus(429); // Too Many Requests
            response.setContentType("application/json");
            response.getWriter().write(
                    "{\"error\":\"rate limit exceeded\",\"clientKey\":\"" + clientKey + "\"}");
            return false;
        }

        return true;
    }

    private String extractClientKey(HttpServletRequest request) {
        @SuppressWarnings("unchecked")
        Map<String, String> pathVariables =
                (Map<String, String>) request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
        return pathVariables == null ? null : pathVariables.get("clientKey");
    }
}
