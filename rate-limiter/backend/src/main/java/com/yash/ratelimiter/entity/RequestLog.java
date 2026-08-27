package com.yash.ratelimiter.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.Instant;

/**
 * One logged attempt against a client's rate limit, allowed or not. This is
 * the audit trail the stats/chart endpoints aggregate over — deliberately a
 * flat, dumb record with no logic of its own.
 */
@Entity
@Table(name = "request_log")
public class RequestLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "client_id", nullable = false)
    private Long clientId;

    @Column(nullable = false)
    private Instant timestamp;

    @Column(nullable = false)
    private boolean allowed;

    public RequestLog() {
    }

    public RequestLog(Long clientId, Instant timestamp, boolean allowed) {
        this.clientId = clientId;
        this.timestamp = timestamp;
        this.allowed = allowed;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public boolean isAllowed() {
        return allowed;
    }

    public void setAllowed(boolean allowed) {
        this.allowed = allowed;
    }
}
