# Backend Module

Spring Boot application serving SSE and handling message posts.

## Prerequisites
- JDK 21
- Maven

## Running Locally
1.  Navigate to `backend` directory.
2.  Run `mvn spring-boot:run`.
3.  Server starts on `http://localhost:8080`.

## Endpoints
-   `GET /api/sse`: Subscribe to Server-Sent Events.
-   `POST /api/message`: Send a message (Requires `Authorization: Bearer secret-token-123`).
    -   Body: Raw string message.

## Docker
1.  Build JAR: `mvn clean package`
2.  Build Image: `docker build -t backend .`
3.  Run: `docker run -p 8080:8080 backend`
