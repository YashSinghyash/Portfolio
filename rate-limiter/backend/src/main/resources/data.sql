-- Reset on every startup, same as the other demo services in this repo: keeps
-- local dev predictable. request_log is cleared first because of the FK.
DELETE FROM request_log;
DELETE FROM api_client;

INSERT INTO api_client (name, client_key, request_limit, window_seconds) VALUES
('Web App', 'web-app', 20, 60),
('Mobile App', 'mobile-app', 10, 60),
('Partner API', 'partner-api', 5, 10);
