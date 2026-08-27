package com.yash.ratelimiter.web;

import com.yash.ratelimiter.entity.ApiClient;
import com.yash.ratelimiter.entity.RequestLog;
import com.yash.ratelimiter.ratelimit.TokenBucketRegistry;
import com.yash.ratelimiter.repository.ApiClientRepository;
import com.yash.ratelimiter.repository.RequestLogRepository;
import com.yash.ratelimiter.web.dto.ClientResponse;
import com.yash.ratelimiter.web.dto.RequestLogEntry;
import com.yash.ratelimiter.web.dto.StatsResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/clients")
@CrossOrigin(origins = {
        "http://localhost:5173", "http://127.0.0.1:5173", // portfolio (proxies this under /rate-limiter)
        "http://localhost:5174", "http://127.0.0.1:5174"  // this dashboard's own dev server
})
public class ClientController {

    private static final int MAX_RECENT_LOG_ENTRIES = 200;

    private final ApiClientRepository apiClientRepository;
    private final RequestLogRepository requestLogRepository;
    private final TokenBucketRegistry tokenBucketRegistry;

    public ClientController(
            ApiClientRepository apiClientRepository,
            RequestLogRepository requestLogRepository,
            TokenBucketRegistry tokenBucketRegistry) {
        this.apiClientRepository = apiClientRepository;
        this.requestLogRepository = requestLogRepository;
        this.tokenBucketRegistry = tokenBucketRegistry;
    }

    @GetMapping
    public List<ClientResponse> listClients() {
        return apiClientRepository.findAll().stream().map(this::toResponse).toList();
    }

    @GetMapping("/{clientKey}")
    public ClientResponse getClient(@PathVariable String clientKey) {
        return toResponse(findClientOrThrow(clientKey));
    }

    @GetMapping("/{clientKey}/stats")
    public StatsResponse getStats(@PathVariable String clientKey) {
        ApiClient client = findClientOrThrow(clientKey);

        long allowedCount = requestLogRepository.countByClientIdAndAllowed(client.getId(), true);
        long blockedCount = requestLogRepository.countByClientIdAndAllowed(client.getId(), false);

        List<RequestLogEntry> recent = requestLogRepository
                .findByClientIdOrderByTimestampDesc(client.getId())
                .stream()
                .limit(MAX_RECENT_LOG_ENTRIES)
                .sorted(Comparator.comparing(RequestLog::getTimestamp))
                .map(log -> new RequestLogEntry(log.getTimestamp(), log.isAllowed()))
                .toList();

        return new StatsResponse(clientKey, allowedCount, blockedCount, recent);
    }

    private ApiClient findClientOrThrow(String clientKey) {
        return apiClientRepository.findByClientKey(clientKey)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unknown client: " + clientKey));
    }

    private ClientResponse toResponse(ApiClient client) {
        double availableTokens = tokenBucketRegistry.getOrCreate(client).getAvailableTokens();
        return new ClientResponse(
                client.getId(),
                client.getName(),
                client.getClientKey(),
                client.getRequestLimit(),
                client.getWindowSeconds(),
                availableTokens);
    }
}
