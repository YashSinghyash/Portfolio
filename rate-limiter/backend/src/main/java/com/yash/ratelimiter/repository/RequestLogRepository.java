package com.yash.ratelimiter.repository;

import com.yash.ratelimiter.entity.RequestLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;

public interface RequestLogRepository extends JpaRepository<RequestLog, Long> {

    List<RequestLog> findByClientIdOrderByTimestampDesc(Long clientId);

    long countByClientIdAndAllowed(Long clientId, boolean allowed);

    // Used by the stats endpoint (Phase 2) to bucket recent activity for the chart.
    List<RequestLog> findByClientIdAndTimestampAfterOrderByTimestampAsc(Long clientId, Instant after);
}
