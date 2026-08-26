package com.yash.lrucache.web;

import com.yash.lrucache.service.CacheService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/cache")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class CacheController {

    private final CacheService cacheService;

    public CacheController(CacheService cacheService) {
        this.cacheService = cacheService;
    }

    // Declared before /{key} so it can never be swallowed by the path-variable route.
    @GetMapping("/stats")
    public CacheService.CacheStats stats() {
        return cacheService.stats();
    }

    @GetMapping("/{key}")
    public ResponseEntity<Object> get(@PathVariable String key) {
        return cacheService.get(key)
                .<ResponseEntity<Object>>map(value -> ResponseEntity.ok(Map.of("key", key, "value", value)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{key}")
    public ResponseEntity<Object> put(@PathVariable String key, @RequestBody CachePutRequest request) {
        cacheService.put(key, request.value());
        return ResponseEntity.ok(Map.of("key", key, "status", "stored"));
    }

    @DeleteMapping("/{key}")
    public ResponseEntity<Object> delete(@PathVariable String key) {
        boolean removed = cacheService.delete(key);
        return removed ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
