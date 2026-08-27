CREATE TABLE IF NOT EXISTS api_client (
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(120) NOT NULL,
    client_key    VARCHAR(80)  NOT NULL,
    request_limit INT          NOT NULL,
    window_seconds INT         NOT NULL,
    CONSTRAINT uq_api_client_key UNIQUE (client_key)
);

CREATE TABLE IF NOT EXISTS request_log (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    client_id  BIGINT    NOT NULL,
    timestamp  TIMESTAMP NOT NULL,
    allowed    BOOLEAN   NOT NULL,
    CONSTRAINT fk_request_log_client FOREIGN KEY (client_id) REFERENCES api_client (id)
);

CREATE INDEX IF NOT EXISTS idx_request_log_client_ts ON request_log (client_id, timestamp);
