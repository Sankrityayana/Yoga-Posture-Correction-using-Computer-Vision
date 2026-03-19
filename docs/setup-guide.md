# Setup Guide

This guide covers local development setup for both frontend and backend.

## Prerequisites

- Node.js 18+ and npm
- Python 3.10+
- Webcam-enabled browser (Chrome/Edge recommended)
- Optional: MongoDB (local or Atlas)

## 1) Clone and Enter Project

```bash
git clone <repo-url>
cd "Yoga Posture Correction using Computer Vision"
```

## 2) Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
```

Set frontend/.env:

```env
VITE_API_URL=http://localhost:8000
```

Run frontend:

```bash
npm run dev
```

Frontend runs at http://localhost:5173.

## 3) Backend Setup

```bash
cd backend
python -m venv .venv_fresh
.venv_fresh\Scripts\activate
pip install -r requirements.txt
```

Create backend/.env with:

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=yoga_posture_db
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

Run backend:

```bash
uvicorn main:app --reload --port 8000
```

Backend docs are available at http://localhost:8000/docs.

## 4) Validate Local Setup

- Open frontend and allow webcam permission.
- Start a session and verify score updates.
- End session and verify dashboard reflects latest local session.
- Verify backend health endpoint: http://localhost:8000/health.

## 5) Production Run Command (Backend)

```bash
gunicorn backend.main:app --worker-class=uvicorn.workers.UvicornWorker --timeout=120 --bind 0.0.0.0:8000
```

## 6) Common Setup Pitfalls

- Incorrect env var name: backend uses MONGO_URL, not MONGODB_URI.
- CORS misconfiguration: include exact frontend origin in CORS_ORIGINS.
- Missing HTTPS context in production can block webcam in some browser cases.

