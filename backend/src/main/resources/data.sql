-- Reset on every startup so the placeholders/seed data stay predictable during early development.
-- Once real projects are added through the API/DB, remove this DELETE (and this file, or
-- guard it) so restarts don't wipe real data.
DELETE FROM project;

INSERT INTO project (title, description, image_url, project_url, repo_url, display_order, tag, rationale, rationale_heading) VALUES
('LRU Cache Service', 'A hand-rolled O(1) LRU cache (HashMap + doubly linked list) exposed as a Spring Boot REST API, with hit/miss stats and configurable capacity.', NULL, '/lru-cache', NULL, 1, NULL, NULL, NULL),

('Design LeetCode — Low-Level Design', 'Models the core submission-judging system of a competitive coding platform: pluggable per-language judges selected through a factory.', NULL, NULL, NULL, 2, 'System Design / OOP',
 'Strategy (Judge) lets each language''s judging logic vary independently, while Factory (JudgeFactory) centralizes the "which judge for which language" decision instead of scattering if/else across callers. Binary pass/fail was a conscious scoping choice. I considered a State pattern for a submission''s QUEUED/RUNNING/JUDGED lifecycle and deliberately skipped it here — there''s no per-state behavior yet to justify it, but it''s the right call once submissions get requeued or judged asynchronously.',
 NULL),

('API Usage Tracker & Rate Limiter Dashboard', 'A Spring Boot service that rate-limits API clients using the Token Bucket algorithm, with independently configurable per-client limits, persisted request history, and a React dashboard to visualize allowed vs blocked traffic.', NULL, NULL, NULL, 3, 'In progress — Phase 1/5',
 'Each registered client gets its own Token Bucket: a fixed number of tokens that refill continuously over a configurable time window, so short bursts are allowed while the long-run average rate still stays capped -- unlike a naive counter that resets every second. A RateLimiterInterceptor sits in front of the controllers: it checks the calling client''s bucket, allows or blocks the request, and persists the outcome to RequestLog either way, so history survives a restart and can be analyzed later. How to use it once it''s live: pick a client on the dashboard, hit "Simulate requests" to fire a burst at POST /simulate/{clientKey}, and watch the allowed/blocked counts and chart update as some requests succeed (200) and others get rate-limited (429) once the bucket runs dry. Built so far: the data layer and the Token Bucket algorithm itself, unit-tested against a fake clock. Still to come: the REST API and interceptor, then this dashboard.',
 'How it works & how to use');
