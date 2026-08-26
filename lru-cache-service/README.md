# LRU Cache Service

A from-scratch LRU (Least Recently Used) cache — `HashMap<K, Node>` for O(1) lookup
+ a doubly linked list for O(1) reordering/eviction — wrapped as a small Spring Boot
REST API.

## Core data structure

- [`Node<K,V>`](src/main/java/com/yash/lrucache/core/Node.java) — doubly linked list node (key, value, prev, next), package-private (implementation detail).
- [`LRUCache<K,V>`](src/main/java/com/yash/lrucache/core/LRUCache.java) — `get`/`put`/`remove`, both O(1), backed by the map + a sentinel-headed/tailed doubly linked list.

## REST API (runs on port 8082)

| Method | Path            | Body                        | Notes                                   |
|--------|-----------------|------------------------------|------------------------------------------|
| GET    | `/cache/{key}`  | —                            | 200 + `{key,value}`, or 404 if not present |
| PUT    | `/cache/{key}`  | `{ "value": ..., "ttl": N }` | stores/overwrites; `ttl` accepted but not enforced yet |
| DELETE | `/cache/{key}`  | —                            | 204 if removed, 404 if not found          |
| GET    | `/cache/stats`  | —                            | `{capacity, size, hits, misses}`          |

A minimal vanilla-JS demo page is served at `/` (`src/main/resources/static/index.html`) to exercise all four endpoints without needing curl.

## Configuration

`cache.capacity` in `src/main/resources/application.properties` (default 100) sets the max number of entries before LRU eviction kicks in.

## Run it

```bash
cd lru-cache-service
./mvnw spring-boot:run
```

```bash
curl -X PUT localhost:8082/cache/foo -H 'Content-Type: application/json' -d '{"value":"bar"}'
curl localhost:8082/cache/foo
curl localhost:8082/cache/stats
curl -X DELETE localhost:8082/cache/foo
```

## Design notes

- **Thread-safety**: `LRUCache`'s methods are `synchronized` — Spring MVC handles
  requests on a thread pool, and both the map and the linked list are shared mutable
  state, so a coarse lock is needed even for correctness in this single instance.
  A real distributed cache (multiple instances, high QPS) wouldn't reach for a bigger
  lock — it'd shard/partition keys across nodes (e.g. consistent hashing) and use
  something like Redis Cluster, trading the single-process guarantee for horizontal
  scale.
- **TTL**: intentionally not implemented. Adding it would mean storing an expiry
  timestamp per node and either checking it lazily on `get`/`put`, or running a
  `@Scheduled` sweep to evict expired entries proactively — left as a future
  improvement to keep this iteration's scope tight.
