package com.yash.ratelimiter.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

/**
 * A registered API consumer with its own independently configurable rate
 * limit — "N requests per windowSeconds". One {@link com.yash.ratelimiter.ratelimit.TokenBucket}
 * gets built from this at runtime per client, not shared across clients.
 */
@Entity
@Table(name = "api_client")
public class ApiClient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    // URL-safe identifier used in paths like /simulate/{clientKey} — distinct
    // from the numeric id so clients can be referenced by something human-readable.
    @NotBlank
    @Column(name = "client_key", unique = true)
    private String clientKey;

    @Positive
    @Column(name = "request_limit")
    private int requestLimit;

    @Positive
    @Column(name = "window_seconds")
    private int windowSeconds;

    public ApiClient() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getClientKey() {
        return clientKey;
    }

    public void setClientKey(String clientKey) {
        this.clientKey = clientKey;
    }

    public int getRequestLimit() {
        return requestLimit;
    }

    public void setRequestLimit(int requestLimit) {
        this.requestLimit = requestLimit;
    }

    public int getWindowSeconds() {
        return windowSeconds;
    }

    public void setWindowSeconds(int windowSeconds) {
        this.windowSeconds = windowSeconds;
    }
}
