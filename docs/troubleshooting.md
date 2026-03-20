# Troubleshooting

## Frontend build fails on Vercel

Symptoms:

- Build exits with code 1
- Secret reference error such as missing VITE_API_URL secret

Fix:

1. Open frontend/vercel.json and ensure no invalid secret reference is present.
2. Set VITE_API_URL in Vercel project settings under Environment Variables.
3. Redeploy latest main commit.

## Webcam does not start

Symptoms:

- Camera permission denied
- Live session stuck on loading

Fix:

1. Allow camera permission in browser site settings.
2. Use HTTPS in production.
3. Close apps that lock webcam (video call software).
4. Reload session page.

## Backend unavailable but app still runs

Expected behavior:

- Session data is stored in local storage.
- Dashboard still works with local sessions.

If backend persistence is required:

1. Verify backend URL in VITE_API_URL.
2. Check backend /health endpoint.
3. Confirm CORS_ORIGINS includes frontend origin.

## Session save not persisted in MongoDB

Possible cause:

- Payload naming mismatch between frontend and backend.

Current expectation:

- Backend SaveSessionRequest expects pose_name and snake_case fields.

Fix options:

1. Update frontend payload keys to snake_case.
2. Add aliases in backend pydantic model.

## CORS errors in browser console

Fix:

1. Set CORS_ORIGINS to exact frontend origin (including protocol).
2. If multiple origins are needed, separate by comma.
3. Restart backend service after changes.

## Render backend cold start delay

Symptoms:

- First request takes 20-60 seconds on free tier.

Fix:

1. Retry after first wake-up.
2. Use a paid instance if low latency is required.

## MediaPipe runtime issues

Symptoms:

- No landmarks
- Script not initialized

Fix:

1. Ensure internet access to MediaPipe CDN.
2. Verify browser supports WebGL/WebAssembly.
3. Test in Chrome/Edge latest stable.

## Local setup command errors

Python deps:

```bash
pip install -r backend/requirements.txt
```

Frontend deps:

```bash
cd frontend
npm install
```

If lockfile mismatch appears, remove node_modules and reinstall.
