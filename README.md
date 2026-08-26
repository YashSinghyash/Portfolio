# Yash Pratap Singh — Portfolio

A full-stack portfolio site:

- **frontend/** — React + Vite, black & white theme, no CSS framework or webfonts (fast first paint).
- **backend/** — Spring Boot REST API backed by H2 (file-based SQL database), seeded via `schema.sql` / `data.sql`.

Currently built: a header (Home / Projects nav) and a Projects section with **3 placeholder project cards**, served from the backend. Everything else (About, Contact, real project content) is intentionally left out for now — add as next steps.

## Run it

**Backend** (http://localhost:8080):

```bash
cd backend
./mvnw spring-boot:run
```

This creates `backend/data/portfolio.mv.db` on first run and seeds 3 placeholder projects. `GET http://localhost:8080/api/projects` returns them as JSON. Data resets to the 3 placeholders on every restart (see the comment in `data.sql`) — remove that once you're adding real projects through the DB.

**Frontend** (http://localhost:5173):

```bash
cd frontend
npm install
npm run dev
```

The Projects section fetches from `http://localhost:8080/api/projects` and falls back to local placeholder text if the backend isn't running, so the frontend always works standalone.

## Switching from H2 to MySQL/Postgres later

Everything is written against plain SQL (`schema.sql`/`data.sql`), so moving off H2 is just:

1. Add the driver dependency to `backend/pom.xml` (e.g. `mysql-connector-j` or `postgresql`).
2. Update the 4 `spring.datasource.*` lines in `backend/src/main/resources/application.properties`.
3. No Java code changes needed — JPA/Hibernate config stays the same.

## Project layout

```
backend/
  src/main/java/com/yash/portfolio/
    model/Project.java
    repository/ProjectRepository.java
    controller/ProjectController.java
  src/main/resources/
    application.properties
    schema.sql
    data.sql
frontend/
  src/
    components/Header.jsx, Hero.jsx, Projects.jsx, ProjectCard.jsx, Footer.jsx
    api/projects.js
    styles/index.css
```

## Next steps (not built yet)

- About / Contact sections + matching header links
- Real project data (title, description, image, live/repo links) instead of placeholders
- Deployment config (e.g. static frontend build behind Nginx/Vercel, backend as a JAR/container + a real Postgres/MySQL instance)
