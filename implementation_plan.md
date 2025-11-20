# Implementation Plan - Angular SSE MVP

## Goal
Create a real-time application with:
- **Frontend**: Angular 20 (Visuals: Black bar with slide-out message).
- **Backend**: Spring Boot MVC 4.0 (SSE endpoint, Secured POST endpoint).
- **CLI**: C# .NET 10 (Posts messages to backend).

## User Review Required
> [!IMPORTANT]
> **Missing Asset**: The user referenced '2025-11-20 15_20_41-Greenshot.png' for design. I will check if this file exists. If not, I will implement a generic "black bar" design.
> **Versions**:
> - Angular 20 (Note: Angular 20 might not be released yet, will use latest stable if 20 is unavailable, or `next` if strictly required).
> - Spring Boot 4.0 (Note: Spring Boot 3.x is current stable. 4.0 might be future. Will use latest stable 3.x unless 4.0 milestone is strictly required and available).
> - .NET 10 (Note: .NET 9 is the latest preview/release as of late 2024/early 2025. .NET 10 is likely future. Will use latest available .NET SDK).

## Proposed Changes

### Directory Structure
- `/frontend`
- `/backend`
- `/cli`

### Backend (Spring Boot)
- **Dependencies**: Web, Security, Lombok, DevTools.
- **Structure**:
    - `Controller`: `MessageController` (POST /api/message, GET /api/sse).
    - `Service`: `SseService` (Manage `SseEmitter` list).
    - `Security`: `SecurityConfig` (Bearer token filter).
- **TDD**: JUnit 5 + Mockito tests for Controller and Service.

### Frontend (Angular)
- **Tech**: Angular CLI, Standalone Components.
- **Components**:
    - `AppComponent`: Layout with "Black Bar".
    - `NotificationComponent`: Slide-out animation component.
- **Service**: `SseService` (Connect to backend SSE).
- **TDD**: Playwright E2E tests for UI interaction.

### UI Reskin (Western Union Style)
- **Colors**:
    - Primary: Black (`#000000`)
    - Accent: Yellow (`#FFDA1A`)
    - Text: White (`#FFFFFF`) on Black, Black on Yellow.
- **Components**:
    - **Header**: Black background, Yellow text/logo.
    - **Notification**: Yellow background, Black text, bold typography.
    - **Buttons**: High contrast (Black on Yellow).


### CLI (C# .NET)
- **Tech**: Console App.
- **Logic**:
    - Accept user input or command line args.
    - HTTP POST to Backend with Bearer Token.

### Docker
- `Dockerfile` for each module.
- `docker-compose.yml` (Optional but recommended for orchestration).

## Verification Plan
### Automated Tests
- **Backend**: `mvn test`
- **Frontend**: `npx playwright test`
- **CLI**: Manual run or unit tests if logic complex.

### Manual Verification
1. Start Backend.
2. Start Frontend.
3. Run CLI command to send message.
4. Verify message slides out on Frontend.
