-- Reset on every startup so the 3 placeholders stay predictable during early development.
-- Once real projects are added through the API/DB, remove this DELETE (and this file, or
-- guard it) so restarts don't wipe real data.
DELETE FROM project;

INSERT INTO project (title, description, image_url, project_url, repo_url, display_order) VALUES
('LRU Cache Service', 'A hand-rolled O(1) LRU cache (HashMap + doubly linked list) exposed as a Spring Boot REST API, with hit/miss stats and configurable capacity.', NULL, '/lru-cache', NULL, 1),
('Project Two', 'Placeholder project description. Replace with a real project title, summary and links once ready.', NULL, NULL, NULL, 2),
('Project Three', 'Placeholder project description. Replace with a real project title, summary and links once ready.', NULL, NULL, NULL, 3);
