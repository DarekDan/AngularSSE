# Verification Walkthrough

This document guides you through verifying the Angular SSE MVP.

## 1. Backend (Spring Boot)
**Goal**: Ensure the backend is running and serving the SSE endpoint.

1.  Open a terminal in `backend/`.
2.  Run `mvn spring-boot:run`.
3.  Wait for "Started BackendApplication".
4.  **Verify**: Open browser to `http://localhost:8081/api/sse`. It should load indefinitely (SSE stream).

## 2. Frontend (Angular)
**Goal**: Ensure the frontend is running and connected to the backend.

1.  Open a terminal in `frontend/`.
2.  Run `npm install` (if not done).
3.  Run `ng serve`.
4.  **Verify**: Open `http://localhost:4200`.
    -   You should see the "AngularSSE" black bar.
    -   Open DevTools Console. You should see "Received event" logs if connected.

## 3. CLI (C#)
**Goal**: Send a message to the frontend.

1.  Open a terminal in `cli/`.
2.  Run `dotnet run`.
3.  Enter a message: "Hello World".
4.  **Verify**:
    -   Check the Frontend.
    -   A red notification bar should slide down with "Hello World".
    -   Click "x" to close it.

## 4. Docker Verification (Optional)
1.  Build all images:
    ```bash
    docker build -t backend ./backend
    docker build -t frontend ./frontend
    docker build -t cli ./cli
    ```
2.  Run Backend: `docker run -d -p 8081:8080 backend`
3.  Run Frontend: `docker run -d -p 80:80 frontend`
4.  Run CLI: `docker run -it --network host cli`

### Troubleshooting
- **Frontend Connection Issues**:
  - Ensure the Backend is running on port **8081**.
  - The Frontend uses a **Proxy** (`proxy.conf.json`) to forward `/api` requests to `localhost:8081`.
  - If connecting to a remote server, update `frontend/src/environments/environment.ts` with the correct `apiUrl`.
  - The "Debug Status" in the black bar should show "Connected".
- **UI Not Updating**:
  - The application uses manual `ChangeDetectorRef` to ensure SSE events trigger UI updates immediately.
  - Check the browser console for "SSE message received" logs.
- **Frontend shows generic Angular page**: Ensure you are running `npm start` (or `ng serve`) from the `frontend` directory and that the build completed successfully. Hard refresh (Ctrl+F5) to clear cache.
- **No notifications**: Check the browser console (F12) for connection errors to `http://localhost:8081/api/sse`. Ensure the backend is running on port 8081.

## Configuration
- **Backend Port**: `8081` (set in `application.properties`)
- **Frontend Proxy**: `frontend/proxy.conf.json`
- **Frontend Environment**: `frontend/src/environments/environment.ts`
