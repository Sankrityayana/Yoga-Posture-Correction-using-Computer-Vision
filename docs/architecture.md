# Architecture

## Overview

Sankrityayana follows a browser-first architecture:

- Real-time inference and scoring happen in the frontend.
- Backend is optional for runtime scoring and primary for session persistence APIs.
- Database layer is asynchronous and only used if backend persistence is enabled.

## System Components

### Frontend

- Framework: React + Vite
- CV runtime: MediaPipe Pose loaded via global browser script/CDN
- Rendering: video + canvas overlay for skeleton and status
- State handling: component state and local storage for session persistence fallback

Primary files:

- frontend/src/components/PoseCamera.jsx
- frontend/src/pages/LiveSession.jsx
- frontend/src/utils/poseDetector.js
- frontend/src/utils/poseEvaluator.js
- frontend/src/utils/idealPoses.js

### Backend

- Framework: FastAPI
- Schemas: Pydantic models in backend/models/schemas.py
- Routes:
	- backend/routes/pose.py
	- backend/routes/session.py
- DB adapter: Motor client in backend/db/database.py

### Storage

- Local-first storage in browser localStorage under yoga_sessions.
- Optional MongoDB persistence through /save-session endpoint.

## Runtime Data Flow

1. User selects a pose and starts session.
2. PoseCamera initializes webcam and MediaPipe Pose.
3. Each frame yields landmarks.
4. poseEvaluator compares measured angles with configured ideal angles.
5. Score, feedback, and skeleton color are rendered in real time.
6. On end session, summary is written locally and then posted to backend.
7. Backend attempts to persist into MongoDB and returns status.

## API Responsibility Split

- Frontend analysis path: default, low-latency, no frame upload.
- Backend analysis path: available through /analyze-pose (secondary path).

## Security and Privacy Notes

- Raw camera stream stays in browser during normal usage.
- CORS is controlled by CORS_ORIGINS in backend environment.
- No authentication layer is currently implemented.

## Scalability Notes

- Frontend-heavy computation reduces backend CPU requirements.
- Backend endpoints are stateless and horizontally scalable.
- MongoDB operations are async through Motor.

## Known Constraints

- Backend SaveSessionRequest currently expects snake_case fields.
- Frontend session payload currently uses camelCase fields.
- Without mapping or schema aliasing, backend persistence may fail while local storage still succeeds.

