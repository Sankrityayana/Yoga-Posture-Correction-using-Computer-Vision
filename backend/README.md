# Backend Guide

This backend provides API endpoints for optional pose analysis and session persistence.

## Stack

- FastAPI
- Pydantic
- Motor (async MongoDB)
- Uvicorn/Gunicorn

## Folder Layout

```text
backend/
  main.py
  routes/
    pose.py
    session.py
  models/
    schemas.py
  db/
    database.py
  utils/
    angle_utils.py
```

## Run Locally

```bash
cd backend
python -m venv .venv_fresh
.venv_fresh\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

## Environment Variables

Create backend/.env:

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=yoga_posture_db
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

## API Endpoints

- GET /
- GET /health
- POST /analyze-pose
- POST /save-session
- GET /history
- GET /history/{user_id}

Detailed contracts are documented in docs/api-reference.md.

## Production Start Command

```bash
gunicorn backend.main:app --worker-class=uvicorn.workers.UvicornWorker --timeout=120 --bind 0.0.0.0:$PORT
```

## Operational Notes

- CORS_ORIGINS must include your deployed frontend URL.
- MongoDB connectivity is optional for local demo; frontend fallback still works.
- Save-session schema expects snake_case fields.
