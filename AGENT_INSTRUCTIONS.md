# Agent Instructions & Project Context

This file serves as the primary source of truth for AI agents working on this project. Please read this before starting any task.

## 1. Project Overview
<!-- Brief description of the project's purpose and goals -->
*   **Name**: AngularSSE
*   **Goal**: Create a sample application that demonstrates the use of Server-Sent Events (SSE) with Angular and Spring Boot. Front end with look and feel as in the image from file '2025-11-20 15_20_41-Greenshot.png'. Upon a post from a CLI to the backend, inititae a dynamic message to slide out from under the blackbar in the UI, to all connected instances of the app. The message should be dynamic and change based on the content of the post from the CLI. The message should also have a close button that will close the message and remove it from the UI. Keep each module separate, in their own folder, CLI, Backend, Frontend. For Frontend and Backend, use the latest stable versions of Angular and Spring Boot, and provide a Dockerfile for each module. Include a README.md file in each module with instructions on how to run the module, including the CLI. Ensure that the backend POST URI is protected with at least a Bearer Token. The CLI should be a simple console application that will post a message to the backend. The CLI should be written in C#, with .Net 10 and runnable on Windows, Linux and macOS.
*   **Current Status**: Initialization

## 2. Technology Stack
*   **Frontend**: Angular 20. Playwright for TDD.
*   **Backend**: Spring Boot MVC 4.0 with JDK 21. JUnit5, Mockito and AssertJ for TDD.
*   **CLI**: C# .Net 10
*   **Communication**: Server-Sent Events (SSE)
*   **Styling**: [e.g., SCSS, Tailwind CSS]
*   **State Management**: [e.g., RxJS, NgRx, Signals]

## 3. Architecture & Patterns
*   **Component Structure**: Standalone components preferred.
*   **Data Flow**: Unidirectional data flow. Services handle API communication and state.
*   **SSE Implementation**: Dedicated service for managing EventSource connections.

## 4. Coding Standards
*   **TypeScript**: Strict mode enabled. Explicit types required (avoid `any`).
*   **Naming**:
    *   Classes: PascalCase
    *   Variables/Functions: camelCase
    *   Files: kebab-case (e.g., `user-profile.component.ts`)
*   **Comments**: JSDoc for public methods and complex logic.

## 5. Agent Behavior Guidelines
*   **Proactive Error Handling**: Always implement error handling for SSE connections (reconnection logic).
*   **Testing**: Create unit tests for all new components and services.
*   **Documentation**: Update this file if architectural decisions change.
*   **User Communication**: Ask for clarification if requirements are ambiguous.

## 6. Common Workflows
### Development
*   Start server: \`npm start\` (Placeholder)
*   Run tests: \`npm test\` (Placeholder)
*   Build: \`npm run build\` (Placeholder)

## 7. Task Tracking
*   Maintain a `task.md` or similar to track progress on complex features.
