-- Reset on every startup so the placeholders/seed data stay predictable during early development.
-- Once real projects are added through the API/DB, remove this DELETE (and this file, or
-- guard it) so restarts don't wipe real data.
DELETE FROM project;

INSERT INTO project (title, description, image_url, project_url, repo_url, display_order, tag, rationale) VALUES
('LRU Cache Service', 'A hand-rolled O(1) LRU cache (HashMap + doubly linked list) exposed as a Spring Boot REST API, with hit/miss stats and configurable capacity.', NULL, '/lru-cache', NULL, 1, NULL, NULL),
('Design LeetCode — Low-Level Design', 'Models the core submission-judging system of a competitive coding platform: pluggable per-language judges selected through a factory.', NULL, NULL, NULL, 2, 'System Design / OOP',
 'Strategy (Judge) lets each language''s judging logic vary independently, while Factory (JudgeFactory) centralizes the "which judge for which language" decision instead of scattering if/else across callers. Binary pass/fail was a conscious scoping choice. I considered a State pattern for a submission''s QUEUED/RUNNING/JUDGED lifecycle and deliberately skipped it here — there''s no per-state behavior yet to justify it, but it''s the right call once submissions get requeued or judged asynchronously.'),
('Project Three', 'Placeholder project description. Replace with a real project title, summary and links once ready.', NULL, NULL, NULL, 3, NULL, NULL);
