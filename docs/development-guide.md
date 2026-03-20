# Development Guide

## Recommended Workflow

1. Create feature branch from main.
2. Make small scoped commits.
3. Run frontend build and backend startup checks.
4. Open PR with screenshots and API impact notes.

## Local Quality Checks

Frontend:

```bash
cd frontend
npm run build
```

Backend:

```bash
cd backend
uvicorn main:app --reload --port 8000
```

Manual runtime check:

- Start a pose session
- Confirm score updates
- End session and check dashboard

## Change Management Rules

- If API contract changes, update docs/api-reference.md in same PR.
- If scoring logic changes, update docs/algorithm.md in same PR.
- If deployment settings change, update DEPLOYMENT.md and README.

## Suggested Contribution Areas

- Improve pose calibration for side-angle cases.
- Add automated tests for angle calculations.
- Add user-authenticated history storage.
- Add export and share session summaries.
