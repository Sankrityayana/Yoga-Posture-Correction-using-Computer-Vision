# Frontend Guide

This frontend is a React + Vite application that runs pose detection fully in the browser using MediaPipe Pose.

## Responsibilities

- Manage user flows: landing, pose selection, live session, dashboard.
- Capture webcam frames and run pose inference locally.
- Evaluate posture against pose rules and render feedback.
- Save session summaries to local storage.
- Attempt backend sync for persisted history.

## Folder Structure

```text
frontend/
	src/
		components/
			PoseCamera.jsx
			PoseGuide.jsx
			FeedbackPanel.jsx
			ScoreMeter.jsx
			Navbar.jsx
		pages/
			Landing.jsx
			PoseSelect.jsx
			LiveSession.jsx
			Dashboard.jsx
		utils/
			poseDetector.js
			angleCalculator.js
			poseEvaluator.js
			idealPoses.js
```

## Environment Variables

Create frontend/.env:

```env
VITE_API_URL=http://localhost:8000
```

For production, set VITE_API_URL to your backend URL in Vercel project settings.

## Run Locally

```bash
cd frontend
npm install
npm run dev
```

## Build

```bash
cd frontend
npm run build
```

The output is generated in frontend/dist.

## Key Runtime Flow

1. User chooses an asana.
2. LiveSession starts the camera.
3. PoseCamera streams frames to MediaPipe.
4. poseEvaluator computes score and top corrections.
5. UI updates score meter, chart, and feedback.
6. On session end, summary is saved locally and posted to backend.

## Important Notes

- The webcam stream is not uploaded to the backend.
- If backend is unavailable, core experience still works due to local-only fallback.
- If you change response contracts, update docs/api-reference.md and backend schemas together.

