CREATE TABLE IF NOT EXISTS project (
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    title         VARCHAR(120)  NOT NULL,
    description   VARCHAR(500)  NOT NULL,
    image_url     VARCHAR(300),
    project_url   VARCHAR(300),
    repo_url      VARCHAR(300),
    display_order INT           NOT NULL DEFAULT 0,
    -- Both nullable: only design/LLD-style projects (no running "Live" demo) use them.
    tag           VARCHAR(60),
    rationale     VARCHAR(1200)
);
